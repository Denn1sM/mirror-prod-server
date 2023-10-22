import {Verbindung} from '../../state/transport/to';
import {DateTime, Duration} from "luxon";


interface TimeWithDelay {
  time: string
  delayed: boolean
  delay?: string
}

const getTimeWithDelay = (plannedDateTime: string, realDateTime: string | undefined): TimeWithDelay => {
  if(!realDateTime) {
    return {
      time: DateTime.fromISO(plannedDateTime).toFormat("HH:mm"),
      delayed: false,
    }
  } else {
    const planned = DateTime.fromISO(plannedDateTime)
    const real = DateTime.fromISO(realDateTime)
    const diff = real.diff(planned)
    console.log("DIFF")
    console.log(diff.toMillis())
    console.log(planned.toMillis())
    console.log(real.toMillis())

    return {
      time: planned.toFormat("HH:mm"),
      delayed: diff.toMillis() > 60000,
      delay: diff.toFormat("m")
    }
  }
}

export const fetchData = (haltestellenId: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Cookie", "NSC_wjq-efgbt-fgb-iuuqt=ffffffffc0166fd045525d5f4f58455e445a4a421488");

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch("https://fahrtauskunft.avv-augsburg.de/efa/XML_DM_REQUEST?coordOutputFormat=WGS84%5Bdd.ddddd%5D&deleteAssignedStops_dm=1&depSequence=30&depType=stopEvents&doNotSearchForStops=1&genMaps=0&imparedOptionsActive=1&inclMOT_10=true&inclMOT_11=true&inclMOT_13%20=true&inclMOT_4=true&inclMOT_5=true&inclMOT_6=true&inclMOT_7=true&includeCompleteStopSeq=1&includedMeans=checkbox&itOptionsActive=1&itdDateTimeDepArr=dep&language=de&locationServerActive=1&maxTimeLoop=1&mode=direct&name_dm=" + haltestellenId + "&outputFormat=rapidJSON&ptOptionsActive=1&serverInfo=1&sl3plusDMMacro=1&type_dm=any&useAllStops=1&useProxFootSearch=0&useRealtime=1&version=10.5.17.3", requestOptions)
      .then(response => response.text())
      .then(result => {
        const resultJson = JSON.parse(result)
        const verbindungen: Verbindung[] = resultJson.stopEvents.map((element: any) => {
          const time = getTimeWithDelay(element.departureTimePlanned, element.departureTimeEstimated)
          return {
            time: time.time,
            linie: element.transportation.number,
            ziel: element.transportation.destination.name,
            delay: time.delayed ? time.delay : undefined
          }
        })
      return verbindungen
      })
      .catch(error => console.log('error', error));
}

export const fetchDataOld = async (einstieg: string) => {
  const alleVerbindungen: Array<Verbindung> = [];

  const date = new Date();
  const day = (`0${date.getDate()}`).slice(-2);
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const year = date.getFullYear();
  const dateString = `${day}.${month}.${year}`;

  const hour = (`0${date.getHours()}`).slice(-2);
  const minute = (`0${date.getMinutes()}`).slice(-2);
  const currentTime = hour + minute;
  // https://cors-anywhere.herokuapp.com/https://www.api.com/
  // return fetch("http://localhost:8010/proxy/avv2/XSLT_DM_REQUEST", {

  /*

    return fetch("https://thingproxy.freeboard.io/fetch/https://efa.avv-augsburg.de/avv2/XSLT_DM_REQUEST", {
        //  const res = fetch("https://efa.avv-augsburg.de/avv2/XSLT_TRIP_REQUEST2?sessionID=0&requestID=0&language=de&commonMacro=true&canChangeMOT=0&type_origin=any&type_destination=any&trITMOTvalue100=10&useProxFootSearch=1",
        headers: {
        */
  //   accept: "*/*",
  /*
            "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            //"sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        referrer: "https://efa.avv-augsburg.de/avv2/XSLT_TRIP_REQUEST2",
        referrerPolicy: "strict-origin-when-cross-origin",
        body:
            "language=de&deleteAssignedStops_dm=1&trITMOTvalue100=10&useProxFootSearch=0&itdLPxx_today=18&mode=direct&lsShowTrainsExplicit=0&type_dm=any&name_dm=" +
            einstieg +
            "&includedMeans=checkbox&inclMOT_0=1&inclMOT_1=1&inclMOT_2=1&inclMOT_3=1&inclMOT_4=1&inclMOT_5=1&inclMOT_6=1&inclMOT_7=1&inclMOT_8=1&inclMOT_9=1&inclMOT_10=1&inclMOT_11=1&commonMacro=true&itdLPxx_depOnly=1&" +
            "itdDateDayMonthYear=" +
            dateString +
            "& maxAssignedStops=1& hideBannerInfo=1& execInst=normal& limit=15 &" +
            "itdTime=" +
            currentTime +
            "& useAllStops=1",
        method: "POST",
        mode: "no-cors",
        credentials: "omit"
        //Response.text gibt das dokument als plain html zurück
        //div class "mdv_departureInformations" enthält alle erhaltenen Abfahrtszeiten
    }).then((awaitedResponse) => awaitedResponse.text())
        .then((response) => {

            for (let i = 0; i < 10; i++) {
                let elem = response.indexOf("dmTr");
                response = response.slice(elem, response.length);
                console.log(response)
                let abfahrtsZeitIndex = response.indexOf("time ");
                let abfahrtsZeit = response.slice(abfahrtsZeitIndex + 38, abfahrtsZeitIndex + 43);
                let linieIndex = response.indexOf("mdv_singleDepInfo");
                let linieEndIndex = response.indexOf("Bstg.");
                let linieNummer = response.slice(linieIndex + 19, linieIndex + 22).replace("/", "").trim()
                let ziel = response.slice(linieIndex + "mdv_singleDepInfo".length + 6, linieEndIndex);
                let verbindung = {
                    time: abfahrtsZeit,
                    linie: linieNummer,
                    ziel: ziel
                };
                alleVerbindungen.push(verbindung);
                response = response.slice(5, response.length);
            }
            return alleVerbindungen;
        });
}

*/

  return fetch(`/avv/${einstieg}/${dateString}/${currentTime}`)
    .then((awaitedResponse) => {
      console.log("RESPONSE FROM PYTHON SERVER")
      console.log(awaitedResponse);
      return awaitedResponse.text();
    })
    .then((response) => {
      console.log("RESOLVED RESPONSE")
      console.log(response)
      for (let i = 0; i < 10; i++) {
        const elem = response.indexOf('dmTr');
        response = response.slice(elem, response.length);
        const abfahrtsZeitIndex = response.indexOf('time ');
        const abfahrtsZeit = response.slice(abfahrtsZeitIndex + 38, abfahrtsZeitIndex + 43);
        const linieIndex = response.indexOf('mdv_singleDepInfo');
        const linieEndIndex = response.indexOf('Bstg.');
        const linieNummer = response.slice(linieIndex + 19, linieIndex + 22).replace('/', '').trim();
        const ziel = response.slice(linieIndex + 'mdv_singleDepInfo'.length + 6, linieEndIndex);
        const verbindung = {
          time: abfahrtsZeit,
          linie: linieNummer,
          ziel,
        };
        alleVerbindungen.push(verbindung);
        response = response.slice(5, response.length);
      }
      return alleVerbindungen;
    });
};
