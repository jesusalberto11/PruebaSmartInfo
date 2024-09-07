<?php
require_once("./classes/Login.class.php");

$login = null;

if (isset($_POST["email"]) && isset($_POST["password"])) {
    $login = new Login($_POST['email'], $_POST['password']);
}

ob_start();
session_start();

if (isset($_SESSION['valid'])) {
    header('Location: home.php');
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | MySecret</title>
    <link rel="stylesheet" href="./res/css/index.css">
    <link rel="stylesheet" href="./res/css/pages/login.css">
</head>

<div id="root">

    <body class="page-layout">
        <main>
            <div class="h-full w-full flex column centered">
                <div class="login-form-container">
                    <div class="form-items">
                        <h1>Acceder a MySecret</h1>
                        <hr />
                        <?php if (isset($login)): ?>
                            <?php if ($login->get_status()["status"] == "error"): ?>
                                <p class="error-box flex centered rounded-corners">
                                    <?php echo $login->get_status()["error"]; ?>
                                </p>
                            <?php endif; ?>
                        <?php endif; ?>
                        <form
                            action="" method="POST" id="login-form"
                            class="flex column"
                            style="gap: 15px">
                            <div class="form-item flex">
                                <label for="email" hidden>
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    class="login-form-input"
                                    placeholder="Email *"
                                    type="email"
                                    autocomplete="email"
                                    required />
                            </div>
                            <div class="form-item flex">
                                <label for="password" hidden>
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    class="login-form-input"
                                    type="password"
                                    placeholder="Contraseña *"
                                    autocomplete="current-password"
                                    required />
                            </div>

                            <button class="login-button flex centered" type="submit">
                                Acceder
                            </button>
                            <hr />
                            <div class="create-account">
                                <p>¿No tienes cuenta?</p>
                                <a class="link" href="/register.php">
                                    Crea una
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </body>

</div>

</html>