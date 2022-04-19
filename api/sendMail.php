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
$mail->FromName = "Esedulanit";

$mail->addAddress("kribadiba@gmail.com", "Recepient Name");

$mail->isHTML(true);

$mail->Subject = "Lainit vahvistettu";
$vahvistus = substr(md5(uniqid()), 0, 5);

$mail->Body = "<div><p>Hieno homma, $Etunimi. Odotamme sinua paikanpäällä.</p>
<p>Sähköposti: $Email</p>
<p> $Etunimi $Sukunimi</p>
<p>Jotain Muuta Tekstiä....</p>
<p>Jotain Muuta Tekstiä....</p>
<p>Tervetuloa Joku päivä johinkin aikaan</p></div>";
$mail->AltBody = "This is the plain text version of the email content";

try {

    $mail->send();
    echo "Message has been sent successfully";
} catch (Exception $e) {

    echo "Mailer Error: " . $mail->ErrorInfo;
}
