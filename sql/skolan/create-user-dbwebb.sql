DROP USER IF EXISTS 'dbwebb' @'%';

CREATE USER 'dbwebb'@'%'
IDENTIFIED
WITH mysql_native_password
BY 'password'
;

GRANT ALL PRIVILEGES
ON *. *
TO 'dbwebb'@'%'
WITH GRANT OPTION
;

/* SHOW VARIABLES LIKE "%version%"; */

/*
SELECT
	User,
    Host,
    Grant_priv,
    plugin
FROM mysql.user
WHERE
	User IN ('root', 'dbwebb', 'user')
ORDER BY User
;
*/