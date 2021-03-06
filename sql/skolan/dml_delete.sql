--
-- Ta bort alla värden i tabellen larare
-- Av beha20 till kursen databas
-- 2020-01-28
--


-- Delete row from table 'larare' where first name is 'Hagrid'
DELETE FROM larare WHERE fornamn = 'Hagrid';

-- Delete rows from table 'larare' where avdelning equals to 'DIPT'
DELETE FROM larare WHERE avdelning = 'DIPT';

-- Delete rows from table 'larare' where lon is not equal to null, but limit number of deleted rows to 2
DELETE FROM larare WHERE lon IS NOT NULL LIMIT 2;

-- Delete remaining rows from table 'larare'
DELETE FROM larare;



