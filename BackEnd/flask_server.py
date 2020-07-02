from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
from flask import Flask, request, jsonify, Response, abort
import os
import json

#when running on IBM CLOUD
if "CLOUDANT_URL" in os.environ:
    user = os.environ['CLOUDANT_USERNAME']
    password = os.environ['CLOUDANT_PASSWORD']
    url = url=os.environ['CLOUDANT_URL']

#When running locally
elif os.path.isfile('vcap-local.json'):
    with open('vcap-local.json') as f:
        vcap = json.load(f)
        print('Found local VCAP_SERVICES')
        creds = vcap['services']['cloudantNoSQLDB'][0]['credentials']
        user = creds['username']
        password = creds['password']
        url = creds['host']

databaseName = "databasedemo"
port = int(os.getenv('PORT', 8000))
client = None
db = None
app = Flask(__name__)

client = Cloudant(user, password, url=url)
client.connect()
db = client[databaseName]

@app.route('/v1.0/users', methods=['POST'])
def post_user():
    if not request.json:
        abort(400)
    document = db.create_document(request.json)
    return jsonify(document)

@app.route('/v1.0/users/<id>', methods=['GET'])
def get_user_by_id(id):
    if id and id in db:
        return jsonify(db[id])
    else:
        return Response(status = 404)

@app.route('/v1.0/users', methods=['GET'])
def get_all_users():
    return jsonify(db)

if __name__=='__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
