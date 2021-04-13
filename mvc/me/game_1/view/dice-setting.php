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
            <option value="graphical" selected>Graphical</option>
        </select>
    </p>
    <p>
        <label for="bet-amount">Bet Bitcons: </label>
        <input type="number" name="bet-amount" id="bet-amount" 
            class="bet-amount" 
            placeholder="Max: 50% of your bitcoins" 
            min="0" 
            max="<?= round($_SESSION['player-bitcoins'] / 2, 2) ?>" 
            step="0.01" />
        <span>(Your bitcoins: <?= $_SESSION['player-bitcoins'] ?>)</span>
    </p>
    <p class="btn-wrapper">
        <button type="submit" class="btn-submit">Start Game</button>
    </p>
</form>
