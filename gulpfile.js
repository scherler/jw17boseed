const gi = require('giti');
const fs = require('fs');
const gulp = require('gulp');
const copy = require('gulp-copy');

const base = 'src/main/';
const dir = base + 'webapp/';
const css = dir + 'css/';
const js = dir + 'js/';
const fonts = dir + 'fonts/';
// create a dummy revisionInfo so developmentFooter will not fail
const revisionInfo = '// Do not edit, it is generated and will be on each build.\nexport default {};';
gulp.task("default", ["paths", "giti", "targetCopy" ]);
gulp.task("paths", () => {
    // Paths definitions
    // Paths creations
    if (!fs.existsSync(base)){
        fs.mkdirSync(base);
    }
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    if (!fs.existsSync(css)){
        fs.mkdirSync(css);
    }
    if (!fs.existsSync(fonts)){
        fs.mkdirSync(fonts);
    }
    if (!fs.existsSync(js)){
        fs.mkdirSync(js);
    }
});
gulp.task("giti", () => {
    fs.writeFile(js + 'revisionInfo.js', revisionInfo, err => {
        if (err) throw err;
    });
    // revision info used in the development footer
    gi(function (err, result) {
        if (err) return console.log(err);
        result.timestamp = new Date().toISOString();
        const revisionInfo = '/* eslint-disable */\n// Do not edit, it is generated and will be on each build.\nexport default ' + JSON.stringify(result);
        fs.writeFile(js + 'revisionInfo.js', revisionInfo, err => {
            if (err) {
                return console.log(err);
            }
            console.log("The revision file was saved!\n");
        });
    });
});
gulp.task("targetCopy", () => {
    // copy stuff around
    gulp.src('node_modules/@jenkins-cd/design-language/dist/assets/css/jenkins-design-language.css')
        .pipe(gulp.dest(css));
    gulp.src('node_modules/@jenkins-cd/design-language/dist/assets/fonts/*.*')
        .pipe(gulp.dest(fonts));
});
