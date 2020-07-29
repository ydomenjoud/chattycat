const Image = require("@11ty/eleventy-img");

const distDir = '../dist/';

module.exports = function(eleventyConfig) {

  // add plugin for remote image
  eleventyConfig.addNunjucksAsyncShortcode("remoteImage", async function(src, alt, options) {
    // returns Promise
    const defaultOptions = {
      outputDir: distDir + 'assets/img/',
      urlPath: "/assets/img/",
    }
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

