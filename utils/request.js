const axios = require('axios');

async function fetchHTML(url, header) {
    const resopnse = await axios.get(url, header);
    return resopnse;
}

module.exports = { fetchHTML };
