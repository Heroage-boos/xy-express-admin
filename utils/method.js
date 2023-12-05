const fs = require('fs');

//写入本地文件
function writeToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (err) => {
        if (err) {
            console.error('Writing to file failed:', err);
        } else {
            console.log('Success writing to file:', filename);
        }
    })
}

module.exports = { writeToFile };