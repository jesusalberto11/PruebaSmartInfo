<?php
require_once("../../classes/Department.class.php");

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["id"])) {
    Department::get($_GET["id"]);
}
