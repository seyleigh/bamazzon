DROP DATABASE IF EXISTS customber_db;
CREATE DATABASE customer_db;

USE customer_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL (20,2) NOT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bottle opener", "Housewares", 4.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One X", "Entertainment", 499.98, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sherpa Blanket", "Bedding", 20.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Thermos", "Dishware", 12.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Legal pad", "Office Supplies", 2.05, 33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kuchi Kopi", "Toys", 13.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scale", "Heath", 35.98, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fridge Magnet", "Toys", 0.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acupressure Mat", "Health", 49.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gooseneck Kettle", "Housewares", 35.00, 3);



