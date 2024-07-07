<?php
require_once 'getIpAdress.php';
require_once 'validate_credentials.php';
require_once 'rest-api-user-register.php';
require_once 'rest-api-user-login.php';

add_action('rest_api_init', function () {
    register_rest_route('wp/v2', '/user-register', array(
        'methods' => 'POST',
        'callback' => 'user_register',
    ));
    register_rest_route('wp/v2', '/user-login', array(
        'methods' => 'POST',
        'callback' => 'user_login',
    ));
});
add_action( 'wp_footer', function () {
	wp_enqueue_script( 'c-auth-js', get_stylesheet_directory_uri() . '/inc/shortcodes/auth/j-register.js', [], WP_FLATSOME_ASSET_VERSION );
});

add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'custom-css', get_stylesheet_directory_uri() . '/inc/shortcodes/auth/j-register.css', [], WP_FLATSOME_ASSET_VERSION );
}, 99);