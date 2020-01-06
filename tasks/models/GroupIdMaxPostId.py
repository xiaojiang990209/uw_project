from mongoengine import *
from datetime import datetime

class GroupIdMaxPostId(Document):
    group_id: LongField(required=True)
    max_post_id: LongField(required=True)
    updated_at: DateTimeField(default=datetime.utcnow)

