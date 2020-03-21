from lib.factory.FileFactory import FileFactory
import util.DB as DB
from model.CarpoolGroupPost import CarpoolGroupPost
from lib.scraper.pipeline.FBGroupPostCleaner import FBGroupPostCleaner

DB.initialize_connection()
contents = [post.content for post in CarpoolGroupPost.objects()[:50]]

train_data = FileFactory.get_json('train_data.json')

cleaner = FBGroupPostCleaner()
invalid = []
train_data = []
for content in contents:
 content = cleaner._clean_content(content)
 print (content)
 label = ''
 data = {"entities": []}

 # Get src
 src = input()
 start_idx = content.find(src)
 while start_idx < 0:
   src = input('Incorrect, retry:')
   start_idx = content.find(src)
 end_idx = start_idx + len(src)
 if src:
   data['entities'].append((start_idx, end_idx, 'SRC'))

 # Get dest
 dest = input()
 start_idx = content.find(dest)
 while start_idx < 0:
   dest = input('Incorrect, retry:')
   start_idx = content.find(dest)
 end_idx = start_idx + len(dest)
 if dest:
   data['entities'].append((start_idx, end_idx, 'DEST'))

 if data['entities']:
   # Append to train_data
   train_data.append((content, data))
 else:
   invalid.append(content)

print(invalid)
FileFactory.write_json('train_data.json', train_data)
