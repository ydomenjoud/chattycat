const https = require("https");
const fs = require("fs");

const distDir = '../dist/';

const jsonToData = (books) => {
    //get 5 main books
    let mainBooks = books.filter(b => b.titre_phare);

    //get last 5 published books
    let newBooks = [...books];
    newBooks = newBooks.sort((a, b) => ((a.date || {})._seconds - (b.date || {})._seconds < 0) ? 1 : -1).slice(0, 5);

    console.log(`found ${books.length} books (${newBooks.length} new , ${mainBooks.length} phares)`);
    return {
        books,
        mainBooks,
        newBooks
    };
}


function getJSON(type, resolver = data => data){
    let options = new URL("https://europe-west1-chattycat-site.cloudfunctions.net/" + type);
    return new Promise((resolve, reject) => {
        https.get(options, res => {
            let data = "";
            res.on("data", d => data += d);
            res.on("end", () => {
                const entities = JSON.parse(data);
                // copy books to dist for action on website without external requests
                if (!fs.existsSync(distDir)) {
                    fs.mkdirSync(distDir);
                }
                fs.writeFileSync(distDir + type + ".json", data);

                resolve(resolver(entities));
            });
            res.on("error", error => reject(error));
        });
    });
}


module.exports = async function () {
    return Promise.all([
        getJSON('books', jsonToData),
        getJSON('authors', data => ({authors: data})),
        getJSON('collections', data => ({series: data}))
    ]).then(([books, authors, series]) => {
        return {...books, ...authors, ...series};
    })
};
