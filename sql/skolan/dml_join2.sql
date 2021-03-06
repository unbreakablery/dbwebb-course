--
-- A crossjoin
--
SELECT * FROM kurs, kurstillfalle; 

--
-- Join using WHERE
--
SELECT *
FROM kurs AS k, kurstillfalle AS kt
WHERE k.kod = kt.kurskod
;

--
-- Join three tables
--
SELECT *
FROM kurs AS k
    JOIN course AS kt
        ON k.kod = kt.kurskod
    JOIN larare AS l
        ON l.akronym = kt.kursansvarig
        ;

DROP VIEW IF EXISTS v_planering;

--
-- Create view
--
CREATE VIEW v_planering
AS
SELECT *
FROM kurs AS k
    JOIN course AS kt
        ON k.kod = kt.kurskod
    JOIN larare AS l
        ON l.akronym = kt.kursansvarig;

--
-- Use view
--
SELECT * FROM v_planering;

SELECT l.akronym, fornamn, count(l.akronym) as Tillfällen
FROM kurs AS k
    JOIN kurstillfalle AS kt
        ON k.kod = kt.kurskod
    JOIN larare AS l
        ON l.akronym = kt.kursansvarig
	GROUP by l.akronym
    ORDER by Tillfällen desc;

SELECT akronym, fornamn, efternamn, fodd, YEAR(CURDATE()) - YEAR(fodd) AS född
FROM larare AS k
	GROUP by akronym
    order by född desc limit 3;
    
    SELECT
    CONCAT(k.namn, " (", k.kod, ")") AS kursnamn,
    CONCAT(l.fornamn, " ", l.efternamn, " (", l.akronym, ")") AS larare,
    TIMESTAMPDIFF(
        YEAR,
        fodd,
        CURDATE()
    ) AS alder
FROM
    (
        SELECT
            larare.akronym,
            larare.fornamn,
            larare.efternamn,
            larare.fodd,
            TIMESTAMPDIFF(YEAR, fodd, CURDATE()) AS alder
        FROM larare
            JOIN kurstillfalle
                ON larare.akronym = kurstillfalle.kursansvarig
            GROUP BY
                larare.akronym,
                larare.fornamn,
                larare.efternamn,
                larare.fodd,
                alder
            ORDER BY alder DESC
            LIMIT 3
    ) AS l
    JOIN kurstillfalle AS kt
        ON l.akronym = kt.kursansvarig
    JOIN kurs as k
        ON k.kod = kt.kurskod
    ORDER BY alder DESC
    ;
