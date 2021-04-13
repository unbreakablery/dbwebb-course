<?php

/**
 * Standard view template to generate a simple web page, or part of a web page.
 */

declare(strict_types=1);

use function Mos\Functions\url;

$header = $header ?? null;
$message = $message ?? null;
?><h1><?= $header ?></h1>

<h2 class="text-italic">Current Round: <?= $round_title ?></h2>

<form action="" method="post">
    <?php if ($_SESSION['end-flag'] == false) { ?>
        <input type="hidden" name="action" value="roll" />
        <input type="hidden" name="sel-dices" id="sel-dices" value="" />
        <p>
            <button type="submit" class="btn-submit">Roll Dices</button>
        </p>
    <?php } else { ?>
        <input type="hidden" name="action" value="computer-turn" />
        <p>
            <button type="submit" class="btn btn-primary">Computer Turn</button>
        </p>
    <?php } ?>
</form>
<p>My Dices</p>
<p class="dices-wrapper">
    <?php
        for ($i = 0; $i < 5; $i++) {
            $src = $_SESSION['current-dices'][$i];
            echo ($src != 0) ?
                "<img class='rotate$src dice' width='50' src='images/" . $src . ".png' data-dice-value='$i' />"
                :
                "<img class='dice' width='50' data-dice-value='$i' />";
        }
    ?>
</p>
<p>Click on the dice you want to keep.</p>

<?php if (isset($_SESSION['winner']) && ($_SESSION['winner'] != '')) { ?>
    <h2 class="fw-bold text-success"><?= $_SESSION['winner'] ?> won!</h2>
<?php } ?>
<h2 class="text-italic">Scorecard</h2>
<table class="table table-dark table-striped table-bordered">
  <thead>
    <tr>
        <th scope="col">Player</th>
        <th scope="col">You</th>
        <th scope="col">Computer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Ones</td>
        <td><?= $_SESSION['scorecard-you']['ones'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['ones'] ?></td>
    </tr>
    <tr>
        <td>Twos</td>
        <td><?= $_SESSION['scorecard-you']['twos'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['twos'] ?></td>
    </tr>
    <tr>
        <td>Threes</td>
        <td><?= $_SESSION['scorecard-you']['threes'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['threes'] ?></td>
    </tr>
    <tr>
        <td>Fours</td>
        <td><?= $_SESSION['scorecard-you']['fours'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['fours'] ?></td>
    </tr>
    <tr>
        <td>Fives</td>
        <td><?= $_SESSION['scorecard-you']['fives'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['fives'] ?></td>
    </tr>
    <tr>
        <td>Sixes</td>
        <td><?= $_SESSION['scorecard-you']['sixes'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['sixes'] ?></td>
    </tr>
    <tr class="table-success">
        <td>Sum</td>
        <td><?= $_SESSION['scorecard-you']['sum'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['sum'] ?></td>
    </tr>
    <tr class="table-primary">
        <td>Bonus</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>Three of a kind</td>
        <td><?= $_SESSION['scorecard-you']['three-of-kind'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['three-of-kind'] ?></td>
    </tr>
    <tr>
        <td>Four of a kind</td>
        <td><?= $_SESSION['scorecard-you']['four-of-kind'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['four-of-kind'] ?></td>
    </tr>
    <tr>
        <td>Full House</td>
        <td><?= $_SESSION['scorecard-you']['full-house'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['full-house'] ?></td>
    </tr>
    <tr>
        <td>Small straight</td>
        <td><?= $_SESSION['scorecard-you']['small-straight'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['small-straight'] ?></td>
    </tr>
    <tr>
        <td>Large straight</td>
        <td><?= $_SESSION['scorecard-you']['large-straight'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['large-straight'] ?></td>
    </tr>
    <tr>
        <td>Chance</td>
        <td><?= $_SESSION['scorecard-you']['chance'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['chance'] ?></td>
    </tr>
    <tr>
        <td>YATZEE</td>
        <td><?= $_SESSION['scorecard-you']['yatzee'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['yatzee'] ?></td>
    </tr>
    <tr class="table-success">
        <td>Total Score</td>
        <td><?= $_SESSION['scorecard-you']['total-score'] ?></td>
        <td><?= $_SESSION['scorecard-computer']['total-score'] ?></td>
    </tr>
  </tbody>
</table>
<p>
    <a href="<?= url('/yatzy') ?>" class="danger-link">New Game</a>
</p>