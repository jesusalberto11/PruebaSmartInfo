<?php
require_once("../../classes/Person.class.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    Person::getAll();
}
