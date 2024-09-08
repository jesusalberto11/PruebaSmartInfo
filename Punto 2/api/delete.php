<?php
require_once("../classes/Menu.class.php");

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_GET["id"])) {
    Menu::delete($_GET["id"]);
}
