from requests import RequestException
from requests_html import HTML, HTMLSession

import time

class BaseScraper:
    _user_agent = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                   "AppleWebKit/537.36 (KHTML, like Gecko) "
                   "Chrome/76.0.3809.87 Safari/537.36")
    _headers = {'User-Agent': _user_agent, 'Accept-Language': 'en-US'}

    def __init__(self, timeout=5, sleep=3):
        self._timeout = timeout
        self._sleep = sleep
        self._session = HTMLSession()
        self._session.headers.update(self._headers)

    def get_response(self, url=None):
        if not url:
            return
        if self._sleep:
            time.sleep(self._sleep)

        try:
            response = self._session.get(url, timeout=self._timeout)
            response.raise_for_status()
        except (RequestException):
            return None

        return response.html

