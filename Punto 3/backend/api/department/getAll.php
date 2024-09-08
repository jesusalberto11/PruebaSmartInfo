<?php
require_once("../../classes/Department.class.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    Department::getAll();
}
