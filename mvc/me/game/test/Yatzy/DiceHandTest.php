<?php

declare(strict_types=1);

namespace Webprogramming\Yatzy;

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
        $diceHand = new DiceHand(5);
        $this->assertInstanceOf("\Webprogramming\Yatzy\DiceHand", $diceHand);
    }

    /**
     *test dice roll
     */
    public function testDiceRoll()
    {
        $diceHand = new DiceHand(5);
        $diceHand->roll();
        $res = $diceHand->getLastRoll();
        $this->assertIsArray($res);
    }
}
