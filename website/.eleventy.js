const Image = require("@11ty/eleventy-img");
const slugify = require("slugify");
const pluginSass = require("eleventy-plugin-sass");

const distDir = '../dist/';

module.exports = function (eleventyConfig) {

    //add "unique" filter (for age page)
    eleventyConfig.addNunjucksFilter("unique", function (array) {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        const arrayFiltered = array.filter(onlyUnique);
        return arrayFiltered;
    });

    // add plugin for remote image
    eleventyConfig.addNunjucksAsyncShortcode("remoteImage", async function (src, alt, options) {

        if (!src) {
            return `
            <picture>
                <img src="/assets/img/no-picture.png" width="150" height="210" alt="no picture"/>
            </picture>
            `;
        }

        // returns Promise
        const defaultOptions = {
            outputDir: distDir + 'assets/img/',
            urlPath: "/assets/img/",
        };
        options = {...defaultOptions, ...options};
        let stats = await Image(src, options);
        let lowestSrc = stats.jpeg[0];
        let sizes = "100vw"; // Make sure you customize this!

        // Iterate over formats and widths
        return `<picture>
      ${Object.values(stats).map(imageFormat => {
            return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="${sizes}">`;
        }).join("\n")}
        <img
          alt="${alt}"
          src="${lowestSrc.url}"
          width="${lowestSrc.width}"
          height="${lowestSrc.height}">
      </picture>`;
    });

    // replace default slug with better imp
    eleventyConfig.addFilter("slug", (input) => {
        const options = {
            replacement: "-",
            remove: /[&,+()$~%.'":*?<>{}]/g,
            lower: true
        };
        return slugify(input, options);
    });

    // format firebase date
    eleventyConfig.addFilter('fdate', fdate => {
        const timestamp = fdate && fdate._seconds ? fdate._seconds : fdate;
        const date = new Date(timestamp * 1000);
        if (date) {
            const month = ('' + date.getMonth()).padStart(2, '0');
            const year = date.getFullYear();
            return month + ' / ' + year;
        } else {
            return '';
        }
    });

    // filter to select books
    eleventyConfig.addFilter("selectBooks", (books, type, value) => {
        let callback = b => b;
        switch (type) {
            case 'author':
                callback = b => (b.authors || []).indexOf(value) > -1 || b.author1 === value || b.author2 === value;
                break;
            case 'collection':
                callback = b => b.collection === value;
                break;
            case 'age':
                callback = b => b.age_cat === value;
                break;
        }

        return books.filter(callback);
    });

    // add sass plugin
    eleventyConfig.addPlugin(pluginSass);

    // copy assets
    eleventyConfig.addPassthroughCopy("assets");


    return {
        dir: {
            output: distDir,
            input: "src"
        },
        templateFormats: ["njk"]
    };

};

