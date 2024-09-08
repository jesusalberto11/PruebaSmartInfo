<?php
require_once("../classes/Menu.class.php");

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["id"])) {
    Menu::get($_GET["id"]);
}
