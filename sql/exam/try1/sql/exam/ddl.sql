-- 
-- Create table: member
-- 
DROP TABLE IF EXISTS member;
CREATE TABLE member
(
    member_id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    alias VARCHAR(50),
    city VARCHAR(50),
    
    PRIMARY KEY (member_id),
    UNIQUE KEY unique_member_id (member_id),
    KEY index_city (city),
    FULLTEXT KEY fulltext_name (first_name, last_name, alias)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- Create table: breed
-- 
DROP TABLE IF EXISTS breed;
CREATE TABLE breed
(
    breed_id VARCHAR(10) NOT NULL,
    name VARCHAR(50),
    approve VARCHAR(50),
    
    PRIMARY KEY (breed_id),
    UNIQUE KEY unique_breed_id (breed_id),
    KEY index_approve (approve),
    FULLTEXT KEY fulltext_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- Create table: dog
-- 
DROP TABLE IF EXISTS dog;
CREATE TABLE dog
(
    dog_id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    url VARCHAR(255),
    breed_id VARCHAR(10),
        
    PRIMARY KEY (dog_id),
    UNIQUE KEY unique_dog_id (dog_id),
    FOREIGN KEY (breed_id) REFERENCES breed (breed_id) ON DELETE CASCADE,
    FULLTEXT KEY fulltext_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- Create table: member2dog
-- 
DROP TABLE IF EXISTS member2dog;
CREATE TABLE member2dog
(
    id INT(11) NOT NULL AUTO_INCREMENT,
    member_id INT(11) NOT NULL,
    dog_id INT(11) NOT NULL,
    registered INT(11) NOT NULL,
    
    PRIMARY KEY (id),
    KEY index_registered (registered),
    FOREIGN KEY (member_id) REFERENCES member (member_id) ON DELETE CASCADE,
    FOREIGN KEY (dog_id) REFERENCES dog (dog_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Procedure show_report()
--
DROP PROCEDURE IF EXISTS show_report;

DELIMITER ;;

CREATE PROCEDURE show_report(
    search VARCHAR(50) 
) 
BEGIN
    SELECT
        m.member_id,
        CONCAT(m.first_name, ' ', m.last_name) AS member_name,
        m.alias AS member_alias,
        m.city AS member_city,
        d.name AS dog_name,
        d.url AS dog_url,
        b.name AS dog_breed,
        LOWER(b.approve) AS breed_approve,
        m2d.registered 
    FROM 
        member AS m 
    LEFT JOIN member2dog AS m2d ON m2d.member_id = m.member_id 
    LEFT JOIN dog AS d ON d.dog_id = m2d.dog_id 
    LEFT JOIN breed AS b ON b.breed_id = d.breed_id
    WHERE
        m.first_name LIKE CONCAT('%', search, '%') OR
        m.last_name LIKE CONCAT('%', search, '%') OR
        m.alias LIKE CONCAT('%', search, '%') OR
        m.city LIKE CONCAT('%', search, '%') OR
        d.name LIKE CONCAT('%', search, '%') OR
        d.url LIKE CONCAT('%', search, '%') OR
        b.breed_id LIKE CONCAT('%', search, '%') OR
        b.name LIKE CONCAT('%', search, '%')
    ;
END
;;

DELIMITER ;

--
-- Procedure show_fixed_report()
--
DROP PROCEDURE IF EXISTS show_fixed_report;

DELIMITER ;;

CREATE PROCEDURE show_fixed_report() 
BEGIN
    SELECT
        CONCAT(m.first_name, ' (', m.alias, ') ', m.last_name) AS member_name,
        m.city,
        d.name AS dog_name,
        CONCAT(b.name, IF(LOWER(b.approve)='no', ' (X)', '')) AS breed_name,
        m2d.registered 
    FROM member2dog AS m2d
    RIGHT OUTER JOIN MEMBER AS m ON m.member_id = m2d.member_id 
    LEFT OUTER JOIN dog AS d ON d.dog_id = m2d.dog_id 
    LEFT JOIN breed AS b ON b.breed_id = d.breed_id
    UNION
    SELECT
        CONCAT(m.first_name, ' (', m.alias, ') ', m.last_name) AS member_name,
        m.city,
        d.name AS dog_name,
        CONCAT(b.name, IF(LOWER(b.approve)='no', ' (X)', '')) AS breed_name,
        m2d.registered 
    FROM member2dog AS m2d
    RIGHT OUTER JOIN MEMBER AS m ON m.member_id = m2d.member_id 
    RIGHT OUTER JOIN dog AS d ON d.dog_id = m2d.dog_id 
    LEFT JOIN breed AS b ON b.breed_id = d.breed_id
    ORDER BY breed_name, registered DESC
    ;
END
;;

DELIMITER ;