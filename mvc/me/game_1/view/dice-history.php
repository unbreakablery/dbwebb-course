<?php

/**
 * Show the game history
 */

declare(strict_types=1);

use function Mos\Functions\url;

$header = $header ?? null;
$message = $message ?? null;

if ($_SESSION['player-bitcoins'] >= 55) {
    $pTextClass = "text-success";
} elseif ($_SESSION['player-bitcoins'] < 55 && $_SESSION['player-bitcoins'] >= 10) {
    $pTextClass = "text-info";
} else {
    $pTextClass = "text-danger";
}

if ($_SESSION['computer-bitcoins'] >= 55) {
    $cTextClass = "text-success";
} elseif ($_SESSION['computer-bitcoins'] < 55 && $_SESSION['computer-bitcoins'] >= 10) {
    $cTextClass = "text-info";
} else {
    $cTextClass = "text-danger";
}
?><h1><?= $header ?></h1>

<h2>Balance</h2>
<p class="text-bold">Your Bitcoins: <span class="<?= $pTextClass?>"><?= $_SESSION['player-bitcoins'] ?></span></p>
<p class="text-bold">Computer Bitcoins: <span class="<?= $cTextClass?>"><?= $_SESSION['computer-bitcoins'] ?></span></p>

<h2>Game History</h2>
<p class="text-bold">Player wins: <?= $_SESSION['player-wins'] ?></p>
<p class="text-bold">Computer wins: <?= $_SESSION['computer-wins'] ?></p>
<p class="btn-wrapper">
    <a href="<?= url('/dice') ?>" class="success-link">New Game</a>
    <a href="<?= url('/session/init') ?>" class="danger-link">Clear Game History</a>
</p>
<?php if (isset($_SESSION['history'])) { ?>
    <h3>Histories:</h3>
    <p>Total Games: <?= count($_SESSION['history']) ?></p>
    <?php foreach($_SESSION['history'] as $history) { ?>
        <p>
            Winner: <?= $history['winner'] ?>, 
            Player points: <?= $history['player-points'] ?>, 
            Computer points: <?= $history['computer-points'] ?>,
            Bet Bonus: <?= $history['bet-amount'] ?>
        </p>
    <?php } ?>
<?php } ?>