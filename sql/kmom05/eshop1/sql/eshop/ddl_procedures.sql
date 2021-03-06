--
-- Procedure show_category()
--
DROP PROCEDURE IF EXISTS show_category;

DELIMITER ;;

CREATE PROCEDURE show_category()
BEGIN
    SELECT * FROM category;
END
;;

DELIMITER ;

--
-- Procedure show_product()
--
DROP PROCEDURE IF EXISTS show_product;

DELIMITER ;;

CREATE PROCEDURE show_product()
BEGIN
    SELECT
        t.*,
        SUM(ps.amount) AS amount
    FROM 
        (SELECT
            p.*,
            GROUP_CONCAT(
                DISTINCT pc.category
                ORDER BY pc.category ASC
                SEPARATOR ', ') AS category
        FROM
            product AS p
        LEFT JOIN product2category AS pc ON pc.product_id = p.product_id
        GROUP BY p.product_id) AS t
    LEFT JOIN product2inventory AS ps ON ps.product_id = t.product_id
    GROUP BY t.product_id;
END
;;

DELIMITER ;

--
-- Procedure show_product_detail()
--
DROP PROCEDURE IF EXISTS show_product_detail;

DELIMITER ;;

CREATE PROCEDURE show_product_detail(
    a_product_id varchar(10)
)
BEGIN
    SELECT
        t.*,
        SUM(ps.amount) AS amount
    FROM 
        (SELECT
            p.*,
            GROUP_CONCAT(
                DISTINCT pc.category
                ORDER BY pc.category ASC
                SEPARATOR ', ') AS category
        FROM
            product AS p
        LEFT JOIN product2category AS pc ON pc.product_id = p.product_id
        GROUP BY p.product_id) AS t
    LEFT JOIN product2inventory AS ps ON ps.product_id = t.product_id
    WHERE 
        t.product_id = a_product_id
    GROUP BY t.product_id;
END
;;

DELIMITER ;

--
-- Procedure create_product()
--
DROP PROCEDURE IF EXISTS create_product;

DELIMITER ;;

CREATE PROCEDURE create_product(
    a_product_id varchar(10),
    a_name varchar(255),
    a_price decimal(8, 2),
    a_image_link varchar(255),
    a_description varchar(255)
)
BEGIN
    INSERT INTO product 
        (product_id, name, price, image_link, description) 
    VALUES 
        (a_product_id, a_name, a_price, a_image_link, a_description);
END
;;

DELIMITER ;

--
-- Procedure edit_product()
--
DROP PROCEDURE IF EXISTS edit_product;

DELIMITER ;;

CREATE PROCEDURE edit_product(
    a_product_id varchar(10),
    a_name varchar(255),
    a_price decimal(8, 2),
    a_image_link varchar(255),
    a_description varchar(255)
)
BEGIN
    UPDATE
        product
    SET
        name = a_name,
        price = a_price,
        image_link = a_image_link,
        description = a_description
    WHERE
        product_id = a_product_id;
END
;;

DELIMITER ;

--
-- Procedure delete_product()
--
DROP PROCEDURE IF EXISTS delete_product;

DELIMITER ;;

CREATE PROCEDURE delete_product(
    IN a_product_id varchar(10)
)
BEGIN
    DELETE FROM
        product
    WHERE
        product_id = a_product_id;
END
;;

DELIMITER ;

--
-- Procedure show_log()
--
DROP PROCEDURE IF EXISTS show_log;

DELIMITER ;;

CREATE PROCEDURE show_log(
    IN row_count INTEGER
)
BEGIN
    SELECT
        timestamp,
        event
    FROM
        log
    ORDER BY timestamp DESC
    LIMIT row_count;
END
;;

DELIMITER ;

--
-- Procedure show_shelf()
--
DROP PROCEDURE IF EXISTS show_shelf;

DELIMITER ;;

CREATE PROCEDURE show_shelf()
BEGIN
    SELECT
        shelf
    FROM
        inventory
    ORDER BY shelf ASC;
END
;;

DELIMITER ;

--
-- Procedure show_inventory()
--
DROP PROCEDURE IF EXISTS show_inventory;

DELIMITER ;;

CREATE PROCEDURE show_inventory(
    IN filter_str varchar(255)
)
BEGIN
    SELECT
        p.product_id,
        p.name,
        p2i.shelf,
        SUM(p2i.amount) AS quantity
    FROM
        product2inventory AS p2i
    LEFT JOIN
        product AS p ON p2i.product_id = p.product_id
    WHERE 
        p.product_id LIKE CONCAT('%', filter_str , '%') OR
        p.name LIKE CONCAT('%', filter_str , '%') OR
        p2i.shelf LIKE CONCAT('%', filter_str , '%')
    GROUP BY p.product_id, p2i.shelf
    ORDER BY
        p2i.product_id ASC, p2i.shelf ASC;
END
;;

DELIMITER ;

--
-- Procedure add_inventory()
--
DROP PROCEDURE IF EXISTS add_inventory;

DELIMITER ;;

CREATE PROCEDURE add_inventory(
	a_product_id VARCHAR(10), 
	a_shelf VARCHAR(255),
	a_amount INTEGER
) 
BEGIN 
	IF a_shelf IN (SELECT p2i.shelf FROM product2inventory AS p2i WHERE p2i.product_id = a_product_id AND p2i.shelf = a_shelf) THEN 
		UPDATE 
			product2inventory 
		SET 
			amount = amount + a_amount 
		WHERE 
			product_id = a_product_id AND 
			shelf = a_shelf;
	ELSE 
		INSERT INTO product2inventory (product_id, shelf, amount) 
			VALUES (a_product_id, a_shelf, a_amount);
	END IF;
END 
;;

DELIMITER ;

--
-- Procedure del_inventory()
--
DROP PROCEDURE IF EXISTS del_inventory;

DELIMITER ;;

CREATE PROCEDURE del_inventory(
	a_product_id VARCHAR(10), 
	a_shelf VARCHAR(255), 
	a_amount INTEGER
) 
BEGIN 
    DECLARE current_amount INTEGER; 
    SET current_amount = (SELECT amount FROM product2inventory AS p2i WHERE p2i.product_id = a_product_id AND p2i.shelf = a_shelf); 
	IF a_shelf IN (SELECT p2i.shelf FROM product2inventory AS p2i WHERE p2i.product_id = a_product_id AND p2i.shelf = a_shelf) THEN 
        IF current_amount >= a_amount THEN 
            UPDATE 
                product2inventory 
            SET 
                amount = amount - a_amount 
            WHERE 
                product_id = a_product_id AND 
                shelf = a_shelf; 
        END IF; 
	END IF; 
END 
;;

DELIMITER ;