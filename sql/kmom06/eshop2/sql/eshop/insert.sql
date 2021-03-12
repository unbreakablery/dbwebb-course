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
        ("p-0001", 10, "DELL Laptop", "/img/eshop/laptop-dell.png", "This is Laptop."),
        ("p-0002", 20, "Sneakers | PUMA", "/img/eshop/sneaker-puma.png", "This is Sneaker."),
        ("p-0003", 30, "PUMA x NEMEN", "/img/eshop/nemen-puma.png", "This is Nemen."),
        ("p-0004", 40, "Sweatsuit", "/img/eshop/sweatsuit.png", "This is Sweatsuit."),
        ("p-0005", 50, "Men's Athletic Wear", "/img/eshop/men-athletic-wear.png", "This is Athletic Wear.")
;

SELECT * FROM product;

--
-- Insert category
--
DELETE FROM category;
INSERT INTO category 
        (category) 
    VALUES
        ("Man"),
        ("Woman"),
        ("Clothing"),
        ("Computer"),
        ("Shoes")
;

SELECT * FROM category;

--
-- Insert product2category
--
DELETE FROM product2category;
INSERT INTO product2category 
        (product_id, category) 
    VALUES
        ("p-0001", "Computer"),
        ("p-0002", "Shoes"),
        ("p-0003", "Shoes"),
        ("p-0004", "Clothing"),
        ("p-0005", "Clothing"),
        ("p-0002", "Man"),
        ("p-0002", "Woman"),
        ("p-0003", "Man"),
        ("p-0003", "Woman"),
        ("p-0004", "Man"),
        ("p-0004", "Woman"),
        ("p-0005", "Man")
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
        ("p-0001", 100, "A:101"),
        ("p-0002", 100, "B:101"),
        ("p-0003", 100, "C:101"),
        ("p-0004", 100, "D:101"),
        ("p-0005", 100, "E:101")
;

SELECT * FROM product2inventory;