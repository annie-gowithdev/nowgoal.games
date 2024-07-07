<?php
/**
 * Jen Register Shortcode
 *
 * 
 */

function j_register_builder_element(){
    add_ux_builder_shortcode( 'j-register', array(
        'name' => __( 'Register Form' ),
        'image' => '',
        'category' => __( 'Content' ),
        'info' => '{{ user }}',
    
        'options' => array(
            'title' => array(
                'type' => 'textfield',
                'heading' => __( 'Title' ),
                'default' => __( '' ),
                'auto_focus' => true,
            ),
            'user' => array(
                'type' => 'textfield',
                'heading' => __( 'User Placeholder' ),
                'default' => __( '' ),
                'auto_focus' => true,
            ),
            'pass' => array(
                'type' => 'textfield',
                'heading' => __( 'Pass Placeholder' ),
                'default' => __( '' ),
            ),
            'id' => array(
                'type' => 'image',
                'heading' => __('Image'),
                'default' => ''
            ),
            'class' => array(
                'type' => 'textfield',
                'heading' => 'Custom Class',
                'full_width' => true,
                'placeholder' => 'class-name',
                'default' => '',
            ),
        ),
    ) );
}
add_action('ux_builder_setup', 'j_register_builder_element');





