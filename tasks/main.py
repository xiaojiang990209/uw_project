from flask import Flask
import util.DB as DB

DB.initialize_connection()
app = Flask(__name__)

import controller.FBGroupScrapeController
import controller.FBGroupCleanController
