<?php

function clear_user_input($input)
{
    //Eliminar espacios entre caracteres
    $data = trim($input);

    //Eliminar comillas simples
    $data = stripslashes($data);

    //Colocar caracteres especiales como html
    $data = htmlspecialchars($data);

    return $data;
}
