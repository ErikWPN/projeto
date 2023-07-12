const {parallel} = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const image = require('gulp-image')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

function tarefasCSS(callback) {

    gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css',
    './src/css/style.css',
    './vendor/owl/css/owl.css',
    './vendor/fontawesome/fontawesome.css',
    './vendor/jqueryUI/jquery-ui.min.css'])
        
        .pipe(concat('libs.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: 'min'})) // libs.min.css
        .pipe(gulp.dest('./dist/css'))
    

     return callback()
}

function tarefasJS(callback){

    gulp.src(['./node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './vendor/owl/js/owl.js',
    './vendor/jquerymask/jquery.mask.min.js',
    './vendor/jqueryUI/jquery-ui.min.js',
    './src/js/custom.js'])
    .pipe(babel({
        comments: false,
        presets: ['@babel/env']
    }))
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'})) // libs.min.js
        .pipe(gulp.dest('./dist/js'))

    return callback()
}

function tarefasImagem(){

    return gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}

function tarefasHTML(callback){

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))

    return callback()
}

gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process)
    gulp.watch('./src/**/*').on('change', reload)


})
function end(cb){
    console.log("tarefas concluídas")
    return cb()
}

const process = series ( tarefasHTML, tarefasJS, tarefasCSS )

exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem


exports.default = process