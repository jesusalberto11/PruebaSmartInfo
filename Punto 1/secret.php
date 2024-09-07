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
    <title>Home | MySecret</title>
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
            <div class="w-full flex column" style="gap: 5px">
                <p>El código secreto es...</p>
                <pre><code>DROP TABLE users;</code></pre>
                <a class="link" href="/home.php">
                    Regresar al inicio.
                </a>
            </div>

        </main>
    </body>
</div>

</html>