from flask import jsonify
from main import app
from datetime import datetime, timedelta

from lib.repository.FBGroupRepository import FBGroupRepository

# Default truncate data that are older than a month
TRUNCATE_DATE = (datetime.utcnow() - timedelta(weeks=4)).timestamp()

@app.route('/clean')
def clean():
    repo = FBGroupRepository()
    num_housing_deleted = repo.truncate_carpool(TRUNCATE_DATE)
    num_carpool_deleted = repo.truncate_housing(TRUNCATE_DATE)
    return jsonify(_construct_clean_response(num_housing_deleted, num_carpool_deleted))

def _construct_clean_response(num_housing_deleted, num_carpool_deleted):
    return {
        "num_housing_deleted": num_housing_deleted,
        "num_carpool_deleted": num_carpool_deleted
    }

