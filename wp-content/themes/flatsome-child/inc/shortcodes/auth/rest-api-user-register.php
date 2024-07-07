<?php
function add_csrf_token_to_header()
{
    if (is_page(6)) {
        $csrf_token = is_user_logged_in() ? 'logged_in' : wp_create_nonce("csrf_token_action");
        echo '<meta name="csrf-token" content="' . esc_attr($csrf_token) . '">';
    }
}
add_action('wp_head', 'add_csrf_token_to_header');

function user_register($request)
{
    $params = $request->get_params();
// Verify input data format
    validate_credentials($params);

// Verify CSRF token
    $csrf_token = $request->get_header('X-CSRF-Token');
    $nonce_verified = $csrf_token == 'logged_in' ? true : wp_verify_nonce(@$csrf_token, 'csrf_token_action');
    if (!$nonce_verified) {
        return new WP_Error('invalid_csrf_token', __('Lỗi xảy ra trong quá trình xử lý hệ thống. Xin vui lòng thử lại!'), array('status' => 403));
    }
    $aff_id = $params['aff_id'] ?? 'soibet';
    $curl = curl_init();
    //$randomNumber = mt_rand(100000, 999999);
    $post_fields = '{
        "username": "' . $params['username'] . '",
        "password": "' . $params['password'] . '",
        "confirmPassword": "' . $params['password'] . '",
        "phone": "0909123456",
        "terms": true,
        "aff_id": "'.$aff_id.'",
        "source": "game",
        "utm_campaign": "googleads",
        "utm_source": "soibet",
        "utm_medium": "search",
        "utm_term": "",
        "utm_content": ""
    }';
	$url = 'https://soibet.net/api/v2/lp/register';
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => $post_fields,
        CURLOPT_HTTPHEADER => array(
            'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Content-Type: application/json',
            'x-forwarded-for: 149.34.254.61',
            'app-os: ios',
            'app-device: app'
        ),
    ));

    $response = curl_exec($curl);
	
	// var_dump($url, $post_fields, $response);
    curl_close($curl);
    $resObj = json_decode($response);
	
    if ($resObj->data->token) {
        return $resObj;
    }
    return new WP_Error($resObj->status_code, __($resObj->message), array('status' => 403));
}