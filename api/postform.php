

<?php
define('verySecretKeyIzMySikretWeapon', true);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$datas = json_decode(file_get_contents("php://input"));

if (isset($datas->Ika)) {
    $Ika = $datas->Ika;
    $DiscordID = $datas->DiscordID;
    $Puhelin = $datas->Puhelin;
    $Email = $datas->Email;
    $carerName = $datas->carerName;
    $carerPhone = $datas->carerPhone;
    $Etunimi = $datas->Etunimi;
    $Sukunimi = $datas->Sukunimi;
    $carerEmail = $datas->carerEmail;

    require __DIR__ . '/ware/classes/Database.php';
    $db_connection = new Database();
    $conn = $db_connection->dbConnection();

    try {
        $stmt = $conn->prepare("INSERT INTO lomakkeet ( Ika, DiscordID, Puhelin, Email, carerName, carerPhone, Etunimi, Sukunimi, carerEmail )
                                    VALUES ( :Ika, :DiscordID, :Puhelin, :Email, :carerName, :carerPhone, :Etunimi, :Sukunimi, :carerEmail )
    ");
        $stmt->bindParam(':Ika', $Ika);
        $stmt->bindParam(':DiscordID', $DiscordID);
        $stmt->bindParam(':Puhelin', $Puhelin);
        $stmt->bindParam(':Email', $Email);
        $stmt->bindParam(':carerName', $carerName);
        $stmt->bindParam(':carerPhone', $carerPhone);
        $stmt->bindParam(':Etunimi', $Etunimi);
        $stmt->bindParam(':Sukunimi', $Sukunimi);
        $stmt->bindParam(':carerEmail', $carerEmail);

        if ($stmt->execute() == false) {
            $data = array(
                'errroe' => ' erere lisätty',
            );
        } else {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            require __DIR__ . '/sendMail.php';

            
        }

    } catch (PDOException $e) {
        $returnData = msg(0, 500, $e->getMessage());
    }

}