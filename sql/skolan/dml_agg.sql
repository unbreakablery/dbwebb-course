USE skolan;

-- SELECT MAX(lon) AS "Maxlön"
--	FROM larare
-- ;

-- SELECT MIN(lon) AS "Minlön"
--	FROM larare
-- ;

-- SELECT AVG(kompetens) AS "Medelkompetens"
--	FROM larare
--	GROUP BY avdelning
-- ;

-- SELECT avdelning, kompetens, SUM(lon) as Summa
--	FROM larare
--    GROUP BY avdelning, kompetens
--    ORDER BY Summa DESC
-- ;

-- How many teachers work in the respective departments?
SELECT avdelning AS "Avdelning", COUNT(akronym) AS "Antal lärare"
FROM larare
GROUP BY avdelning;

-- How much does each department pay in salary each month?
SELECT avdelning AS "Avdelning", SUM(lon) AS "Lönesumma"
FROM larare
GROUP BY avdelning;

-- How much is the average salary for the various departments?
SELECT avdelning AS "Avdelning", AVG(lon) AS "Lönesnitt"
FROM larare
GROUP BY avdelning;

-- How much is the average salary for women versus men?
SELECT kon AS "Kön", AVG(lon) AS "Lönesnitt"
FROM larare
GROUP BY kon;

-- Show the average of the competence(kompetens) for all departments,
-- Sort skills in descending order and show only the department with the highest competence(kompetens). 
SELECT avdelning AS "Avdelning", AVG(kompetens) AS "Kompetenssnitt"
FROM larare
GROUP BY avdelning
ORDER BY Kompetenssnitt DESC LIMIT 1;

-- Show the rounded average salary (ROUND ()) grouped by department and by competence,
-- Sort by department and average salary, also show how many match in each group.
SELECT avdelning AS "Avdelning", kompetens, ROUND(AVG(lon),0) AS "Lönesnitt", COUNT(kompetens) AS "Antal"
FROM larare 
GROUP BY avdelning, kompetens
ORDER BY avdelning, Lönesnitt;

--
-- Aggregerande funktioner HAVING
--

SELECT avdelning, ROUND(AVG(lon)) AS Snittlon, COUNT(lon) AS Antal
FROM larare
GROUP BY avdelning
ORDER BY ROUND(AVG(lon)) DESC;

SELECT avdelning, ROUND(AVG(lon)) AS Snittlon, COUNT(lon) AS Antal
FROM larare
GROUP BY avdelning
HAVING Snittlon > 35000
ORDER BY Snittlon DESC;

SELECT avdelning, ROUND(AVG(lon)) AS Snittlon, COUNT(lon) AS Antal
FROM larare
GROUP BY avdelning
HAVING Antal >= 3
ORDER BY Snittlon DESC;

-- Om WHERE kontra HAVING

SELECT avdelning, ROUND(AVG(lon)) AS Snittlon, COUNT(lon) AS Antal
FROM larare
WHERE kompetens = 1
GROUP BY avdelning
HAVING Snittlon < 30000
ORDER BY avdelning;

-- Visa per avdelning hur många anställda det finns, gruppens snittlön, sortera per avdelning och snittlön.
SELECT avdelning, ROUND(AVG(lon),0) AS "Snittlon", COUNT(akronym) AS "Antal"
FROM larare
GROUP BY avdelning
ORDER BY avdelning, Snittlon;

-- Visa samma sak som i 1), men visa nu även de kompetenser som finns. Du behöver gruppera på avdelning och 
-- per kompetens, sortera per avdelning och per kompetens.

SELECT avdelning, kompetens, ROUND(AVG(lon),0) AS "Snittlon", COUNT(akronym) AS "Antal"
FROM larare
GROUP BY avdelning, kompetens
ORDER BY avdelning, kompetens DESC;

-- Visa samma sak som i 2), men ignorera de kompetenser som är större än 3.
SELECT avdelning, kompetens, ROUND(AVG(lon),0) AS "Snittlon", COUNT(akronym) AS "Antal"
FROM larare
WHERE kompetens <= 3
GROUP BY avdelning, kompetens
ORDER BY avdelning, kompetens DESC;

-- Visa samma sak som i 3), men exkludera de grupper som har fler än 1 deltagare och inkludera de som har 
-- snittlön mellan 30 000 - 45 000. Sortera per snittlön.
SELECT avdelning, kompetens, ROUND(AVG(lon),0) AS "Snittlon", COUNT(akronym) AS "Antal"
FROM larare
GROUP BY avdelning, kompetens
HAVING (Snittlon BETWEEN 30000 AND 45000) AND Antal <= 1
ORDER BY Snittlon DESC;
