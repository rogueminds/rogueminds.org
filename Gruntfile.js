module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-coffeelint');

  var userConfig = require( './build.config.js' );
  var taskConfig = {
    pkg: grunt.file.readJSON("package.json"),

    meta: {
      banner:
        '/**\n' +
        ' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n'
    },

    changelog: {
      options: {
        dest: 'CHANGELOG.md',
        template: 'changelog.tpl'
      }
    },

    bump: {
      options: {
        files: [
          "package.json",
          "bower.json"
        ],
        commit: true,
        commitMessage: 'grunt-bump: v%VERSION%',
        commitFiles: [
          "package.json",
          "bower.json"
        ],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version v%VERSION%',
        push: false,
        pushTo: 'origin'
      }
    },

    clean: [
      '<%= build_dir %>',
      '<%= compile_dir %>'
    ],

    copy: {
      build_js: {
        files: [
          {
            src: [ '<%= app_files.js %>' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      build_images: {
        files: [
          {
            src: [ '<%= app_files.images %>' ],
            dest: '<%= build_dir %>/images/',
            cwd: '.',
            expand: true,
            flatten: true
          }
        ]
      },
      build_vendorjs: {
        files: [
          {
            src: [ '<%= vendor_files.js %>' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      build_vendorcss: {
        files: [
          {
            src: [ '<%= vendor_files.css %>' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      compile_images: {
        files: [
          {
            src: [ '**' ],
            dest: '<%= compile_dir %>/images',
            cwd: '<%= build_dir %>/images',
            expand: true
          }
        ]
      }
    },

    concat: {
      build_css: {
        src: [
          '<%= build_dir %>/css/global.css',
          '<%= vendor_files.css %>'
        ],
        dest: '<%= build_dir %>/css/global.css'
      },
      compile_js: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          '<%= vendor_files.js %>',
          'module.prefix',
          '<%= build_dir %>/src/**/*.js',
          'module.suffix'
        ],
        dest: '<%= compile_dir %>/js/global-<%= pkg.version %>.js'
      },
      compile_css: {
        src: [
          '<%= build_dir %>/css/global-<%= pkg.version %>.css',
          '<%= vendor_files.css %>'
        ],
        dest: '<%= compile_dir %>/css/global-<%= pkg.version %>.css'
      }
    },

    coffee: {
      source: {
        options: {
          bare: true
        },
        expand: true,
        cwd: '.',
        src: [ '<%= app_files.coffee %>' ],
        dest: '<%= build_dir %>',
        ext: '.js'
      }
    },

    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    less: {
      build: {
        files: {
          '<%= build_dir %>/css/global.css': '<%= app_files.less %>'
        }
      },
      compile: {
        files: {
          '<%= build_dir %>/css/global-<%= pkg.version %>.css': '<%= app_files.less %>'
        },
        options: {
          cleancss: true,
          compress: true
        }
      }
    },

    jshint: {
      src: [
        '<%= app_files.js %>'
      ],
      gruntfile: [
        'Gruntfile.js'
      ],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true
      },
      globals: {}
    },

    coffeelint: {
      src: {
        files: {
          src: [ '<%= app_files.coffee %>' ]
        }
      }
    },

    index: {
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= build_dir %>/css/global.css',
          '<%= vendor_files.js %>',
          '<%= build_dir %>/src/**/*.js',
          '<%= vendor_files.css %>'
        ]
      },
      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= vendor_files.css %>',
          '<%= build_dir %>/css/global-<%= pkg.version %>.css'
        ]
      }
    },

    delta: {
      options: {
        livereload: true
      },
      coffeesrc: {
        files: [
          '<%= app_files.coffee %>'
        ],
        tasks: [ 'coffeelint:src', 'coffee:source', 'copy:build_js' ]
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: [ 'jshint:gruntfile' ],
        options: {
          livereload: false
        }
      },
      jssrc: {
        files: [
          '<%= app_files.js %>'
        ],
        tasks: [ 'jshint:src', 'copy:build_js' ]
      },
      less: {
        files: [ 'src/**/*.less' ],
        tasks: [ 'less:build' ]
      },
      html: {
        files: [ '<%= app_files.html %>' ],
        tasks: [ 'index:build' ]
      }
    }
  };

  grunt.initConfig(
    grunt.util._.extend(taskConfig, userConfig)
  );

  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', [
    'build', 'delta'
  ]);
  grunt.registerTask('default', [
    'build', 'compile'
  ]);
  grunt.registerTask('build', [
    'clean', 'coffeelint', 'coffee', 'less:build', 'concat:build_css',
    'copy:build_js', 'copy:build_images', 'copy:build_vendorjs', 'copy:build_vendorcss',
    'index:build'
  ]);
  grunt.registerTask('compile', [
    'less:compile', 'copy:compile_images', 'concat:compile_css', 'concat:compile_js', 'uglify', 'index:compile'
  ]);

  grunt.registerMultiTask('index', 'Process index.html template', function () {
    var dirRE = new RegExp('^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir')+')\/', 'g');
    var jsFiles = filterForJS(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });
    var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });

  function filterForJS( files ) {
    return files.filter(function (file) {
      return file.match(/\.js$/);
    });
  }

  function filterForCSS(files) {
    return files.filter(function (file) {
      return file.match(/\.css$/);
    });
  }
};
