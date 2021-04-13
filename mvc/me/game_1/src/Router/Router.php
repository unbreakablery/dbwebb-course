<?php

declare(strict_types=1);

namespace Mos\Router;

use function Mos\Functions\{
    destroySession,
    redirectTo,
    renderView,
    renderTwigView,
    sendResponse,
    url,
    initSession,
    initGameSession
};

use Webprogramming\Dice\Game;

/**
 * Class Router.
 */
class Router
{
    public static function dispatch(string $method, string $path): void
    {
        if ($method === "GET" && $path === "/") {
            $data = [
                "header" => "Home page",
                "message" => "Welcome to My Game! <br/>" . 
                            "Please go to 'Game 21' in order to play this dice game.",
                "title" => "Welcome to My Game",
                "menu_home_class" => "selected"
            ];
            $body = renderView("layout/page.php", $data);
            sendResponse($body);
            return;
        } else if ($method === "GET" && $path === "/session") {
            $data = [
                "title" => "View Session",
                "menu_session_class" => "selected"
            ];
            $body = renderView("layout/session.php", $data);
            sendResponse($body);
            return;
        } else if ($method === "GET" && $path === "/session/destroy") {
            destroySession();
            redirectTo(url("/session"));
            return;
        } else if ($method === "GET" && $path === "/session/init") {
            initSession();
            redirectTo(url("/dice"));
            return;
        } else if ($method === "GET" && $path === "/debug") {
            $data = [
                "title" => "Debug",
                "menu_debug_class" => "selected"
            ];
            $body = renderView("layout/debug.php", $data);
            sendResponse($body);
            return;
        } else if ($method === "GET" && $path === "/dice") {
            initGameSession();
            
            $data = [
                "header" => "Dice Game Setting",
                "message" => "Hey, edit the game setting youreself!",
                "title" => "Game 21",
                "menu_game21_class" => "selected"
            ];
            $body = renderView("layout/setting.php", $data);
            sendResponse($body);
            return;
        } else if ($method === "POST" && $path === "/dice") {
            $_SESSION['cnt-dices'] = intval($_POST['cnt-dices']);
            $_SESSION['dice-type'] = $_POST['dice-type'];
            $p_bet_amount = round(floatval($_POST['bet-amount']), 2);
            $c_bet_amount = round($_SESSION['computer-bitcoins'] / 100 * mt_rand(0, 50), 2);
            $_SESSION['player-bet-amount'] = $p_bet_amount;
            $_SESSION['computer-bet-amount'] = $c_bet_amount;

            if ($p_bet_amount >= $c_bet_amount) {
                $_SESSION['bet-amount'] = $c_bet_amount;
            } else {
                $_SESSION['bet-amount'] = $p_bet_amount;
            }
            
            $data = [
                "header" => "Welcome to Dice Game",
                "message" => "please, play this dice game!",
                "endFlag" => false,
                "title" => "Game 21",
                "menu_game21_class" => "selected"
            ];
            $body = renderView("layout/dice.php", $data);
            sendResponse($body);
            return;
        } else if ($method === "GET" && $path === "/dice/player/roll") {
            $callable = new Game();
            $callable->roll();
            return;
        } else if ($method === "GET" && $path === "/dice/computer/play") {
            $callable = new Game();
            $callable->playGame();
            return;
        } else if ($method === "GET" && $path === "/dice/result") {
            $data = [
                "header" => "Dice Game was Ended!",
                "message" => "Hey!",
                "title" => "Result - Game 21",
                "menu_game21_class" => "selected"
            ];
            $body = renderView("layout/result.php", $data);
            sendResponse($body);
            return;
        } else if ($method === "GET" && $path === "/dice/history") {
            if (!isset($_SESSION['player-bitcoins']) || !isset($_SESSION['computer-bitcoins'])) {
                initGameSession();
            }
            
            $data = [
                "header" => "Dice Game History",
                "message" => "Hey!",
                "title" => "View History",
                "menu_history_class" => "selected"
            ];
            $body = renderView("layout/history.php", $data);
            sendResponse($body);
            return;
        } else if ($method === "GET" && $path === "/dice/rules") {
            $data = [
                "header" => "Dice Game Rules",
                "message" => "Here is game rules.",
                "title" => "Dice Game Rules",
                "menu_rules_class" => "selected"
            ];
            $body = renderView("layout/rules.php", $data);
            sendResponse($body);
            return;
        }

        $data = [
            "header" => "404",
            "message" => "The page you are requesting is not here. You may also checkout the HTTP response code, it should be 404.",
        ];
        $body = renderView("layout/page.php", $data);
        sendResponse($body, 404);
    }
}
