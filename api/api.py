from flask import Flask, jsonify, request
from mongodb_config import users_db, companies_db
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/companies', methods=['GET'])
def get_all_companies():
    output = []
    for q in companies_db.find():
        output.append(
            {'name': q['name'], 'positives': q['positives'], 'negatives': q['negatives']})

    return jsonify({'result': output})


@app.route('/companies/<name>', methods=['GET'])
def get_rating(name):
    output = []
    q = companies_db.find_one({'name': name})
    if q:
        output.append(
            {'name': q['name'], 'positives': q['positives'], 'negatives': q['negatives']})

    return jsonify({'result': output})


@app.route('/users', methods=['GET'])
def get_all_users():
    output = []
    for q in users_db.find():
        output.append({'name': q['name']})

    if not output:
        output = 'Empty dataset'
    return jsonify({'result': output})


@app.route('/users', methods=['POST'])
def add_user():
    name = request.json['name']

    user_id = users_db.insert_one({'name': name})

    return jsonify({'result': {'name': name}})


@app.route('/users/<name>', methods=['GET'])
def get_user(name):
    q = users_db.find_one({'name': name})
    if q:
        output = {'name': q['name']}
    else:
        output = 'user with name ' + name + ' not found'

    return jsonify({'result': output})


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
