<?php
require_once("../classes/Menu.class.php");

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET["name"]) && isset($_GET["url"]) && isset($_GET["parentId"]) && isset($_GET["itemOrder"])) {
    Menu::create($_GET["name"], $_GET["url"], $_GET["parentId"], $_GET["itemOrder"]);
}
