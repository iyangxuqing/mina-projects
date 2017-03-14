<?php

    include_once "../DBConfig.php";

    $smsUrl = 'http://v.juhe.cn/sms/send';
    $appKey = '3233b00c604f302027ce0af05e7586b5';

    $token = isset($_SERVER['HTTP_TOKEN']) ? $_SERVER['HTTP_TOKEN'] : '';
    $version = isset($_SERVER['HTTP_VERSION']) ? $_SERVER['HTTP_VERSION'] : '';
    if(!$token || !$version){
        echo json_encode(array(
            'errno' => 1,
            'error' => 'token or api version error'
        ));
        exit();
    }

    $mobile = isset($_REQUEST['mobile']) ? $_REQUEST['mobile'] : '';
    $code = isset($_REQUEST['code']) ? $_REQUEST['code'] : '';
    $tplId = isset($_REQUEST['tplId']) ? $_REQUEST['tplId'] : '';
    $tplVal = isset($_REQUEST['tplVal']) ? $_REQUEST['tplVal'] : '';

    /*
    $code为验证码数字，可以由前端指定，也可以由服务器随机生成。短信发送成功后返回该验证码。
    $tplVal为变量名和变量值对，当短信只有验证码一项，无其它变量时可以不使用。
    如果你的变量名或者变量值中带有#&=中的任意一个特殊符号，请先分别进行utf-8 urlencode编码后再传递。
    如：#code#=431515，整串值需要urlencode，比如正确结果为：%23code%23%3d431515。
    */

    $session = getSessionByToken($token);
    $openId = $session['openId'];
    $res = mobileCodeSend($mobile, $code, $tplId, $tplVal);
    if(isset($res['code'])){
        $code = $res['code'];
        $res = updateDB(array(
            'table' => 'user',
            'openId' => $openId,
            'mobile' => $mobile,
            'mobileVerified' => false,
            'smsCode' => $code,
            'smsCodeCreatedTime' => time()
        ));
        if(!isset($result['error'])){
            $result = array(
                'errno' => 0,
                'error' => ''
            );
            echo json_encode($result);
            exit();
        }
    }
    $result = array(
        'errno' => 1,
        'error' => 'mobile verify code send error'
    );
    echo json_encode($result);
    exit();
       
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function mobileCodeSend($mobile, $code, $tplId, $tplVal){
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
                    'errno' => $_result['error_code'],
                    'error' => $_result['reason']
                );
            }
        } else {
            return $result = array(
                'errno' => '-1',
                'error' => 'https_request error'
            );
        }
    }

    function getUserByOpenId($openId){
        global $_mysqli;
        $_sql = "SELECT openId, nickName, avatarUrl, mobile, gender, language, city, province, country, updateTime FROM user WHERE openId = '{$openId}'";
        $_res = $_mysqli->query($_sql);
        if($row = $_res->fetch_assoc()){
            return array(
                'openId' => $openId,
                'nickName' => $row['nickName'],
                'avatarUrl' => $row['avatarUrl'],
                'mobile' => $row['mobile'],
                'gender' => $row['gender'],
                'language' => $row['language'],
                'city' => $row['city'],
                'province' => $row['province'],
                'country' => $row['country'],
                'updateTime' => date("Y-m-d H:i:s", $row['updateTime'])
            );
        }
    }

    function getSessionByToken($token){
        global $_mysqli;
        $_sql = "SELECT openId, wxSessionKey, wxSessionKeyExpired, token FROM wxsession WHERE token = '{$token}'";
        $_res = $_mysqli->query($_sql);
        if($row = $_res->fetch_assoc()){
            $openId = $row['openId'];
            $wxSessionKey = $row['wxSessionKey'];
            $wxSessionKeyExpired = $row['wxSessionKeyExpired'];
            return array(
                'openId' => $openId,
                'wxSessionKey' => $wxSessionKey,
                'wxSessionKeyExpired' => $wxSessionKeyExpired
            );
        }
    }

    function updateDB($option){
        global $_mysqli;
        $_sql = '';
        $table = '';
        $indexKey = '';
        $indexValue = '';
        foreach($option as $key=>$value){
            if($key=='table') {
                $table = $value;
            } else if($indexKey==''){
                $indexKey = $key;
                $indexValue = $value;
            } else {
                $_sql = $_sql . "$key='{$value}',";
            }
        }
        $_sql = substr($_sql, 0, strlen($_sql)-1);
        $_sql = "UPDATE $table SET $_sql WHERE $indexKey='{$indexValue}'";
        $_res = $_mysqli->query($_sql);
        if($_mysqli->errno){
            return $result = array(
                'errno' => $_mysqli->errno,
                'error' => $_mysqli->error
            );
        } else {
            return $result = array(
                'affectedRows' => $_mysqli->affected_rows
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

?>