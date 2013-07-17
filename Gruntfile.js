module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: 'src/js/**/*.js'
    },
    
    concat: {
      js: {
        src: 'src/js/**/*.js',
        dest: 'public/js/<%= pkg.name %>.js'
      },
      css: {
        src: 'src/css/**/*.css',
        dest: 'public/css/<%= pkg.name %>.css'
      }
    },
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      js: {
        files: {
          'public/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    
    cssmin: {
      css: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */'
        },
        files: {
          'public/css/<%= pkg.name %>.min.css': 'public/css/<%= pkg.name %>.css'
        }
      }
    },
    
    watch: {
      files: ['<%= concat.js.files %>', '<%= concat.css.files %>'],
      tasks: ['concat', 'uglify', 'cssmin']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('dev', ['jshint', 'concat', 'uglify', 'cssmin', 'watch']);

};