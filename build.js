var rimraf = require("rimraf");
var fs = require("fs");
const copydir = require("copy-dir");
var critical = require("critical");

rimraf.sync("docs");
fs.mkdirSync("docs");

copydir.sync("src", "docs");

critical
  .generate({
    // Inline the generated critical-path CSS
    // - true generates HTML
    // - false generates CSS
    inline: true,

    // Your base directory
    base: "docs/",

    // HTML source file
    src: "index.html",

    // Viewport width
    width: 1300,

    // Viewport height
    height: 900,

    // Target for final HTML output.
    // use some CSS file when the inline option is not set
    dest: "index.html",

    // Minify critical-path CSS when inlining
    minify: true,

    // Extract inlined styles from referenced stylesheets
    extract: true,

    // Complete Timeout for Operation
    timeout: 30000
  })
  .then(function(output) {
    fs.unlinkSync("docs/main.css");
  });
