-
- subquery
-
SELECT
	*
FROM kurstillfalle
WHERE
	kursansvarig IN (
		SELECT
			akronym  
		FROM 
			larare
		WHERE
			avdelning  = 'DIDD'
	)
;

-
- subquery WITH UNION
-
(
    SELECT akronym, avdelning FROM larare WHERE avdelning = 'DIDD'
)
UNION
(
    SELECT akronym, avdelning FROM larare WHERE avdelning = 'DIPT'
)
;

-
- Task Subquery
-
SELECT
	akronym,
	fornamn,
	efternamn,
	�lder
FROM 
	v_larare
WHERE
	�lder = (SELECT MAX(�lder) FROM v_larare)
;