-- Skapar databas 'skolan'
-- DROP DATABASE IF EXISTS skolan

CREATE DATABASE IF NOT EXISTS skolan;

USE skolan;

/* DROP DATABASE skolan; */


/* SHOW DATABASES LIKE "%skolan%"; */

/* SHOW VARIABLES LIKE 'validate_password%'; */
/* SET GLOBAL validate_password.length = 4; */

DROP USER IF EXISTS 'user'@'%';

CREATE USER 'user'@'%'
IDENTIFIED
WITH mysql_native_password
BY 'pass'
;

GRANT ALL PRIVILEGES
	ON *. *
		TO 'user'@'%'
;

SHOW GRANTS FOR 'user'@'%';

