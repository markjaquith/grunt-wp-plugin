# grunt-wp-plugin

> Create a WordPress plugin with [grunt-init][].

This is a customized version of 10up's [grunt-wp-plugin][10up-gh], created for the personal use of me, [Mark Jaquith][mark].

[mark]: http://markjaquith.com/
[10up-gh]: https://github.com/10up/grunt-wp-plugin/
[grunt-init]: http://gruntjs.com/project-scaffolding

I removed things I don't use (like SCSS, and LESS), and added things like:

* CoffeeScript
* CoffeeLint
* PHPUnit (with `grunt watch` support)
* Travis-CI
* Replacement of plugin version numbers from `package.json`
* WordPress.org plugins repo deployment
* Sass
* Compass
* Source maps (for CoffeeScript and Sass)
* Specification of minimum PHP and WordPress versions
* A basic plugin skeleton, using an updated `WP_Stack_Plugin2` class

## How do I install this?

```bash
npm install -g grunt-init
mkdir ~/.grunt-init
cd ~/.grunt-init
git clone https://github.com/markjaquith/grunt-wp-plugin.git wp-plugin
```

## How do I use this to generate a plugin?

```bash
mkdir /path/to/wp-content/plugins/your-plugin-slug
cd /path/to/wp-content/plugins/your-plugin-slug
grunt-init wp-plugin
```

Then follow the prompts. Be sure to give your plugin a unique class name. e.g. `MTJ_Social_Sharing_Mullet_Explosion`.

## How do I use this to develop my plugin?

First, make sure you have `grunt-cli` installed.

```bash
npm install -g grunt-cli
```

Then, install the local packages, from within your plugin's directory:

```bash
npm install
```

To process everything:

```bash
grunt
```

To watch for changed `.coffee`, `.sass`, and `.php` files (and perform the appropriate task):

```bash
grunt watch
```

To run PHPUnit tests:

```bash
grunt phpunit
```


To sync changes up to the WordPress.org SVN plugin repository:

```bash
grunt release
```

Or, if you want to stage the SVN directory, just do:

```bash
grunt release:prepare
```

## Notes

* Don't forget that the version numbers in your plugin are controlled by `package.json`. That's the main place to update it.

* If you have more than one Sass or CoffeeScript file, you'll have to add them to various places in `Gruntfile.coffee` (I want to refactor this to have just one array of files in the Gruntfile, so it's more DRY).

* Note the `assets` directory for WordPress.org-hosted plugin banners.

* PHPUnit support requires a globally available WordPress core install, and the following to be set: `export WP_TESTS_DIR=/path/to/wp/checkout/trunk/tests/phpunit/`

## Can I contribute?

I made this for myself, and as a learning tool for others who want to use Grunt to help with their plugin development. But if you find it useful, and think you can improve it, send me a pull request! As of this writing, I'm only going to pull in changes if I find them personally useful (i.e. don't send me a pull request to reïntigrate LESS support, because I don't use LESS).