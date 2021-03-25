-- MariaDB dump 10.18  Distrib 10.4.17-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: exam
-- ------------------------------------------------------
-- Server version	10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `breed`
--

DROP TABLE IF EXISTS `breed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `breed` (
  `breed_id` varchar(10) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `approve` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`breed_id`),
  UNIQUE KEY `unique_breed_id` (`breed_id`),
  KEY `index_approve` (`approve`),
  FULLTEXT KEY `fulltext_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `breed`
--

LOCK TABLES `breed` WRITE;
/*!40000 ALTER TABLE `breed` DISABLE KEYS */;
INSERT INTO `breed` VALUES ('br','Blandras','No'),('pv','Portugisisk vattenhund','Yes'),('sb','Sankt bernhardshund','Yes'),('sc','Schafer','Yes');
/*!40000 ALTER TABLE `breed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dog`
--

DROP TABLE IF EXISTS `dog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dog` (
  `dog_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `breed_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`dog_id`),
  UNIQUE KEY `unique_dog_id` (`dog_id`),
  KEY `breed_id` (`breed_id`),
  FULLTEXT KEY `fulltext_name` (`name`),
  CONSTRAINT `dog_ibfk_1` FOREIGN KEY (`breed_id`) REFERENCES `breed` (`breed_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dog`
--

LOCK TABLES `dog` WRITE;
/*!40000 ALTER TABLE `dog` DISABLE KEYS */;
INSERT INTO `dog` VALUES (1,'Batsman','https://sv.wikipedia.org/wiki/Vi_p%C3%A5_Saltkr%C3%A5kan','sb'),(2,'Bo','https://sv.wikipedia.org/wiki/Bo_(hund)','pv'),(3,'Arleekin','https://sv.wikipedia.org/wiki/Pavlovs_hundar','br'),(4,'Laska','https://sv.wikipedia.org/wiki/Pavlovs_hundar','br'),(5,'Zloday','https://sv.wikipedia.org/wiki/Pavlovs_hundar','br'),(6,'Sunny','https://sv.wikipedia.org/wiki/Bo_(hund)','pv'),(7,'Lajka','https://sv.wikipedia.org/wiki/Lajka','br'),(8,'Skeppshunden Bamse','https://sv.wikipedia.org/wiki/Skeppshunden_Bamse','sb');
/*!40000 ALTER TABLE `dog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `unique_member_id` (`member_id`),
  KEY `index_city` (`city`),
  FULLTEXT KEY `fulltext_name` (`first_name`,`last_name`,`alias`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'Barrack','Obama','the president','Washington'),(2,'Ivan','Pavlov','the scientist','Sankt Petersburg'),(3,'Millan','Cesar','the whisperer','Santa Clarita'),(4,'Hafto','Erling','the captain','Honningsvag'),(5,'Tjorven','Grankvist','tjorven','Saltkrakan');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member2dog`
--

DROP TABLE IF EXISTS `member2dog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member2dog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `dog_id` int(11) NOT NULL,
  `registered` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_registered` (`registered`),
  KEY `member_id` (`member_id`),
  KEY `dog_id` (`dog_id`),
  CONSTRAINT `member2dog_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE,
  CONSTRAINT `member2dog_ibfk_2` FOREIGN KEY (`dog_id`) REFERENCES `dog` (`dog_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member2dog`
--

LOCK TABLES `member2dog` WRITE;
/*!40000 ALTER TABLE `member2dog` DISABLE KEYS */;
INSERT INTO `member2dog` VALUES (1,1,2,2008),(2,1,6,2013),(3,2,3,1922),(4,2,4,1922),(5,2,5,1923),(6,4,8,1937),(7,5,1,1964);
/*!40000 ALTER TABLE `member2dog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'exam'
--
/*!50003 DROP PROCEDURE IF EXISTS `show_report` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `show_report`()
BEGIN
    SELECT
        m.member_id,
        CONCAT(m.first_name, ' ', m.last_name) AS member_name,
        m.alias AS member_alias,
        m.city AS member_city,
        d.name AS dog_name,
        d.url AS dog_url,
        b.name AS dog_breed,
        LOWER(b.approve) AS breed_approve,
        m2d.registered 
    FROM 
        member AS m 
    LEFT JOIN member2dog AS m2d ON m2d.member_id = m.member_id 
    LEFT JOIN dog AS d ON d.dog_id = m2d.dog_id 
    LEFT JOIN breed AS b ON b.breed_id = d.breed_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-25  1:31:47
