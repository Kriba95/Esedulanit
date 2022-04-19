<?php
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require_once "vendor/autoload.php";

$mail = new PHPMailer(true);

//Enable SMTP debugging.
$mail->SMTPDebug = 3;
//Set PHPMailer to use SMTP.
$mail->isSMTP();
//Set SMTP host name
$mail->Host = "mail.duunihakuri.fi";
//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth = true;
//Provide username and password
$mail->Username = "test@duunihakuri.fi";
$mail->Password = "testmypassword";
//If SMTP requires TLS encryption then set it
$mail->SMTPSecure = "tls";
//Set TCP port to connect to
$mail->Port = 587;

$mail->From = "test@duunihakuri.fi";
$mail->FromName = "Esedulanit vahvistuskoodi";

$mail->addAddress("kribadiba@gmail.com", "Recepient Name");

$mail->isHTML(true);

$mail->Subject = "Vahvistuskoodi";
$vahvistus = substr(md5(uniqid()), 0, 5);

$mail->Body = "<i>Vahvistuskoodisi $vahvistus</i>";
$mail->AltBody = "This is the plain text version of the email content";

try {
    define('verySecretKeyIzMySikretWeapon', true);
    require __DIR__ . '/ware/classes/Database.php';
    $db_connection = new Database();
    $conn = $db_connection->dbConnection();

    $time = time();

    $stmt = $conn->prepare("INSERT INTO vahvistus ( vahvistus, time )
    VALUES ( :vahvistus, :time )
");
    $stmt->bindParam(':vahvistus', $vahvistus);
    $stmt->bindParam(':time', $time);


    if ($stmt->execute() == false) {
        $data = array(
            'errroe' => ' erere lisätty',
        );
    } else {
        $returnData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    }

    $mail->send();
    echo "Message has been sent successfully";
} catch (Exception $e) {

    echo "Mailer Error: " . $mail->ErrorInfo;
}
