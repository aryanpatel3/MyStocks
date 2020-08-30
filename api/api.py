from flask import Flask, jsonify, request
from mongodb_config import users_db, companies_db

app = Flask(__name__)


@app.route('/companies', methods=['GET'])
def get_all_companies():
    output = []
    for q in companies_db.find():
        output.append(
            {'name': q['name'], 'articles': q['articles']})

    return jsonify({'result': output})


@app.route('/companies/<name>', methods=['GET'])
def get_rating(name):
    output = []
    q = companies_db.find_one({'name': name})
    if q:
        output.append(
            {'name': q['name'], 'articles': q['articles']})

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


if __name__ == '__main__':
    app.run(debug=True)
