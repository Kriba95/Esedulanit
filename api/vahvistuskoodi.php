

<?php
define('verySecretKeyIzMySikretWeapon', true);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/ware/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

$vahvistus = substr(md5(uniqid()), 0, 5);

try {
    $stmt = $conn->prepare("INSERT INTO vahvistus ( vahvistus )
                                    VALUES ( :vahvistus )
    ");
    $stmt->bindParam(':vahvistus', $vahvistus);

    if ($stmt->execute() == false) {
        $data = array(
            'errroe' => ' erere lisätty',
        );
    } else {
        $returnData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    }

} catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
}
