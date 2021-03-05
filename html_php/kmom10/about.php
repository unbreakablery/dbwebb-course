<?php include("inc/connect.php"); ?>

<?php
    $page_title = "Om";

    if (!isset($_GET['page'])) {
        $page = "nattraby-vagmuseum";
    } else {
        $page = $_GET['page'];
    }
   
    $stmt = $db->prepare("SELECT * FROM article WHERE name = '$page'");
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

<nav class="multipage-nav">
    <a href="?page=nattraby-vagmuseum" class="<?php if ($page == "nattraby-vagmuseum") { ?>selected-multipage<?php } ?>">Om Nättraby vägmuseum</a>
    <a href="?page=om-vagmuseum" class="<?php if ($page == "om-vagmuseum") { ?>selected-multipage<?php } ?>">Om tillkomsten</a>
    <a href="?page=om-invigning" class="<?php if ($page == "om-invigning") { ?>selected-multipage<?php } ?>">Om invigning</a>
    <a href="?page=om-vagmuseum-natet" class="<?php if ($page == "om-vagmuseum-natet") { ?>selected-multipage<?php } ?>">NVM på nätet</a>
    <a href="?page=om-projektet" class="<?php if ($page == "om-projektet") { ?>selected-multipage<?php } ?>">Om projektet</a>
    <a href="me.php">Hemsidans skapare</a>
    <a href="?page=kontakt" class="<?php if ($page == "kontakt") { ?>selected-multipage<?php } ?>">Kontakt</a>
</nav>
<main class="site-main">
    <div class="content">
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
</main>

<?php include("inc/view/footer.php"); ?>