-- Create table: larare
-- Drop tables in order to avoid FK constraint


DROP TABLE IF EXISTS larare;


CREATE TABLE larare
(
    akronym CHAR(3),
    avdelning CHAR(4),
    fornamn VARCHAR(20),
    efternamn VARCHAR(20),
    kon CHAR(1),
    lon INT,
    fodd DATE,

    PRIMARY KEY (akronym)
);




-- Update table larare and larare_pre to use same charset
-- and collation.
--
ALTER TABLE larare CONVERT TO CHARSET UTF8MB4 COLLATE UTF8MB4_swedish_ci;
ALTER TABLE larare_pre CONVERT TO CHARSET UTF8MB4 COLLATE UTF8MB4_swedish_ci;

-- Drop tables in order to avoid FK constraint
--
SET NAMES 'UTF8MB4';

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

-- Add column 'kompetens' (type: INT) to table 'larare'
ALTER TABLE larare ADD COLUMN kompetens INT;

-- Delete column 'kompetens' from table 'larare'
ALTER TABLE larare DROP COLUMN kompetens;

-- Add column 'kompetens' (type: INT) to table 'larare' and set default value to 1, and set column so that it cannot contain NULL values
ALTER TABLE larare ADD COLUMN kompetens INT DEFAULT 1 NOT NULL;

--
-- Make copy of table
--
DROP TABLE IF EXISTS larare_pre;
CREATE TABLE larare_pre LIKE larare;
INSERT INTO larare_pre SELECT * FROM larare;

DROP VIEW IF EXISTS v_name_alder;

DROP VIEW IF EXISTS v_larare;

-- Create the view
CREATE VIEW v_name_alder
AS
SELECT
    CONCAT(fornamn, ' ', efternamn, ' (', LOWER(avdelning), ')') AS Namn,
    TIMESTAMPDIFF(YEAR, fodd, CURDATE()) AS Ålderr
FROM larare;

-- Use the view
SELECT * FROM v_name_alder;

--Create a v_larare view that contains all the columns from the Lärare table, including a new column with the teacher's age.
CREATE VIEW v_larare
AS
SELECT
	*, TIMESTAMPDIFF(YEAR, fodd, CURDATE()) AS "Ålder"
    FROM larare
;

-- Make a SELECT statement against the view that calculates the average age of each department. 
-- View the department's name and average age sorted by average age.
SELECT avdelning, ROUND(AVG(Ålder),0) AS "Snittålder"
	FROM v_larare
    GROUP BY avdelning
    ORDER BY Snittålder DESC
;

INSERT INTO larare_pre SELECT * FROM larare;

ALTER TABLE larare ADD COLUMN kompetens INT;

ALTER TABLE larare DROP COLUMN kompetens;

ALTER TABLE larare ADD COLUMN kompetens INT NOT NULL DEFAULT 1;

SELECT * FROM larare;

SHOW CREATE TABLE kurs;

SHOW CREATE TABLE kurstillfalle;

-- JOIN

SELECT
	l.akronym,
    l.lon,
    l.kompetens,
    p.lon AS "pre-lon",
    p.kompetens AS "pre-kompetens"
FROM larare as l
	JOIN larare_pre AS p
		ON l.akronym = p.akronym
ORDER BY akronym
;

-- Save the report as a v_lonerevision view.
DROP VIEW IF EXISTS v_lonerevision;

CREATE VIEW v_lonerevision
	AS
SELECT
	l.akronym,
    l.fornamn,
    l.efternamn,
    p.lon AS "pre",
    l.lon AS "nu",
	(l.lon - p.lon) AS "diff",
    ROUND(((l.lon - p.lon)/p.lon)*100,2) AS "proc",
    IF(ROUND(((l.lon - p.lon)/p.lon)*100,2)>3, "ok", "nok") AS "mini",
    p.kompetens AS "prekomp",
    l.kompetens AS "nukomp",
	(l.kompetens - p.kompetens) AS "diffkomp"
FROM larare as l
	JOIN larare_pre AS p
		ON l.akronym = p.akronym
;
