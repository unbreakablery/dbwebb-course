<?php include("inc/connect.php"); ?>

<?php
    $stmt = $db->prepare("SELECT id, name, title FROM object");
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $links = array();
    foreach ($res as $row) {
        array_push($links, $row);   
    }
    $page_title = "Objekt";

    if (!isset($_GET['page'])) {
        $page = "halvagen";
    } else {
        $page = $_GET['page'];
    }

    $stmt = $db->prepare("SELECT * FROM object WHERE name = '$page'");
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $title = $res[0]['title'];
    $gps = $res[0]['gps'];
    $image1 = "../img/800/" . $res[0]['image1'];
    $image1_alt = $res[0]['image1Alt'];
    $image1_text = $res[0]['image1Text'];

    $content = $res[0]['data'];

    if ($res[0]['image2'] != "") {
        $image2 = "../img/800/" . $res[0]['image2'];
        $image2_alt = $res[0]['image2Alt'];
        $image2_text = $res[0]['image2Text'];
    }
?>

<?php include("inc/view/header.php"); ?>

<main class="site-main">
    <div class="content">
        <div class="left-menu">
            <ul class="left-menu-list">
                <?php foreach ($links as $link) { ?>
                    <li>
                        <a href="objects.php?page=<?php echo $link['name']; ?>" class="<?php if ($link['name'] == $page) { ?>selected<?php } ?>"><?php echo $link['title']; ?></a>
                    </li>
                <?php } ?>
            </ul>
        </div>
        <div class="object-content">
            <h1><?php echo $title; ?></h1>
            
            <p><?php echo $gps; ?></p>
            <p><img src="<?php echo $image1; ?>" alt="<?php echo $image1_alt; ?>"></p>
            <p><?php echo $image1_text; ?></p>

            <?php echo $content; ?>
            
            <?php if ($res[0]['image2'] != "") { ?>
                <p><img src="<?php echo $image2; ?>" alt="<?php echo $image2_alt; ?>"></p>
                <p><?php echo $image2_text; ?></p>
            <?php } ?>
        </div>
    </div>
</main>
    
<?php include("inc/view/footer.php"); ?>