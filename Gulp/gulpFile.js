// 1- import gulp 
const gulp = require('gulp');

//2- get src method 

const{src,dest,watch,parallel,series} = gulp

// to minify images 
//1-import gulp-imagemin after init it in devDepndency 
const imagemin= require('gulp-imagemin')
//-2- Create task method 
imgTask =function (){
    // get file by src
    return src('src/images/**/*')
    // minify files
    .pipe(imagemin())
    // return it in specific path
    .pipe(dest('dist/images'))
}

// minify html
const htmlmin = require('gulp-htmlmin');

htmlTask = function(){
    // to match any html file in src folder
    return src('src/*.html')
    // to minify html files
    .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
    .pipe(dest('dist'))
}


// minify js files
const concat = require('gulp-concat')
const terser = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')

jsTask = function(){
    return src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(terser())
    // .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'))

}

//minify css files
const cleanCss = require('gulp-clean-css');
cssTask = function(){
    return src('src/css/**/*.css')
    .pipe(cleanCss())
    .pipe(dest('dist/css'))
}

// minify sass
const minSass = require('gulp-sass')
sassTask = function(){
    return src(["src/sass/**/*.scss", "src/css/**/*.css"])
    // min sass files
    .pipe(minSass())
    // min css files
    .pipe(cleanCss())
    .pipe(concat('styleAll.min.css'))
    .pipe(dest('dist/cssAll'))
}

 watchTask = function (){
    // ,"src/js/**/*.js"
    // this.jsTask,
    // , "src/css/**/*.css"
     watch(["src/sass/**/*.scss","src/css/**/*.css","src/js/**/*.js"],{interval:1000},
     parallel(sassTask,jsTask));
 }

 exports.default= series(parallel(htmlTask,sassTask,jsTask,imgTask),watchTask)
// exports.default= htmlTask;
// exports.default= jsTask;











// to run gulp files init gulp cli by this command
// npm install --global gulp-cli
// to run use (gulp) of gulp then nameofMethod exported


