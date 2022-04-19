<?php

// session_start(['cookie_lifetime' => 43200,'cookie_secure' => true,'cookie_httponly' => true]);
define('verySecretKeyIzMySikretWeapon', true);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
if (isset($data->postData->email)){


function msg($success,$status,$message,$error, $extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message,
        'ErrorType' => $error
    ],$extra);
}

require __DIR__.'/classes/Database.php';
require __DIR__.'/classes/JwtHandler.php';

$db_connection = new Database();
$conn = $db_connection->dbConnection();

$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT EQUAL TO POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Sivua ei Löydy!', 11);

// // CHECKING EMPTY FIELDS
// elseif(!isset($data->postData->email) 
//     || !isset($data->postData->password)
//     || empty(trim($data->postData->email))
//     || empty(trim($data->postData->password))
//     ):

//     $fields = ['fields' => ['email','password']];
//     $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    if (isset($data->postData->email)){
        $email = trim($data->postData->email);

    } else {
        $email = null;
    }
    if (isset($data->postData->password)){
        $str = trim($data->postData->password);

    } else {
        $str = "";
    }

    // if(!filter_var($email, FILTER_VALIDATE_EMAIL)):
    //     $returnData = msg(0,422,'Virheellinen Sähköposti!',22);
    
    if(strlen($str) < 8):
        $returnData = msg(0,422,'Salasanan pitää olla vähintään 8 merkkiä pitkä!',33);

    else:
        try{
            // $hihi = md5($str);
            // $password = hash("sha512",$hihi."hdJxk'aspjk8alpuqDtm/e'dz2sdt5e'cixphvhkfs'Goisuö+0jkwqlGVhölxFöG'afD");
           
            $password = $data->postData->password;
        
            $fetch_user_by_email = "SELECT * FROM `user` WHERE `username`=:email";
            $query_stmt = $conn->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $query_stmt->execute();

  

            if($query_stmt->rowCount()):
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $pass = $password;
                $rpass = $row['password'];
                

                if ($pass == $rpass) {
                    $check_password = true;
                }
            

                if($check_password):
           
                    $jwt = new JwtHandler();
                       $token = $jwt->_jwt_encode_data(
                        'http://duunihakuri.fi/api/ware/success',
                        array("user_id"=> $row['id'])
                    );
                    
                    $returnData = [
                        'success' => 1,
                        'message' => 'Valmis',
                        'token' => $token,
              

                    ];
           

                    $_SESSION = [
                        'tokens' => $token
                    ];

                else:
                    $returnData = msg(0,422,'Tarkista Salasana');
                endif;

            else:
                $returnData = msg(0,422,'Tarkista Sähköposti', 22);
            endif;
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }

    endif;

endif;



}
echo json_encode($returnData);