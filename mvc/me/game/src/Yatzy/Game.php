<?php

declare(strict_types=1);

namespace Webprogramming\Yatzy;

use Webprogramming\Yatzy\DiceHand;

use function Mos\Functions\renderView;
use function Mos\Functions\sendResponse;

/**
 * Class Game.
 */
class Game
{
    public function playComputerTurn($card) {
        $this->clearCurrentDices();
        
        $_SESSION[$card]['ones'] = rand(0, 6);
        $_SESSION[$card]['twos'] = rand(0, 5) * 2;
        $_SESSION[$card]['threes'] = rand(0, 5) * 3;
        $_SESSION[$card]['fours'] = rand(0, 5) * 4;
        $_SESSION[$card]['fives'] = rand(0, 5) * 5;
        $_SESSION[$card]['sixes'] = rand(0, 5) * 6;
        $_SESSION[$card]['sum'] = $this->getSum($card);
        $_SESSION[$card]['three-of-kind'] = rand(0, 1) ? rand(0, 30) : 0;
        $_SESSION[$card]['four-of-kind'] = rand(0, 1) ? rand(0, 30) : 0;
        $_SESSION[$card]['full-house'] = rand(0, 1) * 25;
        $_SESSION[$card]['small-straight'] = rand(0, 1) * 30;
        $_SESSION[$card]['large-straight'] = rand(0, 1) * 40;
        $_SESSION[$card]['chance'] = rand(0, 30);
        $_SESSION[$card]['yatzee'] = rand(0, 1) * 50;
        $_SESSION[$card]['total-score'] = $this->getTotalScore($card);
    }

    public function setWinner(): void
    {
        if (isset($_SESSION['end-flag']) && $_SESSION['end-flag'] == true) {
            if ($_SESSION['scorecard-you']['total-score'] > $_SESSION['scorecard-computer']['total-score']) {
                $_SESSION['winner'] = 'You';
            } else {
                $_SESSION['winner'] = 'Computer';
            }
        } else {
            $_SESSION['winner'] = '';
        }
    }

    public function rollDices($data, $card): void
    {
        if ($_SESSION['current-roll-cnt'] >= 3) {
            $this->checkRound($card);
            $this->moveRound();
        } else {
            if (isset($data['sel-dices']) && strlen($data['sel-dices']) > 0) {
                $sel_dices = str_split($data['sel-dices']);
                $cntDices = 5 - count($sel_dices);
                for ($i = 0; $i < 5; $i++) {
                    if (!in_array($i, $sel_dices)) {
                        $_SESSION['current-dices'][$i] = 0;
                    }
                }
            } else {
                $cntDices = 5;
                $this->clearCurrentDices();
            }

            $this->playRoll($cntDices);
        }
    }

    private function moveRound(): bool
    {
        if ($_SESSION['current-round'] < 13) {
            $_SESSION['current-roll-cnt'] = 0;
            $_SESSION['current-round']++;

            $this->clearCurrentDices();
            return true;
        }
        $_SESSION['end-flag'] = true;
        return false;
    }

    private function clearCurrentDices(): void
    {
        $_SESSION['current-dices'] = array(0, 0, 0, 0, 0);
    }

    private function playRoll($cntDices): void
    {
        $_SESSION['current-roll-cnt']++;

        $diceHand = new DiceHand($cntDices);
        $diceHand->roll();
        $dices = $diceHand->getLastRoll();
        for ($i = 0; $i < count($dices); $i++) {
            for ($j = 0; $j < count($_SESSION['current-dices']); $j++) {
                if ($_SESSION['current-dices'][$j] == 0) {
                    $_SESSION['current-dices'][$j] = $dices[$i];
                    break;
                }
            }
        }
    }

    private function checkRound($card): void
    {
        switch ($_SESSION['current-round']) {
            case 1:
                $this->checkUppersection($card, 'ones', 1);
                break;
            case 2:
                $this->checkUppersection($card, 'twos', 2);
                break;
            case 3:
                $this->checkUppersection($card, 'threes', 3);
                break;
            case 4:
                $this->checkUppersection($card, 'fours', 4);
                break;
            case 5:
                $this->checkUppersection($card, 'fives', 5);
                break;
            case 6:
                $this->checkUppersection($card, 'sixes', 6);
                break;
            case 7:
                $this->checkOfKind($card, 'three-of-kind', 3);
                break;
            case 8:
                $this->checkOfKind($card, 'four-of-kind', 4);
                break;
            case 9:
                $this->checkFullHouse($card);
                break;
            case 10:
                $this->checkSmallStraight($card);
                break;
            case 11:
                $this->checkLargeStraight($card);
                break;
            case 12:
                $this->checkChance($card);
                break;
            case 13:
                $this->checkOfKind($card, 'yatzee', 5);
                break;
        }

        $_SESSION[$card]['sum'] = $this->getSum($card);
        $_SESSION[$card]['total-score'] = $this->getTotalScore($card);
    }

    private function checkUppersection($card, $key, $value): void
    {
        $cnt_values = array_count_values($_SESSION['current-dices']);
        $_SESSION[$card][$key] = (in_array($value, array_keys($cnt_values))) ? $cnt_values[$value] * $value : 0;
    }

    private function checkOfKind($card, $key, $value): void
    {
        $cnt_values = array_count_values($_SESSION['current-dices']);

        $flag = false;
        foreach ($cnt_values as $k => $v) {
            if ($v >= $value) {
                $flag = true;
                break;
            }
        }

        $_SESSION[$card][$key] = ($flag && $value != 5) ? $this->getChance() : (($flag && $value == 5) ? 50 : 0);
    }

    private function checkFullHouse($card): void
    {
        $cnt_values = array_count_values($_SESSION['current-dices']);

        $flag_kind_of_three = false;
        $flag_pair = false;
        foreach ($cnt_values as $k => $v) {
            if ($v == 3) {
                $flag_kind_of_three = true;
            } elseif ($v == 2) {
                $flag_pair = true;
            }
        }

        $_SESSION[$card]['full-house'] = ($flag_kind_of_three && $flag_pair) ? 25 : 0;
    }

    private function checkSmallStraight($card): void
    {
        $str = $this->dicesAsString();
        $_SESSION[$card]['small-straight'] = (strpos($str, '1234') !== false || 
                                                strpos($str, '2345') !== false || 
                                                strpos($str, '3456') !== false) ? 30 : 0;
    }

    private function checkLargeStraight($card): void
    {
        $str = $this->dicesAsString();
        $_SESSION[$card]['large-straight'] = (strpos($str, '12345') !== false || 
                                                strpos($str, '23456') !== false) ? 40 : 0; 
    }

    private function checkChance($card): void
    {
        $_SESSION[$card]['chance'] = $this->getChance();
    }

    private function getChance(): int
    {
        $sum = 0;
        for ($i = 0; $i < count($_SESSION['current-dices']); $i++) {
            $sum += $_SESSION['current-dices'][$i];
        }
        return $sum;
    }

    private function dicesAsString(): string
    {
        $current_dices = $_SESSION['current-dices'];
        sort($current_dices);
        $str = '';
        for ($i = 0; $i < count($current_dices); $i++) {
            $str .= $current_dices[$i];
        }
        return $str;
    }

    private function getSum($card): int
    {
        $sum = 0;
        $sum += $_SESSION[$card]['ones'] + $_SESSION[$card]['twos'];
        $sum += $_SESSION[$card]['threes'] + $_SESSION[$card]['fours'];
        $sum += $_SESSION[$card]['fives'] + $_SESSION[$card]['sixes'];
        return $sum;
    }

    private function getTotalScore($card): int
    {
        $sum = $this->getSum($card);
        $sum += $_SESSION[$card]['three-of-kind'] + $_SESSION[$card]['four-of-kind'];
        $sum += $_SESSION[$card]['full-house'];
        $sum += $_SESSION[$card]['small-straight'] + $_SESSION[$card]['large-straight'];
        $sum += $_SESSION[$card]['chance'] + $_SESSION[$card]['yatzee'];
        return $sum;
    }
}
