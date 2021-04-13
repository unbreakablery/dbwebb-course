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
    <p class="btn-wrapper">
        <button type="submit" class="btn-submit">Start Game</button>
    </p>
    <h4>Game Rules</h4>
    <p>
        The objective of YATZY is to get as many points as possible by rolling five dice and 
        getting certain combinations of dice.
    </p>
    <p>
        In each turn a player may throw the dice up to three times.
    </p>
    <p class="text-italic text-danger fw-bold">
        You are forced to play the game from top to bottom in order.
    </p>
    <h5>Upper section combinations</h5>
    <ul>
        <li>Ones: Get as many ones as possible.</li>
        <li>Twos: Get as many twos as possible.</li>
        <li>Threes: Get as many threes as possible.</li>
        <li>Fours: Get as many fours as possible.</li>
        <li>Fives: Get as many fives as possible.</li>
        <li>Sixes: Get as many sixes as possible.</li>
    </ul>
    <h5>Lower section combinations</h5>
    <ul>
        <li>Three of a kind: Get three dice with the same number. Points are the sum all dice (not just the three of a kind).</li>
        <li>Four of a kind: Get four dice with the same number. Points are the sum all dice (not just the four of a kind).</li>
        <li>Full house: Get three of a kind and a pair, e.g. 1,1,3,3,3 or 3,3,3,6,6. Scores 25 points.</li>
        <li>Small straight: Get four sequential dice, 1,2,3,4 or 2,3,4,5 or 3,4,5,6. Scores 30 points.</li>
        <li>Large straight: Get five sequential dice, 1,2,3,4,5 or 2,3,4,5,6. Scores 40 points.</li>
        <li>Chance: You can put anything into chance, it's basically like a garbage can when you don't have anything else you can use the dice for. The score is simply the sum of the dice.</li>
        <li>YAHTZEE: Five of a kind. Scores 50 points. You can optionally get multiple Yahtzees, see below for details.</li>
    </ul>
</form>
