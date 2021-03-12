--
-- Log table
--
DROP TABLE IF EXISTS log;
CREATE TABLE log
(
    `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `event` VARCHAR(255)
);

-- DELETE FROM log;
SELECT * FROM log;

--
-- Trigger for logging INSERT product
--
DROP TRIGGER IF EXISTS log_product_insert;

CREATE TRIGGER log_product_insert
AFTER INSERT
ON product FOR EACH ROW
    INSERT INTO log (`timestamp`, `event`)
        VALUES (CURRENT_TIMESTAMP(), CONCAT("New product was added with ID:", NEW.product_id));

--
-- Trigger for logging UPDATE product
--
DROP TRIGGER IF EXISTS log_product_update;

CREATE TRIGGER log_product_update
AFTER UPDATE
ON product FOR EACH ROW
    INSERT INTO log (`timestamp`, `event`)
        VALUES (CURRENT_TIMESTAMP(), CONCAT("Product ID:", OLD.product_id, " details were updated."));

--
-- Trigger for logging DELETE product
--
DROP TRIGGER IF EXISTS log_product_delete;

CREATE TRIGGER log_product_delete
AFTER DELETE
ON product FOR EACH ROW
    INSERT INTO log (`timestamp`, `event`)
        VALUES (CURRENT_TIMESTAMP(), CONCAT("Product with ID:", OLD.product_id, " was deleted."));