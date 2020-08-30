from pymongo import MongoClient
from config import USERNAME, PASSWORD

client = MongoClient(
    "mongodb+srv://" + USERNAME + ":" + PASSWORD + "@mystocks.lmbg7.mongodb.net/MyStocks?retryWrites=true&w=majority")

db = client.MyStocks

users_db = db.users

articles_db = db.articles

# rating_db = db.rating

companies_db = db.companies
