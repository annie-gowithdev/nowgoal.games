<?php
if (!function_exists('getIpAdress')) {

    function getIpAdress()
    {
        $ipAddress = false;

        if (getenv('CF-CONNECTING-IP')) {
            $ipAddress = getenv('CF-CONNECTING-IP');
        } else if (getenv('HTTP_CLIENT_IP')) {
            $ipAddress = getenv('HTTP_CLIENT_IP');
        } else if (getenv('HTTP_X_FORWARDED_FOR')) {
            $ipAddress = getenv('HTTP_X_FORWARDED_FOR');
        } else if (getenv('HTTP_X_FORWARDED')) {
            $ipAddress = getenv('HTTP_X_FORWARDED');
        } else if (getenv('HTTP_FORWARDED_FOR')) {
            $ipAddress = getenv('HTTP_FORWARDED_FOR');
        } else if (getenv('HTTP_FORWARDED')) {
            $ipAddress = getenv('HTTP_FORWARDED');
        } else if (getenv('REMOTE_ADDR')) {
            $ipAddress = getenv('REMOTE_ADDR');
        }

        return $ipAddress;
    }
}

