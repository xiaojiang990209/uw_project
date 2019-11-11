
const transformNewsResponse = (data) => {
  return data.map((val) => ({
    title: val.title,
    link: val.link
  }));
}

module.exports = {
  transformNewsResponse
};