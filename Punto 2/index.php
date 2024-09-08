<?php
require_once(__DIR__ . "/classes/Menu.class.php");

$menuItems = Menu::getAll();
$menuItems = json_decode($menuItems, true);

$status = false;

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["name"]) && isset($_POST["url"]) && isset($_POST["parentId"]) && isset($_POST["itemOrder"])) {
    $status = Menu::create($_POST["name"], $_POST["url"], $_POST["parentId"], $_POST["itemOrder"]);

    if ($status) {
        $status = false;

        $menuItems = Menu::getAll();
        $menuItems = json_decode($menuItems, true);
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyMenus</title>
    <link rel="stylesheet" href="./res/css/index.css">
    <link rel="stylesheet" href="./res/css/pages/login.css">
</head>

<div id="root">

    <body class="page-layout">
        <main>
            <div class="h-full w-full flex column align-start justify-start" style="gap:10px">
                <div class="h-full w-full flex column align-start justify-center wrap" style="height:300px; gap:5px;">
                    <h3 id="page-title">Crear menu</h3>
                    <hr />
                    <?php if ($status): ?>
                        <p class="error-box w-full flex centered rounded-corners">
                            <?php echo "El orden ya está ocupado"; ?>
                        </p>
                    <?php endif; ?>
                    <form
                        action="" method="POST" id="create-menu-form"
                        class="w-full flex column align-start justify-center"
                        style="gap: 15px">
                        <div class="w-full flex centered" style="gap:10px">
                            <div class="form-item flex">
                                <label for="name">Nombre del menú *</label>
                                <input
                                    id="name"
                                    name="name"
                                    class="login-form-input w-full"
                                    placeholder="Ej: Home, Stats, Profile, etc... *"
                                    type="text"
                                    autocomplete="newMenuName"
                                    required />
                            </div>
                            <div class="form-item flex">
                                <label for="url">URL del menú *</label>
                                <input
                                    id="url"
                                    name="url"
                                    class="login-form-input"
                                    placeholder="Ej: Home.php, Profile.php, etc"
                                    type="text"
                                    autocomplete="url"
                                    required />
                            </div>
                        </div>
                        <div class="w-full flex centered" style="gap:10px">
                            <div class="form-item flex">
                                <label for="parentId">Tipo de menú</label>
                                <select id="parentId" name="parentId" class="login-form-input">
                                    <option value="" selected>Es menú principal</option>
                                    <?php foreach ($menuItems as $menuItem): ?>
                                        <?php if (empty($menuItem["parent_id"])): ?>
                                            <option value="<?php echo $menuItem["id"]; ?>">
                                                Submenú de <?php echo $menuItem["name"]; ?>
                                            </option>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-item flex">
                                <label for="itemOrder">Orden del menú *</label>
                                <input
                                    id="itemOrder"
                                    name="itemOrder"
                                    class="login-form-input w-full"
                                    placeholder="Ej: 1,2,3, etc... *"
                                    type="number"
                                    autocomplete="newMenuOrder"
                                    required />
                            </div>
                        </div>
                        <button class="login-button flex centered" type="submit">Crear</button>
                        <hr />
                    </form>


                    <div id="edit-form-container" class="w-full" style="display:none;">
                        <form
                            action="" method="POST" id="edit-menu-form"
                            class="w-full flex column align-start justify-center"
                            style="gap: 15px">
                            <div class="w-full flex centered" style="gap:10px">
                                <div class="form-item flex">
                                    <label for="editName">Nuevo nombre del menú *</label>
                                    <input
                                        id="editName"
                                        name="editName"
                                        class="login-form-input w-full"
                                        placeholder="Ej: Home, Stats, Profile, etc... *"
                                        type="text"
                                        required />
                                </div>
                                <div class="form-item flex">
                                    <label for="editUrl">Nueva URL del menú *</label>
                                    <input
                                        id="editUrl"
                                        name="editUrl"
                                        class="login-form-input"
                                        placeholder="Ej: Home.php, Profile.php, etc"
                                        type="text"
                                        autocomplete="url"
                                        required />
                                </div>
                            </div>
                            <div class="w-full flex centered" style="gap:10px">
                                <div class="form-item flex">
                                    <label for="EditingParentId">Tipo de menú</label>
                                    <select id="EditingParentId" name="EditingParentId" class="login-form-input">
                                        <option value="" selected>Es menú principal</option>
                                        <?php foreach ($menuItems as $menuItem): ?>
                                            <?php if (empty($menuItem["parent_id"])): ?>
                                                <option value="<?php echo $menuItem["id"]; ?>">
                                                    Submenú de <?php echo $menuItem["name"]; ?>
                                                </option>
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <div class="form-item flex">
                                    <label for="editItemOrder">Nuevo orden del menú *</label>
                                    <input
                                        id="editItemOrder"
                                        name="editItemOrder"
                                        class="login-form-input w-full"
                                        placeholder="Ej: 1,2,3, etc... *"
                                        type="number"
                                        autocomplete="newMenuOrder"
                                        required />
                                </div>
                            </div>
                            <button class="login-button flex centered" type="submit">Editar</button>
                            <hr />
                        </form>
                    </div>
                </div>
                <div class="h-full w-full flex row centered" style="gap:5px;">
                    <div class="w-full flex column align-start justify-start">
                        <h3>Menu</h3>
                        <hr />
                        <div class="w-full h-full">
                            <table>
                                <tr>
                                    <th>Nombre</th>
                                    <th>URL</th>
                                    <th>ParentID</th>
                                    <th>ItemOrder</th>
                                    <th>Acciones</th>
                                </tr>
                                <?php foreach ($menuItems as $menuItem): ?>
                                    <tr>
                                        <td><?php echo $menuItem["name"]; ?></td>
                                        <td><?php echo $menuItem["url"]; ?></td>
                                        <?php if (!empty($menuItem["parent_id"])): ?>
                                            <td><?php echo $menuItem["parent_id"]; ?></td>
                                        <?php else: ?>
                                            <td>VACÍO</td>
                                        <?php endif; ?>
                                        <?php if (!empty($menuItem["item_order"])): ?>
                                            <td><?php echo $menuItem["item_order"]; ?></td>
                                        <?php else: ?>
                                            <td>VACÍO</td>
                                        <?php endif; ?>
                                        <td>
                                            <div class="flex row wrap centered" style="gap:5px">
                                                <button class="action-btns rounded-corners edit-btn" onclick="editMenu(<?php echo $menuItem['id']; ?>,'<?php echo $menuItem['name']; ?>','<?php echo $menuItem['url']; ?>','<?php echo $menuItem['parent_id']; ?>',<?php echo $menuItem['item_order']; ?>)">Editar</button>
                                                <button class="action-btns rounded-corners delete-btn" onclick="deleteMenu(<?php echo $menuItem['id']; ?>)">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>

                            </table>
                        </div>
                        <hr />
                        <ol class="menu-list w-full flex column align-start justify-start">
                            <h3>Vista de árbol</h3>
                            <?php foreach ($menuItems as $menuItem): ?>
                                <?php if (empty($menuItem["parent_id"])): ?>
                                    <li>
                                        <a href="<?php echo $menuItem['url']; ?>">
                                            <?php echo $menuItem["name"]; ?>
                                        </a>
                                        <ol>
                                            <?php foreach ($menuItems as $subMenuItem): ?>
                                                <?php if ($subMenuItem["parent_id"] == $menuItem["id"]): ?>
                                                    <li>
                                                        <a href="<?php echo $subMenuItem['url']; ?>">
                                                            <?php echo $subMenuItem["name"]; ?>
                                                        </a>
                                                    </li>
                                                <?php endif; ?>
                                            <?php endforeach; ?>
                                        </ol>
                                    </li>
                                <?php endif; ?>
                            <?php endforeach; ?>
                        </ol>
                        <hr />
                    </div>
                </div>
            </div>
        </main>
        <script src="./res/js/index.js"></script>
    </body>
</div>

</html>