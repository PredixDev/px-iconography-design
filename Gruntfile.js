module.exports = function(grunt) {

  // Utility to load the different option files
  // based on their names
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {
        cwd: path
      })
      .forEach(function(option) {
        key = option.replace(/\.js$/, '');
        object[key] = require(path + option);
      });

    return object;
  }

  var path = require('path');

  var importOnce = require('node-sass-import-once');

  // Initial config
  var config = {

    pkg: grunt.file.readJSON('package.json'),

    clean: ['temp'],

    sass: {
      options: {
        importer: importOnce,
        importOnce: {
          index: true,
          bower: true
        }
      },
      /* Sass files destined to be Polymer style modules */
      iconography: {
        files: {
          'temp/css/noprefix/iconography-styles.css': 'iconography-styles.scss'
        }
      }
    },

    /* Modify CSS to include necessary vendor prefixes */
    autoprefixer: {
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'temp/css/noprefix/*.css',
        dest: 'temp/css/withprefix'
      }
    },

    /* Generate Polymer style modules using prefixed CSS */
    'polymer-css-compiler': {
      iconography: {
        files: {
          './iconography.html': [
            'temp/css/withprefix/iconography-styles.css'
          ]
        },
        options: {
          moduleId: function(file) {
            return path.basename(file.dest, '.html') + '-styles';
          }
        }
      }
    }

  };

  // Load tasks from the tasks folder
  grunt.loadTasks('tasks');

  // Load all the tasks options in tasks/options base on the name:
  // watch.js => watch{}
  grunt.util._.extend(config, loadConfig('./tasks/options/'));

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('polymer-css-compiler');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('stylemodule', ['sass', 'autoprefixer', 'polymer-css-compiler', 'clean']);

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['stylemodule', 'sassdoc']);



};
