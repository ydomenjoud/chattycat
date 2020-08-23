"use strict";

var selectors = [{
  "key": "author1",
  "id_selector": "author-select",
  'valueAll': "Tous"
}, {
  "key": "genre",
  "id_selector": "genre-select",
  'valueAll': "Tous"
}, {
  "key": "age",
  "id_selector": "age-select",
  'valueAll': "Tous"
}, {
  "key": "collection",
  "id_selector": "collection-select",
  'valueAll': "Toutes"
}]; //event listener

selectors.map(function (selector) {
  var document_selector = document.getElementById(selector['id_selector']);

  document_selector.onchange = function _callee(e) {
    var books, booksResults;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(fetchDatas());

          case 2:
            books = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(displayResults(books, selectors));

          case 5:
            booksResults = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(initCatalogue(booksResults, selectors));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  };
});

function init() {
  var books;
  return regeneratorRuntime.async(function init$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetchDatas());

        case 2:
          books = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(initCatalogue(books, selectors));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(displayResults(books, selectors));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}

init();