const https = require("https");
const fs = require("fs");

const distDir = '../dist/';

module.exports = async function () {
    let options = new URL("https://europe-west1-chattycat-site.cloudfunctions.net/getBooks");

    const jsonToData = (books) => {
        //get 5 main books
        let mainBooks = books.slice(0, 5);

        //get last 5 published books
        let newBooks = [...books];
        newBooks = newBooks.sort((a, b) => ((a.date || {})._seconds - (b.date || {})._seconds < 0) ? 1 : -1).slice(0, 5);

        console.log(`found ${books.length} books, including ${newBooks.length} novelties`);
        return {
            books,
            mainBooks,
            newBooks
        };
    }

    /** @TODO create admin to manage edition **/
    return new Promise((resolve, reject) => {
        resolve(jsonToData(JSON.parse(fs.readFileSync('src/_data/books.json', 'UTF8'))));
        // https.get(options, res => {
        //     let data = "";
        //     res.on("data", d => data += d);
        //     res.on("end", () => {
        //         const books = JSON.parse(data);
        //         // copy books to dist for action on website without external requests
        //         if (!fs.existsSync(distDir)) {
        //             fs.mkdirSync(distDir);
        //         }
        //         fs.writeFileSync(distDir + "books.json", data);
        //
        //         resolve(jsonToData(books));
        //     });
        //     res.on("error", error => reject(error));
        // });
    });
};
