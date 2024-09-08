<?php
require_once(__DIR__ . "/../config/connection.php");
require_once(__DIR__ . "/../controller/controller.php");


class Department
{
    public static function create($name)
    {
        $name = clear_user_input($name);

        try {
            $sql = "INSERT INTO departments (name) VALUES (?)";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$name]);

            if (!$status) {
                header("HTTP/1.1 404 Can't create department");
                return;
            }

            header("HTTP/1.1 201 Created department");
        } catch (PDOException $e) {
            die("Can't create department!: " . $e->getMessage());
        }
    }

    public static function getAll()
    {
        try {
            $sql = "SELECT d.id, d.name, COUNT(p.id) as people_count FROM departments d LEFT JOIN persons p ON p.department_id = d.id GROUP BY d.id, d.name";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute();

            if (!$status) {
                header("HTTP/1.1 404 Can't get departments!");
                echo json_encode(null);
                return;
            }

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            header("HTTP/1.1 200 OK");
            echo json_encode($result);
        } catch (PDOException $e) {
            die("Can't get departments!: " . $e->getMessage());
        }
    }

    public static function get($id)
    {
        try {
            $id =  clear_user_input($id);

            if (!Department::check_if_its_on_db($id)) {
                header("HTTP/1.1 404 Person doesn't exist!");
                return;
            }

            $sql = "SELECT * FROM departments WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$id]);

            if (!$status) {
                header("HTTP/1.1 404 Can't get departments!");
                echo json_encode(null);
                return;
            }

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            header("HTTP/1.1 200 OK");
            echo json_encode($result);
        } catch (PDOException $e) {
            die("Can't get department!: " . $e->getMessage());
        }
    }


    public static function check_if_its_on_db($id)
    {
        try {
            $id =  clear_user_input($id);

            $sql = "SELECT * FROM departments WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute([$id]);
            $exist = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$exist) {
                return false;
            }

            return true;
        } catch (PDOException $e) {
            die("Can't check departments!: " . $e->getMessage());
        }
    }

    public static function delete($id)
    {
        try {
            $id =  clear_user_input($id);

            if (!Department::check_if_its_on_db($id)) {
                header("HTTP/1.1 404 Department doesn't exist!");
                return;
            }

            $sql = "DELETE FROM departments WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$id]);

            if (!$status) {
                header("HTTP/1.1 404 Can't delete department!");
                return;
            }

            header("HTTP/1.1 201 Deleted department");
        } catch (PDOException $e) {
            die("Can't delete departments!: " . $e->getMessage());
        }
    }

    public static function update($id, $name)
    {
        try {
            $id =  clear_user_input($id);

            if (!Department::check_if_its_on_db($id)) {
                header("HTTP/1.1 404 Department doesn't exist!");
                return;
            }

            $sql = "UPDATE departments SET name = ? WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$name, $id]);

            if (!$status) {
                header("HTTP/1.1 404 Can't update department!");
                return;
            }

            header("HTTP/1.1 201 Updated department");
        } catch (PDOException $e) {
            die("Can't update departments!: " . $e->getMessage());
        }
    }
}
