from mongoengine import *
from datetime import datetime

class CarpoolGroupPost(Document):

    post_id = LongField(required=True)
    post_url = URLField(required=True)
    title = StringField()
    price = StringField()
    content = StringField()
    photos = ListField(URLField())
    location = StringField()
    created_at = LongField()
    collected_at = LongField(default=lambda: datetime.utcnow().timestamp())

