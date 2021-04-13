<?php

declare(strict_types=1);

namespace Webprogramming\Dice;

use Webprogramming\Dice\DiceHand;

use function Mos\Functions\renderView;
use function Mos\Functions\sendResponse;

/**
 * Class Game.
 */
class Game
{
    public function roll(): string
    {
        $cntDices = 1;
        if (isset($_SESSION['cnt-dices'])) {
            $cntDices = $_SESSION['cnt-dices'];
        }

        $diceType = 'default';
        if (isset($_SESSION['dice-type'])) {
            $diceType = $_SESSION['dice-type'];
        }

        $diceHand = new DiceHand($diceType, $cntDices);
        $diceHand->roll();
        $_SESSION['player-points'] += $diceHand->getSum();

        $data = array();
        if ($_SESSION['player-points'] > 21) {
            $data["message"] = "You lose!";
            $data["endFlag"] = true;

            $_SESSION['winner'] = 'computer';
            $this->updateHistory('computer');

            isset($_SESSION['computer-wins']) ? $_SESSION['computer-wins']++ : $_SESSION['computer-wins'] = 1;
        } elseif ($_SESSION['player-points'] == 21) {
            $data["message"] = "Congratulations!";
            $data["endFlag"] = true;

            $_SESSION['winner'] = 'player';
            $this->updateHistory('player');

            isset($_SESSION['player-wins']) ? $_SESSION['player-wins']++ : $_SESSION['player-wins'] = 1;
        } else {
            $data["endFlag"] = false;
            $_SESSION['winner'] = '';
            if (!isset($_SESSION['player-wins'])) {
                $_SESSION['player-wins'] = 0;
            }
        }

        $data["diceHandRoll"] = $diceHand->getLastRoll();
        $data["playerType"] = "person";
        $data["title"] = "Game 21";
        $data["menu_game21_class"] = "selected";

        $body = renderView("layout/dice.php", $data);
        return $body;
    }

    public function playGame(): string
    {
        $data = [
            "header" => "Dice Game was Ended!",
            "message" => "Hey!",
        ];

        isset($_SESSION['cnt-dices']) ? $cntDices = $_SESSION['cnt-dices'] : $cntDices = 1;

        $diceHand = new DiceHand('default', $cntDices);
        while ($_SESSION['computer-points'] < 16) {
            $diceHand->roll();
            $_SESSION['computer-points'] += $diceHand->getSum();
        }

        if ($_SESSION['computer-points'] > 21) {
            isset($_SESSION['player-wins']) ? $_SESSION['player-wins']++ : $_SESSION['player-wins'] = 1;
            $_SESSION['winner'] = 'player';
            $this->updateHistory('player');
        } elseif ($_SESSION['computer-points'] == 21) {
            isset($_SESSION['computer-wins']) ? $_SESSION['computer-wins']++ : $_SESSION['computer-wins'] = 1;
            $_SESSION['winner'] = 'computer';
            $this->updateHistory('computer');
        }

        if ($_SESSION['winner'] == '') {
            if ($_SESSION['player-points'] > $_SESSION['computer-points']) {
                isset($_SESSION['player-wins']) ? $_SESSION['player-wins']++ : $_SESSION['player-wins'] = 1;
                $_SESSION['winner'] = 'player';
                $this->updateHistory('player');
            } else {
                isset($_SESSION['computer-wins']) ? $_SESSION['computer-wins']++ : $_SESSION['computer-wins'] = 1;
                $_SESSION['winner'] = 'computer';
                $this->updateHistory('computer');
            }
        }

        $data["title"] = "Game 21";
        $data["menu_game21_class"] = "selected";

        $body = renderView("layout/result.php", $data);
        return $body;
    }

    public function updateHistory($winner): void
    {
        $history = array(
            'winner' => $winner,
            'player-points' => $_SESSION['player-points'],
            'computer-points' => $_SESSION['computer-points']
        );

        if (!isset($_SESSION['history'])) {
            $_SESSION['history'] = array();
        }
        array_push($_SESSION['history'], $history);
    }
}
