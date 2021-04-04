<?php

declare(strict_types=1);

namespace Webprogramming\Dice;

use Webprogramming\Dice\Dice;
use Webprogramming\Dice\DiceHand;

use function Mos\Functions\{
    redirectTo,
    renderView,
    sendResponse,
    url
};

/**
 * Class Game.
 */
class Game
{
    public function roll(): void
    {
        if (isset($_SESSION['cnt-dices'])) {
            $cntDices = $_SESSION['cnt-dices'];
        } else {
            $cntDices = 1;
        }

        if (isset($_SESSION['dice-type'])) {
            $diceType = $_SESSION['dice-type'];
        } else {
            $diceType = 'default';
        }
        
        $diceHand = new DiceHand($diceType, $cntDices);
        $diceHand->roll();
        $_SESSION['player-points'] += $diceHand->getSum();

        $this->initSessionWins();

        if ($_SESSION['player-points'] > 21) {
            $data["message"] = "You lose!";
            $data["endFlag"] = true;
            
            $_SESSION['winner'] = 'computer';
            $this->updateHistory('computer');
            $this->applyBetAmount('computer');            
            $_SESSION['computer-wins']++;
        } elseif ($_SESSION['player-points'] == 21) {
            $data["message"] = "Congratulations!";
            $data["endFlag"] = true;
            
            $_SESSION['winner'] = 'player';
            $this->updateHistory('player');
            $this->applyBetAmount('player');
            $_SESSION['player-wins']++;
        } else {
            $data["endFlag"] = false;
            $_SESSION['winner'] = '';
        }

        $data["diceHandRoll"] = $diceHand->getLastRoll();
        $data["playerType"] = "person";
        $data["title"] = "Game 21";
        $data["menu_game21_class"] = "selected";

        $body = renderView("layout/dice.php", $data);
        sendResponse($body);
    }

    public function playGame(): void
    {
        $data = [
            "header" => "Dice Game was Ended!",
            "message" => "Hey!",
        ];
        
        if (isset($_SESSION['cnt-dices'])) {
            $cntDices = $_SESSION['cnt-dices'];
        } else {
            $cntDices = 1;
        }
        
        $diceHand = new DiceHand('default', $cntDices);

        if ($cntDices == 1) {
            $maxLimitPoints = 18;
        } else {
            $maxLimitPoints = 16;
        }

        while ($_SESSION['computer-points'] < $maxLimitPoints) {
            $diceHand->roll();
            $_SESSION['computer-points'] += $diceHand->getSum();
        }

        $this->initSessionWins();

        if ($_SESSION['computer-points'] > 21) {
            $_SESSION['player-wins']++;
            $_SESSION['winner'] = 'player';
            $this->updateHistory('player');
            $this->applyBetAmount('player');
        } elseif ($_SESSION['computer-points'] == 21) {
            $_SESSION['computer-wins']++;
            $_SESSION['winner'] = 'computer';
            $this->updateHistory('computer');
            $this->applyBetAmount('computer');
        }

        if ($_SESSION['winner'] == '') {
            if ($_SESSION['player-points'] > $_SESSION['computer-points']) {
                $_SESSION['player-wins']++;
                $_SESSION['winner'] = 'player';
                $this->updateHistory('player');
                $this->applyBetAmount('player');
            } else {
                $_SESSION['computer-wins']++;
                $_SESSION['winner'] = 'computer';
                $this->updateHistory('computer');
                $this->applyBetAmount('computer');
            }
        }

        $data["title"] = "Result - Game 21";
        $data["menu_game21_class"] = "selected";
        
        $body = renderView("layout/result.php", $data);
        sendResponse($body);
    }

    private function updateHistory($winner): void
    {
        $history = array(
            'winner' => $winner,
            'player-points' => $_SESSION['player-points'],
            'computer-points' => $_SESSION['computer-points'],
            'bet-amount' => (($winner === 'player') ? '+' : '-') . $_SESSION['bet-amount']
        );

        if (!isset($_SESSION['history'])) {
            $_SESSION['history'] = array();
        }
        array_push($_SESSION['history'], $history);
    }

    private function initSessionWins(): void
    {
        if (!isset($_SESSION['player-wins'])) {
            $_SESSION['player-wins'] = 0;
        }
        if (!isset($_SESSION['computer-wins'])) {
            $_SESSION['computer-wins'] = 0;
        }
    }

    private function applyBetAmount($winner): void
    {
        if ($winner === 'player') {
            $_SESSION['player-bitcoins'] += $_SESSION['bet-amount'];
            $_SESSION['computer-bitcoins'] -= $_SESSION['bet-amount'];
        } elseif ($winner === 'computer') {
            $_SESSION['player-bitcoins'] -= $_SESSION['bet-amount'];
            $_SESSION['computer-bitcoins'] += $_SESSION['bet-amount'];
        }
    }
}
