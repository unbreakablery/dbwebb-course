--
-- Lägger till kolumn i larare
-- Av beha20 till kursen databas
-- 2020-01-28
--



-- Add column 'kompetens' (type: INT) to table 'larare'
ALTER TABLE larare ADD COLUMN kompetens INT;

-- Delete column 'kompetens' from table 'larare'
ALTER TABLE larare DROP COLUMN kompetens;

-- Add column 'kompetens' (type: INT) to table 'larare' and set default value to 1, and set column so that it cannot contain NULL values
ALTER TABLE larare ADD COLUMN kompetens INT DEFAULT 1 NOT NULL;


