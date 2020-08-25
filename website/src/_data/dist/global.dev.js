"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var https = require("https");

var fs = require("fs");

var distDir = '../dist/';

module.exports = function _callee() {
  var options;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = new URL("https://europe-west1-chattycat-site.cloudfunctions.net/getBooks");
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            https.get(options, function (res) {
              var data = "";
              res.on("data", function (d) {
                return data += d;
              });
              res.on("end", function () {
                var books = JSON.parse(data); // copy books to dist for action on website without external requests

                if (!fs.existsSync(distDir)) {
                  fs.mkdirSync(distDir);
                }

                fs.writeFileSync(distDir + "books.json", data); //get 5 main books

                var mainBooks = books.slice(0, 5); //get last 5 published books

                var newBooks = _toConsumableArray(books);

                newBooks = newBooks.sort(function (a, b) {
                  return a.date._seconds - b.date._seconds < 0 ? 1 : -1;
                }).slice(0, 5);
                console.log("found ".concat(books.length, " books, including ").concat(newBooks.length, " novelties"));
                resolve({
                  books: books,
                  mainBooks: mainBooks,
                  newBooks: newBooks
                });
              });
              res.on("error", function (error) {
                return reject(error);
              });
            });
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};