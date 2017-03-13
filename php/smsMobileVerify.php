<?php

header('content-type:text/html;charset=utf-8');

$smsUrl = 'http://v.juhe.cn/sms/send';
$appKey = '3233b00c604f302027ce0af05e7586b5';

$mobile = isset($_REQUEST['mobile']) ? $_REQUEST['mobile'] : '';
$code = isset($_REQUEST['code']) ? $_REQUEST['code'] : '';
$tplId = isset($_REQUEST['tplId']) ? $_REQUEST['tplId'] : '';
$tplVal = isset($_REQUEST['tplVal']) ? $_REQUEST['tplVal'] : '';

/*
$tplVal为变量名和变量值对，如：#code#=431515，整串值需要urlencode，比如正确结果为：%23code%23%3d431515。
如果你的变量名或者变量值中带有#&=中的任意一个特殊符号，请先分别进行utf-8 urlencode编码后再传递
*/

$result = smsMobileVerify($mobile, $code, $tplId, $tplVal);
echo json_encode($result);
exit();

function smsMobileVerify($mobile, $code, $tplId, $tplVal){
    Global $smsUrl, $appKey;
    if(!$code) $code = mt_rand(100000, 999999);
    if(!strpos($tplVal, '#code#')) $tplVal = "#code#=$code&$tplVal";
    $smsConf = array(
        'key'   => $appKey,
        'mobile'    => $mobile,
        'tpl_id'    => $tplId,
        'tpl_value' => $tplVal
    );

    $_result = https_request($smsUrl, $smsConf);
    if($_result){
        $_result = json_decode($_result, true);
        $error_code = $_result['error_code'];
        if($error_code == 0){
            return $result = array(
                'code' => $code,
                'sid' => $_result['result']['sid']
            );
        } else {
            return $result = array(
                'error_code' => $_result['error_code'],
                'error_msg' => $_result['reason']
            );
        }
    } else {
        return $result = array(
            'error_code' => '-1',
            'error_msg' => 'https_request error'
        );
    }
}

function https_request($url, $data=null){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    if(!empty($data)){
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($curl);
    curl_close($curl);
    return $output;
}