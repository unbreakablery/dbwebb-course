-- Create database 
CREATE DATABASE IF NOT EXISTS exam;

-- Select which database you want to use the 
USE exam;

-- Create a user user with the password pass and provide access regardless 
-- hostname. 
CREATE USER IF NOT EXISTS 'user'@'%' 
    IDENTIFIED BY 'pass'
;

-- Give the user all rights to all databases. 
GRANT ALL PRIVILEGES 
    ON *.*
    TO 'user'@'%'
;

-- Show what a user can do against which database. 
SHOW GRANTS FOR 'user'@'%';