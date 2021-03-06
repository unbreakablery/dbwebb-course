USE skolan;

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
