const RequestFactory = require('../RequestFactory');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const UW_TERM_URL = 'http://www.adm.uwaterloo.ca/infocour/CIR/SA/under.html';
const TERMS_PATH = './terms.json';
const TERM_LEGEND_SELECTOR = 'body > form';
const TERM_SUBJECT_SELECTOR = 'select[name=subject] option';

class TermService {
  _getTerms($) {
    const termLegends = $(TERM_LEGEND_SELECTOR)
      .contents()
      .filter((_, op) => op.type === 'text' && op.data.trim())
      .map((_, op) => op.data.trim())[0];
    const leftParen = termLegends.indexOf('(');
    const rightParen = termLegends.indexOf(')');
    const termSubstring = termLegends.substr(leftParen+1, rightParen-leftParen-1);
    return termSubstring.split(',')
      .map((term) => term.split('='))
      .map(([key, value]) => ({ key: key.trim(), value: value.trim() }));
  }

  _getSubjects($) {
    const subjects = [];
    $(TERM_SUBJECT_SELECTOR).each((_, op) => {
      subjects.push($(op).text().trim());
    });
    return subjects;
  }

  _collectTermJson($) {
    const terms = this._getTerms($);
    const subjects = this._getSubjects($);
    return ({ TERMS: terms, SUBJECTS: subjects });
  }

  _saveToLocalFs(json) {
    const filePath = path.join(__dirname, TERMS_PATH);
    const data = JSON.stringify(json);
    fs.writeFileSync(filePath, data);
  }

  updateTermJson() {
    return new Promise((resolve, reject) => {
      RequestFactory.get(UW_TERM_URL)
        .then(cheerio.load)
        .then(this._collectTermJson)
        .then(this._saveToLocalFs)
        .then(resolve)
        .catch(reject);
    });
  }

  loadTermJson() {
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, TERMS_PATH);
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          return reject(err);
        }
        const { TERMS, SUBJECTS } = JSON.parse(data);
        return resolve({
          terms: TERMS,
          subjects: SUBJECTS
        });
      });
    });
  }
}

module.exports = new TermService();
