"use strict";

var modRewrite = require("connect-modrewrite");

module.exports = function (grunt) {

    var base = grunt.option("base-dir") || "",
        env = grunt.option("env") || "development",
        protractorConf = grunt.option("ci") ?
                        "./tests/e2e/protractor.saucelabs.conf.js" :
                        "./tests/e2e/protractor.conf.js" ;

    grunt.initConfig({

        pkg: grunt.file.readJSON("./package.json"),

        bower: grunt.file.readJSON("./bower.json"),

        env: grunt.file.readJSON("./env.json")[env],

        config: {
            outputDir: "./dist/",
            applicationFiles: grunt.file.readJSON("./scripts.json").application,
            vendorFiles: grunt.file.readJSON("./scripts.json").vendor
        },

        connect: {
            options: {
                hostname: "0.0.0.0",
                port: 8000,
                base: base
            },
            server: {
                options: {
                    livereload: true,
                    middleware: function ( connect, options, middlewares ) {
                        var rules = (base === "dist") ?
                            [ "^/[^\.]*$ /index.html" ] :
                            [ "^/app/[^\.]*$ /app/index.html" ];
                        middlewares.unshift( modRewrite( rules ) );
                        return middlewares;
                    }
                }
            },
            servertest: {
                options: {
                    keepalive: false,
                    livereload: false,
                    base: "<%= config.outputDir %>",
                    middleware: function ( connect, options, middlewares ) {
                        var rules = [ "^/[^\.]*$ /index.html" ];
                        middlewares.unshift( modRewrite( rules ) );
                        return middlewares;
                    }
                }
            }
        },

        watch: {
            options: {
                nospawn: false,
                livereload: true
            },
            css: {
                files: [
                    "./app/index.html",

                    "./app/less/*.less",
                    "./app/less/**/*.less",
                    "./app/less/**/**/*.less",

                    "./app/partials/*.html",
                    "./app/partials/**/*.html",
                    "./app/partials/**/**/*.html",

                    "./modules/*.html",
                    "./modules/**/*.html",
                    "./modules/**/**/*.html"
                ],
                tasks: ["less:development"]
            },
            javascript: {
                files: [
                    "./app/js/*.js",
                    "./app/js/**/*.js",
                    "./app/js/**/**/*.js",

                    "./tests/unit/*.js",
                    "./tests/unit/**/*.js",
                    "./tests/unit/**/**/*.js"
                ],
                tasks: ["test:development"]
            }
        },

        less: {
            options: {
                paths: ["./app/less/"],
                cleancss: false,
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
                    "<%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
            },
            development: {
                files: { "./app/css/all.css": "./app/less/main.less" },
                options: {
                    sourceMap: true,
                    sourceMapFilename: "app/css/all.css.map",
                    sourceMapURL: "all.css.map",
                    outputSourceFiles: true
                }
            },
            production: {
                files: { "<%= config.outputDir %><%= pkg.name %>.min.css": "app/less/main.less" },
                options: {
                    cleancss: true
                }
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            dist: {
                src: ["<%= config.applicationFiles %>"]
            }
        },

        jasmine: {
            options: {
                specs: ["./tests/unit/**/*.js"],
                keepRunner: true,
            },
            development: {
                src: [
                    "<%= ngconstant.options.dest %>",
                    "<%= config.applicationFiles %>"
                ],
                options: {
                    vendor: ["<%= config.vendorFiles %>"],
                    helpers:["./app/components/angular-mocks/angular-mocks.js"],
                    template: require("grunt-template-jasmine-istanbul"),
                    templateOptions: {
                        coverage: "./coverage/coverage.json",
                        report: [
                            {
                                type: "lcov",
                                options: {
                                    dir: "./coverage"
                                }
                            },
                            {
                                type: "text-summary"
                            }
                        ]
                    }
                }
            },
            production: {
                src: ["<%= config.outputDir %>js/app.min.js", "./app/components/angular-mocks/angular-mocks.js"]
            }
        },

        protractor: {
            options: {
                keepAlive: false,
                noColor: false
            },
            dist: {
                options: {
                    configFile: protractorConf
                }
            }
        },

        protractor_webdriver: {
            dist: {
                options: {
                    command: "webdriver-manager update && webdriver-manager start",
                }
            }
        },

        concat: {
            options: {
                sourceMap: true,
                separator: ";",
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
                    "<%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
            },
            production: {
                options: {
                    sourceMap: false,
                },
                src: [
                    "<%= config.applicationFiles %>"
                ],
                dest: "<%= config.outputDir %><%= pkg.name %>.js"
            }
        },

        uglify: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true,
                enclose: { window: "window" },
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
                    "<%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
            },
            production: {
                options: {
                    sourceMap: false
                },
                files: {
                    "<%= config.outputDir %><%= pkg.name %>.min.js": [ "<%= config.outputDir %><%= pkg.name %>.js" ]
                }
            }
        },

        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: "./app/img",
                    src: ["**/*", "!test/**"],
                    dest: "<%= config.outputDir %>img/"
                }]
            },
            partials: {
                files: [{
                    expand: true,
                    cwd: "./app/partials",
                    src: ["**/*.html", "*.html"],
                    dest: "<%= config.outputDir %>partials/"
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: "./app/fonts",
                    src: ["**/*", "*"],
                    dest: "<%= config.outputDir %>fonts/"
                }]
            },
            data: {
                files: [{
                    expand: true,
                    cwd: "./app/data",
                    src: ["**/*", "*"],
                    dest: "<%= config.outputDir %>data/"
                }]
            }
        },

        clean: {
            beforeBuild: {
                src: ["<%= config.outputDir %>", "./docs"]
            },
            afterTest: {
                src: ["<%= config.outputDir %>"]
            }
        },

        processhtml: {
            options: {
                strip: true,
                data: { url: "<%= env.BASE_URL %>" }
            },
            production: {
                files: { "<%= config.outputDir %>index.html": ["./app/index.html"] }
            },
            e2e: {
                files: { "<%= config.outputDir %>index.html": ["./app/index.html"] },
                options: {
                    data: { url: "http://127.0.0.1:8000/" }
                }
            }
        },

        yuidoc: {
            compile: {
                name: "<%= pkg.name %>",
                description: "<%= pkg.description %>",
                version: "<%= pkg.version %>",
                url: "<%= pkg.homepage %>",
                options: {
                    paths: "./app/js/",
                    themedir: "node_modules/yuidoc-bootstrap-theme",
                    helpers: ["node_modules/yuidoc-bootstrap-theme/helpers/helpers.js"],
                    outdir: "./docs/"
                }
            }
        },

        bump: {
            options: {
                files: ["./package.json", "./bower.json"],
                updateConfigs: ["pkg"],
                commit: true,
                commitFiles: ["-a"],
                createTag: true,
                push: true,
                pushTo: "origin master"
            }
        },

        ngconstant: {
            options: {
                name: "config",
                dest: "./app/js/config/config.js",
                constants: {
                    bower: "<%= bower %>",
                    pkg: "<%= pkg %>",
                    env: "<%= env %>"
                }
            },
            dist: {}
        }

    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-yuidoc");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-protractor-runner");
    grunt.loadNpmTasks("grunt-protractor-webdriver");
    grunt.loadNpmTasks("grunt-processhtml");
    grunt.loadNpmTasks("grunt-ng-constant");
    grunt.loadNpmTasks("grunt-bump");

    grunt.registerTask("build", [
        "clean:beforeBuild",
        "less:production",
        "minify"
    ]);

    grunt.registerTask("release", [
        "bump-only",
        "build",
        "bump-commit"
    ]);

    grunt.registerTask("minify", [
        "concat",
        "uglify"
    ]);

    grunt.registerTask("server", [
        "less:development",
        "ngconstant",
        "connect:server",
        "watch:css"
    ]);

    grunt.registerTask("serverjs", [
        "less:development",
        "ngconstant",
        "connect:server",
        "watch:javascript"
    ]);

    grunt.registerTask("serverall", [
        "less:development",
        "ngconstant",
        "connect:server",
        "watch"
    ]);

    grunt.registerTask("test", [
        "clean:beforeBuild",
        "ngconstant",
        "minify",
        "jshint",
        "jasmine:production",
        "clean:afterTest"
    ]);

    grunt.registerTask("test:development", [
        "ngconstant",
        "jshint",
        "jasmine:development"
    ]);

    grunt.registerTask("e2e", [
        "clean:beforeBuild",
        "less:production",
        "ngconstant",
        "minify",
        "copy",
        "processhtml:e2e",
        "connect:servertest",
        "protractor_webdriver",
        "protractor:dist",
        "clean:afterTest"
    ]);

    grunt.registerTask("default", ["build"]);

};
