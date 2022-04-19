<?php

define('verySecretKeyIzMySikretWeapon', true);

session_start(['cookie_lifetime' => 43200,'cookie_secure' => true,'cookie_httponly' => true]);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__.'/classes/Database.php';
require __DIR__.'/middlewares/Auth.php';

$allHeaders = getallheaders();
$db_connection = new Database();
$conn = $db_connection->dbConnection();
$auth = new Auth($conn,$allHeaders);

$returnData = [
    "success" => 0,
    "status" => 401,
    "message" => "Unauthorized"
];

if($auth->isAuth()){
    $returnData = $auth->isAuth();

  
$name = "RTID";
$value = $allHeaders["Authorization"];
$expire = time()+3600;
$path = "/";
$domain = "";
$secure = true;
$httponly = true;

setcookie(    $name, $value, $expire, $path, $domain, $secure, $httponly );

 
    

}



echo json_encode($returnData);