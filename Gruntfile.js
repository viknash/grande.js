module.exports = function (grunt) {

    grunt.initConfig({
        qunit: {
            options: {
                "--web-security": "no",
                coverage: {
                    src: ["js/grande.js"],
                    instrumentedFiles: "temp/",
                    htmlReport: "report/coverage",
                    coberturaReport: "report/"
                }
            },
            all: ["test/**.html"]
        },
        uglify: {
            all: {
                files: {
                    'dist/grande.min.js': ['js/grande.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/**/*.js', 'animate-config.json'],
                tasks: ['uglify', "qunit"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-qunit-istanbul");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    // @TODO: add lint hook here as well for eslint
    grunt.loadNpmTasks('grunt-travis-lint');
    grunt.registerTask("travis", ["travis-lint", "qunit"]);
};