<?php

declare(strict_types=1);

namespace Webprogramming\Dice;

use function Mos\Functions\{
    url
};

/**
 * Class GraphicalDice.
 */
class GraphicalDice
{
    const FACES = 6;

    private ?int $roll = null;

    public function roll(): int
    {
        $this->roll = rand(1, self::FACES);

        return $this->roll;
    }

    public function getLastRoll(): string
    {
        $index = rand(1, 6);
        return "<img src='" . url("/images/") . $this->roll . ".png' class='rotate" 
                . $index . "' width='100' />";
    }
}
