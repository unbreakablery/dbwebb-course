<?php

declare(strict_types=1);

namespace Webprogramming\Dice;

use PHPUnit\Framework\TestCase;

/**
 * Test cases for the Dice class.
 */
class DiceTest extends TestCase
{
    /**
     * Construct object and verify that the object has the expected
     * properties, use no arguments.
     */
    public function testCreateObject()
    {
        $dice = new Dice();
        $this->assertInstanceOf("\Webprogramming\Dice\Dice", $dice);
    }

    /**
     *test dice roll
     */
    public function testDiceRoll()
    {
        $dice = new Dice();
        $res = $dice->roll();
        $this->assertIsInt($res);
        $res = $dice->getLastRoll();
        $this->assertIsInt($res);
    }
}
