const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { UW_TERM_URL } = require('./constants');
const { requestWrapper } = require('./globalUtils');

const TERMS_PATH = '../data/terms.json';

const updateTermJson = () => new Promise((resolve, reject) => {
    console.log(UW_TERM_URL);
  requestWrapper('GET', UW_TERM_URL)
    .then(cheerio.load)
    .then(collectTermJson)
    .then(saveToFs)
    .then(resolve)
    .catch(err => { console.log(err); reject(err); });
})

const collectTermJson = ($) => {
  console.log('fine collect')
  const terms = [];
  const subjects = [];
  $('select[name=sess] option').each((i, val) => { terms.push($(val).text().trim()); });
  $('select[name=subject] option').each((i, val) => { subjects.push($(val).text().trim()); });
  return { TERMS: terms, SUBJECTS: subjects }
}

const saveToFs = (json) => {
  console.log('fine save')
  fs.writeFileSync(path.join(__dirname, TERMS_PATH), JSON.stringify(json));
}

module.exports = {
    updateTermJson
}