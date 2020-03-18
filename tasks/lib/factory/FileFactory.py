import os
import json

class FileFactory:
  @staticmethod
  def get_json(file_name):
    cwd = os.path.dirname(__file__)
    path = os.path.join(cwd, f'../../data/{file_name}')
    with open(path) as f:
      data = json.load(f)
    return data
    