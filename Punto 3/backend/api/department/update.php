<?php
require_once("../../classes/Department.class.php");

if ($_SERVER["REQUEST_METHOD"] == "PUT" && isset($_GET["id"]) && isset($_GET["name"])) {
    Department::update($_GET["id"], $_GET["name"]);
}
