const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const pathToNews = path.join(__dirname, '../../assets/data/news.json');

const getAllNews = () => readFile(pathToNews)
  .then((allNews) => JSON.parse(allNews))
  .catch((err) => console.log(`Read file error: ${err}`));

const getSpecificNews = (id) => getAllNews()
  .then((allNewsJson) => allNewsJson.find((news) => news.id === id));

const saveAllNews = (news) => writeFile(pathToNews, JSON.stringify(news));

const saveNews = (news) =>
  getAllNews().then((newsJson) => {
    const newId = newsJson[newsJson.length - 1].id + 1;
    // const newNews = Object.assign({}, news, { id: newId });
    const newNews = { ...news, id: newId };
    return saveAllNews(newsJson.concat(newNews));
  });


module.exports = { getAllNews, saveNews, getSpecificNews };
