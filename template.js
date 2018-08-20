/*
 * ================================================
 * grunt-wp-plugin
 * https://github.com/10up/grunt-wp-plugin
 *
 * Copyright (c) 2013 Eric Mann, 10up
 *
 * Licensed under the MIT License
 * ================================================
 * Subsequent modifications
 * https://github.com/markjaquith/grunt-wp-plugin
 *
 * Copyright (c) 2015 Mark Jaquith
 *
 * Licensed under the MIT License
 * ================================================
 */

// Basic template description
exports.description = "Create a WordPress plugin.";

// Template-specific notes to be displayed before question prompts.
exports.notes = "";

// Template-specific notes to be displayed after the question prompts.
exports.after = "";

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = "*";

// The init template
exports.template = (grunt, init, done) =>
	init.process(
		{},
		[
			init.prompt("title", "WP Plugin"),
			{
				name: "classPrefix",
				message: "PHP class name (_Plugin is appended)",
				default: "My_Awesome",
			},
			init.prompt("description", "A WordPress plugin"),
			init.prompt("homepage"),
			init.prompt("author_name"),
			init.prompt("author_email"),
			init.prompt("author_url"),
			{
				name: 'wporg_repo',
				message: 'WordPress.org Repo: Will this plugin be used in the WordPress.org repository? (y\\N)',
				default: 'n',
			},
			{
				name: "wporg_username",
				message: "WordPress.org username",
			},
			{
				name: "travis_username",
				message: "Travis-CI username",
				default(value, props, done) {
					done(null, props.wporg_username);
				},
			},
		],
		function(err, props) {
			props.wporg_repo = props.wporg_repo.toLowerCase === 'y';

			props.keywords = [];
			props.version = "0.1.0";
			props.private = true;
			props.prettier = {
				singleQuote: true,
				useTabs: true,
				trailingComma: "es5",
			};
			props.devDependencies = {
				autoprefixer: "^9.1.0",
				"babel-core": "^6.26.0",
				"babel-plugin-add-module-exports": "^0.2.1",
				"babel-plugin-transform-class-properties": "^6.24.1",
				"babel-plugin-transform-object-rest-spread": "^6.26.0",
				"babel-preset-env": "^1.6.1",
				"babel-preset-react": "^6.24.1",
				babelify: "^8.0.0",
				browserify: "^16.2.2",
				cssnano: "^4.0.5",
				extensify: "^1.0.3",
				grunt: "^1.0.3",
				"grunt-browserify": "^5.2.0",
				"grunt-cli": "^1.2.0",
				"grunt-contrib-clean": "~1.1.0",
				"grunt-contrib-copy": "~1.0.0",
				"grunt-contrib-sass": "^1.0.0",
				"grunt-contrib-watch": "~1.1.0",
				"grunt-notify": "^0.4.5",
				"grunt-phpunit": "~0.3.6",
				"grunt-postcss": "^0.9.0",
				"grunt-prettier": "^1.0.1",
				"grunt-text-replace": "~0.4.0",
				"load-grunt-tasks": "^4.0.0",
				npm: "^6.1.0",
				"uglify-js": "^3.4.0",
				uglifyify: "^5.0.0",
			};

			if (props.wporg_repo) {
				props.devDependencies["grunt-wp-deploy"] = "~1.0.3";
			} else {
				props.devDependencies["grunt-contrib-compress"] = "~1.4.3";
			}

			// Class name prefix (e.g. Awesome_Thing)
			props.classPrefix = props.classPrefix.replace(/\W+?/gi, "_");

			// Underscored lowercase prefix (e.g. awesome_thing)
			props.prefixUnderscored = props.classPrefix.toLowerCase();

			// Dashed lowercase prefix (e.g. awesome-thing)
			props.name = props.classPrefix.replace(/_/g, "-").toLowerCase();
			props.prefixDashed = props.name;

			// All caps prefix (e.g. AWESOME_THING)
			props.prefixUppercase = props.classPrefix.toUpperCase();

			// Files to copy and process
			const files = init.filesToCopy(props);

			// Actually copy and process files
			init.copyAndProcess(files, props);

			// Generate package.json file
			init.writePackageJSON("package.json", props);

			// Done!
			done();
		}
	);
