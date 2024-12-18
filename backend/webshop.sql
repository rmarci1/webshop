CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    publication_year INT
);
CREATE TABLE clothes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    size VARCHAR(10) NOT NULL,
    color VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    material VARCHAR(100),
    weight_kg DECIMAL(5, 2),
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
INSERT INTO books (title, author, genre, price, stock, publication_year) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 10.99, 50, 1925),
('1984', 'George Orwell', 'Dystopian', 8.99, 30, 1949),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 12.50, 20, 1960),
('Moby-Dick', 'Herman Melville', 'Adventure', 15.00, 15, 1851),
('Pride and Prejudice', 'Jane Austen', 'Romance', 9.99, 40, 1813),
('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 11.99, 25, 1951),
('Brave New World', 'Aldous Huxley', 'Dystopian', 10.50, 35, 1932),
('Crime and Punishment', 'Fyodor Dostoevsky', 'Classic', 14.99, 20, 1866),
('War and Peace', 'Leo Tolstoy', 'Historical', 19.99, 10, 1869),
('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 13.99, 50, 1937),
('Animal Farm', 'George Orwell', 'Political', 7.99, 45, 1945),
('Great Expectations', 'Charles Dickens', 'Classic', 12.99, 30, 1861),
('Jane Eyre', 'Charlotte Bronte', 'Romance', 9.50, 40, 1847),
('Wuthering Heights', 'Emily Bronte', 'Romance', 11.00, 25, 1847),
('The Odyssey', 'Homer', 'Epic', 17.99, 15, -800);

INSERT INTO clothes (name, category, size, color, price, stock) VALUES
('T-Shirt', 'Topwear', 'M', 'Blue', 14.99, 100),
('Jeans', 'Bottomwear', 'L', 'Black', 39.99, 60),
('Jacket', 'Outerwear', 'XL', 'Red', 59.99, 30),
('Sneakers', 'Footwear', '42', 'White', 49.99, 70),
('Cap', 'Accessories', 'One Size', 'Green', 9.99, 200),
('Sweater', 'Topwear', 'L', 'Grey', 34.99, 40),
('Shorts', 'Bottomwear', 'M', 'Blue', 19.99, 80),
('Sandals', 'Footwear', '41', 'Brown', 24.99, 50),
('Scarf', 'Accessories', 'One Size', 'Black', 15.99, 100),
('Gloves', 'Accessories', 'L', 'Black', 12.99, 120),
('Polo Shirt', 'Topwear', 'M', 'White', 25.99, 60),
('Leggings', 'Bottomwear', 'S', 'Purple', 22.99, 70),
('Coat', 'Outerwear', 'XL', 'Navy', 79.99, 25),
('Boots', 'Footwear', '43', 'Black', 89.99, 40),
('Belt', 'Accessories', 'One Size', 'Tan', 14.99, 100);

INSERT INTO equipment (name, category, material, weight_kg, price, stock) VALUES
('Dumbbell', 'Weights', 'Iron', 10.00, 29.99, 50),
('Yoga Mat', 'Mats', 'Foam', 2.00, 19.99, 80),
('Kettlebell', 'Weights', 'Steel', 16.00, 39.99, 40),
('Resistance Band', 'Bands', 'Rubber', 0.50, 12.99, 100),
('Pull-Up Bar', 'Bars', 'Steel', 5.00, 49.99, 20),
('Treadmill', 'Cardio', 'Steel/Plastic', 80.00, 499.99, 10),
('Rowing Machine', 'Cardio', 'Aluminum', 45.00, 799.99, 8),
('Medicine Ball', 'Weights', 'Leather', 8.00, 24.99, 30),
('Jump Rope', 'Accessories', 'Plastic', 0.30, 9.99, 150),
('Foam Roller', 'Recovery', 'Foam', 1.50, 14.99, 60),
('Balance Board', 'Stability', 'Wood', 2.50, 34.99, 25),
('Elliptical Trainer', 'Cardio', 'Steel', 100.00, 899.99, 5),
('Weight Bench', 'Strength', 'Steel', 20.00, 149.99, 15),
('Gym Rings', 'Bodyweight', 'Wood', 1.20, 29.99, 50),
('Punching Bag', 'Boxing', 'Leather', 30.00, 99.99, 20);

