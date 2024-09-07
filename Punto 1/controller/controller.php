<?php
require_once "C:/Apache24/htdocs/config/connection.php";

function clear_user_input($input)
{
    //Eliminar espacios entre caracteres
    $data = trim($input);

    //Eliminar comillas simples
    $data = stripslashes($data);

    //Colocar caracteres especiales como html
    $data = htmlspecialchars($data);

    return $data;
}

function hash_pass($pass)
{
    return password_hash($pass, PASSWORD_DEFAULT);
}

// function create_user($email, $pass)
// {
//     try {
//         $email = clear_user_input($email);
//         $pass = clear_user_input($pass);
//         $pass = hash_pass($pass);

//         if (check_if_email_exist($email)) {
//             return ["status" => "error", "error" => "User already exist!"];
//         }

//         $sql = "INSERT INTO users (email, password) VALUES (?, ?)";
//         $stmt = Connection::getConnection()->prepare($sql);
//         $stmt->execute([$email, $pass]);

//         return ["status" => "success", "error" => null];
//     } catch (PDOException $e) {
//         die("Can't create user!: " . $e->getMessage());
//     }
// }

function check_if_email_exist($email)
{
    $email = clear_user_input($email);

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = Connection::getConnection()->prepare($sql);
    $stmt->execute([$email]);
    $result = $stmt->fetch();

    return isset($result["email"]);
}

function get_pass_from_email($email)
{
    $email = clear_user_input($email);

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = Connection::getConnection()->prepare($sql);
    $stmt->execute([$email]);
    $result = $stmt->fetch();

    return $result["password"];
}

// function auth_user($email, $pass)
// {
//     $email = clear_user_input($email);
//     $pass = clear_user_input($pass);

//     if (!check_if_email_exist($email)) {
//         return ["status" => "error", "error" => "No hay una cuenta asociada a este correo."];
//     }

//     $passInBd = get_pass_from_email($email);
//     $passwordsMatch = password_verify($pass, $passInBd);

//     if (!$passwordsMatch) {
//         return ["status" => "error", "error" => "Contraseña invalida."];
//     }

//     return  ["status" => "success", "error" => null];
// }
