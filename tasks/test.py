import util.DB as DB
from model.CarpoolGroupPost import CarpoolGroupPost
from lib.scraper.pipeline.FBGroupPostCleaner import FBGroupPostCleaner

DB.initialize_connection()
contents = [post.content for post in CarpoolGroupPost.objects()[:5]]

cleaner = FBGroupPostCleaner()
cleaned = []
train_data = []
for content in contents:
  content = cleaner._clean_content(content)
  print (content)
  label = ''
  data = {"entities": []}
  while True:
    label = input()
    if label == 'q':
      break
    s, tag = label.split(',')
    start_idx = content.find(s)
    end_idx = start_idx + len(s)
    data['entities'].append((start_idx, end_idx, 'SRC' if tag == 's' else 'DEST'))
  train_data.append((content, data))

print(train_data)
