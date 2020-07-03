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

userDatabaseName = "databasedemo"
jobDatabaseName = "jobsdb"
port = int(os.getenv('PORT', 8000))
client = None
db = None
app = Flask(__name__)

client = Cloudant(user, password, url=url)
client.connect()

@app.route('/v1.0/users', methods=['POST'])
def post_user():
    db = client[userDatabaseName]
    if not request.json:
        abort(400)
    document = db.create_document(request.json)
    return jsonify(document)

@app.route('/v1.0/users/<id>', methods=['GET'])
def get_user_by_id(id):
    db = client[userDatabaseName]
    if id and id in db:
        return jsonify(db[id])
    else:
        return Response(status = 404)

@app.route('/v1.0/users', methods=['GET'])
def get_query_users():
    db = client[userDatabaseName]
    type = request.args.get('type')
    email = request.args.get('email')
    if type ==  "all":
        result = []
        for doc in db:
            result.append(doc)
        return jsonify(result)
        
    else:
        selector = {}
        if(type is not None and type != ""):
            selector['type'] = {'$eq': type}
        elif(email is not None and email != ""):
            selector['emailAddress'] = {'$eq': email}
        docs = db.get_query_result(selector)
        result = []
        for doc in docs:
            result.append(doc)
        return jsonify(result)

##Job Postings
@app.route('/v1.0/jobs', methods=['POST'])
def post_job():
    db = client[jobDatabaseName]
    if not request.json:
        abort(400)
    document = db.create_document(request.json)
    document.save()
    return jsonify(document)

@app.route('/v1.0/jobs/<id>', methods=['GET'])
def get_job_by_id(id):
    db = client[jobDatabaseName]
    if id and id in db:
        return jsonify(db[id])
    else:
        return Response(status = 404)

@app.route('/v1.0/jobs', methods=['GET'])
def get_query_jobs():
    db = client[jobDatabaseName]
    manufacturer = request.args.get('manufacturer')
    location = request.args.get('location')
    if manufacturer ==  "all":
        result = []
        for doc in db:
            result.append(doc)
        return jsonify(result)
    else:
        selector = {}
        if(manufacturer is not None and manufacturer != ""):
            selector['manufacturerId'] = {'$eq': manufacturer}
        if(location is not None and location != ""):
            selector['location'] = {'$eq': location}
        docs = db.get_query_result(selector)
        result = []
        for doc in docs:
            result.append(doc)
        return jsonify(result)

if __name__=='__main__':
    app.run(host='0.0.0.0', port=port)
