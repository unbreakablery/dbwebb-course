<?php

/**
 * Standard view template to generate a simple web page, or part of a web page.
 */

declare(strict_types=1);

$header = $header ?? null;
$message = $message ?? null;

?><h1><?= $header ?></h1>

<p><?= $message ?></p>
<h3>Dice FACES:</h3>
<p>
<?php
    for($i = 1; $i <=6; $i++) {
        echo "<img src='images/" . $i . ".png' width='100' />";
    }
?>
</p>
