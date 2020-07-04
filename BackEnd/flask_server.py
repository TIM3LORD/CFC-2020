from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
from cloudant.document import Document
from flask import Flask, request, jsonify, Response, abort
import os
import json
import requests

#when running on IBM CLOUD
if "CLOUDANT_URL" in os.environ:
    user = os.environ['CLOUDANT_USERNAME']
    password = os.environ['CLOUDANT_PASSWORD']
    url = os.environ['CLOUDANT_URL']
    geo_code_url = os.environ['HERE_GEO_CODE_URL']
    here_api_key = os.environ['HERE_API_KEY']

#When running locally
elif os.path.isfile('vcap-local.json'):
    with open('vcap-local.json') as f:
        vcap = json.load(f)
        print('Found local VCAP_SERVICES')
        creds = vcap['services']['cloudantNoSQLDB'][0]['credentials']
        user = creds['username']
        password = creds['password']
        url = creds['host']
        here_api_key = creds['hereApiKey']
        geo_code_url = creds['geoCodeUrl']

userDatabaseName = "userdb"
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
    if request.json['address']:
        params = { 'q' : request.json['address'], 'apiKey' : here_api_key}
        r = requests.get(url=geo_code_url, params=params)
        if len(r.json()['items']) > 0:
            request.json['latitude'] = r.json()['items'][0]['position']['lat']
            request.json['longitude'] = r.json()['items'][0]['position']['lng']
    document = db.create_document(request.json)
    document.save()
    return jsonify(document)

@app.route('/v1.0/users/<id>', methods=['GET'])
def get_user_by_id(id):
    db = client[userDatabaseName]
    selector = {'_id': {'$eq': id}}
    docs = db.get_query_result(selector)
    result = []
    for doc in docs:
        result.append(doc)
    return jsonify(result)

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
        if(email is not None and email != ""):
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
    # document.save()
    return jsonify(document)

@app.route('/v1.0/jobs/<id>', methods=['GET'])
def get_job_by_id(id):
    db = client[jobDatabaseName]
    selector = {'_id': {'$eq': id}}
    docs = db.get_query_result(selector)
    result = []
    for doc in docs:
        result.append(doc)
    return jsonify(result)

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

@app.route('/v1.0/jobs/apply/<worker_id>/<job_id>', methods=['POST'])
def apply_for_job(worker_id, job_id):
    db = client[jobDatabaseName]
    selector = {'_id': {'$eq': job_id}}
    docs = db.get_query_result(selector)
    for doc in docs:
        updated_doc = Document(db, doc['_id'])
        updated_doc.update(doc)
        updated_doc['applicants'].append(worker_id)
        updated_doc.save()
    return Response(status = 200)

@app.route('/v1.0/delete/<type>', methods=['POST'])
def delete_all(type):
    if type == "users":
        db = client[userDatabaseName]
    if type == "jobs":
        db = client[jobDatabaseName]
    result = []
    for doc in db:
        doc.delete()
    return Response(status = 200)

@app.route('/v1.0/login', methods=['POST'])
def user_login():
    db = client[userDatabaseName]
    if not request.json:
        abort(400)
    selector = {'emailAddress': {'$eq': request.json['emailAddress']}}
    docs = db.get_query_result(selector)
    for doc in docs:
        if doc['password'] == request.json['password']:
            return jsonify(doc)
    return Response(status = 400)

if __name__=='__main__':
    app.run(host='0.0.0.0', port=port)
