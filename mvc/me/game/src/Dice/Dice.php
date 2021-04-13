<?php

declare(strict_types=1);

namespace Webprogramming\Dice;

/**
 * Class Dice.
 */
class Dice
{
    const FACES = 6;

    private $roll;

    public function roll(): int
    {
        $this->roll = rand(1, self::FACES);

        return $this->roll;
    }

    public function getLastRoll(): int
    {
        return $this->roll;
    }
}
