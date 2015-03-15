module.exports = function( grunt ) {

	// Project configuration
	grunt.initConfig( {
		pkg:    grunt.file.readJSON( 'package.json' ),
		/*
		concat: {
			options: {
				stripBanners: true
			},
			{%= js_safe_name %}: {
				src: [
					'js/{%= js_safe_name %}.js'
				],
				dest: 'js/{%= js_safe_name %}.js'
			}
		},
		*/
		coffee: {
			compileWithMaps: {
				options: {
					sourceMap: true
				},
				files: {
					'js/{%= js_safe_name %}.js': 'js/{%= js_safe_name %}.coffee'
				}
			}
		},
		jshint: {
			all: [
				'Gruntfile.js'
			],
			options: {
				curly:   true,
				eqeqeq:  true,
				immed:   true,
				latedef: true,
				newcap:  true,
				noarg:   true,
				sub:     true,
				undef:   true,
				boss:    true,
				eqnull:  true,
				globals: {
					exports: true,
					module:  false
				}
			}		
		},
		uglify: {
			all: {
				files: {
					'js/{%= js_safe_name %}.min.js': ['js/{%= js_safe_name %}.js']
				},
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %> {%= author_name %}\n' +
						' * Licensed GPLv2+\n' +
						' */\n',
					sourceMap: true,
					sourceMapIn: 'js/{%= js_safe_name %}.js.map',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},
		sass: {
			all: {
				files: {
					'css/{%= js_safe_name %}.css': 'css/sass/{%= js_safe_name %}.sass'
				}
			}
		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %> {%= author_name %}\n' +
					' * Licensed GPLv2+\n' +
					' */\n'
			},
			minify: {
				expand: true,
				cwd: 'css/',
				src: ['{%= js_safe_name %}.css'],
				dest: 'css/',
				ext: '.min.css'
			}
		},
		watch:  {
			sass: {
				files: ['css/sass/*.sass'],
				tasks: ['sass', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			scripts: {
				files: ['js/**/*.coffee', 'js/vendor/**/*.js'],
				tasks: ['coffee', 'jshint', /*'concat',*/ 'uglify'],
				options: {
					debounceDelay: 500
				}
			}
		},
		clean: {
			main: ['release/<%= pkg.version %>']
		},
		copy: {
			// Copy the plugin to a versioned release directory
			main: {
				src:  [
					'**',
					'!node_modules/**',
					'!release/**',
					'!.git/**',
					'!.sass-cache/**',
					'!css/src/**',
					'!js/**/*.coffee',
					'!img/src/**',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!.gitmodules'
				],
				dest: 'release/<%= pkg.version %>/'
			}		
		},
		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './release/{%= js_safe_name %}.<%= pkg.version %>.zip'
				},
				expand: true,
				cwd: 'release/<%= pkg.version %>/',
				src: ['**/*'],
				dest: '{%= js_safe_name %}/'
			}		
		}
	} );
	
	// Load other tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );

	// Default task.
	grunt.registerTask( 'default', ['coffee', 'jshint', /*'concat',*/ 'uglify', 'sass', 'cssmin'] );

	grunt.registerTask( 'build', ['default', 'clean', 'copy', 'compress'] );

	grunt.util.linefeed = '\n';
};