- 
- Outer join, include teachers without teaching 
- 
SELECT  DISTINCT 
    l.akronym AS Acronym,
     CONCAT (first name, "" , last name) AS Name,
    l.avdelning AS Avdelning ,
    kt.kurskod AS Course code
 FROM larare AS l
     LEFT  OUTER  JOIN kurstillfalle AS kt
         ON l.akronym = kt.kursansvarig
;

- 
- Right Outer join
- 
SELECT  DISTINCT 
	l.akronym AS Akronym,
	CONCAT (first name, "" , last name) AS Name,
	l.avdelning AS Avdelning ,
    kt.kurskod AS Kurskod
FROM larare AS l
	RIGHT  OUTER  JOIN kurstillfalle AS kt
		ON l.akronym = kt.kursansvarig
;

-
- Kurser utan kurstillfällen
-
SELECT
	k.kod,
	k.namn,
	kt.lasperiod AS lasperiod
FROM
	kurs AS k
LEFT OUTER JOIN kurstillfalle AS kt ON k.kod = kt.kurskod
WHERE 
	lasperiod IS NULL