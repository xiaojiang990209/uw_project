from time import time
from .BaseScraper import BaseScraper

COLLECTED_AT = 'collected_at';
POST_SELECTOR = 'div#m_group_stories_container > section > article'
NEXT_PAGE_SELECTOR = 'div#m_more_item > a'


class FBGroupScraper:
    _scrape_url = 'https://m.facebook.com/groups/{}'
    _next_page_url = 'https://m.facebook.com{}'

    def __init__(self, pipeline):
        self.base_scraper = BaseScraper()
        self.pipeline = pipeline

    def _get_posts(self, html):
        return html.find(POST_SELECTOR)

    def _get_next_page_url(self, html):
        next_page_elem = post.find(NEXT_PAGE_SELECTOR, first=True)
        if not next_page_elem:
            print (post)
            return None
        return next_page_elem.attrs['href']

    def get_result(self, group_id=None, num_posts=None):
        results = []
        url = self._scrape_url.format(group_id)

        while True:
            html = self.base_scraper.get_response(url)
            if not html:
                break

            posts = self._get_posts(html)
            for post in posts:
                result = {}
                for stage in self.pipeline:
                    stage_result = stage.process(post, group_id)
                    result = {**result, **stage_result}

                if result:
                    results.append(result)

                if len(results) == num_posts:
                    return results

            url_suffix = self._get_next_page_url(html)
            if not url_suffix:
                break

            url = self._next_page_url.format(url_suffix)

        return results


