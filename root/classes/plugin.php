<?php
/**
 * The main plugin class.
 */

defined( 'WPINC' ) or die;

class {%= classPrefix %}_Plugin {

	/**
	 * The class instance.
	 *
	 * @var {%= classPrefix %}_Plugin
	 */
	static $instance;

	/**
	 * The main plugin file path.
	 *
	 * @var string
	 */
	private $file;

	const CSS_JS_VERSION = '0.1.0';
	const VERSION        = '0.1.0';

	/**
	 * Class constructor. Adds init hook.
	 *
	 * @param string $file The main plugin file path.
	 */
	function __construct( $file ) {
		self::$instance       = $this;
		self::$instance->file = $file;
		$this->add_hooks();
	}

	/**
	 * Get the plugin instance.
	 *
	 * @return {%= classPrefix %}_Plugin The plugin class instance.
	 */
	public static function get_instance() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Add a WordPress hook (action/filter).
	 *
	 * @param mixed $hook first parameter is the name of the hook. If second or third parameters are included, they will be used as a priority (if an integer) or as a class method callback name (if a string).
	 */
	public function hook( $hook ) {
		$priority = 10;
		$method   = self::sanitize_method( $hook );
		$args     = func_get_args();
		unset( $args[0] );
		foreach ( (array) $args as $arg ) {
			if ( is_int( $arg ) ) {
				$priority = $arg;
			} else {
				$method = $arg;
			}
		}

		return add_action( $hook, [ $this, $method ], $priority, 999 );
	}

	/**
	 * Sanitizes method names with bad characters.
	 *
	 * @param string $method The raw method name.
	 * @return string The sanitized method name.
	 */
	private static function sanitize_method( $method ) {
		return str_replace( [ '.', '-' ], [ '_DOT_', '_DASH_' ], $method );
	}

	/**
	 * Includes a file (relative to the plugin base path)
	 * and optionally globalizes a named array passed in.
	 *
	 * @param string $file The file to include.
	 * @param array  $data A named array of data to globalize.
	 */
	public function include_file( $file, $data = [] ) {
		extract( $data, EXTR_SKIP );
		include( $this->get_path() . $file );
	}

	/**
	 * Adds hooks.
	 */
	public function add_hooks() {
		$this->hook( 'init' );
		// Add your hooks here
	}

	/**
	 * Initializes the plugin, registers textdomain, etc.
	 */
	public function init() {
		$this->load_textdomain( '{%= prefixDashed %}', '/languages' );
	}
}
