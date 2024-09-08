<?php
require_once("../../classes/Person.class.php");

if ($_SERVER["REQUEST_METHOD"] == "PUT" && isset($_GET["id"]) && isset($_GET["name"]) && isset($_GET["departmentId"])) {
    Person::update($_GET["id"], $_GET["name"], $_GET["departmentId"]);
}
