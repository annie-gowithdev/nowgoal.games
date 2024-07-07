<?php

function user_login($request)
{
    $params = $request->get_params();

// Verify input data format
    validate_credentials($params);
// Verify captcha
    $captcha = isset($params['g-recaptcha-response']) ? $params['g-recaptcha-response'] : null;
    if (empty($captcha)) {
        return new WP_Error('captcha', __('Chưa điền CAPTCHA!'), array('status' => 403));
    }
    $res = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . WP_CAPTCHA_SECRET_KEY . "&response=" . $captcha . "&remoteip=" . $_SERVER['REMOTE_ADDR']));
    if ($res->success !== true) {
        return new WP_Error('captcha', __('Lỗi khi xác nhận CAPTCHA!!!'), array('status' => 403));
    }
    $aff_id = $params['aff_id'] ?? 'sky88';
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://bodergatez.dsrcgoms.net/user/login.aspx', // Change url from api request header url
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{
    "username": "' . $params['username'] . '",
    "password": "' . $params['password'] . '",
    "app_id": "bc114103",
    "os": "OS X",
    "device": "Computer",
    "browser": "chrome",
    "fg": "5b1a36ad91ed8b2265237682f2aa783d",
    "aff_id": "'.$aff_id.'"
}',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
        ),
    ));

    $response = curl_exec($curl);
    curl_close($curl);

    $resObj = json_decode($response);
    if ($resObj->code == 200) {
        return $resObj;
    }
    return new WP_Error($resObj->status, __($resObj->message), array('status' => 403));
}
