import os
from flask import Flask, send_from_directory
import requests
from flask import request
import base64

app = Flask(__name__)
avvUrl = "https://thingproxy.freeboard.io/fetch/https://efa.avv-augsburg.de/avv2/XSLT_DM_REQUEST"
headers = {
    "accept": "*/*",
    "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    #"sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
}

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# AVV Data request
@app.route('/avv/<string:stop>/<string:date>/<string:time>', methods=['GET'])
def avvdata(stop, date, time):
    '''
    body = "language=de&deleteAssignedStops_dm=1&trITMOTvalue100=10&useProxFootSearch=0&itdLPxx_today=18&mode=direct&lsShowTrainsExplicit=0&type_dm=any&name_dm=" + stop + "&includedMeans=checkbox&inclMOT_0=1&inclMOT_1=1&inclMOT_2=1&inclMOT_3=1&inclMOT_4=1&inclMOT_5=1&inclMOT_6=1&inclMOT_7=1&inclMOT_8=1&inclMOT_9=1&inclMOT_10=1&inclMOT_11=1&commonMacro=true&itdLPxx_depOnly=1&itdDateDayMonthYear=" + date + "& maxAssignedStops=1& hideBannerInfo=1& execInst=normal& limit=15 & itdTime=" + time + "& useAllStops=1"
    response = requests.post(avvUrl, headers=headers, json=body)
    print(response)
    '''
    url = "https://fahrtauskunft.avv-augsburg.de/efa/XML_DM_REQUEST?coordOutputFormat=WGS84%5Bdd.ddddd%5D&deleteAssignedStops_dm=1&depSequence=30&depType=stopEvents&doNotSearchForStops=1&genMaps=0&imparedOptionsActive=1&inclMOT_10=true&inclMOT_11=true&inclMOT_13%20=true&inclMOT_4=true&inclMOT_5=true&inclMOT_6=true&inclMOT_7=true&includeCompleteStopSeq=1&includedMeans=checkbox&itOptionsActive=1&itdDateTimeDepArr=dep&language=de&locationServerActive=1&maxTimeLoop=1&mode=direct&name_dm=de%3A09761%3A768&outputFormat=rapidJSON&ptOptionsActive=1&serverInfo=1&sl3plusDMMacro=1&type_dm=any&useAllStops=1&useProxFootSearch=0&useRealtime=1&version=10.5.17.3"
    payload = {}
    headers = {
      'Cookie': 'NSC_wjq-efgbt-fgb-iuuqt=ffffffffc0166fd045525d5f4f58455e445a4a421488'
    }
    response = requests.request("GET", url, headers=headers, data=payload)

    print(response.text)
    return response.text

# Save notes-picture
@app.route('/notes/save', methods=['POST'])
def saveNote():
    image = request.json.get('image')
    name = request.json.get('name')
    file = open(os.path.join(app.root_path, "static", "images", "fileName.png"), "wb")
    imgdata = base64.b64decode(image)
    file.write(imgdata)
    file.close
    return "ok"

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)