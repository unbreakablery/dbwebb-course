USE skolan;

-- JOIN

SELECT
	l.akronym,
    l.lon,
    l.kompetens,
    p.lon AS "pre-lon",
    p.kompetens AS "pre-kompetens"
FROM larare as l
	JOIN larare_pre AS p
		ON l.akronym = p.akronym
ORDER BY akronym
;

-- Create the report that shows the results as below.

SELECT
	l.akronym,
    l.fornamn,
    l.efternamn,
    p.lon AS "pre",
    l.lon AS "nu",
	(l.lon - p.lon) AS "diff",
    ROUND(((l.lon - p.lon)/p.lon)*100,2) AS "proc",
    IF(ROUND(((l.lon - p.lon)/p.lon)*100,2)>3, "ok", "nok") AS "mini",
    p.kompetens AS "prekomp",
    l.kompetens AS "nukomp",
	(l.kompetens - p.kompetens) AS "diffkomp"
FROM larare as l
	JOIN larare_pre AS p
		ON l.akronym = p.akronym
;

-- Save the report as a v_lonerevision view.

DROP VIEW IF EXISTS v_lonerevision;

CREATE VIEW v_lonerevision
	AS
SELECT
	l.akronym,
    l.fornamn,
    l.efternamn,
    p.lon AS "pre",
    l.lon AS "nu",
	(l.lon - p.lon) AS "diff",
    ROUND(((l.lon - p.lon)/p.lon)*100,2) AS "proc",
    IF(ROUND(((l.lon - p.lon)/p.lon)*100,2)>3, "ok", "nok") AS "mini",
    p.kompetens AS "prekomp",
    l.kompetens AS "nukomp",
	(l.kompetens - p.kompetens) AS "diffkomp"
FROM larare as l
	JOIN larare_pre AS p
		ON l.akronym = p.akronym
;

-- Löneutveckling:
SELECT
	akronym, fornamn, efternamn, pre, nu, diff, proc, mini
    FROM v_lonerevision
	ORDER BY proc DESC
;

-- Kompetensutveckling:
SELECT
	akronym, fornamn, efternamn, prekomp, nukomp, diffkomp
    FROM v_lonerevision
	ORDER BY nukomp DESC, diffkomp DESC
;
