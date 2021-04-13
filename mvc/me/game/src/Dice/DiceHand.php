<?php

declare(strict_types=1);

namespace Webprogramming\Dice;

/**
 * Class DiceHand.
 */
class DiceHand
{
    private $dices;
    private $sum;
    private $cntDices;
    private $diceType;

    public function __construct($type = 'default', $cnt = 2)
    {
        $this->cntDices = $cnt;
        $this->diceType = $type;
        $this->sum = 0;

        for ($i = 0; $i < $this->cntDices; $i++) {
            ($this->diceType == 'default') ? $this->dices[$i] = new Dice() : $this->dices[$i] = new GraphicalDice();
        }
    }

    public function roll(): void
    {
        $this->sum = 0;
        for ($i = 0; $i < $this->cntDices; $i++) {
            $this->sum += $this->dices[$i]->roll();
        }
    }

    public function getLastRoll(): string
    {
        $res = "";
        for ($i = 0; $i < $this->cntDices; $i++) {
            $res .= $this->dices[$i]->getLastRoll() . " + ";
        }

        return rtrim($res, " + ") . " = " . $this->sum;
    }

    public function getSum(): int
    {
        return $this->sum;
    }
}
