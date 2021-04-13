<?php

declare(strict_types=1);

namespace Mos\Controller;

use Nyholm\Psr7\Factory\Psr17Factory;
use Psr\Http\Message\ResponseInterface;
use Webprogramming\Yatzy\Game;

use function Mos\Functions\renderView;
use function Mos\Functions\initSessionYatzySetting;
use function Mos\Functions\getRoundTitle;

/**
 * Controller for a yatzy route an controller class.
 */
class Yatzy
{
    public function index(): ResponseInterface
    {
        $psr17Factory = new Psr17Factory();

        $data = [
            "header" => "Yatzy",
            "message" => "Welcome to my Yatzy Game",
            "title" => "Yatzy",
            "menu_yatzy_class" => "selected"
        ];

        $body = renderView("layout/yatzy/welcome.php", $data);

        return $psr17Factory
            ->createResponse(200)
            ->withBody($psr17Factory->createStream($body));
    }

    public function startGame(): ResponseInterface
    {
        if (isset($_POST['action'])) {
            return $this->playGame();
        }

        initSessionYatzySetting();

        $psr17Factory = new Psr17Factory();

        $data = [
            "header" => "Yatzy",
            "message" => "",
            "title" => "Yatzy",
            "menu_yatzy_class" => "selected",
            "round_title" => getRoundTitle($_SESSION['current-round'])
        ];

        $body = renderView("layout/yatzy/game.php", $data);

        return $psr17Factory
            ->createResponse(200)
            ->withBody($psr17Factory->createStream($body));
    }

    public function playGame(): ResponseInterface
    {
        $psr17Factory = new Psr17Factory();

        if ($_POST['action'] == 'roll') {
            $data = [
                "header" => "Yatzy",
                "message" => "",
                "title" => "Yatzy",
                "menu_yatzy_class" => "selected",
                "round_title" => getRoundTitle($_SESSION['current-round'])
            ];
    
            $yatzy = new Game();
            $yatzy->rollDices($_POST, 'scorecard-you');
        } elseif ($_POST['action'] == 'computer-turn') {
            $data = [
                "header" => "Yatzy",
                "message" => "",
                "title" => "Yatzy",
                "menu_yatzy_class" => "selected",
                "round_title" => "Computer Turn"
            ];
    
            $yatzy = new Game();
            $yatzy->playComputerTurn('scorecard-computer');
            $yatzy->setWinner();
        }
                
        $body = renderView("layout/yatzy/game.php", $data);

        return $psr17Factory
            ->createResponse(200)
            ->withBody($psr17Factory->createStream($body));
    }
}
