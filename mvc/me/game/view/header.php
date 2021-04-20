<?php

/**
 * Standard view template to generate a simple web page, or part of a web page.
 */

declare(strict_types=1);

use function Mos\Functions\url;

?><!doctype html>
<html>
    <meta charset="utf-8">
    <title><?= $title ?? "No title" ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="<?= url("/favicon.ico") ?>">
    <link rel="stylesheet" type="text/css" href="<?= url("/css/style.css") ?>">
</head>

<body>

<header>
    <nav>
        <a class="" href="<?= url("/") ?>" class="<?= (isset($menu_home_class) ? $menu_home_class : '') ?>">Home</a>
        <a class="" href="<?= url("/dice") ?>" class="<?= (isset($menu_game21_class) ? $menu_game21_class : '') ?>">Game 21</a>
        <a class="" href="<?= url("/yatzy") ?>" class="<?= (isset($menu_yatzy_class) ? $menu_yatzy_class : '') ?>">Yatzy</a>
        <a class="" href="<?= url("/session") ?>" class="<?= (isset($menu_session_class) ? $menu_session_class : '') ?>">Session</a>
        <a class="" href="<?= url("/debug") ?>" class="<?= (isset($menu_debug_class) ? $menu_debug_class : '') ?>">Debug</a>
    </nav>
</header>
<main>
