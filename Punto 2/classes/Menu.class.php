<?php
require_once(__DIR__ . "/../config/connection.php");
require_once(__DIR__ . "/../controller/controller.php");

class Menu
{
    public static function create($name, $url, $parentId, $itemOrder)
    {
        try {
            $name = clear_user_input($name);
            $url = clear_user_input($url);
            $parentId = clear_user_input($parentId);
            $parentId = empty($parentId) ? NULL : $parentId;
            $itemOrder  = clear_user_input($itemOrder);

            if (Menu::get_occupied_item_orders())

                $sql = "INSERT INTO menu (name, url, parent_id, item_order) VALUES (?, ?, ?, ?)";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$name, $url, $parentId, $itemOrder]);

            if (!$status) {
                header("HTTP/1.1 404 Can't create menu");
                return false;
            }

            header("HTTP/1.1 201 Created menu");
            return true;
        } catch (PDOException $e) {
            header("HTTP/1.1 404 Can't create menu");
            die("Can't create menu!: " . $e->getMessage());
            return false;
        }
    }

    public static function getAll()
    {
        try {
            $sql = "SELECT * FROM menu ORDER BY item_order";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute();

            if (!$status) {
                header("HTTP/1.1 404 Can't get menus!");
                return json_encode(null);
            }

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            header("HTTP/1.1 200 OK");
            return json_encode($result);
        } catch (PDOException $e) {
            header("HTTP/1.1 404 Can't get menus!");
            json_encode(null);
            die("Can't get menus!: " . $e->getMessage());
        }
    }

    public static function get($id)
    {
        try {
            $id =  clear_user_input($id);

            if (!Menu::check_if_its_on_db($id)) {
                header("HTTP/1.1 404 Menu doesn't exist!");
                return json_encode(null);
            }

            $sql = "SELECT * FROM menu WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$id]);

            if (!$status) {
                header("HTTP/1.1 404 Can't get menu!");
                return json_encode(null);
            }

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            header("HTTP/1.1 200 OK");
            return json_encode($result);
        } catch (PDOException $e) {
            header("HTTP/1.1 404 Can't get menu!");
            json_encode(null);

            die("Can't get menu!: " . $e->getMessage());
        }
    }

    public static function get_occupied_item_orders()
    {
        try {
            $sql = "SELECT item_order FROM menu order by item_order;";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute();

            if (!$status) {
                header("HTTP/1.1 404 Can't get item orders!");
                return json_encode(null);
            }

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            header("HTTP/1.1 200 OK");
            return json_encode($result);
        } catch (PDOException $e) {
            header("HTTP/1.1 404 Can't get item orders!");
            json_encode(null);

            die("Can't get item orders!: " . $e->getMessage());
        }
    }


    public static function check_if_its_on_db($id)
    {
        try {
            $id =  clear_user_input($id);

            $sql = "SELECT * FROM menu WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute([$id]);
            $exist = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$exist) {
                return false;
            }

            return true;
        } catch (PDOException $e) {
            die("Can't check menu!: " . $e->getMessage());
        }
    }

    public static function delete($id)
    {
        try {
            $id =  clear_user_input($id);

            if (!Menu::check_if_its_on_db($id)) {
                header("HTTP/1.1 404 menu doesn't exist!");
                return;
            }

            $sql = "DELETE FROM menu WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$id]);

            if (!$status) {
                header("HTTP/1.1 404 Can't delete menu!");
                return;
            }

            header("HTTP/1.1 201 Deleted menu");
        } catch (PDOException $e) {
            header("HTTP/1.1 404 Can't delete menu!");
            die("Can't delete menu!: " . $e->getMessage());
        }
    }

    public static function update($id, $name, $url, $parentId, $itemOrder)
    {
        try {
            $id =  clear_user_input($id);
            $name = clear_user_input($name);
            $url = clear_user_input($url);
            $parentId = clear_user_input($parentId);
            $parentId = empty($parentId) ? NULL : $parentId;
            $itemOrder  = clear_user_input($itemOrder);

            if (!Menu::check_if_its_on_db($id)) {
                header("HTTP/1.1 404 Menu doesn't exist!");
                return;
            }

            $sql = "UPDATE menu SET name = ?, url = ?, parent_id = ?, item_order = ? WHERE id = ?";
            $stmt = Connection::getConnection()->prepare($sql);
            $status = $stmt->execute([$name, $url, $parentId, $itemOrder, $id]);

            if (!$status) {
                header("HTTP/1.1 404 Can't update menu!");
                return;
            }

            header("HTTP/1.1 201 Updated menu");
        } catch (PDOException $e) {
            header("HTTP/1.1 404 Can't update menu!");
            die("Can't update menu!: " . $e->getMessage());
        }
    }
}
