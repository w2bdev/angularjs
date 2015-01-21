module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/app.module.js','app/app.routes.js','app/components/**/*.js'],
        dest: 'assets/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      js: {
        src: 'assets/js/<%= pkg.name %>.js',
        dest: 'assets/js/<%= pkg.name %>.min.js'
      }
    },
    watch: {
        grunt: {
            files: ['Gruntfile.js']
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat','uglify']);
};

