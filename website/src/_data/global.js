const https = require("https");
const fs = require("fs");

module.exports = async function () {
  let options = new URL("https://europe-west1-chattycat-site.cloudfunctions.net/getBooks");

  return new Promise((resolve, reject) => {
    https.get(options, res => {
      let data = "";
      res.on("data", d => data += d);
      res.on("end", () => {
        const books = JSON.parse(data);
        // copy books to dist for action on website without external requests
        fs.writeFileSync("../dist/books.json", data);
        console.log(`found ${books.length} books`);
        resolve({books})
      });
      res.on("error", error => reject(error));
    });
  });
};
