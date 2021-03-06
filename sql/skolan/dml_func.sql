USE skolan;

-- Make a SELECT statemnt which prints (förnamn-efternamn-avdelning) in the same column according to the following structure.
SELECT CONCAT_WS(" ", fornamn, efternamn, (avdelning)) AS "Kontatenerat"
	FROM larare
;

-- Do the same thing but print the name of the department in small letters and limit the printout to 3 lines.
SELECT CONCAT_WS(" ", fornamn, efternamn, CONCAT("(",LOWER(avdelning),")")) AS "Kontatenerat"
	FROM larare
;

-- Write a SELECT statement that only shows today's date.
SELECT CURDATE() AS "Dagens datum";

-- Make a SELECT statement that shows all teachers, their year of birth and today's date and time.
SELECT fornamn, fodd, CURDATE() AS "Dagens datum", CURRENT_TIME() AS "Klockslag"
	FROM larare
;

-- Write a SELECT statement that calculates the teacher's age, sort the report to show who is the oldest and youngest.
SELECT fornamn, fodd, TIMESTAMPDIFF(YEAR, fodd, CURDATE()) AS "Ålder"
	FROM larare
    ORDER BY Ålder DESC
;

-- Write a SELECT statement that calculates the teacher's age, sort the report to show who is the oldest and youngest.
SELECT fornamn, fodd, MONTHNAME(fodd) AS "Månad"
	FROM larare
    WHERE MONTH(fodd) = 4
;

-- Show the teachers who were born in the 40s.
SELECT fornamn, fodd, MONTHNAME(fodd) AS "Månad"
	FROM larare
    WHERE YEAR(fodd) BETWEEN 1940 AND 1949
;

