<?php

declare(strict_types=1);

namespace Mos\Controller;

use Nyholm\Psr7\Factory\Psr17Factory;
use Psr\Http\Message\ResponseInterface;
use Webprogramming\Dice\Game;

use function Mos\Functions\renderView;
use function Mos\Functions\initSessionGameSetting;
use function Mos\Functions\saveSettingSession;

/**
 * Controller for a dice route an controller class.
 */
class Dice
{
    public function index(): ResponseInterface
    {
        $psr17Factory = new Psr17Factory();

        $data = [
            "header" => "Game 21",
            "message" => "Hey, edit the game setting youreself!",
            "title" => "Game 21",
            "menu_game21_class" => "selected"
        ];

        initSessionGameSetting();

        $body = renderView("layout/setting.php", $data);

        return $psr17Factory
            ->createResponse(200)
            ->withBody($psr17Factory->createStream($body));
    }

    public function saveSetting(): ResponseInterface
    {
        $psr17Factory = new Psr17Factory();

        $data = [
            "header" => "Welcome to Dice Game",
            "message" => "please, play this dice game!",
            "endFlag" => false,
            "title" => "Game 21",
            "menu_game21_class" => "selected"
        ];

        $cntDices = isset($_POST['cnt-dices']) ? intval($_POST['cnt-dices']) : 2;
        $diceType = isset($_POST['dice-type']) ? $_POST['dice-type'] : 'default';

        saveSettingSession($cntDices, $diceType);

        $body = renderView("layout/dice.php", $data);

        return $psr17Factory
            ->createResponse(200)
            ->withBody($psr17Factory->createStream($body));
    }

    public function playRoll(): ResponseInterface
    {
        $psr17Factory = new Psr17Factory();

        $callable = new Game();
        $body = $callable->roll();

        return $psr17Factory
            ->createResponse(200)
            ->withBody($psr17Factory->createStream($body));
    }

    public function playGame(): ResponseInterface
    {
        $psr17Factory = new Psr17Factory();

        $callable = new Game();
        $body = $callable->playGame();

        return $psr17Factory
            ->createResponse(200)
            ->withBody($psr17Factory->createStream($body));
    }

    public function viewResult(): ResponseInterface
    {
        $psr17Factory = new Psr17Factory();

        $data = [
            "header" => "Dice Game was Ended!",
            "message" => "Hey!",
            "title" => "Game 21",
            "menu_game21_class" => "selected"
        ];

        $body = renderView("layout/result.php", $data);

        return $psr17Factory
            ->createResponse(200)
            ->withBody($psr17Factory->createStream($body));
    }
}
