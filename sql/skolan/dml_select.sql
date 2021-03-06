
/* Selects all records from table 'larare' where 'avdelning' is 'DIDD' */
SELECT * FROM larare
WHERE avdelning = 'DIDD';

/* Selects all records from table 'larare' where 'akronym' begins with letter 'h' */
SELECT * FROM larare
WHERE akronym LIKE 'h%';

/* Selects all records from table 'larare' where first name contains the letter 'o' */
SELECT * FROM larare
WHERE fornamn LIKE '%o%';

/* Selects all records from table 'larare' where teachers earn between 30,000 and 50,000 */
SELECT * FROM larare
WHERE lon >= 30000 AND lon <= 50000;

/* Selects all records from table 'larare' where teacher's 'kompetens' is below 7 and 'lon' is greater than 40,000 */
SELECT * FROM larare
WHERE kompetens < 7 and lon > 40000;

/* Selects all records from table 'larare' where teacher's 'akronym' is either 'sna', 'dum' or 'min' */
SELECT * FROM larare
WHERE akronym in ('sna', 'dum', 'min');

/* Selects all records from table 'larare' where teacher's have salary over 80,000, together with teachers who have a competence of 2 and work in the ADM department */
SELECT * FROM larare
WHERE  lon > 80000 OR (kompetens = 2 AND avdelning = 'ADM');

/* Only print out the names of all the teachers and what they earn */
SELECT fornamn, efternamn, lon from larare;

/* Sort the list by last name, in ascending order */
SELECT fornamn, efternamn, lon FROM larare
ORDER BY efternamn ASC;

/* Sort the list by last name, in descending order */
SELECT fornamn, efternamn, lon FROM larare
ORDER BY efternamn DESC;

/* Sorts the list by salary, in ascending order */
SELECT fornamn, efternamn, lon FROM larare
ORDER BY lon ASC;

/* Sorts the list by salary, in descending order */
SELECT fornamn, efternamn, lon FROM larare
ORDER BY lon DESC;

/* Shows the three top earning teachers */
SELECT fornamn, efternamn, lon FROM larare
ORDER BY lon DESC
LIMIT 3;

/* Adds the 'avdelning' column to the report and calls it 'Avdelning' */
SELECT
    fornamn AS 'Lärare',
    lon AS 'Lön',
    avdelning AS 'Avdelning'
FROM larare;

