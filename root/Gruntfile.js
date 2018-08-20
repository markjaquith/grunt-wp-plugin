module.exports = (grunt) => {
	const ignores = [
		'!node_modules/**',
		'!release/**',
		'!assets/**',
		'!.git/**',
		'!.sass-cache/**',
		'!img/src/**',
		'!Gruntfile.*',
		'!package.json',
		'!.gitignore',
		'!.gitmodules',
		'!tests/**',
		'!bin/**',
		'!.travis.yml',
		'!phpunit.xml',
	];

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			default: {
				options: {
					style: 'expanded',
				},
				files: {
					'css/<%= pkg.name %>.css': 'sass/<%= pkg.name %>.sass',
				},
			},
		},

		postcss: {
			default: {
				src: 'css/*.css',
				options: {
					map: true,
					processors: [require('autoprefixer'), require('cssnano')],
				},
			},
		},

		phpunit: {
			default: {},
		},

		browserify: {
			options: {
				paths: ['../node_modules'],
				transform: [
					[
						'babelify',
						{
							presets: [
								[
									'env',
									{
										targets: {
											browsers: ['>0.25%'],
										},
									},
								],
							],
							plugins: [
								'add-module-exports',
								'transform-class-properties',
								'transform-object-rest-spread',
							],
						},
					],
					[
						'extensify',
						{
							extensions: ['jsx'],
						},
					],
					[
						'uglifyify',
						{
							global: true,
						},
					],
				],
				browserifyOptions: {
					debug: false,
				},
			},
			default: {
				files: {
					'js/<%= pkg.name %>.js': 'js/<%= pkg.name %>.jsx',
				},
			},
		},

		watch: {
			php: {
				files: ['**/*.php', ...ignores],
				tasks: ['phpunit'],
				options: {
					debounceDelay: 5000,
				},
			},
			sass: {
				files: ['sass/**/*.sass', ...ignores],
				tasks: ['sass', 'postcss'],
				options: {
					debounceDelay: 500,
				},
			},
			package: {
				files: ['package.json'],
				tasks: ['replace'],
			},
		},

		clean: {
			release: [
				'release/<%= pkg.version %>/',
				'release/svn/',
			],{% if (wporg_repo) { %}
			svn_readme_md: [
				'release/svn/readme.md',
			],{% } %}
		},

		notify_hooks: {
			options: {
				success: true,
			},
		},
{% if (wporg_repo) { %}

		wp_deploy: {
			default: {
				options: {
					plugin_slug: '<%= pkg.name %>',
					build_dir: 'release/svn/',
					assets_dir: 'assets/',
				}
			}
		},
{% } %}

		copy: {
			main: {
				src: ['**', ...ignores],
				dest: 'release/<%= pkg.version %>/',
			},{% if (wporg_repo) { %}
			svn: {
				cwd: 'release/<%= pkg.version %>/',
				expand: true,
				src: '**',
				dest: 'release/svn/',
			},{% } %}
		},

		replace: {
			header: {
				src: ['<%= pkg.name %>.php'],
				overwrite: true,
				replacements: [
					{
						from: /Version:(\s*?)[a-zA-Z0-9.-]+$/m,
						to: 'Version:$1<%= pkg.version %>',
					},
				],
			},
			plugin: {
				src: ['classes/plugin.php'],
				overwrite: true,
				replacements: [
					{
						from: /^(\s*?)const(\s+?)VERSION(\s*?)=(\s+?)'[^']+';/m,
						to: "$1const$2VERSION$3=$4'<%= pkg.version %>';",
					},
					{
						from: /^(\s*?)const(\s+?)CSS_JS_VERSION(\s*?)=(\s+?)'[^']+';/m,
						to: "$1const$2CSS_JS_VERSION$3=$4'<%= pkg.version %>';",
					},
				],
			},{% if (wporg_repo) { %}
			readme: {
				src: ['readme.md'],
				overwrite: true,
				replacements: [
					{
						from: /^Stable tag:\s*?[a-zA-Z0-9.-]+(\s*?)$/im,
						to: 'Stable tag: <%= pkg.version %>$1',
					},
				],
			},
			svn_readme: {
				src: ['release/svn/readme.md'],
				dest: 'release/svn/readme.txt',
				replacements: [
					{
						from: /^# (.*?)( #+)?$/gm,
						to: '=== $1 ===',
					},
					{
						from: /^## (.*?)( #+)?$/gm,
						to: '== $1 ==',
					},
					{
						from: /^### (.*?)( #+)?$/gm,
						to: '= $1 =',
					},
					{
						from: /^.*travis-ci.org.*$/im,
						to: '',
					},
					{
						from: /\n{3,}/gm,
						to: '\n\n',
					},
				],
			},{% } %}
		},

		prettier: {
			options: {
				singleQuote: true,
				useTabs: true,
				trailingComma: 'es5',
			},
			default: {
				src: ['js/**.jsx', 'Gruntfile.js'],
			},
		},
{% if (!wporg_repo) { %}

		compress: {
			default: {
				options: {
					mode: 'zip',
					archive: './release/<%= pkg.name %>.<%= pkg.version %>.zip',
				},
				expand: true,
				cwd: 'release/<%= pkg.version %>/',
				src: ['**/*'],
				dest: '<%= pkg.name %>/',
			},
		},{% } %}
	});

	require('load-grunt-tasks')(grunt);
	grunt.task.run('notify_hooks');

	// Default
	grunt.registerTask('default', [
		'replace:header',
		'replace:plugin',{% if (wporg_repo) { %}
		'replace:readme',{% } %}
		'prettier',
		'browserify',
		'sass',
		'postcss',
	]);


	// Develop
	grunt.registerTask('dev', ['default', 'watch']);

	// Build
	grunt.registerTask('build', [
		'default',
		'clean',
		'copy',{% if (wporg_repo) { %}
		'replace:svn_readme',
		'clean:svn_readme_md',{% } %}
	]);

	// Relase
	grunt.registerTask('release', [
		'build',{% if (wporg_repo) { %}
		'wp_deploy',{% } else { %}
		'compress',{% } %}
	]);

	grunt.util.linefeed = '\n';
};

