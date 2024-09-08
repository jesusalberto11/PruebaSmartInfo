<?php
require_once("./controller/controller.php");
require_once("./config/connection.php");
require_once("./classes/Login.class.php");

class Register
{
    private $email;
    private $password;
    private $repeatPassword;
    private $status;

    public function __construct($email, $password, $repeatPassword)
    {
        $this->email = clear_user_input($email);
        $this->password = clear_user_input($password);
        $this->repeatPassword = clear_user_input($repeatPassword);

        if (!preg_match('/^(?=.*\*)(.{10,})$/', $this->password)) {
            $this->status = ["status" => "error", "error" => "La contraseña debe tener al menos 10 caracteres y contener un asterisco (*)"];
            return;
        }

        if ($this->password != $this->repeatPassword) {
            $this->status = ["status" => "error", "error" => "Las contraseñas no coinciden."];
            return;
        }

        $this->password = hash_pass($this->password);

        try {
            if (check_if_email_exist($this->email)) {
                $this->status = ["status" => "error", "error" => "El correo ya se encuentra registrado."];
                return;
            }

            $sql = "INSERT INTO users (email, password) VALUES (?, ?)";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute([$this->email, $this->password]);

            $this->status = ["status" => "success", "error" => null];

            ob_start();
            session_start();
            $_SESSION['email'] = $this->email;
            $_SESSION['valid'] = true;
            header('Location: home.php');
        } catch (PDOException $e) {
            die("Can't create user!: " . $e->getMessage());
        }
    }

    public function get_status()
    {
        return $this->status;
    }
}
