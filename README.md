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

## Can I play?

I made this for myself, and as a learning tool for others who want to use Grunt to help with their plugin development. But if you find it useful, and think you can improve it, send me a pull request! As of this writing, I'm only going to pull in changes if I find them personally useful (i.e. don't send me a pull request to reïntigrate LESS support, because I don't use LESS).