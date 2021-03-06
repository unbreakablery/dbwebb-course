-- Av Benaris till kursen databas
-- 2021-02-10
--

SET NAMES 'UTF8MB4';

DROP TABLE IF EXISTS person;
CREATE TABLE person
(
    fornamn VARCHAR(10)
);

INSERT INTO person VALUES
("Örjan"), ("Börje"), ("Bo"), ("Øjvind"),
("Åke"), ("Åkesson"), ("Arne"), ("Ängla"),
("Ægir")
;

SELECT * FROM person;

SHOW CHARSET LIKE 'latin1';

SHOW COLLATION WHERE Charset = 'latin1';

SHOW CHARSET LIKE 'UTF8MB4';

ALTER TABLE person CONVERT TO CHARSET UTF8MB4 COLLATE UTF8MB4_swedish_ci;

SELECT * FROM person ORDER BY fornamn;
