<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Check if vendor directory exists
if (!file_exists('vendor/autoload.php')) {
    die(json_encode([
        'status' => 'error',
        'message' => 'Vendor directory not found. Please run: composer install'
    ]));
}

require 'vendor/autoload.php';

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

// Validate form data
if (empty($name) || empty($email) || empty($message)) {
    die(json_encode([
        'status' => 'error',
        'message' => 'All fields are required'
    ]));
}

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug = 2; // Enable verbose debug output
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = '123medo@gmail.com'; // Your Gmail address
    $mail->Password = 'YOUR-16-CHAR-APP-PASSWORD'; // Replace this with the 16-character App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Recipients
    $mail->setFrom('123medo@gmail.com', $name);
    $mail->addAddress('123medo@gmail.com');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Message from ' . $name;
    $mail->Body = "
        <h3>New message from your portfolio website</h3>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Message:</strong></p>
        <p>{$message}</p>
    ";

    $mail->send();
    echo json_encode([
        'status' => 'success',
        'message' => 'Message sent successfully'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Message could not be sent. Error: ' . $mail->ErrorInfo,
        'debug' => [
            'name' => $name,
            'email' => $email,
            'error_details' => $mail->ErrorInfo
        ]
    ]);
}
?>
