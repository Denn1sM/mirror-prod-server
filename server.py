import os
from flask import Flask, send_from_directory
from flask_cors import CORS
import requests

import logging

app = Flask(__name__)
CORS(app)
logging.getLogger('flask_cors').level = logging.DEBUG
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
@app.route('/avv/<string:stop>/<string:date>/<string:time>')
def avvdata(stop, date, time):
    body = "language=de&deleteAssignedStops_dm=1&trITMOTvalue100=10&useProxFootSearch=0&itdLPxx_today=18&mode=direct&lsShowTrainsExplicit=0&type_dm=any&name_dm=" + stop + "&includedMeans=checkbox&inclMOT_0=1&inclMOT_1=1&inclMOT_2=1&inclMOT_3=1&inclMOT_4=1&inclMOT_5=1&inclMOT_6=1&inclMOT_7=1&inclMOT_8=1&inclMOT_9=1&inclMOT_10=1&inclMOT_11=1&commonMacro=true&itdLPxx_depOnly=1&itdDateDayMonthYear=" + date + "& maxAssignedStops=1& hideBannerInfo=1& execInst=normal& limit=15 & itdTime=" + time + "& useAllStops=1"
    response = requests.post(avvUrl, headers=headers, json=body)
    print(response.text)
    return response.text


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)