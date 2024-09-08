<?php
require_once("../../classes/Person.class.php");

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET["name"]) && isset($_GET["departmentId"])) {
    Person::create($_GET["name"], $_GET["departmentId"]);
}
