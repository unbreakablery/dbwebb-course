<?php

declare(strict_types=1);

namespace Webprogramming\Dice;

// use function Mos\Functions\{
//     destroySession,
//     redirectTo,
//     renderView,
//     renderTwigView,
//     sendResponse,
//     url
// };

/**
 * Class DiceHand.
 */
class DiceHand
{
    private array $dices;
    private int $sum;
    private int $cntDices;
    private string $diceType;

    public function __construct($type = 'default', $cnt = 2)
    {
        $this->cntDices = $cnt;
        $this->diceType = $type;
        $this->sum = 0;
        
        if ($type == 'default') {
            for ($i = 0; $i < $this->cntDices; $i++) {
                $this->dices[$i] = new Dice();
            }
        } else {
            for ($i = 0; $i < $this->cntDices; $i++) {
                $this->dices[$i] = new GraphicalDice();
            }
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

        if ($this->cntDices == 1) {
            return rtrim($res, " + ");
        } else {
            return rtrim($res, " + ") . " = " . $this->sum;
        }
    }

    public function getSum(): int
    {
        return $this->sum;
    }
}
