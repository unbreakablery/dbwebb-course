<?php

declare(strict_types=1);

namespace Mos\Controller;

use Nyholm\Psr7\Factory\Psr17Factory;
use Psr\Http\Message\ResponseInterface;

use function Mos\Functions\renderView;

/**
 * Controller for the index route.
 */
class Index
{
    public function __invoke(): ResponseInterface
    {
        $psr17Factory = new Psr17Factory();

        $data = [
            "header" => "Home page",
            "message" => "Welcome to My Gatzy Game",
            "title" => "Welcome to My Game",
            "menu_home_class" => "selected"
        ];

        $body = renderView("layout/page.php", $data);

        return $psr17Factory
            ->createResponse(200)
            ->withBody($psr17Factory->createStream($body));
    }
}
