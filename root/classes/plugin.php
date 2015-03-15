<?php
defined( 'WPINC' ) or die;

class {%= prefix %}_Plugin extends WP_Stack_Plugin2 {
	protected static $instance;

	/**
	 * Constructs the object, hooks in to 'plugins_loaded'
	 */
	protected function __construct() {
		$this->hook( 'plugins_loaded', 'add_hooks' );
	}

	/**
	 * Initializes the plugin object and returns its instance
	 *
	 * @param string $__FILE__ the main plugin file's __FILE__ value
	 * @return object the plugin object instance
	 */
	public static function start( $__FILE__ ) {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->__FILE__ == $__FILE__;
		}
		return self::$instance;
	}

	/**
	 * Returns the plugin's object instance
	 *
	 * @return object the plugin object instance
	 */
	public static function get_instance() {
		if ( isset( self::$instance ) ) {
			return self::$instance;
		}
	}

	public function add_hooks() {
		$this->hook( 'init' );
	}

	public function init() {
		$this->load_textdomain( '{%= prefix_dashed %}', '/languages' );
	}
}
