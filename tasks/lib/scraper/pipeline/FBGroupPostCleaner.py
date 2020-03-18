from lib.factory.FileFactory import FileFactory
import re

class FBGroupPostCleaner:
  def process(self, post, group_id, acc_result):
    raw_content = acc_result['content']
    if not raw_content:
      return acc_result
    cleaned_content = self._clean_content(raw_content)
    if cleaned_content:
      return {
        **acc_result,
        'cleaned_content': cleaned_content
      }
    return acc_result

  def _clean_content(self, raw_content):
    cleaned_content = raw_content
    funcs = [self._remove_duplicate, self._expand_abbreviation]
    for func in funcs:
      cleaned_content = func(cleaned_content)
    return cleaned_content

  def _remove_duplicate(self, content):
    """
    Sometimes, we run into the issue of some content being duplicated twice,
    this is just to make sure this doesn't happen
    """
    n = len(content)
    if (content[:n//2] == content[n//2:]):
      content = content[:n//2]
    return content

  def _expand_abbreviation(self, content):
    """
    Expand the abbreviations wrt a set of rules in clean_rules.json
    """
    rules = FileFactory.get_json('clean_rules.json')
    if not rules:
      return content
    for rule in rules:
      content = re.sub(rule['pattern'], rule['replace'], content)
    return content
