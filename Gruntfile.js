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
                src: ['app/**/*.js'],
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
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.appPath %>',
                    dest: '<%= pkg.distPath %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'views/{,*/}*.html',
                        'images/{,*/}*.{webp}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            },
            index: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.appPath %>',
                    dest: '',
                    src: [
                        'index.html',
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= pkg.appPath %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },


        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.distPath %>',
                    src: ['*.html', 'app/views/{,*/}*.html'],
                    dest: '<%= pkg.distPath %>'
                }]
            }
        },


        wiredep: {
            app: {
                src: ['index.html'],
                ignorePath:  /\.\.\//
            }
        },

        useminPrepare: {
            html: 'index.html',
            options: {
                dest: '<%= pkg.distPath %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        usemin: {
            html: ['<%= pkg.distPath %>/{,*/}*.html'],
            css: ['<%= pkg.distPath %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: [
                    '<%= pkg.distPath %>',
                    '<%= pkg.distPath %>/images',
                    '<%= pkg.distPath %>/styles'
                ]
            }
        },



    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('bower', [
        'copy:index',
        "wiredep",
        "useminPrepare",
        'copy:dist',
        'copy:styles',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('build', ['bower', 'browserify', 'uglify', 'less:build']);

    grunt.registerTask('dev_js', ['jshint', 'browserify']);
    grunt.registerTask('dev_css', ['jshint', 'less:development']);

    grunt.registerTask('dev', ['bower', 'dev_js', 'dev_css', 'watch']);
};
