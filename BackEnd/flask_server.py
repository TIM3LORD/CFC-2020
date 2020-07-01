from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
from flask import Flask, request, jsonify, Response
import os

serviceUsername = os.getenv('USER_NAME', '<CLOUDANT_SERVICE_USERNAME>')
servicePassword = os.getenv('PASSWORD', '<CLOUDANT_SERVICE_PASSWORD>')
serviceURL = os.getenv('SERVICE_URL', '<CLOUDANT_SERVICE_URL>')

databaseName = "databasedemo"
port = int(os.getenv('PORT', 8000))
client = None
db = None
app = Flask(__name__)

client = Cloudant(serviceUsername, servicePassword, url=serviceURL)
client.connect()
db = client[databaseName]

@app.route('/api/v1.0/users', methods=['POST'])
def post_user():
    if not request.json:
        abort(400)
    document = db.create_document(request.json)
    return jsonify(document)

@app.route('/api/v1.0/users/<id>', methods=['GET'])
def get_user_by_id(id):
    if id and id in db:
        return jsonify(db[id])
    else:
        return Response(status = 404)

@app.route('/api/v1.0/users', methods=['GET'])
def get_all_users():
    return jsonify(db)

if __name__=='__main__':
    app.run(host='127.0.0.1', port=port)
