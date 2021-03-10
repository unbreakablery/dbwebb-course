<!doctype html>
<html lang="sv">
<head>
    <meta charset="utf-8">
    <title><?php echo $page_title; ?> | <?php echo $site_name; ?></title>
    <link rel="stylesheet" href="css/style.css">
    <link rel='shortcut icon' href='img/favicon.png'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0">
</head>

<body>
    <header class="site-header">
        <a href="index.php"><span class="site-title"><em>Nättraby</em> Vägmuseum</span></a>
        <nav class="site-navbar">
            <a class="<?php if ($page_title == 'Objekt') { ?>selected<?php } ?>" href="objects.php">Objekt</a>
            <a class="<?php if ($page_title == 'Artiklar') { ?>selected<?php } ?>" href="articles.php">Artiklar</a>
            <a class="<?php if ($page_title == 'Om') { ?>selected<?php } ?>" href="about.php">Om</a>
        </nav>
    </header>