<?php

/**
 * Standard view template to generate a simple web page, or part of a web page.
 */

declare(strict_types=1);

use function Mos\Functions\url;

$header = $header ?? null;
$message = $message ?? null;
?><h1><?= $header ?></h1>

<h2><?= $message ?></h2>

<?php if ($_SESSION['winner'] === 'player') { ?>
    <h2 class="text-italic text-success">You won! (Bet Bonus: +<?= $_SESSION['bet-amount'] ?>)</h2>
<?php } else { ?>
    <h2 class="text-italic text-danger">You lose! (Bet Bonus: -<?= $_SESSION['bet-amount'] ?>)</h2>
<?php } ?>
<p>Your points: <?= $_SESSION['player-points'] ?></p>
<p>Computer points: <?= $_SESSION['computer-points'] ?></p>

<p>Your Bitcoins: <?= $_SESSION['player-bitcoins'] ?></p>
<p>Computer Bitcoins: <?= $_SESSION['computer-bitcoins'] ?></p>

<h2>Game History</h2>
<p>Player wins: <?= $_SESSION['player-wins'] ?></p>
<p>Computer wins: <?= $_SESSION['computer-wins'] ?></p>
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