module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: 'src/js/**/*.js',
      options: {

        // Global vars that can be used freely without definition in each file
        globals: {
          _:          true,
          $:          true,
          Handlebars: true,
          gila:       true,
          FastClick:  true,
          Backbone:   true,
          Marionette: true,
          App:        true
        },

        // Options
        eqeqeq:    true,     // Require !== and ===
        immed:     true,     // Make sure immediate function invocations are wrapped like (function(){...})()
        latedef:   true,     // Variables must be defined before they're used
        maxdepth:  2,        // Limit the amount of nesting within a block
        maxparams: 3,        // Limit number of function arguments
        newcap:    true,     // Constructor names must start with a capital letter
        noarg:     true,     // Prevent arguments.caller & arguments.callee
        quotmark:  'single', // Require single quotation marks
        trailing:  true,     // Prevent trailing whitespace
        undef:     true,     // Prohibit undefined variables
        unused:    'vars',   // Check for unused variables

        // Relaxing options
        sub:       true,     // Suppress warning about using person['name'] instead of person.name

        // Environments
        browser:   true,     // Define globals exposed by the browser (document, navigator, etc)
        devel:     true,     // Define dev globals exposed by the browser (console, alert, etc)
        jquery:    true      // Define globals exposed by jQuery
      }
    },

    less: {
      app: {
        files: {
          'public/css/<%= pkg.name %>.css': 'src/styles/app.less'
        }
      },
      admin: {
        files: {
          'public/css/<%= pkg.name %>-admin.css': 'src/styles/admin.less'
        }
      }
    },
    
    concat: {
      app: {
        src: ['src/js/src/**/*.js', 'src/js/app/**/*.js'],
        dest: 'public/js/<%= pkg.name %>.js'
      },
      admin: {
        src: ['src/js/src/**/*.js', 'src/js/admin/**/*.js'],
        dest: 'public/js/<%= pkg.name %>-admin.js'
      }
    },
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      app: {
        files: {
          'public/js/<%= pkg.name %>.min.js': ['<%= concat.app.dest %>']
        }
      },
      admin: {
        files: {
          'public/js/<%= pkg.name %>-admin.min.js': ['<%= concat.admin.dest %>']
        }
      }
    },
    
    cssmin: {
      css: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */'
        },
        files: {
          'public/css/<%= pkg.name %>.min.css': 'public/css/<%= pkg.name %>.css',
          'public/css/<%= pkg.name %>-admin.min.css': 'public/css/<%= pkg.name %>-admin.css'
        }
      }
    },
    
    watch: {
      app_js: {
        files: '<%= concat.app.src %>',
        tasks: ['concat:app', 'uglify:app']
      },
      admin_js: {
        files: '<%= concat.admin.src %>',
        tasks: ['concat:admin', 'uglify:admin']
      },
      css: {
        files: ['src/styles/**/*.less', 'src/styles/**/*.css'],
        tasks: ['less', 'cssmin']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less', 'cssmin']);
  grunt.registerTask('dev', ['jshint', 'concat', 'uglify', 'less', 'cssmin', 'watch']);

};