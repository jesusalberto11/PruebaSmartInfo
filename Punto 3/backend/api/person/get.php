<?php
require_once("../../classes/Person.class.php");

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["id"])) {
    Person::get($_GET["id"]);
}
