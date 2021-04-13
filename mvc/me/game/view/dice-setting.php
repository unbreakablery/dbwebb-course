<?php

/**
 * Game Setting
 */

declare(strict_types=1);

$header = $header ?? null;
$message = $message ?? null;
?><h1><?= $header ?></h1>

<p><?= $message ?></p>

<form action="" method="post">
    <p>
        <label for="cnt-dices">Number of Dices: </label>
        <select name="cnt-dices" id="cnt-dices">
            <option value="1">1</option>
            <option value="2">2</option>
        </select>
    </p>
    <p>
        <label for="dice-type">Dice Type: </label>
        <select name="dice-type" id="dice-type">
            <option value="default">Default</option>
            <option value="graphical">Graphical</option>
        </select>
    </p>
    <p class="btn-wrapper">
        <button type="submit" class="btn-submit">Save</button>
    </p>
</form>
