<?php

declare(strict_types=1);

namespace Mos\Controller;

use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;

/**
 * Test cases for the controller Dice.
 */
class ControllerDiceTest extends TestCase
{
    /**
     * Try to create the controller class.
     */
    public function testCreateTheControllerClass()
    {
        $controller = new Dice();
        $this->assertInstanceOf("\Mos\Controller\Dice", $controller);
    }

    /**
     * Check that the controller returns a response.
     */
    public function testControllerReturnsResponse()
    {
        $controller = new Dice();

        $exp = "\Psr\Http\Message\ResponseInterface";
        $res = $controller->index();
        $this->assertInstanceOf($exp, $res);
        $res = $controller->saveSetting();
        $this->assertInstanceOf($exp, $res);
        $res = $controller->playRoll();
        $this->assertInstanceOf($exp, $res);
        $res = $controller->playGame();
        $this->assertInstanceOf($exp, $res);
        $res = $controller->viewResult();
        $this->assertInstanceOf($exp, $res);
    }
}
