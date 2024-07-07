<?php 

function ux_j_register( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'title'     => 'ลงชื่อเข้าใช้',
		'user'     => 'ชื่อผู้ใช้',
		'pass'     => 'รหัสผ่าน',
		'id'     => '',
		'class'     => '',
	), $atts));

	if ( empty( $id ) ) {
		return '<div class="uxb-no-content uxb-image">Upload Image...</div>';
	}

	ob_start();
?>
	<div class="j-register <?php echo $class; ?>">
		<form id="registerForm" class="j-register-form" style="" action="" autocomplete="off" method="POST" novalidate="novalidate">
			<div class="j-register-title"><?php echo $title; ?></div>
			<div class="form-group">
				<input id="usrname" class="form-control" autocomplete="off" name="username" type="text" placeholder="<?php echo $user; ?>" />
				<span class="fa fa-user"></span>
			</div>
			<div class="form-group">
				<input id="pwd" class="form-control" autocomplete="off" name="password" type="password" placeholder="<?php echo $pass; ?>" />
				<span class="fa fa-lock"></span>
				<span class="show-pass fa fa-eye"></span>
			</div>
			<div class="btn_form">
				<button class="btnsubmit m-auto" type="submit"><?php echo flatsome_get_image( $id, 'full' ); ?></button>
			</div>
			<input id="phone" class="form-control" autocomplete="off" name="phone" type="hidden" value="0909123456" />
		</form>
	</div>
	<?php
	$content = ob_get_contents();
	ob_end_clean();

	return $content;
}
add_shortcode( 'j-register', 'ux_j_register' );

add_action( 'wp_footer', function () {
	wp_enqueue_script('jquery-validate', 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.20.0/jquery.validate.min.js', array('jquery'), WP_FLATSOME_ASSET_VERSION);
});

require __DIR__ . '/auth/index.php';

?>