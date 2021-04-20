<?php

declare(strict_types=1);

namespace Mos\Config;

use FastRoute\RouteCollector;
use PHPUnit\Framework\TestCase;

/**
 * Test cases for the router.
 */
class ConfigRouterTest extends TestCase
{
    private $routerFile = INSTALL_PATH . "/config/router.php";

    /**
     * Require the router file.
     */
    public function testRequireRouterFile()
    {
        $exp = 1;
        $res = require $this->routerFile;
        $this->assertEquals($exp, $res);
    }

    /**
     * Try to create the router class.
     */
    public function testCreateTheControllerClass()
    {
        $router = new RouteCollector(
            new \FastRoute\RouteParser\Std(),
            new \FastRoute\DataGenerator\MarkBased()
        );
        $this->assertInstanceOf("\FastRoute\RouteCollector", $router);
    }
}
