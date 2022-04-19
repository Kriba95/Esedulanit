

<?php
define('verySecretKeyIzMySikretWeapon', true);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$data = json_decode(file_get_contents("php://input"));

if (isset($data->lol)) {

    require __DIR__ . '/ware/classes/Database.php';
    $db_connection = new Database();
    $conn = $db_connection->dbConnection();

    $randomcode = $data->lol;

    try {
        $stmt = $conn->prepare("SELECT id, time FROM vahvistus");

        if ($stmt->execute() == false) {
            $data = array(
                'errroe' => ' erere lisätty',
            );
        } else {
            $somedata = $stmt->fetchAll(PDO::FETCH_ASSOC);

        }

    } catch (PDOException $e) {

        $somedata = msg(0, 500, $e->getMessage());
    }

    foreach ($somedata as $value) {

        if (time() > floatval($value["time"] + 456)) {
            $id = $value["id"];

            try {
                $stmt = $conn->prepare("DELETE FROM vahvistus
                                        WHERE id = :id");
                $stmt->bindParam(':id', $id);

                if ($stmt->execute() == false) {
                    $data = array(
                        'errroe' => ' erere lisätty',
                    );
                } else {
                    $returnData = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $randomcode = $data->lol;

                }

            } catch (PDOException $e) {

                $returnData = msg(0, 500, $e->getMessage());
            }

        } else {

        }

    }
    try {
        $stmt = $conn->prepare("SELECT * FROM vahvistus
                                        WHERE vahvistus = :vahvistus");
        $stmt->bindParam(':vahvistus', $randomcode);

        if ($stmt->execute() == false) {
            $data = array(
                'errroe' => ' erere lisätty',
            );
        } else {
            $returnData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($returnData)) {
                $data = array(
                    'ok' => $returnData,
                    'errors' => 'yes',
                    'isAuth' => false,
                );
            } else {

                $data = array(
                    'ok' => $returnData,
                    'errors' => 'no',
                    'isAuth' => true,
                );}

            echo json_encode($data);

        }

    } catch (PDOException $e) {

        $returnData = msg(0, 500, $e->getMessage());
    }

    if (empty($somedata)) {
        echo "noKeyData";
    }
}