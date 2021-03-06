SET NAMES 'UTF8MB4';

-- Update table larare and larare_pre to use same charset
-- and collation.
--
ALTER TABLE larare CONVERT TO CHARSET UTF8MB4 COLLATE UTF8MB4_swedish_ci;
ALTER TABLE larare_pre CONVERT TO CHARSET UTF8MB4 COLLATE UTF8MB4_swedish_ci;

-- Drop tables in order to avoid FK constraint
--
DROP TABLE IF EXISTS kurstillfalle;
DROP TABLE IF EXISTS kurs;


CREATE TABLE kurs 
(
    kod CHAR(6) PRIMARY KEY NOT NULL,
    namn varchar(40),
    poang FLOAT,
    niva CHAR(3)
)
ENGINE INNODB
CHARSET UTF8MB4
COLLATE UTF8MB4_swedish_ci
;

--
-- Create table: kurstillfalle
--
CREATE TABLE kurstillfalle
(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    kurskod CHAR(6) NOT NULL,
    kursansvarig CHAR(6) NOT NULL,
    lasperiod INT NOT NULL,
    FOREIGN KEY (kurskod) REFERENCES kurs(kod),
    FOREIGN KEY (kursansvarig) REFERENCES larare(akronym)
)
ENGINE INNODB
CHARSET UTF8MB4
COLLATE UTF8MB4_swedish_ci
;

SHOW CREATE TABLE kurs;

SHOW CREATE TABLE kurstillfalle;
