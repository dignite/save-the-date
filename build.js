var rimraf = require("rimraf");
var fs = require("fs");
const copyFileSync = require("fs-copy-file-sync");
var critical = require("critical");

rimraf.sync("dist");
fs.mkdirSync("dist");

copyFileSync("index.html", "dist/index.html");
copyFileSync("main.css", "dist/main.css");
copyFileSync("background.jpg", "dist/background.jpg");

critical
  .generate({
    // Inline the generated critical-path CSS
    // - true generates HTML
    // - false generates CSS
    inline: true,

    // Your base directory
    base: "dist/",

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
    fs.unlinkSync("dist/main.css");
  });
