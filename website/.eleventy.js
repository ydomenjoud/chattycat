const Image = require("@11ty/eleventy-img");
const slugify = require("slugify");
const pluginSass = require("eleventy-plugin-sass");

const distDir = '../dist/';

module.exports = function (eleventyConfig) {

    //add "unique" filter (for age page)
    eleventyConfig.addNunjucksFilter("unique", function(array) {
        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }
        const arrayFiltered = array.filter(onlyUnique)
        return arrayFiltered
    });

    // add plugin for remote image
    eleventyConfig.addNunjucksAsyncShortcode("remoteImage", async function (src, alt, options) {
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

