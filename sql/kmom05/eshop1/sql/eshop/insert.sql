--
-- Insert customer
--
DELETE FROM customer;
INSERT INTO customer 
        (id, firstname, lastname, address, postal_code, city, country, phone_number) 
    VALUES
        (1, "Mikael", "Roos", "St Happy 23-4", "555 67", "Stokfolm", "Sweden", "070 42 42 42"),
        (2, "John", "Doe", "St Roles 2-13", "555 55", "Berlin", "Germany", "070 555 555"),
        (3, "Jane", "Doe", "St Heroes 10-22", "555 55", "London", "United Kingdom", "070 555 556"),
        (4, "Mumintrollet", "Mumin", "St Rev 5-4", "111 11", "Helsinki", "Finland", "070 111 111"),
        (5, "Alex", "Glob", "St Victory 1", "666 66", "Paris", "France", "030 333 434")
;

SELECT * FROM customer;

--
-- Insert product
--
DELETE FROM product;
INSERT INTO product 
        (product_id, price, name, image_link, description) 
    VALUES
        ("p-0001", 10, "mysql", "/img/eshop/mysql.png", "This is mysql."),
        ("p-0002", 20, "python", "/img/eshop/python.png", "This is python."),
        ("p-0003", 30, "nodejs", "/img/eshop/nodejs.png", "This is nodejs."),
        ("p-0004", 40, "html", "/img/eshop/express.png", "This is html."),
        ("p-0005", 50, "php", "/img/eshop/php.png", "This is php.")
;

SELECT * FROM product;

--
-- Insert category
--
DELETE FROM category;
INSERT INTO category 
        (category) 
    VALUES
        ("web"),
        ("front-end"),
        ("database"),
        ("back-end"),
        ("desktop")
;

SELECT * FROM category;

--
-- Insert product2category
--
DELETE FROM product2category;
INSERT INTO product2category 
        (product_id, category) 
    VALUES
        ("p-0001", "database"),
        ("p-0001", "web"),
        ("p-0001", "desktop"),
        ("p-0002", "back-end"),
        ("p-0005", "back-end"),
        ("p-0003", "back-end"),
        ("p-0003", "web"),
        ("p-0005", "web"),
        ("p-0004", "front-end"),
        ("p-0004", "web")
;

SELECT * FROM product2category;

--
-- Insert inventory
--
DELETE FROM inventory;
INSERT INTO inventory 
        (shelf) 
    VALUES
        ("A:101"),
        ("B:101"),
        ("C:101"),
        ("D:101"),
        ("E:101")
;

SELECT * FROM inventory;

--
-- Insert product2inventory
--
DELETE FROM product2inventory;
INSERT INTO product2inventory 
        (product_id, amount, shelf) 
    VALUES
        ("p-0001", 7, "A:101"),
        ("p-0001", 12, "B:101"),
        ("p-0002", 45, "A:101"),
        ("p-0003", 10, "E:101"),
        ("p-0004", 6, "C:101"),
        ("p-0005", 8, "D:101")
;

SELECT * FROM product2inventory;