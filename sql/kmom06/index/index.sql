DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`
(
    `code` CHAR (6), 
    `nick` CHAR (12), 
    `points` DECIMAL (3, 1), 
    `name` VARCHAR (60)
);

DELETE FROM course;
INSERT INTO course 
VALUES 
    ('DV1531', 'python',      7.5 , 'Programming and Troubleshooting Python'),
    ('PA1439', 'htmlphp',     7.5 , 'Web Technologies'),
    ('DV1561', 'javascript',  7.5 , 'JavaScript programming'),
    ('PA1436', 'design',      7.5 , 'Technical web design and usability'),
    ('DV1547', 'linux',       7.5 , 'Programming Web Services in Linux'),
    ('PA1437', 'oopython',    7.5 , 'Object-oriented design and programming with Python'),
    ('DV1546', 'webapp',      7.5 , 'Web applications for mobile devices'),
    ('DV1506', 'webgl',       7.5 , 'Game technology for the web'),
    ('PA1444', 'dbjs',       10.0 , 'Web Programming & Databases')
;

SELECT * FROM course;

EXPLAIN course;

EXPLAIN SELECT * FROM course;

--
-- Create index via primary key
--

EXPLAIN SELECT * FROM course WHERE code = 'PA1444';

ALTER TABLE course ADD PRIMARY KEY (code);

EXPLAIN SELECT * FROM course WHERE code = 'PA1444';

EXPLAIN course;

--
-- New index with Unique
--

EXPLAIN SELECT * FROM course WHERE nick = 'dbjs';

ALTER TABLE course ADD  CONSTRAINT nick_unique UNIQUE (nick);

EXPLAIN SELECT * FROM course WHERE nick = 'dbjs';

EXPLAIN course;

--
-- View and delete indexes
--

SHOW INDEX FROM course;

DROP INDEX nick_unique ON course;

CREATE UNIQUE INDEX nick_unique ON course (nick);

--
-- Create index at CREATE TABLE
--

SHOW CREATE TABLE course \G

DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`
(
    `code` CHAR (6),
    `nick` CHAR (12),
    `points` DECIMAL (3, 1),
    `name` VARCHAR (60),
    
    PRIMARY KEY (`code`),
    UNIQUE KEY `nick_unique` (`nick`)
);

--
-- Index for partial search of string
--

SELECT * FROM course WHERE name LIKE 'Web%';

EXPLAIN SELECT * FROM course WHERE name LIKE 'Web%';

CREATE INDEX index_name ON course (name);

EXPLAIN SELECT * FROM course WHERE name LIKE 'Web%';

EXPLAIN course;

EXPLAIN SELECT * FROM course WHERE name LIKE '% prog%';

EXPLAIN SELECT * FROM course WHERE name LIKE '% Python';

--
-- Full text index
--

CREATE FULLTEXT INDEX full_name ON course (name);

SELECT name, MATCH(name) AGAINST ('Program * web *' IN BOOLEAN MODE) AS score FROM course ORDER BY score DESC;

--
-- Index for numerical values
--

SELECT * FROM course WHERE points > 7.5;

EXPLAIN SELECT * FROM course WHERE points > 7.5;

CREATE INDEX index_points ON course (points);

--
-- View and delete indexes
--

SHOW INDEX FROM course;

DROP INDEX full_name ON course;

EXPLAIN course;

--
-- View CREATE TABLE
--

SHOW CREATE TABLE course \G

--
-- Log slow queries
--

SET profiling = 1;

SELECT * FROM course WHERE nick = 'dbjs';

SELECT * FROM course WHERE name LIKE 'Web%';

SELECT name, MATCH(name) AGAINST ('Program * web *' IN BOOLEAN MODE) AS score FROM course ORDER BY score DESC;

SHOW PROFILES;

SHOW PROFILE FOR QUERY 3;