<?php include("inc/connect.php"); ?>

<?php
    $page_title = "Om";
    $page = "documentation";
?>

<?php include("inc/view/header.php"); ?>

<nav class="multipage-nav">
    <a href="about.php?page=nattraby-vagmuseum">Om Nättraby vägmuseum</a>
    <a href="about.php?page=om-vagmuseum">Om tillkomsten</a>
    <a href="about.php?page=om-invigning">Om invigning</a>
    <a href="about.php?page=om-vagmuseum-natet">NVM på nätet</a>
    <a href="about.php?page=om-projektet">Om projektet</a>
    <a href="me.php">Hemsidans skapare</a>
    <a href="about.php?page=kontakt">Kontakt</a>
</nav>
<main class="site-main">
    <div class="content">
        <h1>Documentation</h1>
        <p class="doc-sub-title">
            Code Structure
        </p>
        <p>
            <ul>
                <li>
                    /css
                    <ul>
                        <li>style.css</li>
                    </ul>
                </li>
                <li>
                    /db
                    <ul>
                        <li>nvm.sqlite (Doesn't use this old db.)</li>
                        <li>nvm2.sqlte</li>
                    </ul>
                </li>
                <li>
                    /img
                    <ul>
                        <li>/80x80</li>
                        <li>/150x150</li>
                        <li>/250</li>
                        <li>/500</li>
                        <li>/800</li>
                        <li>/orig</li>
                        <li>/background</li>
                        <li>favicon.png</li>
                        <li>me.jpg</li>
                    </ul>
                </li>
                <li>
                    /inc
                    <ul>
                        <li>
                            /view
                            <ul>
                                <li>header.php</li>
                                <li>footer.php</li>
                            </ul>
                        </li>
                        <li>config.php</li>
                        <li>connect.php (Get db connection)</li>
                    </ul>
                </li>
                <li>objects.php (multiple page control)</li>
                <li>articles.php (multiple page control)</li>
                <li>about.php (multiple page control)</li>
                <li>documentation.php</li>
                <li>index.php</li>
                <li>me.php</li>
            </ul>
            This site was built by PHP, SQLite, HTML and CSS.
            Objects, articles, about pages have multiple page controls by $_GET global variable, and coming from database.
        </p>
        <p class="doc-sub-title">
            Site works responsively
        </p>
        <p class="pull-left-20">
            Now, this site works responsively by media query in css(max-width: 1200px, 980px, 768px) on Google Chrome and Firefox browsers.
        </p>
        <p>
            Note: You can see - <strong><a href="me.php">about me</a></strong> - in here.
        </p>
    </div>
</main>

<?php include("inc/view/footer.php"); ?>