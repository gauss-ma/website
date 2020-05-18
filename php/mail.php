<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';




$nombre = $_POST['nombre'];
$email = $_POST['email'];
$mensaje = $_POST['mensaje'];

$mensaje_a_gauss="De: $nombre <br> Email: $email <br> Mensaje:<br> $mensaje";
$mensaje_a_usuario="Tu mensje ha sido enviado exitosamente!<br> A la brevedad algún representante de GAUSS se estará comunicando con vos.<br> ------------------------------<br> Copia del mensaje enviado:<br> $mensaje_a_gauss <br><br>------------------------------<br>"; 

$mail = new PHPMailer(true);

try {
    //$mail->SMTPDebug = 2;  				// Sacar esta línea para no mostrar salida debug
    $mail->isSMTP();
    $mail->Host = 'mail.gauss-ma.com.ar';               // Host de conexión SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'mailer@gauss-ma.com.ar';         // Usuario SMTP
    $mail->Password = '^!DCFM3%(B!q';                   // Password SMTP
    $mail->SMTPSecure = 'tls';                          // Activar seguridad TLS
    $mail->Port = 587;                                  // Puerto SMTP

    $mail->setFrom('mailer@gauss-ma.com.ar');		// Mail del remitente
    $mail->addAddress("espada@gauss-ma.com.ar");        // Mail del destinatario
    $mail->addAddress("medrano@gauss-ma.com.ar");       // Mail del destinatario
 
    $mail->isHTML(true);
    $mail->Subject = "Formulario desde GAUSS de $nombre."; // Asunto del mensaje
    $mail->Body    ="$mensaje_a_gauss";                    //Este es el contenido del mensaje <b>en negrita!</b>';    // Contenido del mensaje (acepta HTML)
    $mail->AltBody ="$mensaje_a_gauss";                    // 'Este es el contenido del mensaje en texto plano';    // Contenido del mensaje alternativo (texto plano)
 
    $mail->send();


echo "<script>alert('El mensaje ha sido enviado exitosamente!');window.location = 'https://gauss-ma.com.ar/';</script>";
} catch (Exception $e) {
    echo "<script>alert('El mensaje no se ha podido enviar, ERROR:</script>",$mail->ErrorInfo;
}


$mail_a_usr= new PHPMailer(true);

try {
    $mail_a_usr->isSMTP();
    $mail_a_usr->Host = 'mail.gauss-ma.com.ar';                 // Host de conexión SMTP
    $mail_a_usr->SMTPAuth = true;
    $mail_a_usr->Username = 'mailer@gauss-ma.com.ar';           // Usuario SMTP
    $mail_a_usr->Password = '^!DCFM3%(B!q';                     // Password SMTP
    $mail_a_usr->SMTPSecure = 'tls';                            // Activar seguridad TLS
    $mail_a_usr->Port = 587;                                    // Puerto SMTP

    $mail_a_usr->setFrom('mailer@gauss-ma.com.ar');		// Mail del remitente
    $mail_a_usr->addAddress("$email");                          // Mail del destinatario
 
    $mail_a_usr->isHTML(true);
    $mail_a_usr->Subject = "[GAUSS] (no responder) Tu mensaje ha sido enviado exitosamente!";  // Asunto del mensaje
    $mail_a_usr->Body    ="$mensaje_a_usuario";   //Este es el contenido del mensaje <b>en negrita!</b>';    // Contenido del mensaje (acepta HTML)
    $mail_a_usr->AltBody ="$mensaje_a_usuario";   // 'Este es el contenido del mensaje en texto plano';    // Contenido del mensaje alternativo (texto plano)
    $mail_a_usr->send();
} catch (Exception $e) {
}

?>
