<?php

declare(strict_types=1);

namespace Mos\Router;

use PHPUnit\Framework\TestCase;

/**
 * Test cases for the Router class.
 */
class RouterTest extends TestCase
{
    /**
     * Construct object and verify that the object has the expected
     * properties, use no arguments.
     */
    public function testCreateObject()
    {
        $router = new Router();
        $this->assertInstanceOf("\Mos\Router\Router", $router);
    }
}
