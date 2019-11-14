const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { UW_TERM_URL } = require('./constants');
const { requestWrapper } = require('./globalUtils');

const TERMS_PATH = '../data/terms.json';

const updateTermJson = () => new Promise((resolve, reject) => {
  requestWrapper('GET', UW_TERM_URL)
    .then(cheerio.load)
    .then(collectTermJson)
    .then(saveToFs)
    .then(resolve)
    .catch(reject);
})

const collectTermJson = ($) => {
  const terms = [];
  const subjects = [];
  $('select[name=sess] option').each((i, val) => { terms.push($(val).text().trim()); });
  $('select[name=subject] option').each((i, val) => { subjects.push($(val).text().trim()); });
  return { TERMS: terms, SUBJECTS: subjects }
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