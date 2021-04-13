<?php

declare(strict_types=1);

namespace Webprogramming\Dice;

use function Mos\Functions\url;

/**
 * Class GraphicalDice.
 */
class GraphicalDice
{
    const FACES = 6;

    private $roll;

    public function roll(): int
    {
        $this->roll = rand(1, self::FACES);

        return $this->roll;
    }

    public function getLastRoll(): string
    {
        return "<img src='" . url("/images") . "/" . $this->roll . ".png' width='100' />";
    }
}
