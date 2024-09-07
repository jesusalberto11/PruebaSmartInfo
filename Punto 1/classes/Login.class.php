<?php
require_once("./controller/controller.php");
require_once("./config/connection.php");

class Login
{
    private $email;
    private $password;
    private $status;

    public function __construct($email, $password)
    {
        $this->email = clear_user_input($email);
        $this->password = clear_user_input($password);

        try {

            if (!check_if_email_exist($this->email)) {
                $this->status = ["status" => "error", "error" => "No hay una cuenta asociada a este correo."];
                return;
            }

            $passInDB = get_pass_from_email($this->email);
            $auth = password_verify($this->password, $passInDB);

            if (!$auth) {
                $this->status = ["status" => "error", "error" => "Contraseña invalida."];
                return;
            }

            ob_start();
            session_start();
            $_SESSION['email'] = $this->email;
            $_SESSION['valid'] = true;
            header('Location: home.php');
        } catch (PDOException $e) {
            die("Can't auth user!: " . $e->getMessage());
        }
    }

    public function get_status()
    {
        return $this->status;
    }
}
