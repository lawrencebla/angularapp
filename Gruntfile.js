'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            dist: {
                src: ['build/vendor.js'],
                dest: 'build/vendor.js'
            },
        },


        jshint: {
            options: {
                jshintrc: true
            },
            all: [
                'app/**/*.js'
            ]
        },
        browserify: {
            vendor: {
                src: ['app/app.js'],
                dest: 'build/vendor.js',
                options: {
                    transform: [
                        ["babelify", {
                            loose: "all"
                        }]
                    ],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },

        less: {
            development: {
                options: {
                    sourceMap: true,
                    sourceMapFileInline: true,
                    paths: ["app/less/less"]
                },
                files: {
                    "build/main.css": "app/less/main.less"
                }
            },
            build: {
                options: {
                    paths: ["app/less/less"]
                },
                files: {
                    "build/main.css": "app/less/main.less"
                }
            }
        },

        watch: {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['dev_js'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            css: {
                files: 'app/less/**/*.less',
                tasks: ['dev_css'],
                options :{
                    livereload: true
                }             
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['browserify', 'uglify', 'less:build']);

    grunt.registerTask('dev_js', ['jshint', 'browserify']);
    grunt.registerTask('dev_css', ['jshint', 'less:development']);

    grunt.registerTask('dev', ['dev_js', 'dev_css', 'watch']);
};
