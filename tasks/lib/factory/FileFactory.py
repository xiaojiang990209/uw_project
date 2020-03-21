import os
import json

class FileFactory:
  @staticmethod
  def _get_path(file_name):
    cwd = os.path.dirname(__file__)
    path = os.path.join(cwd, f'../../data/{file_name}')
    return path

  @staticmethod
  def get_json(file_name):
    path = FileFactory._get_path(file_name)
    with open(path) as f:
      data = json.load(f)
    return data

  @staticmethod
  def write_json(file_name, data):
    path = FileFactory._get_path(file_name)
    with open(path, 'w') as f:
      json.dump(data, f)
    