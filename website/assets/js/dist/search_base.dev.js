"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function fetchDatas() {
  var response, books;
  return regeneratorRuntime.async(function fetchDatas$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("/books.json"));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          books = _context.sent;
          return _context.abrupt("return", books);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function initCatalogue(books, selectors) {
  return regeneratorRuntime.async(function initCatalogue$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          selectors.map(function (selector) {
            var data_filtered = []; //getting of value possible for selector

            if (selector['isArray']) {
              var allDatas = [];
              books.map(function (book) {
                allDatas = [].concat(_toConsumableArray(allDatas), _toConsumableArray(book[selector['key']].split(", ")));
              });
              data_filtered = allDatas.filter(onlyUnique);
            } else {
              data_filtered = books.map(function (book) {
                return book[selector['key']];
              }).filter(onlyUnique);
            }

            var document_selector = document.getElementById(selector['id_selector']);
            var selectedValue = document_selector.value;
            document_selector.innerHTML = "";
            var option = document.createElement('option');
            option.setAttribute('value', 'all');
            option.textContent = selector['valueAll'];
            document_selector.append(option);
            data_filtered.map(function (data) {
              var option = document.createElement('option');
              option.setAttribute('value', data);
              option.textContent = data;
              document_selector.append(option);
            });

            if (selectedValue) {
              document_selector.value = selectedValue;
            }
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function displayResults(books, selectors) {
  var filterResultsString, filter_results;
  return regeneratorRuntime.async(function displayResults$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          selectors.map(function (selector) {
            var document_selector = document.getElementById(selector['id_selector']);

            if (document_selector.value !== 'all') {
              if (selector['isArray']) {
                books = _toConsumableArray(books.filter(function (book) {
                  return book[selector['key']].includes(document_selector.value);
                }));
              } else {
                books = _toConsumableArray(books.filter(function (book) {
                  return book[selector['key']] === document_selector.value;
                }));
              }
            }
          });
          filterResultsString = "<ol>";
          books.map(function (book) {
            filterResultsString += "\n        <li><a href = \"books/".concat(book.slug, ".html\">\n            <div>\n                <img src=").concat(book.image, " alt=\"").concat(book.title, " cover\"/>\n            </div>\n            <p class=\"book_title\">").concat(book.title, "</p>\n        </a></li>");
          });
          filterResultsString += "</ol>";
          filter_results = document.getElementById("filter_results");
          filter_results.innerHTML = filterResultsString;
          return _context3.abrupt("return", books);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}