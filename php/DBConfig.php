<?php

	error_reporting(E_ALL);
	header("Content-Type:text/html;Charset=utf-8");

	//SAE MySql 常数
	//用 户 名 :  SAE_MYSQL_USER
	//密　　码 :  SAE_MYSQL_PASS
	//主库域名 :  SAE_MYSQL_HOST_M
	//从库域名 :  SAE_MYSQL_HOST_S
	//端　　口 :  SAE_MYSQL_PORT
	//数据库名 :  SAE_MYSQL_DB
  
	//数据库配置
	define('DB_HOST', SAE_MYSQL_HOST_M);
	define('DB_USER', SAE_MYSQL_USER);
	define('DB_PASSWORD', SAE_MYSQL_PASS);
	define('DB_NAME', SAE_MYSQL_DB);
	
	$_mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if (mysqli_connect_errno()) {
		echo '数据库连接出现了错误：'.mysqli_connect_error();
		exit();
	}	
	$_mysqli->set_charset('utf8');

	function getDB($_sql){
        global $_mysqli;
        $_res = $_mysqli->query($_sql);
        if($_res && $row = $_res->fetch_assoc()){
            return $row;
        }
        return null;
    }

	function setDB($_sql){
        global $_mysqli;
        $_res = $_mysqli->query($_sql);
		if(!$_mysqli->errno){
            return array(
                'affectedRows' => $_mysqli->affected_rows
            );
        }
        return array(
            'errno' => $_mysqli->errno,
            'error' => $_mysqli->error
        );
    }
	
	function getOpenId(){
        global $_mysqli;
        $token = isset($_SERVER['HTTP_TOKEN']) ? $_SERVER['HTTP_TOKEN'] : '';
    	$version = isset($_SERVER['HTTP_VERSION']) ? $_SERVER['HTTP_VERSION'] : '';
    	if(!$token || !$version){
        	echo json_encode(array(
            	'errno' => 1,
            	'error' => 'token or api version error'
        	));
        	exit();
    	}
        $_sql = "SELECT openId FROM wxsession WHERE token = '{$token}'";
        $_res = $_mysqli->query($_sql);
        if($_res && $row = $_res->fetch_assoc()){
            $openId = $row['openId'];
            return $openId;
        }
       	echo json_encode(array(
           	'errno' => 2,
           	'error' => 'get openId error'
       	));
      	exit();
    }

?>