<?php
class Connection
{
    public $host = "";
    public $dbname = "sinfo";
    public $port = "";
    public $user = "";
    public $password = "";
    public $driver = "mysql";
    public $connect;

    public static function getConnection()
    {
        try {
            $connection = new Connection();
            $connection->connect = new PDO("{$connection->driver}:host={$connection->host};port={$connection->port};dbname={$connection->dbname}", $connection->user, $connection->password);
            $connection->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Conectado correctamente";
            return $connection->connect;
        } catch (PDOException $e) {
            die("Error: " . $e->getMessage());
        }
    }
}
//Connection::getConnection();
