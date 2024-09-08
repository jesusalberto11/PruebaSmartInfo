<?php
require_once("../../classes/Department.class.php");

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_GET["id"])) {
    Department::delete($_GET["id"]);
}
