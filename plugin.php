<?php
/**
 * Plugin Name: Atelier Bourgeons Gutenber BLOKCS
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: blocks designed for atelier bourgeons web site !
 * Author: LeBourbon
 * Author URI:
 * Version: 1.0.0
 * License: GPL2+
 * License URI:
 *
 * @package ABGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
