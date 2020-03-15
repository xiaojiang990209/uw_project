const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { UW_TERM_URL } = require('./constants');
const RequestFactory = require('../lib/services/RequestFactory');

const TERMS_PATH = '../data/terms.json';

const updateTermJson = () => new Promise((resolve, reject) => {
  RequestFactory.get(UW_TERM_URL)
    .then(cheerio.load)
    .then(collectTermJson)
    .then(saveToFs)
    .then(resolve)
    .catch(reject);
})

const collectTermJson = ($) => {
  const termLegends = $('body > form')
    .contents()
    .filter((i, op) => op.type === 'text' && op.data.trim())
    .map((i, op) => op.data.trim())[0];
  const terms = parseSessionMap(termLegends);

  const subjects = [];
  $('select[name=subject] option').each((i, op) => { subjects.push($(op).text().trim()); });

  return { TERMS: terms, SUBJECTS: subjects }
}

const parseSessionMap = (termLegends) => {
  const l = termLegends.indexOf('(');
  const r = termLegends.indexOf(')');
  termLegends = termLegends.substr(l+1, r-l-1);
  return termLegends.split(',')
    .map((term) => term.split('='))
    .map(([key, value]) => ({ key: key.trim(), value: value.trim() }));
}

const saveToFs = (json) => {
  fs.writeFileSync(path.join(__dirname, TERMS_PATH), JSON.stringify(json));
}

const loadTermJson = () => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, TERMS_PATH), 'utf-8', (err, data) => {
    if (err) return reject(err);
    data = JSON.parse(data);
    resolve({ terms: data.TERMS, subjects: data.SUBJECTS });
  });
});

module.exports = {
  updateTermJson,
  loadTermJson
}