--
-- Create table
-- 
DROP TABLE IF EXISTS account;
CREATE TABLE account
(
    `id` CHAR(4) PRIMARY KEY,
    `name` VARCHAR(8),
    `balance` DECIMAL(4, 2)
);

DELETE FROM account;

INSERT INTO account
VALUES
    ('1111', 'Adam', 10.0),
    ('2222', 'Eva', 7.0)
;

SELECT * FROM account;

--
-- Procedure show_balance()
--
DROP PROCEDURE IF EXISTS show_balance;

DELIMITER ;;

CREATE PROCEDURE show_balance()
BEGIN
    SELECT * FROM account;
END
;;

DELIMITER ;

--
-- Procedure show_account()
--
DROP PROCEDURE IF EXISTS show_account;

DELIMITER ;;

CREATE PROCEDURE show_account(
    a_id char(4)
)
BEGIN
    SELECT * FROM account WHERE id = a_id;
END
;;

DELIMITER ;

--
-- Procedure create_account()
--
DROP PROCEDURE IF EXISTS create_account;

DELIMITER ;;

CREATE PROCEDURE create_account(
    a_id char(4),
    a_name char(8),
    a_balance decimal(4, 2)
)
BEGIN
    INSERT INTO account (id, name, balance) VALUES (a_id, a_name, a_balance);
END
;;

DELIMITER ;

--
-- Procedure edit_account()
--
DROP PROCEDURE IF EXISTS edit_account;

DELIMITER ;;

CREATE PROCEDURE edit_account(
    a_id char(4),
    a_name char(8),
    a_balance decimal(4, 2)
)
BEGIN
    UPDATE
        account 
    SET
        name = a_name,
        balance = a_balance
    WHERE 
        id = a_id;
END
;;

DELIMITER ;

--
-- Procedure delete_account()
--
DROP PROCEDURE IF EXISTS delete_account;

DELIMITER ;;

CREATE PROCEDURE delete_account(
    a_id char(4)
)
BEGIN
    DELETE FROM account WHERE id = a_id;
END
;;

DELIMITER ;


--
-- Admin on SP
--
SHOW PROCEDURE STATUS;