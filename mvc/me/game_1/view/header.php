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
        <a href="<?= url("/") ?>" class="<?= $menu_home_class ?>">Home</a>
        <a href="<?= url("/dice") ?>" class="<?= $menu_game21_class ?>">Game 21</a>
        <a href="<?= url("/dice/history") ?>" class="<?= $menu_history_class ?>">Balance & History</a>
        <a href="<?= url("/dice/rules") ?>" class="<?= $menu_rules_class ?>">Rules</a>
        <a href="<?= url("/session") ?>" class="<?= $menu_session_class ?>">Session</a>
        <a href="<?= url("/debug") ?>" class="<?= $menu_debug_class ?>">Debug</a>
    </nav>
</header>
<main>
