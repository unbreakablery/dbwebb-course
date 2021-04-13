<?php

declare(strict_types=1);

namespace Mos\Functions;

use Twig\Loader\FilesystemLoader;
use Twig\Environment;

/**
 * Functions.
 */


/**
 * Get the route path representing the page being requested.
 *
 * @return string with the route path requested.
 */
function getRoutePath(): string
{
    $offset = strlen(dirname($_SERVER["SCRIPT_NAME"]));
    $path   = substr($_SERVER["REQUEST_URI"], $offset);

    return $path;
}



/**
 * Render the view and return its rendered content.
 *
 * @param string $template to use when rendering the view.
 * @param array  $data     send to as variables to the view.
 *
 * @return string with the route path requested.
 */
function renderView(
    string $template,
    array $data = []
): string {
    extract($data);

    ob_start();
    require INSTALL_PATH . "/view/$template";
    $content = ob_get_contents();
    ob_end_clean();

    return ($content ? $content : "");
}



/**
 * Use Twig to render a view and return its rendered content.
 *
 * @param string $template to use when rendering the view.
 * @param array  $data     send to as variables to the view.
 *
 * @return string with the route path requested.
 */
function renderTwigView(
    string $template,
    array $data = []
): string {
    static $loader = null;
    static $twig = null;

    if (is_null($twig)) {
        $loader = new FilesystemLoader(
            INSTALL_PATH . "/view/twig"
        );
        // $twig = new \Twig\Environment($loader, [
        //     "cache" => INSTALL_PATH . "/cache/twig",
        // ]);
        $twig = new Environment($loader);
    }

    return $twig->render($template, $data);
}



/**
 * Send a response to the client.
 *
 * @param int    $status   HTTP status code to send to client.
 *
 * @return void
 */
function sendResponse(string $body, int $status = 200): void
{
    http_response_code($status);
    echo $body;
}



/**
 * Redirect to an url.
 *
 * @param string $url where to redirect.
 *
 * @return void
 */
function redirectTo(string $url): void
{
    http_response_code(200);
    header("Location: $url");
}



/**
 * Create an url into the website using the path and prepend the baseurl
 * to the current website.
 *
 * @param string $path to use to create the url.
 *
 * @return string with the route path requested.
 */
function url(string $path): string
{
    return getBaseUrl() . $path;
}



/**
 * Get the base url from the request, relative to the htdoc/ directory.
 *
 * @return string as the base url.
 */
function getBaseUrl()
{
    static $baseUrl = null;

    if ($baseUrl) {
        return $baseUrl;
    }

    $scriptName = rawurldecode($_SERVER["SCRIPT_NAME"]);
    $path = rtrim(dirname($scriptName), "/");

    // Prepare to create baseUrl by using currentUrl
    $parts = parse_url(getCurrentUrl());

    // Build the base url from its parts
    $siteUrl = "{$parts["scheme"]}://{$parts["host"]}"
        . (isset($parts["port"])
            ? ":{$parts["port"]}"
            : "");
    $baseUrl = $siteUrl . $path;

    return $baseUrl;
}



/**
 * Get the current url of the request.
 *
 * @return string as current url.
 */
function getCurrentUrl(): string
{
    $scheme = $_SERVER["REQUEST_SCHEME"];
    $server = $_SERVER["SERVER_NAME"];

    $port  = $_SERVER["SERVER_PORT"];
    $port  = ($port === "80")
        ? ""
        : (($port === 443 && $_SERVER["HTTPS"] === "on")
            ? ""
            : ":" . $port);

    $uri = rtrim(rawurldecode($_SERVER["REQUEST_URI"]), "/");

    $url  = htmlspecialchars($scheme) . "://";
    $url .= htmlspecialchars($server)
        . $port . htmlspecialchars(rawurldecode($uri));

    return $url;
}



/**
 * Destroy the session.
 *
 * @return void
 */
function destroySession(): void
{
    $_SESSION = [];

    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"],
            $params["secure"],
            $params["httponly"]
        );
    }

    session_destroy();
}



/**
 * Initialize the session.
 *
 * @return void
 */
function initSession(): void
{
    $_SESSION = [];
    $_SESSION['cnt-dices'] = 1;
    $_SESSION['dice-type'] = '';
    $_SESSION['player-points'] = 0;
    $_SESSION['computer-points'] = 0;
    $_SESSION['winner'] = '';
    $_SESSION['player-wins'] = 0;
    $_SESSION['computer-wins'] = 0;
    $_SESSION['history'] = array();
}



/**
 * Initialize the session for game setting.
 *
 * @return void
 */
function initSessionGameSetting(): void
{
    $_SESSION['cnt-dices'] = 1;
    $_SESSION['dice-type'] = 1;
    $_SESSION['player-points'] = 0;
    $_SESSION['computer-points'] = 0;
    $_SESSION['winner'] = '';
}


/**
 * Save setting options in session.
 *
 * @return void
 */
function saveSettingSession(int $cntDices, string $diceType): void
{
    $_SESSION['cnt-dices'] = $cntDices;
    $_SESSION['dice-type'] = $diceType;
}


/**
 * Initialize the session for Yatzy setting.
 *
 * @return void
 */
function initSessionYatzySetting(): void
{
    $_SESSION['current-dices'] = array(0, 0, 0, 0, 0);
    $_SESSION['current-round'] = 1;
    $_SESSION['current-roll-cnt'] = 0;
    $_SESSION['end-flag'] = false;
    $_SESSION['winner'] = '';
    $_SESSION['scorecard-you'] = array(
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
    );
    $_SESSION['scorecard-computer'] = array(
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
    );
}


/**
 * Get round title from ground number.
 *
 * @return void
 */
function getRoundTitle($round): string
{
    $roundTitle = '';
    switch ($round) {
        case 1:
            $roundTitle = 'Ones';
            break;
        case 2:
            $roundTitle = 'Twos';
            break;
        case 3:
            $roundTitle = 'Threes';
            break;
        case 4:
            $roundTitle = 'Fours';
            break;
        case 5:
            $roundTitle = 'Fives';
            break;
        case 6:
            $roundTitle = 'Sixes';
            break;
        case 7:
            $roundTitle = 'Three Of a Kind';
            break;
        case 8:
            $roundTitle = 'Four Of a Kind';
            break;
        case 9:
            $roundTitle = 'Full House';
            break;
        case 10:
            $roundTitle = 'Small Straight';
            break;
        case 11:
            $roundTitle = 'Large Straight';
            break;
        case 12:
            $roundTitle = 'Chance';
            break;
        case 13:
            $roundTitle = 'YATZEE';
            break;
        default:
            $roundTitle = 'Unknown';
    }

    return $roundTitle;
}
