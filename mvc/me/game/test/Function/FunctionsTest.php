<?php

declare(strict_types=1);

namespace Mos\Functions;

use PHPUnit\Framework\TestCase;

/**
 * Test cases for the functions in src/functions.php.
 */
class FunctionsTest extends TestCase
{
    /**
     * Test the function getRoutePath().
     */
    public function testGetRoutePath()
    {
        $res = getRoutePath();
        $this->assertEmpty($res);
    }



    /**
     * Test the function renderView().
     */
    public function testRenderView()
    {
        $res = renderView("standard.php");
        $this->assertIsString($res);
    }



    /**
     * Test the function renderView().
     */
    public function testRenderTwigView()
    {
        $res = renderTwigView("index.html");
        $this->assertIsString($res);
    }



    /**
     * Test the function url().
     */
    public function testUrl()
    {
        $res = url("/");
        $this->assertIsString($res);
    }



    /**
     * Test the function getBaseUrl().
     */
    public function testGetBaseUrl()
    {
        $res = getBaseUrl();
        $this->assertIsString($res);
    }



    /**
     * Test the function getCurrentUrl().
     */
    public function testGetCurrentUrl()
    {
        $res = getCurrentUrl();
        $this->assertIsString($res);
    }



    /**
     * Test the function destroySession().
     * @runInSeparateProcess
     */
    public function testDestroySession()
    {
        session_start();

        $_SESSION = [
            "key" => "value"
        ];

        destroySession();
        $this->assertEmpty($_SESSION);
    }



    /**
     * Test the function initSession().
     * @runInSeparateProcess
     */
    public function testInitSession()
    {
        session_start();

        initSession();
        $this->assertEquals($_SESSION, [
                                        'cnt-dices' => 1,
                                        'dice-type' => '',
                                        'player-points' => 0,
                                        'computer-points' => 0,
                                        'winner' => '',
                                        'player-wins' => 0,
                                        'computer-wins' => 0,
                                        'history' => array()]);
    }


    /**
     * Test the function initSessionGameSetting().
     * @runInSeparateProcess
     */
    public function testInitSessionGameSetting()
    {
        session_start();

        initSessionGameSetting();
        $this->assertEquals($_SESSION['cnt-dices'], 1);
        $this->assertEquals($_SESSION['dice-type'], 1);
        $this->assertEquals($_SESSION['player-points'], 0);
        $this->assertEquals($_SESSION['computer-points'], 0);
        $this->assertEquals($_SESSION['winner'], '');
    }



    /**
     * Test the function saveSettingSession().
     * @runInSeparateProcess
     */
    public function testSaveSettingSession()
    {
        session_start();

        saveSettingSession(5, 'graphical');
        $this->assertEquals($_SESSION['cnt-dices'], 5);
        $this->assertEquals($_SESSION['dice-type'], 'graphical');
    }



    /**
     * Test the function initSessionYatzySetting().
     * @runInSeparateProcess
     */
    public function testInitSessionYatzySetting()
    {
        session_start();

        initSessionYatzySetting();
        $this->assertEquals($_SESSION['current-dices'], array(0, 0, 0, 0, 0));
        $this->assertEquals($_SESSION['current-round'], 1);
        $this->assertEquals($_SESSION['current-roll-cnt'], 0);
        $this->assertEquals($_SESSION['end-flag'], false);
        $this->assertEquals($_SESSION['winner'], '');
        $this->assertEquals($_SESSION['scorecard-you'], array(
                                                            'ones' => 0,
                                                            'twos' => 0,
                                                            'threes' => 0,
                                                            'fours' => 0,
                                                            'fives' => 0,
                                                            'sixes' => 0,
                                                            'three-of-kind' => 0,
                                                            'four-of-kind' => 0,
                                                            'full-house' => 0,
                                                            'small-straight' => 0,
                                                            'large-straight' => 0,
                                                            'chance' => 0,
                                                            'yatzee' => 0,
                                                            'sum' => 0,
                                                            'total-score' => 0
                                                        ));
        $this->assertEquals($_SESSION['scorecard-computer'], array(
                                                            'ones' => 0,
                                                            'twos' => 0,
                                                            'threes' => 0,
                                                            'fours' => 0,
                                                            'fives' => 0,
                                                            'sixes' => 0,
                                                            'three-of-kind' => 0,
                                                            'four-of-kind' => 0,
                                                            'full-house' => 0,
                                                            'small-straight' => 0,
                                                            'large-straight' => 0,
                                                            'chance' => 0,
                                                            'yatzee' => 0,
                                                            'sum' => 0,
                                                            'total-score' => 0
                                                        ));
    }



    /**
     * Test the function getRoundTitle().
     */
    public function testGetRoundTitle()
    {
        $res = getRoundTitle(13);
        $this->assertEquals($res, 'YATZEE');
    }
}
