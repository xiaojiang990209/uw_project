from threading import Thread
from lib.repository.FBGroupRepository import FBGroupRepository
from lib.scraper.FBGroupPostConverter import FBGroupPostConverter
from lib.scraper.FBGroupScraper import FBGroupScraper
from util.FBPostType import FBPostType

import json
import time
import random
import os

DEFAULT_MIN_SLEEP = 30
DEFAULT_MAX_SLEEP = 90

class AsyncFBGroupScrapeTask(Thread):
    def run(self):
        path = os.path.join(os.path.dirname(__file__), '../data/scraping_input.json')
        with open(path) as f:
            groups_to_scrape = json.load(f)

        repo = FBGroupRepository()
        converter = FBGroupPostConverter()
        scraper = FBGroupScraper(converter)

        num_scraped = 0
        for group in groups_to_scrape:
            group_id = group['group_id']
            print (f"Fetching {group['number']} posts for {group_id}...")

            results = scraper.get_result(group_id, group['number'])
            print (f"Scraped {len(results)} posts")
            # Append location
            for result in results:
                result['location'] = group['location']
            print ('Finished fetching. Start saving...')

            post_type = FBPostType[group['type']]
            num_scraped += repo.save(group_id, post_type, results)

            print (f"Finished fetching {group['number']} posts for {group_id}...")
            sleep_time = random.randint(DEFAULT_MIN_SLEEP, DEFAULT_MAX_SLEEP)
            print (f'Sleeping {sleep_time}')
            time.sleep(sleep_time)

        print (f"Num scraped {num_scraped}")


