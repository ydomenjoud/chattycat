"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Image = require("@11ty/eleventy-img");

var slugify = require("slugify");

var pluginSass = require("eleventy-plugin-sass");

var distDir = '../dist/';

module.exports = function (eleventyConfig) {
  //add "unique" filter (for age page)
  eleventyConfig.addNunjucksFilter("unique", function (array) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var arrayFiltered = array.filter(onlyUnique);
    return arrayFiltered;
  }); // add plugin for remote image

  eleventyConfig.addNunjucksAsyncShortcode("remoteImage", function _callee(src, alt, options) {
    var defaultOptions, stats, lowestSrc, sizes;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // returns Promise
            defaultOptions = {
              outputDir: distDir + 'assets/img/',
              urlPath: "/assets/img/"
            };
            options = _objectSpread({}, defaultOptions, {}, options);
            _context.next = 4;
            return regeneratorRuntime.awrap(Image(src, options));

          case 4:
            stats = _context.sent;
            lowestSrc = stats.jpeg[0];
            sizes = "100vw"; // Make sure you customize this!
            // Iterate over formats and widths

            return _context.abrupt("return", "<picture>\n      ".concat(Object.values(stats).map(function (imageFormat) {
              return "  <source type=\"image/".concat(imageFormat[0].format, "\" srcset=\"").concat(imageFormat.map(function (entry) {
                return "".concat(entry.url, " ").concat(entry.width, "w");
              }).join(", "), "\" sizes=\"").concat(sizes, "\">");
            }).join("\n"), "\n        <img\n          alt=\"").concat(alt, "\"\n          src=\"").concat(lowestSrc.url, "\"\n          width=\"").concat(lowestSrc.width, "\"\n          height=\"").concat(lowestSrc.height, "\">\n      </picture>"));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  }); // replace default slug with better imp

  eleventyConfig.addFilter("slug", function (input) {
    var options = {
      replacement: "-",
      remove: /[&,+()$~%.'":*?<>{}]/g,
      lower: true
    };
    return slugify(input, options);
  }); // add sass plugin

  eleventyConfig.addPlugin(pluginSass); // copy assets

  eleventyConfig.addPassthroughCopy("assets");
  return {
    dir: {
      output: distDir,
      input: "src"
    },
    templateFormats: ["njk"]
  };
};