from mongoengine import *
import os

def initialize_connection():
    host = os.environ['MONGO_HOST']
    db = os.environ['MONGO_DB']
    try:
        connect(db, host=host)
    except:
        raise Exception('Cannot connect to database')
