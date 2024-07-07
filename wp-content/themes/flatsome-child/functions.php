<?php

define("WP_FLATSOME_ASSET_VERSION", time());

add_action( 'wp_footer', function () {
	wp_enqueue_script( 'custom-js', get_stylesheet_directory_uri() . '/assets/js/custom.js', [], WP_FLATSOME_ASSET_VERSION );
});

// Disable Comments on ALL post types
add_action('admin_init', function () {
    $types = get_post_types();
    foreach ($types as $type) {
        if(post_type_supports($type, 'comments')) {
            remove_post_type_support($type, 'comments');
            remove_post_type_support($type, 'trackbacks');
        }
    }
});

function disable_comments_status() {
    return false;
}
add_filter('comments_open', 'disable_comments_status', 20, 2);
add_filter('pings_open', 'disable_comments_status', 20, 2);

require __DIR__ . '/inc/webp.php';
require __DIR__ . '/inc/elements/all.php';
require __DIR__ . '/inc/shortcodes/all.php';
