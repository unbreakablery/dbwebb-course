-- 
-- Create table: customer
-- 
DROP TABLE IF EXISTS customer;
CREATE TABLE customer
(
    id INT(11) NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    address VARCHAR(255),
    postal_code VARCHAR(50),
    city VARCHAR(50),
    country VARCHAR(50),
    phone_number VARCHAR(50),

    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- Create table: product
-- 
DROP TABLE IF EXISTS product;
CREATE TABLE product
(
    product_id VARCHAR(10) NOT NULL,
    name VARCHAR(255),
    price DECIMAL(8, 2),
    image_link VARCHAR(255),
    description VARCHAR(255),

    PRIMARY KEY (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- Create table: category
-- 
DROP TABLE IF EXISTS category;
CREATE TABLE category
(
    category VARCHAR(50) NOT NULL,
    PRIMARY KEY (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- Create table: product2category
-- 
DROP TABLE IF EXISTS product2category;
CREATE TABLE product2category
(
    product_id VARCHAR(10) NOT NULL,
    category VARCHAR(50) NOT NULL,
    PRIMARY KEY (product_id, category),
    FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE CASCADE,
    FOREIGN KEY (category) REFERENCES category (category) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- Create table: inventory
-- 
DROP TABLE IF EXISTS inventory;
CREATE TABLE inventory
(
    shelf VARCHAR(50) NOT NULL,
    PRIMARY KEY (shelf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- Create table: product2inventory
-- 
DROP TABLE IF EXISTS product2inventory;
CREATE TABLE product2inventory
(
    product_id VARCHAR(10) NOT NULL,
    shelf VARCHAR(50) NOT NULL,
    amount INT(11) NOT NULL,
    PRIMARY KEY (product_id, shelf),
    FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE CASCADE,
    FOREIGN KEY (shelf) REFERENCES inventory (shelf) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;