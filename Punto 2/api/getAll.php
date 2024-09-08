<?php
require_once("../classes/Menu.class.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    Menu::getAll();
}
