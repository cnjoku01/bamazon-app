DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  productName VARCHAR (255) NOT NULL,
  departmentName VARCHAR (255) NOT NULL,
  price FLOAT(9, 2) NOT NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

Select * FROM products;


INSERT INTO products (productName, departmentName, price, quantity)
VALUES ("Sony Bluetooth headphones", "Electonics",45.50, 50);

INSERT INTO products (productName, departmentName, price, quantity)
VALUES ("Air Max '97", "Shoe", 105.97, 20);

INSERT INTO products (productName, departmentName, price, quantity)
VALUES ("55 inch Roku TV", "Electonics", 409.56, 20);

INSERT INTO products (productName, departmentName, price, quantity)
VALUES ("New Balance", "Shoe", 75.45, 40);

INSERT INTO products (productName, departmentName, price, quantity)
VALUES ("Sectional Couch", "Furniture", 905.98, 10);

INSERT INTO products (productName, departmentName, price, quantity)
VALUES ("Love Seat couch", "Furniture", 350, 100);

INSERT INTO products (productName, departmentName, price, quantity)
VALUES ("Mac Book Pro", "Electonics", 1400.65, 100);

INSERT INTO products (productName, departmentName, price, quantity)
VALUES ("Cowboy Boots", "Shoes", 250.75, 12);

INSERT INTO products (productName, departmentName, price, quantity)
VALUES ("Coffee Table", "Furniture", 95.87, 1500);

INSERT INTO products (productName, departmentName, price, quantity)
VALUES ("Microwabe", "Kitchen appliance", 56.67, 100);