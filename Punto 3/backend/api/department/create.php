<?php
require_once("../../classes/Department.class.php");

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET["name"])) {
    Department::create($_GET["name"]);
}
