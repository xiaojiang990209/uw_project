from time import time
from .BaseScraper import BaseScraper

COLLECTED_AT = 'collected_at';

class FBGroupScraper:
    _scrape_url = 'https://m.facebook.com/groups/{}'
    _next_page_url = 'https://m.facebook.com{}'

    def __init__(self, converter):
        self.base_scraper = BaseScraper()
        self.converter = converter

    def get_result(self, group_id=None, num_posts=None):
        results = []
        self.converter.set_group_id(group_id)
        url = self._scrape_url.format(group_id)

        while True:
            html = self.base_scraper.get_response(url)
            posts = self.converter.get_posts(html)
            for post in posts:
                result = self.converter.convert(post)
                if result:
                    results.append(result)

                if len(results) == num_posts:
                    return results

            url = self._next_page_url.format(
                    self.converter.get_next_page_url(html))

        return results


