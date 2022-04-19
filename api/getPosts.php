<?php
session_start(['cookie_lifetime' => 43200, 'cookie_secure' => true, 'cookie_httponly' => true]);
define('verySecretKeyIzMySikretWeapon', true);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
if (isset($_COOKIE["RTID"])) {
    require __DIR__ . '/ware/classes/Database.php';
    require __DIR__ . '/ware/middlewares/TokenAuth.php';

    $allHeaders = getallheaders();
    $db_connection = new Database();
    $conn = $db_connection->dbConnection();
    $auth = new Auth($conn, $allHeaders);

    $returnData = [
        "success" => 0,
        "status" => 401,
        "message" => "Unauthorized",
    ];

    if (isset($_COOKIE["RTID"])) {
        if ($auth->isAuth()) {
            $returnData = $auth->isAuth();
        }}

    if ($returnData['status'] === 200 && $returnData['success'] === 1 && $returnData['assxwor'] === "UserHasddadfu2hfi3f2fb2bdbdhsbahsdb") {
        $data = json_decode(file_get_contents("php://input"));

       

        try {
            $stmt = $conn->prepare("SELECT * FROM lomakkeet ");

            if ($stmt->execute() == false) {
                $data = array(
                    'errroe' => ' erere lisätty',
                );
            } else {
                $returnData = $stmt->fetchAll(PDO::FETCH_ASSOC);

                echo json_encode($returnData);

              
            }

        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());

        }





    } else if ($returnData['status'] === 401 && $returnData['success'] === 0 && $returnData['message'] === "Unauthorized") {
        echo "Access denied, Unauthorized attempt outside website. Attempt recorded.";
    }

 
} else {
    echo "Access denied, Unauthorized attempt outside website. Attempt recorded.";

}

