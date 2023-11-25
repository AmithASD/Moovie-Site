<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate form data
    $first_name = test_input($_POST["first_name"]);
    $last_name = test_input($_POST["last_name"]);
    $email = test_input($_POST["email"]);
    $phone = test_input($_POST["phone"]);
    $comments = test_input($_POST["comments"]);

    if (empty($first_name) || empty($last_name) || empty($email) || empty($comments)) {
        http_response_code(400);
        echo "Please fill in all the required fields.";
        exit;
    }

    // Save form data to a JSON file
    $formData = [
        'first_name' => $first_name,
        'last_name' => $last_name,
        'email' => $email,
        'phone' => $phone,
        'comments' => $comments,
    ];
    var_dump("hi");exit;
    $jsonData = json_encode($formData, JSON_PRETTY_PRINT);
    file_put_contents('form_data.json', $jsonData);

    $to_user = $email;
    $subject_user = 'Form Submission Confirmation';
    $message_user = 'Thank you for submitting the form. We will get back to you soon.';
    $headers_user = 'From: webmaster@example.com';

    mail($to_user, $subject_user, $message_user, $headers_user);

    // Send admin email
    $to_admin = 'dumidu.kodithuwakku@ebeyonds.com, prabhath.senadheera@ebeyonds.com';
    $subject_admin = 'New Form Submission';
    $message_admin = "A new form has been submitted.\n\n" . json_encode($formData, JSON_PRETTY_PRINT);
    $headers_admin = 'From: webmaster@example.com';

    mail($to_admin, $subject_admin, $message_admin, $headers_admin);

    echo "Form submitted successfully!";
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
