module.exports = function (grunt) {

  grunt.initConfig({
    qunit: {
      options: {
        "--web-security": "no",
        coverage: {
          src: ["js/grande.js"],
          instrumentedFiles: "temp/",
          htmlReport: "report/coverage",
          lcovReport: "report/"
        }
      },
      all: ["test/**.html"]
    },
    uglify: {
      options: {
        sourceMap: true
      },
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
      },
      tests: {
        files: ['css/*.css', '../animate.css/animate.min.css'],
        tasks: ['copy']
      }
    },
    copy: {
      css: {
        src: 'css/menu.css',
        dest: 'test/styles/lib/menu.css',
      },
      css2: {
        src: 'css/editor.css',
        dest: 'test/styles/lib/editor.css',
      },
      animate: {
        src: '../animate.css/animate.min.css',
        dest: 'test/styles/lib/animate.min.css',
      },
    }
  });

  grunt.loadNpmTasks("grunt-qunit-istanbul");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  // @TODO: add lint hook here as well for eslint
  grunt.loadNpmTasks('grunt-travis-lint');
  grunt.registerTask("default", ["uglify", "copy", "qunit"]);
  grunt.registerTask("travis", ["travis-lint", "default"]);
};