import json
import re
from datetime import datetime, timedelta, timezone
import codecs

class FBGroupPostConverter:
    _display_url = 'https://facebook.com/groups/{}/{}'
    _image_regex = re.compile(r"background-image: url\('(.+)'\)")
    _datetime_today_regex = re.compile(r"Today at (.+)")
    _datetime_yesterday_regex = re.compile(r"Yesterday at (.+)")
    _datetime_minutes_ago_regex = re.compile(r"(\d){1,2} min")
    _datetime_hours_ago_regex = re.compile(r"(\d){1,2} hr")
    _datetime_just_now_regex = re.compile(r"Just now")
    _post_timestamp_today_format = 'Today at %H:%M'
    _post_timestamp_yesterday_format = 'Yesterday at %H:%M'
    _post_timestamp_no_year_format = '%d %B at %H:%M'
    _post_timestamp_year_format = '%d %B %Y at %H:%M'

    def set_group_id(self, group_id):
        self.group_id = group_id

    def get_posts(self, html):
        return html.find('article')

    def convert(self, post):
        post_id = self._extract_post_id(post)
        post_url = self._display_url.format(self.group_id, post_id)
        detail = self._extract_detail(post)
        content = self._extract_content(detail, post)
        return {
            'post_id': post_id,
            'post_url': post_url,
            'title': self._extract_title(detail),
            'price': self._extract_price(detail),
            'content': content,
            'photos': self._extract_photos(post),
            'created_at': self._extract_time(post),
        }

    def get_next_page_url(self, post):
        next_page_elem = post.find('#m_more_item > a', first=True)
        return next_page_elem.attrs['href']

    def _extract_detail(self, post):
        try:
            detail = post.find('div.story_body_container > div:nth-child(3) > div:first-child', first=True)
            return detail
        except:
            return None

    def _extract_post_id(self, post):
        try:
            data_ft = json.loads(post.attrs['data-ft'])
            return data_ft['top_level_post_id']
        except:
            return None

    def _extract_title(self, detail):
        try:
            title_elem = detail.find('div:first-child > span:nth-child(2)', first=True)
            return title_elem.text
        except:
            return None

    def _extract_price(self, detail):
        try:
            price_elem = detail.find('div:nth-child(2)', first=True)
            return price_elem.text
        except:
            return None

    def _extract_content(self, detail, post):
        # Text-based
        if detail:
            content_elem = detail.find('div:last-child > div:last-child', first=True)
            if content_elem and content_elem.text:
                return content_elem.text

        # Story-based
        content_elem = post.find('div.story_body_container > div:nth-child(2)', first=True)
        return content_elem.text if content_elem else None

    def _extract_photos(self, post):
        try:
            photos = []
            photo_elems = post.find('div.story_body_container > div:nth-child(3) > div:nth-child(2) > div > a > div > i.img')
            for photo_elem in photo_elems:
                match = self._image_regex.search(photo_elem.attrs['style'])
                if match:
                    photos.append(self._decode_css_url(match.groups()[0]))
            return photos
        except:
            return []

    def _extract_time(self, post):
        try:
            time_elem = post.find('div.story_body_container > header > div:nth-child(2) > div > div > div:first-child > div > a',
                    first=True)
            time_text = time_elem.text
            return int(self._parse_datetime(time_text).replace(tzinfo=timezone.utc).timestamp())
        except:
            return None

    def _parse_datetime(self, time_text):
        print (time_text)
        """
        Q: How to convert time?
        Known formats:
            Today at {time}
            Yesterday at {time}
            {day} {month} at {time} (if year is current year)
            {day} {month} {year} at {time} (if year is in the past)
        """
        match = self._datetime_just_now_regex.search(time_text)
        if match:
            return datetime.now()

        match = self._datetime_today_regex.search(time_text)
        if match:
            cleaned_date = datetime.today()
            cleaned_time = datetime.strptime(time_text, self._post_timestamp_today_format).time()
            return datetime.combine(cleaned_date, cleaned_time)

        match = self._datetime_yesterday_regex.search(time_text)
        if match:
            cleaned_date = datetime.today() - timedelta(1)
            cleaned_time = datetime.strptime(time_text, self._post_timestamp_yesterday_format).time()
            return datetime.combine(cleaned_date, cleaned_time)

        match = self._datetime_hours_ago_regex.search(time_text)
        if match:
            hours_ago = int(time_text.split()[0])
            cleaned_datetime = datetime.now() - timedelta(hours=hours_ago)
            return cleaned_datetime

        match = self._datetime_minutes_ago_regex.search(time_text)
        if match:
            minutes_ago = int(time_text.split()[0])
            cleaned_datetime = datetime.now() - timedelta(minutes=minutes_ago)
            return cleaned_datetime

        # Format: {day} {month} at {time} or {day} {month} {year} at {time}
        try:
            return datetime.strptime(time_text, self._post_timestamp_no_year_format) \
                .replace(year=datetime.today().year)
        except:
            pass

        try:
            return datetime.strptime(time_text, self._post_timestamp_year_format)
        except:
            return None

    def _decode_css_url(self, url):
         url = re.sub(r'\\(..) ', r'\\x\g<1>', url)
         url, _ = codecs.unicode_escape_decode(url)
         return url




