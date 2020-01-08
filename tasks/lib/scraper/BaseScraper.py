from requests import RequestException
from requests_html import HTML, HTMLSession

import time
import random

class BaseScraper:
    _user_agent = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                   "AppleWebKit/537.36 (KHTML, like Gecko) "
                   "Chrome/76.0.3809.89 Safari/537.36")
    _headers = {'user-agent': _user_agent, 'accept-language': 'en-GB,en;q=0.9,en-US;q=0.8,fr;q=0.7,zh-CN;q=0.6,zh;q=0.5'}
    _min_sleep=2

    def __init__(self, timeout=5, sleep=4):
        self._timeout = timeout
        self._max_sleep = sleep
        self._session = HTMLSession()
        self._session.headers.update(self._headers)

    def get_response(self, url=None):
        if not url:
            return
        if self._max_sleep:
            time.sleep(random.randint(self._min_sleep, self._max_sleep))

        try:
            response = self._session.get(url, timeout=self._timeout)
            response.raise_for_status()
        except (RequestException):
            return None

        return response.html

