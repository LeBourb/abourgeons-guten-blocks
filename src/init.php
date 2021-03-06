<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function abourgeons_cgb_block_assets() {
	// Styles.
	wp_enqueue_style(
		'abourgeons-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ) // Block style CSS.
		, array()
		, filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )//array( 'wp-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: filemtime — Gets file modification time.
	);

	wp_enqueue_style(
		'abourgeons-cgb-result-style-css', // Handle.
		plugins_url( 'dist/blocks.result.build.css', dirname( __FILE__ ) ) // Block style CSS.
		, array()
		, filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.result.build.css' )//array( 'wp-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: filemtime — Gets file modification time.
	);

	wp_enqueue_script(
		'abourgeons-cgb-result-build-js', // Handle.
		plugins_url( 'dist/result.build.js', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: filemtime — Gets file modification time.
	);

	//Dynamic rendering.
	require_once ('carousel/render.php');
	require_once ('template-18-fall/render.php');
	require_once ('two-images/render.php');
	require_once ('image-cover/render.php');
	require_once ('image-instagram/render.php');
	require_once ('product-cover/render.php');
	require_once ('products-grid/render.php');
	require_once ('post/render.php');
	require_once ('post-cover/render.php');
} // End function abourgeons_cgb_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'abourgeons_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function abourgeons_cgb_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'abourgeons-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' , 'wp-components' , 'wp-editor'), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'abourgeons-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: filemtime — Gets file modification time.
	);
} // End function abourgeons_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'abourgeons_cgb_editor_assets' );
