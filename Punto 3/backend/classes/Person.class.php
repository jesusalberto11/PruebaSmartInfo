<?php
require_once(__DIR__ . "/../config/connection.php");
require_once(__DIR__ . "/../controller/controller.php");

class Person
{
    public static function create($name, $departmentId)
    {
        $name = clear_user_input($name);
        $departmentId = clear_user_input($departmentId);

        try {
            $sql = "INSERT INTO persons (name, department_id) VALUES (?, ?)";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$name, $departmentId]);

            if (!$status) {
                header("HTTP/1.1 404 Can't create person");
                return;
            }

            header("HTTP/1.1 201 Created person");
        } catch (PDOException $e) {
            die("Can't create person!: " . $e->getMessage());
        }
    }

    public static function getAll()
    {
        try {
            $sql = "SELECT p.id as id, p.name as name, d.name as department_name FROM persons p left join departments d on d.id = p.department_id GROUP BY p.id, p.name, d.name";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute();

            if (!$status) {
                header("HTTP/1.1 404 Can't get persons!");
                echo json_encode(null);
                return;
            }

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            header("HTTP/1.1 200 OK");
            echo json_encode($result);
        } catch (PDOException $e) {
            die("Can't get persons!: " . $e->getMessage());
        }
    }

    public static function get($id)
    {
        try {
            $id =  clear_user_input($id);

            if (!Person::check_if_its_on_db($id)) {
                header("HTTP/1.1 404 Person doesn't exist!");
                return;
            }

            $sql = "SELECT * FROM persons WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$id]);

            if (!$status) {
                header("HTTP/1.1 404 Can't get persons!");
                echo json_encode(null);
                return;
            }

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            header("HTTP/1.1 200 OK");
            echo json_encode($result);
        } catch (PDOException $e) {
            die("Can't get persons!: " . $e->getMessage());
        }
    }

    public static function check_if_its_on_db($id)
    {
        try {
            $id =  clear_user_input($id);

            $sql = "SELECT * FROM persons WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute([$id]);
            $exist = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$exist) {
                return false;
            }

            return true;
        } catch (PDOException $e) {
            die("Can't check person!: " . $e->getMessage());
        }
    }

    public static function delete($id)
    {
        try {
            $id = clear_user_input($id);

            if (!Person::check_if_its_on_db($id)) {
                header("HTTP/1.1 404 Person doesn't exist!");
                return;
            }

            $sql = "DELETE FROM persons WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$id]);

            if (!$status) {
                header("HTTP/1.1 404 Can't delete person!");
                return;
            }

            header("HTTP/1.1 201 Deleted person");
        } catch (PDOException $e) {
            die("Can't delete person!: " . $e->getMessage());
        }
    }

    public static function update($id, $name, $departmentId)
    {
        try {
            $id = clear_user_input($id);
            $name = clear_user_input($name);
            $departmentId = clear_user_input($departmentId);

            if (!Person::check_if_its_on_db($id)) {
                header("HTTP/1.1 404 Person doesn't exist!");
                return;
            }

            $sql = "UPDATE persons SET name = ?, department_id = ? WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$name, $departmentId, $id]);

            if (!$status) {
                header("HTTP/1.1 404 Can't update person!");
                return;
            }

            header("HTTP/1.1 201 Updated person");
        } catch (PDOException $e) {
            die("Can't update person!: " . $e->getMessage());
        }
    }
}
