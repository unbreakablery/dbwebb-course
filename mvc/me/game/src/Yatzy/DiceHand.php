<?php

declare(strict_types=1);

namespace Webprogramming\Yatzy;

/**
 * Class DiceHand.
 */
class DiceHand
{
    private $dices;
    private $cntDices;

    public function __construct($cnt = 5)
    {
        $this->cntDices = $cnt;

        for ($i = 0; $i < $this->cntDices; $i++) {
            $this->dices[$i] = new GraphicalDice();
        }
    }

    public function roll(): void
    {
        for ($i = 0; $i < $this->cntDices; $i++) {
            $this->dices[$i]->roll();
        }
    }

    public function getLastRoll(): array
    {
        $res = array();
        for ($i = 0; $i < $this->cntDices; $i++) {
            array_push($res, $this->dices[$i]->getLastRoll());
        }

        return $res;
    }
}
