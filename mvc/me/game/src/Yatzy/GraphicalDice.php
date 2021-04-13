<?php

declare(strict_types=1);

namespace Webprogramming\Yatzy;

/**
 * Class GraphicalDice.
 */
class GraphicalDice extends Dice
{
    public function getLastRoll(): int
    {
        return $this->roll;
    }
}
