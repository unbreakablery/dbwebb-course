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

--
-- Procedure show_customer()
--
DROP PROCEDURE IF EXISTS show_customer;

DELIMITER ;;

CREATE PROCEDURE show_customer()
BEGIN
    SELECT
        *
    FROM
        customer
    ORDER BY id ASC;
END
;;

DELIMITER ;

--
-- Procedure show_orders()
--
DROP PROCEDURE IF EXISTS show_orders;

DELIMITER ;; 

CREATE PROCEDURE show_orders() 
BEGIN 
    SELECT 
        o.id,
        DATE_FORMAT(o.created, '%Y-%m-%d %H:%i:%s') AS order_date,
        o.customer_id,
        CONCAT(c.firstname, ' ', c.lastname) AS customer_name,
        order_status(o.created, o.updated, o.deleted, o.ordered, o.shipped) AS status,
        COUNT(op.order_id) AS total_order_lines 
    FROM 
        orders AS o 
    LEFT JOIN customer AS c ON c.id = o.customer_id 
    LEFT JOIN order2product AS op ON op.order_id = o.id 
    GROUP BY o.id;
END 
;; 

DELIMITER ; 

--
-- Procedure create_order()
--
DROP PROCEDURE IF EXISTS create_order;

DELIMITER ;;

CREATE PROCEDURE create_order(
    a_customer_id INT(11)
)
BEGIN
    INSERT INTO orders 
        (customer_id) 
    VALUES 
        (a_customer_id);
END
;;

DELIMITER ;

--
-- Procedure show_order()
--
DROP PROCEDURE IF EXISTS show_order;

DELIMITER ;;

CREATE PROCEDURE show_order(
    a_order_id INT(11)
)
BEGIN
    SELECT 
        o.id,
        DATE_FORMAT(o.created, '%Y-%m-%d %H:%i:%s') AS order_date,
        o.customer_id,
        CONCAT(c.firstname, ' ', c.lastname) AS customer_name,
        order_status(o.created, o.updated, o.deleted, o.ordered, o.shipped) AS status,
        COUNT(op.order_id) AS total_order_lines 
    FROM 
        orders AS o 
    LEFT JOIN customer AS c ON c.id = o.customer_id 
    LEFT JOIN order2product AS op ON op.order_id = o.id 
    WHERE 
        o.id = a_order_id 
    GROUP BY o.id;
END
;;

DELIMITER ;

--
-- Procedure show_order_detail()
--
DROP PROCEDURE IF EXISTS show_order_detail;

DELIMITER ;;

CREATE PROCEDURE show_order_detail(
    a_order_id INT(11)
)
BEGIN 
    SELECT 
        op.*,
        p.name AS product_name,
        p.price AS product_price,
        (p.price * op.quantity) AS cost 
    FROM 
        order2product AS op 
    LEFT JOIN product AS p ON op.product_id = p.product_id 
    WHERE 
        op.order_id = a_order_id 
    ORDER BY op.product_id;
END 
;;

DELIMITER ;

--
-- Procedure edit_order()
--
DROP PROCEDURE IF EXISTS edit_order;

DELIMITER ;;

CREATE PROCEDURE edit_order(
    a_order_id INT(11),
    a_customer_id INT(11),
    a_status CHAR(10)
)
BEGIN
    IF a_status = 'deleted' THEN 
        UPDATE 
            orders 
        SET 
            customer_id = a_customer_id,
            deleted = CURRENT_TIMESTAMP(),
            ordered = NULL,
            shipped = NULL 
        WHERE 
            id = a_order_id;
    ELSEIF a_status = 'ordered' THEN 
        UPDATE 
            orders 
        SET 
            customer_id = a_customer_id,
            ordered = CURRENT_TIMESTAMP(),
            deleted = NULL,
            shipped = NULL 
        WHERE 
            id = a_order_id;
    ELSEIF a_status = 'shipped' THEN 
        START TRANSACTION;

        UPDATE 
            orders 
        SET 
            customer_id = a_customer_id,
            shipped = CURRENT_TIMESTAMP(),
            deleted = NULL,
            ordered = NULL 
        WHERE 
            id = a_order_id;

        UPDATE 
            product2inventory AS ps 
        SET 
            ps.amount = ps.amount - (SELECT quantity FROM order2product AS op WHERE op.order_id = a_order_id AND ps.product_id = op.product_id) 
        WHERE ps.product_id IN (SELECT product_id FROM order2product AS op WHERE op.order_id = a_order_id);
        
        COMMIT;
    ELSE 
        UPDATE 
            orders 
        SET 
            customer_id = a_customer_id,
            deleted = NULL,
            ordered = NULL,
            shipped = NULL 
        WHERE 
            id = a_order_id;
    END IF;
END
;;

DELIMITER ;

--
-- Procedure delete_order()
--
DROP PROCEDURE IF EXISTS delete_order;

DELIMITER ;;

CREATE PROCEDURE delete_order(
    IN a_order_id INT(11)
)
BEGIN 
    DELETE FROM 
        orders 
    WHERE 
        id = a_order_id; 
END 
;;

DELIMITER ;

--
-- Procedure create_order_detail()
--
DROP PROCEDURE IF EXISTS create_order_detail;

DELIMITER ;;

CREATE PROCEDURE create_order_detail(
    a_order_id INT(11),
    a_product_id VARCHAR(10),
    a_quantity INT(11)
)
BEGIN
    INSERT INTO order2product 
        (order_id, product_id, quantity) 
    VALUES 
        (a_order_id, a_product_id, a_quantity);
END
;;

DELIMITER ;

--
-- Procedure show_order_line()
--
DROP PROCEDURE IF EXISTS show_order_line;

DELIMITER ;;

CREATE PROCEDURE show_order_line(
    a_order_id INT(11),
    a_product_id VARCHAR(10)
) 
BEGIN 
    SELECT 
        * 
    FROM 
        order2product AS op 
    WHERE 
        order_id = a_order_id AND 
        product_id = a_product_id;
END 
;; 

DELIMITER ;

--
-- Procedure edit_order_line()
--
DROP PROCEDURE IF EXISTS edit_order_line;

DELIMITER ;;

CREATE PROCEDURE edit_order_line(
    a_order_id INT(11),
    a_product_id VARCHAR(10),
    a_quantity INT(11)
) 
BEGIN 
    UPDATE 
        order2product 
    SET 
        quantity = a_quantity 
    WHERE 
        order_id = a_order_id AND 
        product_id = a_product_id;
END 
;; 

DELIMITER ;

--
-- Procedure delete_order_line()
--
DROP PROCEDURE IF EXISTS delete_order_line;

DELIMITER ;;

CREATE PROCEDURE delete_order_line(
    IN a_order_id INT(11),
    IN a_product_id VARCHAR(10)
)
BEGIN 
    DELETE FROM 
        order2product 
    WHERE 
        order_id = a_order_id AND 
        product_id = a_product_id;
END 
;;

DELIMITER ;

--
-- Procedure cli_show_order()
--
DROP PROCEDURE IF EXISTS cli_show_order;

DELIMITER ;;

CREATE PROCEDURE cli_show_order(
    search VARCHAR(50)
)
BEGIN
    SELECT 
        o.id,
        DATE_FORMAT(o.created, '%Y-%m-%d %H:%i:%s') AS order_date,
        o.customer_id,
        CONCAT(c.firstname, ' ', c.lastname) AS customer_name,
        order_status(o.created, o.updated, o.deleted, o.ordered, o.shipped) AS status,
        COUNT(op.order_id) AS total_order_lines 
    FROM 
        orders AS o 
    LEFT JOIN customer AS c ON c.id = o.customer_id 
    LEFT JOIN order2product AS op ON op.order_id = o.id 
    WHERE 
        CAST(o.id AS CHAR) LIKE CONCAT('%', search, '%') OR 
        CAST(o.customer_id AS CHAR) LIKE CONCAT('%', search, '%') 
    GROUP BY o.id;
END
;;

DELIMITER ;

--
-- Procedure cli_picklist()
--
DROP PROCEDURE IF EXISTS cli_picklist;

DELIMITER ;;

CREATE PROCEDURE cli_picklist(
    a_order_id INT(10)
) 
BEGIN 
    SELECT 
        op.*,
        p.name AS product_name,
        IFNULL(ps.shelf, 'Not in stock') AS shelf,
        IFNULL(ps.amount, 0) AS amount 
    FROM 
        order2product AS op 
    LEFT JOIN product AS p ON p.product_id = op.product_id 
    LEFT JOIN product2inventory ps ON ps.product_id = p.product_id 
    WHERE 
        op.order_id = a_order_id;
END
;;

DELIMITER ;

--
-- Procedure ship_order()
--
DROP PROCEDURE IF EXISTS ship_order;

DELIMITER ;;

CREATE PROCEDURE ship_order(
    a_order_id INT(11)
)
BEGIN
    START TRANSACTION;

    UPDATE 
        orders 
    SET 
        shipped = CURRENT_TIMESTAMP(),
        deleted = NULL,
        ordered = NULL 
    WHERE 
        id = a_order_id;

    UPDATE 
        product2inventory AS ps 
    SET 
        ps.amount = ps.amount - (SELECT quantity FROM order2product AS op WHERE op.order_id = a_order_id AND ps.product_id = op.product_id) 
    WHERE ps.product_id IN (SELECT product_id FROM order2product AS op WHERE op.order_id = a_order_id);
    
    COMMIT;
END 
;;

DELIMITER ;