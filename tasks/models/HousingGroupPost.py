from mongoengine import *
from datetime import datetime

class HousingGroupPost(Document):
    post_id: LongField(required=True)
    post_url: URLField(required=True)
    title: StringField()
    price: StringField()
    content: StringField()
    photos: ListField(URLField())
    created_at: DateTimeField()
    collected_at: DateTimeField(default=datetime.utcnow)

