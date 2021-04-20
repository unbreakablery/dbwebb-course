<?php

declare(strict_types=1);

namespace Webprogramming\Dice;

use PHPUnit\Framework\TestCase;

/**
 * Test cases for the Game class.
 */
class GameTest extends TestCase
{
    /**
     * Construct object and verify that the object has the expected
     * properties, use no arguments.
     */
    public function testCreateObject()
    {
        $game = new Game();
        $this->assertInstanceOf("\Webprogramming\Dice\Game", $game);
    }
}
