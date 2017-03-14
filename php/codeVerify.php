<?php

    include_once "../DBConfig.php";

    $code = isset($_REQUEST['code']) ? $_REQUEST['code'] : '';
    $mobile = isset($_REQUEST['mobile']) ? $_REQUEST['mobile'] : '';

	$openId = getOpenId();
	$user = getDB("SELECT smsCode, smsCodeCreatedTime FROM user WHERE openId='{$openId}'");
	if($user){
        $smsCode = $user['smsCode'];
        $smsCodeCreatedTime = $user['smsCodeCreatedTime'];
        if($code == $smsCode && $smsCodeCreatedTime > time() - 9000){
            $mobileVerified = true;
            $res = setDB("UPDATE user SET mobile='{$mobile}', mobileVerified='{$mobileVerified}' WHERE openId='{$openId}'");
            if(!isset($res['error'])){
                $result = array(
                    'mobile' => $mobile,
                    'mobileVerified' => 'true'
                );
                echo json_encode($result);
                exit();
            }
        }
    }
    $result = array(
        'errno' => 1,
        'error' => 'mobile verify error'
    );
    echo json_encode($result);
    exit();

?>