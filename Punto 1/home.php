<?php
ob_start();
session_start();

if (!isset($_SESSION['valid'])) {
    header('Location: index.php');
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secret page | MySecret</title>
    <link rel="stylesheet" href="./res/css/index.css">
    <link rel="stylesheet" href="./res/css/components/header.css">
</head>

<div id="root">

    <body class="page-layout">
        <header class="w-full app-header flex row align-center justify-between">
            <h3>MySecrets</h3>
            <div class="flex row centered" style="gap: 10px">
                <a href="logout.php" id="logout-link">Cerrar sesión</a>
                <div class="user-circle flex centered"><?php echo strtoupper(substr($_SESSION['email'], 0, 2)); ?></div>
            </div>
        </header>

        <main>
            <hr>
            <h2>Ejemplo de ruta protegida</h2>
            <hr>
            <div class="w-full flex column" style="gap: 5px">
                <p>¡Hola <?php echo $_SESSION['email']; ?>!</p>
                <p>Accediste con éxito a la aplicación.</p>
                <p>Si intentas acceder a esta pagina in haber iniciado sesión, te llevará a el login.</p>
                <a class="link" href="/secret.php">
                    Ir a ver el código ultra secreto
                </a>
            </div>

        </main>
    </body>
</div>

</html>