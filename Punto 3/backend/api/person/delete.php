<?php
require_once("../../classes/Person.class.php");

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_GET["id"])) {
    Person::delete($_GET["id"]);
}
