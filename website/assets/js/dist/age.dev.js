"use strict";

var selectors = [{
  "key": "author1",
  "id_selector": "author-select",
  'valueAll': "Tous",
  "isArray": false
}, {
  "key": "themes",
  "id_selector": "themes-select",
  'valueAll': "Tous",
  "isArray": true
}, {
  "key": "genre",
  "id_selector": "genre-select",
  'valueAll': "Tous",
  "isArray": false
}, {
  "key": "collection",
  "id_selector": "collection-select",
  'valueAll': "Toutes",
  "isArray": false
}];

function booksFilterByAge(books, age) {
  console.log(books, age);
  return books.filter(function (book) {
    return book.age === age;
  });
} //event listener


selectors.map(function (selector) {
  var document_selector = document.getElementById(selector['id_selector']);

  document_selector.onchange = function _callee(e) {
    var books, age, booksFiltered, booksResults;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(fetchDatas());

          case 2:
            books = _context.sent;
            age = document.getElementById("age").classList[0];
            booksFiltered = booksFilterByAge(books, age);
            _context.next = 7;
            return regeneratorRuntime.awrap(displayResults(booksFiltered, selectors));

          case 7:
            booksResults = _context.sent;
            _context.next = 10;
            return regeneratorRuntime.awrap(initCatalogue(booksResults, selectors));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  };
});

function init() {
  var books, age, booksFiltered;
  return regeneratorRuntime.async(function init$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetchDatas());

        case 2:
          books = _context2.sent;
          age = document.getElementById("age").classList[0];
          booksFiltered = booksFilterByAge(books, age);
          _context2.next = 7;
          return regeneratorRuntime.awrap(initCatalogue(booksFiltered, selectors));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(displayResults(booksFiltered, selectors));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}

init();