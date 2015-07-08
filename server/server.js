"use strict";

var url = require("url");
var fs = require("fs");
var path=require("path");

var browserSync = require('browser-sync');
var app = require('koa')();

const ROOT = ".";
const DEFAULT_FILE = "index.html";
const SLASH = "/";
const POINT = ".";
 
var simulateApiRouter = require('./simulateApiRouter/simulateApiRouter.js');

app.use(simulateApiRouter);

app.use(function *(next){
    var start = new Date();

	yield next;

	var ms = new Date() - start;
	this.set('X-Response-Time', ms + 'ms');

});

app.use(function*(next) {
    var start = new Date();

    yield next;

    var ms = new Date() - start;
    // console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function*() {
	var that = this;
	if(this.method == "GET") {

		var pathname = ROOT + url.parse(this.url).pathname;
		if( this.url === SLASH ) {
			pathname += DEFAULT_FILE;
		}
		console.log(pathname);
		try{
			var fstat = yield (function (file) {
				return function (done) {
					fs.stat(file, done);
				};
			})(pathname);

			if (fstat.isFile()) {
				this.type = path.extname(pathname);
				this.body = fs.createReadStream(pathname);
			}
		} catch (e) {
			if(e.code === "ENOENT") {
				this.state = 404;
				this.body = "Not found: " + pathname;
			} else {
				this.body = "Server error";
				this.state = 500;
			}
		}
	}
});

browserSync({
    server: "",
    open: false,
    ui: false,
    files: ["index.html", "build/*.js", "build/*.css"],
    middleware: app.callback()
});