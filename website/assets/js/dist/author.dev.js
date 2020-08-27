"use strict";

function booksFilterByAuthor(books, author) {
  return books.filter(function (book) {
    return book.author1 === author;
  });
}

function init() {
  var books, author, booksFiltered;
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetchDatas());

        case 2:
          books = _context.sent;
          author = document.getElementById("author_page").dataset.author;
          booksFiltered = booksFilterByAuthor(books, author);
          displayResults(booksFiltered);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

init();