<?php

/**
 * Standard view template to generate a simple web page, or part of a web page.
 */

declare(strict_types=1);

use function Mos\Functions\url;

$header = $header ?? null;
$message = $message ?? null;
?><h1><?= $header ?></h1>

<h2 class="text-italic"><?= $message ?></h2>
<?php if (isset($diceHandRoll)) { ?>
    <p>Dice Hand!!!</p>
    <p><?= $diceHandRoll ?></p>
    <?php if (isset($playerType) && $playerType === 'person') { ?>
        <h3>Your Points: <?= $_SESSION['player-points'] ?></h3>
    <?php } elseif (isset($playerType) && $playerType === 'computer') {?>
        <h3>Computer Points: <?= $_SESSION['computer-points'] ?></h3>
    <?php } ?>
<?php } else { ?>
    <h3>Your Points: 0</h3>
    <h3>Your Current Bitcoins: <?= $_SESSION['player-bitcoins'] ?></h3>
    <h3>Computer Current Bitcoins: <?= $_SESSION['computer-bitcoins'] ?></h3>
    <hr>
    <h3>Player Bet Amount: <?= $_SESSION['player-bet-amount'] ?></h3>
    <h3>Computer Bet Amount: <?= $_SESSION['computer-bet-amount'] ?></h3>
    <h3 class="text-success">Selected Bet Amount: <?= $_SESSION['bet-amount'] ?></h3>
<?php } ?>
<?php if (isset($endFlag) && $endFlag == false) { ?>
    <p class="btn-wrapper">
        <a href="<?= url('/dice/player/roll') ?>" class="success-link">Play to roll</a>
        <a href="<?= url('/dice/computer/play') ?>" class="danger-link">Stop, and Computer plays</a>
    </p>
<?php } else { ?>
    <p class="btn-wrapper">
        <a href="<?= url('/dice/result') ?>" class="info-link">View Result</a>
    </p>
<?php } ?>
