<?php
require_once("./controller/controller.php");
require_once("./config/connection.php");

class Register
{
    private $email;
    private $password;
    private $status;

    public function __construct($email, $password)
    {
        $this->email = clear_user_input($email);
        $this->password = clear_user_input($password);
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
            header("Location: index.php");
        } catch (PDOException $e) {
            die("Can't create user!: " . $e->getMessage());
        }
    }

    public function get_status()
    {
        return $this->status;
    }
}
