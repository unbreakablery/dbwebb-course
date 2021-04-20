<?php

declare(strict_types=1);

namespace Webprogramming\Dice;

use PHPUnit\Framework\TestCase;

/**
 * Test cases for the DiceHand class.
 */
class DiceHandTest extends TestCase
{
    /**
     * Construct object and verify that the object has the expected
     * properties, use two arguments.
     */
    public function testCreateObject()
    {
        $diceHand = new DiceHand('default', 2);
        $this->assertInstanceOf("\Webprogramming\Dice\DiceHand", $diceHand);
    }

    /**
     *test dice roll
     */
    public function testDiceRoll()
    {
        $diceHand = new DiceHand('default', 2);
        $diceHand->roll();
        $res = $diceHand->getSum();
        $this->assertIsInt($res);
        $res = $diceHand->getLastRoll();
        $this->assertIsString($res);
    }
}
