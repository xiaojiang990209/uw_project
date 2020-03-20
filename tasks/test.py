# import spacy 
  
# nlp = spacy.load('en_core_web_sm') 
  
# sentence = "Driving Waterloo, ON to North York, ON tomorrow Saturday 1045am 11am"
  
# doc = nlp(sentence) 
  
# for ent in doc.ents: 
#   print(ent.text, ent.start_char, ent.end_char, ent.label_) 

# import requests
# import json
# import pandas as pd

# resp = requests.get('https://financialmodelingprep.com/api/v3/company/stock/list')

# data = resp.json()
# data = data['symbolsList']

# df = pd.DataFrame(data)

# df_good_companies = df[df['exchange'] == 'Nasdaq Global Select']

# print(df_good_companies)

# data = json.loads(resp.json())

# print(data['symbolsList'][:10])

# rules = json.

s = [
  "Driving From Cambridge/ Kitchener to Pearson Airport today Sat Mar 7 at 5 am morning. Please msg for spot.Driving From Cambridge/ Kitchener to Pearson Airport today Sat Mar 7 at 5 am morning. Please msg for spot.",
  "Driving BK to North York tomorrow (Sat) ~1045am-11am",
  "Ride Offer Today Sat March 7th Toronto to Loo 10am Loo to Toronto 11:45amRide Offer Today Sat March 7th Toronto to Loo 10am Loo to Toronto 11:45am",
  "Driving from DT Toronto to Kitchener-Waterloo , saturday Mar 7 around 3:30pm spots available Contact : dm or 5483331991",
  "Looking for a ride to downtown Toronto today before 3pm",
  "Driving from toronto to loo tonight at 7:30pm. Msg if interested. $20/spot",
  "Looking for a ride from Waterloo to Pearson airport for tomorrow Saturday around 1.30pm Ps- i have a suitcase",
  "Looking for a ride from Waterloo to Fairview/Fmp/Pmall after 1pm Saturday March 7th.",
  "Driving on March 7 (Sat) around 7 pm Waterloo (BK) to Richmond Hill / Markham Msg me if you need a ride",
  "Driving STC & Yorkdale -> Waterloo (BK) Friday March 6th @9pm $20",
  "Looking for 1 spot from Waterloo to North York/ Scarborough tonight after 8!",
  "Driving from Loo to YYZ/Sauga/DT at 1.30 pm (March 07th).. DM for details.Driving from Loo to YYZ/Sauga/DT at 1.30 pm (March 07th).. DM for details."
]

sss = [
  'Waterloo to Yorkdale/STC 3pm',
  'Driving Waterloo >>>>Toronto @10am',
  'driving from Union to bk today',
  'Need a ride from downtown Toronto to Waterloo before 2:30 pm please dm'
]

# n = len(s)
# if (s[:n//2] == s[n//2:]):
#   s = s[:n//2]
# print(s)

from lib.scraper.pipeline.FBGroupPostCleaner import FBGroupPostCleaner

cleaner = FBGroupPostCleaner()
cleaned = []
for ss in sss:
  cleaned_ss = cleaner._clean_content(ss)
  print(cleaned_ss)
  cleaned.append(cleaned_ss)




# Driving from toronto to loo tonight at 7:30pm. Msg if interested. $20/spot