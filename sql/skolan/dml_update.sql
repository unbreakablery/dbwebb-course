

-- In table 'larare', set 'lon' to 30000 for all records which have 'lon' equal to zero
UPDATE larare
	SET
		lon = 30000
	WHERE
		lon IS NULL
;


-- Select all records from 'larare' table, but order them by 'lon'

SELECT akronym, avdelning, fornamn, kon, lon, kompetens
FROM larare
ORDER BY lon DESC;



