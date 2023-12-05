// toutiaoController.js
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function fetchHTML(url, header) {
    const resopnse = await axios.get(url, header);
    return resopnse;
}

function extractInformation(html) {
    const $ = cheerio.load(html);
    const titles = $('h2.ContentItem-title').map((i, el) => $(el).text()).get();
    const content = $('div.RichContent-inner > .css-376mun > span.RichText').map((i, el) => $(el).text()).get();
    return { titles, content };
}

function writeToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (err) => {
        if (err) {
            console.error('Writing to file failed:', err);
        } else {
            console.log('Success writing to file:', filename);
        }
    })
}

module.exports = { fetchHTML, extractInformation, writeToFile };