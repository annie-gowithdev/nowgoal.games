<?php

if (!function_exists('validate_credentials')) {
    function validate_credentials($params)
    {
        $username = @$params['username'];
        $password = @$params['password'];
        // Validation rules
        $username_rules = [
            'required' => 'Vui lòng nhập tên đăng nhập',
            'minlength' => 'Tên đăng nhập từ 6 ký tự trở lên',
            'maxlength' => 'Tên đăng nhập tối đa 30 ký tự',
            'regex' => 'Tên đăng nhập không hợp lệ'
        ];

        $password_rules = [
            'required' => 'Vui lòng nhập mật khẩu',
            'minlength' => 'Mật khẩu tối thiểu 6 ký tự',
            'regex' => 'Mật khẩu không hợp lệ'
        ];

        // Check username validity
        if (empty($username)) {
            return new WP_Error('username', $username_rules['required'], array('status' => 403));
        } elseif (strlen($username) < 6) {
            return new WP_Error('username', $username_rules['minlength'], array('status' => 403));
        } elseif (strlen($username) > 30) {
            return new WP_Error('username', $username_rules['maxlength'], array('status' => 403));
        } elseif (!preg_match('/^[a-zA-Z0-9]+$/', $username)) {
            return new WP_Error('username', $username_rules['regex'], array('status' => 403));
        }

        // Check password validity
        if (empty($password)) {
            return new WP_Error('password', $password_rules['required'], array('status' => 403));
        } elseif (strlen($password) < 6) {
            return new WP_Error('password', $password_rules['minlength'], array('status' => 403));
        } elseif (!preg_match('/^[a-zA-Z0-9À-ỹ!@#$%^&*()]+$/', $password)) {
            return new WP_Error('password', $password_rules['regex'], array('status' => 403));
        }

        // Both username and password are valid
        return true;
    }
}
