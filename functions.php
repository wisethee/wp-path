<?php
// Sets up theme defaults and registers support for various WordPress features.
if ( ! function_exists( 'path_support' ) ) :
  function path_support() {
    add_theme_support( 'wp-block-styles' );
    add_editor_style(get_template_directory_uri() . '/assets/css/editor.css');

    // Register nav menus.
    register_nav_menus(array(
      'primary' => __('Primary Navigation', ''),
      'footer' => __('Footer Navigation', ''),
    ));
  }
endif;
add_action('after_setup_theme', 'path_support');

// Add theme stylesheet.
if ( ! function_exists( 'path_styles' ) ) :
  function path_styles() {
    $theme_version = wp_get_theme()->get( 'Version' );
		$version_string = is_string( $theme_version ) ? $theme_version : false;

    wp_register_style(
      'path-style',
      get_template_directory_uri() . '/assets/css/main.css',
      array(),
			$version_string);

		wp_enqueue_style( 'path-style' );
  }
endif;
add_action( 'wp_enqueue_scripts', 'path_styles' );

// Add theme js.
if ( ! function_exists( 'path_scripts' ) ) :
  function path_scripts() {
    wp_enqueue_script('path-script', get_stylesheet_directory_uri().'/assets/js/index.js', array(), false, true);
  }
endif;
add_action( 'wp_enqueue_scripts', 'path_scripts' );

// InitBlock class
class InitBlock {
  function __construct($block_name) {
    $this->block_name = $block_name;
    add_action('init', [$this, 'mos_custom_block_init']);
  }
  function mos_custom_block_init() {
    register_block_type( __DIR__ . "/build/{$this->block_name}" );
  }
}

new InitBlock('button');