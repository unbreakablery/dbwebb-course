


-- Select sum of values from column 'lon' and sum of values from column 'kompetens'
/*
SELECT
    SUM(lon) AS Lönesummaa,
    SUM(kompetens) AS Kompetens 
FROM larare
;
*/

-- Shows the total salary pot
/*
SELECT sum(lon) + (sum(lon) * 0.064) AS bonus_total FROM larare;
*/

-- Increases Albus' 'kompetens' to 7 and salary to 85,000
UPDATE larare
	SET
		lon = 85000, 
        kompetens = 7
	WHERE 
		fornamn = 'Albus'
;

-- Increases Minerva's salary by 4,000
UPDATE larare
	SET
		lon = lon + 4000
	WHERE
		fornamn = 'Minerva'
;

-- Increases Argus' salary by 2,000 and sets 'kompetens' to 3
UPDATE larare
	SET
		lon = lon + 2000,
        kompetens = 3
	WHERE
		fornamn = 'Argus'
;
 
-- Reduces Gyllenroy's and Alastor's salary by 3,000    
UPDATE larare
	SET
		lon = lon - 3000
	WHERE
		fornamn = 'Gyllenroy' OR fornamn = 'Alastor'
;

-- Gives teachers from DIDD department salary bonus of 2%
UPDATE larare
	SET
		lon = lon + (lon * 0.02)
	WHERE
		avdelning = 'DIDD'
;

-- Gives female teachers, who earn less than 40,000, a salary adjustment of extra 3%
UPDATE larare
	SET
		lon = lon + (lon * 0.03)
	WHERE
		kon = 'K' AND lon < 40000
;

-- Increases Snape's, Minerva's and Hagrid's salary by 5,000 and competency by 1
UPDATE larare
	SET
		lon = lon + 5000,
        kompetens = kompetens + 1
	WHERE
		efternamn = 'Snape' OR fornamn = 'Minerva' OR fornamn = 'Hagrid'
;

-- Gives all teachers, except Albus, Snape, Minerva and Hagrid, an increase of 2.2%
UPDATE larare
	SET 
		lon = lon + (lon * 0.022)
	WHERE fornamn <> 'Albus' AND efternamn <> 'Snape' AND fornamn <> 'Minerva' AND fornamn <> 'Hagrid'
;
   
-- Shows new total wage bill 
/*
SELECT SUM(lon) FROM larare;
*/

-- Shows the percentage of wage sum increase
/*
SELECT (sum(lon)-305000)/30500 FROM larare;
*/

-- Shows total 'kompetens'
/*
SELECT SUM(kompetens) FROM larare;
*/

