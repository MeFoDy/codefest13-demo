const xml2js = require('xml2js');
const fetch = require('node-fetch');

module.exports = async function () {
    const parser = new xml2js.Parser();

    let xml = '';
    const response = await fetch('https://web-standards.ru/podcast/feed/');
    if (response.ok) {
        xml = await response.text();
    }

    const result = await parser.parseStringPromise(xml);

    return result;
};
