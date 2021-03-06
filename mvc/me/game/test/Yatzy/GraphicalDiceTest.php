<?php

declare(strict_types=1);

namespace Webprogramming\Yatzy;

use PHPUnit\Framework\TestCase;

/**
 * Test cases for the GraphicalDice class.
 */
class GraphicalDiceTest extends TestCase
{
    /**
     * Construct object and verify that the object has the expected
     * properties, use no arguments.
     */
    public function testCreateObject()
    {
        $dice = new GraphicalDice();
        $this->assertInstanceOf("\Webprogramming\Yatzy\GraphicalDice", $dice);
    }

    /**
     *test dice roll
     */
    public function testDiceRoll()
    {
        $dice = new GraphicalDice();
        $res = $dice->roll();
        $this->assertIsInt($res);
        $res = $dice->getLastRoll();
        $this->assertIsInt($res);
    }
}
