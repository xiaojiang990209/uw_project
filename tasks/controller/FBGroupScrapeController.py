from flask import jsonify
from main import app
from threads.FBGroupScrapeTask import AsyncFBGroupScrapeTask

@app.route('/scrape')
def scrape_posts():
    AsyncFBGroupScrapeTask().start()
    return jsonify({ 'status': 'request started' })

