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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="<?= url("/css/style.css") ?>">
</head>

<body>

<header>
    <nav>
        <a class="" href="<?= url("/") ?>" class="<?= $menu_home_class ?>">Home</a>
        <a class="" href="<?= url("/dice") ?>" class="<?= $menu_game21_class ?>">Game 21</a>
        <a class="" href="<?= url("/yatzy") ?>" class="<?= $menu_yatzy_class ?>">Yatzy</a>
        <a class="" href="<?= url("/session") ?>" class="<?= $menu_session_class ?>">Session</a>
        <a class="" href="<?= url("/debug") ?>" class="<?= $menu_debug_class ?>">Debug</a>
    </nav>
</header>
<main>
