from mongoengine import *
from datetime import datetime, timedelta
from model.CarpoolGroupPost import CarpoolGroupPost
from model.HousingGroupPost import HousingGroupPost
from model.GroupIdMaxPostId import GroupIdMaxPostId
from util.FBPostType import FBPostType

# Default truncate data that are older than ~3 months
TRUNCATE_DATE = (datetime.utcnow() - timedelta(weeks=12)).timestamp()

class FBGroupRepository:

    def __init__(self, credentials):
        try:
            connect(**credentials)
            print ('DB Connected!')
        except:
            print ('Unable to connect')

    def test(self):
        return CarpoolGroupPost.objects()

    def save(self, group_id, data_type, results):
        """Save `results` to the appropriate collection."""
        max_post_id = self._get_max_post_id(group_id)

        results = [result for result in results if result['post_id'] > max_post_id]
        if not results:
            return

        results = sorted(results, key=lambda x: x['created_at'], reverse=True)

        max_post_id = max(results, key=lambda x: x['post_id'])['post_id']

        if data_type == FBPostType.CARPOOL:
            data = [CarpoolGroupPost(**result) for result in results]
            CarpoolGroupPost.objects.insert(data)
        elif data_type == FBPostType.HOUSING:
            data = [HousingGroupPost(**result) for result in results]
            HousingGroupPost.objects.insert(data)

        self._update_max_post_id(group_id, max_post_id)

    def truncate(self, date):
        """Truncate stale data from the collections."""
        CarpoolGroupPost.objects(Q(collected_at__lte=date)).delete()
        HousingGroupPost.objects(Q(collected_at__lte=date)).delete()

    def _get_max_post_id(self, group_id):
        res = GroupIdMaxPostId.objects(group_id=group_id).first()
        return res.max_post_id if res else 0

    def _update_max_post_id(self, group_id, max_post_id):
        record = GroupIdMaxPostId.objects(group_id=group_id).first()
        if not record:
            record = GroupIdMaxPostId(group_id=group_id, max_post_id=max_post_id)
        record.max_post_id = max(record.max_post_id, max_post_id)
        return record.save()


