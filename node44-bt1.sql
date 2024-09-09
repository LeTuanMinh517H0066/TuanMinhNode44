
-- tạo database app food

-- September 7, 2024 15:39:50
create TABLE users (
	id int PRIMARY KEY auto_increment,
	full_name varchar(50) not null,
	email varchar(255) not null,
	pass_word varchar(255) not null
)

-- September 7, 2024 15:40:00
INSERT INTO users (full_name, email, pass_word) VALUES
('John Doe', 'john.doe@example.com', 'password123'),
('Jane Smith', 'jane.smith@example.com', 'securepass'),
('Mike Johnson', 'mike.johnson@example.com', 'mikepass!'),
('Emily Davis', 'emily.davis@example.com', 'emilypass@'),
('Chris Brown', 'chris.brown@example.com', 'chris1234'),
('Anna Wilson', 'anna.wilson@example.com', 'anna5678'),
('James Clark', 'james.clark@example.com', 'clarksecure'),
('Laura Miller', 'laura.miller@example.com', 'laura7890'),
('Robert Lewis', 'robert.lewis@example.com', 'robpass2023'),
('Jennifer Lee', 'jennifer.lee@example.com', 'jenniferpwd'),
('David Walker', 'david.walker@example.com', 'walker!pass'),
('Emma Hall', 'emma.hall@example.com', 'emmahall123'),
('Daniel Young', 'daniel.young@example.com', 'daniel789'),
('Sophia Harris', 'sophia.harris@example.com', 'sophia_pass'),
('Matthew King', 'matthew.king@example.com', 'kingsecure'),
('Olivia Wright', 'olivia.wright@example.com', 'olivia@wright'),
('Joseph Allen', 'joseph.allen@example.com', 'josephpass'),
('Mia Scott', 'mia.scott@example.com', 'mia_pass@!'),
('William Green', 'william.green@example.com', 'green1234'),
('Ava Adams', 'ava.adams@example.com', 'adams7890');

-- September 7, 2024 15:42:09
create table restaurants (
	id int primary key auto_increment,
	res_name varchar(100) not null,
	image text,
	description text
)

-- September 7, 2024 15:45:12
INSERT INTO restaurants (res_name, image, description) VALUES
('The Gourmet Spot', 'https://example.com/images/gourmet_spot.jpg', 'A fine dining experience with a modern twist on classic dishes.'),
('Ocean Breeze', 'https://example.com/images/ocean_breeze.jpg', 'A seaside restaurant offering the freshest seafood with stunning views of the ocean.'),
('Mountain Grille', 'https://example.com/images/mountain_grille.jpg', 'Rustic dining with a hearty menu, perfect for adventurers and nature lovers.'),
('Vegan Delights', 'https://example.com/images/vegan_delights.jpg', 'A vegan-friendly restaurant serving plant-based meals full of flavor.'),
('Pasta Palace', 'https://example.com/images/pasta_palace.jpg', 'The best pasta dishes from traditional Italian recipes.'),
('Burger Barn', 'https://example.com/images/burger_barn.jpg', 'Homemade gourmet burgers with a variety of toppings.'),
('Sushi World', 'https://example.com/images/sushi_world.jpg', 'Authentic sushi experience with fresh ingredients and expert chefs.'),
('Spice Route', 'https://example.com/images/spice_route.jpg', 'A vibrant restaurant that takes you on a culinary journey through the spices of Asia.'),
('Pizza Paradise', 'https://example.com/images/pizza_paradise.jpg', 'A paradise for pizza lovers, offering traditional and innovative pizza flavors.'),
('Steakhouse Supreme', 'https://example.com/images/steakhouse_supreme.jpg', 'A high-end steakhouse specializing in perfectly cooked meats.'),
('Taco Haven', 'https://example.com/images/taco_haven.jpg', 'Mexican street food at its best with tacos that burst with flavor.'),
('Breakfast Bliss', 'https://example.com/images/breakfast_bliss.jpg', 'All-day breakfast restaurant with classic and modern brunch options.'),
('Mediterranean Feast', 'https://example.com/images/mediterranean_feast.jpg', 'Mediterranean dishes with a focus on fresh, healthy ingredients.'),
('The Barbecue Pit', 'https://example.com/images/barbecue_pit.jpg', 'Authentic slow-cooked barbecue with a variety of sauces.'),
('Curry House', 'https://example.com/images/curry_house.jpg', 'Indian cuisine featuring traditional curry dishes and spicy delicacies.'),
('Bistro Bella', 'https://example.com/images/bistro_bella.jpg', 'A cozy bistro offering a blend of French and Italian dishes.'),
('Noodle Nook', 'https://example.com/images/noodle_nook.jpg', 'Asian-inspired noodle dishes, from ramen to pho.'),
('Dessert Dreamland', 'https://example.com/images/dessert_dreamland.jpg', 'A dessert-focused restaurant with cakes, ice creams, and pastries.'),
('Fusion Flavors', 'https://example.com/images/fusion_flavors.jpg', 'A fusion restaurant combining flavors from different cultures in exciting ways.'),
('The Salad Bar', 'https://example.com/images/salad_bar.jpg', 'Healthy and refreshing salads with a wide range of toppings and dressings.');

-- September 7, 2024 15:46:33
create table food_type (
	id int primary key auto_increment,
	type_name VARCHAR(255) not null
)

-- September 7, 2024 15:48:07
-- Insert 20 sample rows into the food_type table
INSERT INTO food_type (type_name) VALUES
('Italian'),
('Chinese'),
('Japanese'),
('Mexican'),
('Indian'),
('French'),
('Greek'),
('Thai'),
('Vietnamese'),
('Korean'),
('Mediterranean'),
('American'),
('Spanish'),
('Lebanese'),
('Brazilian'),
('Turkish'),
('Moroccan'),
('Ethiopian'),
('Caribbean'),
('German');

-- September 7, 2024 15:53:18
create table foods(
	id int primary key auto_increment,
	food_name varchar(255),
	image varchar(255),
	price FLOAT,
	description varchar(255),
	type_id INT,
	FOREIGN key (type_id) REFERENCES food_type(id) on delete CASCADE
)

-- September 7, 2024 16:06:40
INSERT INTO foods (food_name, image, price, description, type_id) VALUES
('Margherita Pizza', 'https://example.com/images/margherita_pizza.jpg', 12.99, 'Classic Italian pizza with tomato, mozzarella, and basil', 1),
('Kung Pao Chicken', 'https://example.com/images/kung_pao_chicken.jpg', 10.99, 'Spicy stir-fried chicken with peanuts and vegetables', 2),
('Sushi Platter', 'https://example.com/images/sushi_platter.jpg', 25.50, 'Assorted sushi rolls with fresh fish and vegetables', 3),
('Tacos al Pastor', 'https://example.com/images/tacos_al_pastor.jpg', 8.99, 'Traditional Mexican tacos with marinated pork', 4),
('Butter Chicken', 'https://example.com/images/butter_chicken.jpg', 15.99, 'Rich and creamy Indian curry with butter and spices', 5),
('Croissant', 'https://example.com/images/croissant.jpg', 3.50, 'Buttery and flaky French pastry', 6),
('Greek Salad', 'https://example.com/images/greek_salad.jpg', 9.99, 'Fresh salad with feta cheese, olives, and cucumber', 7),
('Pad Thai', 'https://example.com/images/pad_thai.jpg', 11.99, 'Popular Thai stir-fried noodle dish with peanuts and lime', 8),
('Pho', 'https://example.com/images/pho.jpg', 10.50, 'Vietnamese noodle soup with beef and herbs', 9),
('Bibimbap', 'https://example.com/images/bibimbap.jpg', 13.50, 'Korean mixed rice bowl with vegetables and meat', 10),
('Hummus', 'https://example.com/images/hummus.jpg', 6.99, 'Classic Mediterranean dip made from chickpeas and tahini', 11),
('Burger', 'https://example.com/images/burger.jpg', 14.50, 'American-style burger with beef patty and toppings', 12),
('Paella', 'https://example.com/images/paella.jpg', 18.99, 'Traditional Spanish rice dish with seafood and saffron', 13),
('Shawarma', 'https://example.com/images/shawarma.jpg', 9.50, 'Middle Eastern wrap with spiced meat and vegetables', 14),
('Feijoada', 'https://example.com/images/feijoada.jpg', 16.99, 'Brazilian black bean stew with pork and beef', 15),
('Baklava', 'https://example.com/images/baklava.jpg', 5.99, 'Sweet Turkish dessert made with layers of filo pastry and nuts', 16),
('Tagine', 'https://example.com/images/tagine.jpg', 14.99, 'Moroccan slow-cooked stew with meat and vegetables', 17),
('Injera with Doro Wat', 'https://example.com/images/injera_doro_wat.jpg', 13.99, 'Ethiopian flatbread with spicy chicken stew', 18),
('Jerk Chicken', 'https://example.com/images/jerk_chicken.jpg', 12.99, 'Caribbean spicy grilled chicken with jerk seasoning', 19),
('Schnitzel', 'https://example.com/images/schnitzel.jpg', 11.99, 'German breaded and fried meat cutlet', 20);

-- September 7, 2024 16:13:01
create table orders (
	id int PRIMARY KEY auto_increment,
	user_id int,
	FOREIGN KEY (user_id) REFERENCES users(id),
	food_id int, 
	FOREIGN KEY (food_id) REFERENCES foods(id),
	
	amount int, 
	discount_code varchar(30),
	arr_sub_id  VARCHAR(255)
)

-- September 7, 2024 16:23:26
CREATE TABLE rate_res (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    res_id INT,
    amount INT,
    date_rate DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (res_id) REFERENCES restaurants(id) ON DELETE CASCADE
);
-- Create the like_res table
CREATE TABLE like_res (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    res_id INT,
    date_like DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (res_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- September 7, 2024 16:24:08
INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES
(1, 1, 5, '2024-09-01 10:30:00'),
(2, 2, 4, '2024-09-01 11:00:00'),
(3, 3, 3, '2024-09-01 11:30:00'),
(1, 2, 5, '2024-09-02 12:00:00'),
(2, 1, 4, '2024-09-02 12:30:00'),
(3, 1, 2, '2024-09-02 13:00:00'),
(1, 3, 5, '2024-09-03 14:00:00'),
(2, 3, 3, '2024-09-03 14:30:00'),
(3, 2, 5, '2024-09-03 15:00:00'),
(1, 4, 4, '2024-09-04 15:30:00'),
(2, 5, 5, '2024-09-04 16:00:00'),
(3, 6, 4, '2024-09-04 16:30:00'),
(1, 6, 5, '2024-09-05 17:00:00'),
(2, 5, 3, '2024-09-05 17:30:00'),
(3, 4, 5, '2024-09-05 18:00:00'),
(1, 7, 4, '2024-09-06 18:30:00'),
(2, 8, 5, '2024-09-06 19:00:00'),
(3, 9, 3, '2024-09-06 19:30:00'),
(1, 8, 4, '2024-09-07 20:00:00'),
(2, 7, 5, '2024-09-07 20:30:00');

-- September 7, 2024 16:24:57
INSERT INTO like_res (user_id, res_id, date_like) VALUES
(1, 1, '2024-09-01 09:30:00'),
(2, 2, '2024-09-01 10:00:00'),
(3, 3, '2024-09-01 10:30:00'),
(1, 2, '2024-09-02 11:00:00'),
(2, 1, '2024-09-02 11:30:00'),
(3, 1, '2024-09-02 12:00:00'),
(1, 3, '2024-09-03 12:30:00'),
(2, 3, '2024-09-03 13:00:00'),
(3, 2, '2024-09-03 13:30:00'),
(1, 4, '2024-09-04 14:00:00'),
(2, 5, '2024-09-04 14:30:00'),
(3, 6, '2024-09-04 15:00:00'),
(1, 6, '2024-09-05 15:30:00'),
(2, 5, '2024-09-05 16:00:00'),
(3, 4, '2024-09-05 16:30:00'),
(1, 7, '2024-09-06 17:00:00'),
(2, 8, '2024-09-06 17:30:00'),
(3, 9, '2024-09-06 18:00:00'),
(1, 8, '2024-09-07 18:30:00'),
(2, 7, '2024-09-07 19:00:00');

-- September 7, 2024 16:25:54
INSERT INTO orders (user_id, food_id, amount, discount_code, arr_sub_id) VALUES
(1, 1, 2, 'DISCOUNT10', '1,2'),
(2, 2, 1, 'DISCOUNT15', '3'),
(3, 3, 3, NULL, '4'),
(1, 4, 1, 'DISCOUNT20', '5'),
(2, 5, 2, 'DISCOUNT25', NULL),
(3, 6, 1, 'WELCOME5', '6,7'),
(1, 7, 3, 'NEWUSER', '8'),
(2, 8, 1, NULL, '9'),
(3, 9, 2, 'HOLIDAY20', '10'),
(1, 10, 1, 'SEASONAL5', '11'),
(2, 1, 2, 'DISCOUNT10', '12'),
(3, 2, 1, 'DISCOUNT15', NULL),
(1, 3, 3, 'SUMMER15', '13'),
(2, 4, 1, 'DISCOUNT20', '14,15'),
(3, 5, 2, 'FALLSALE', '16'),
(1, 6, 1, 'WINTER10', '17'),
(2, 7, 3, 'DISCOUNT30', NULL),
(3, 8, 1, 'WELCOME5', '18'),
(1, 9, 2, NULL, '19'),
(2, 10, 1, 'HOLIDAY15', '20');



-- September 8, 2024 14:01:25
select count(*), users.full_name as count_like from like_res
left join users on like_res.user_id = users.id
group by users.id
order by users.id
limit 5

-- September 8, 2024 14:03:43
select restaurants.res_name, count(*) as count_like from like_res
left join restaurants on like_res.res_id = restaurants.id
group by restaurants.id
order by restaurants.id
limit 2

-- September 8, 2024 14:36:15
select users.full_name, count(*) as count_order from orders
left join users on orders.user_id = users.id
group by users.id
order by users.id
limit 1

-- September 8, 2024 14:13:46
select users.full_name, like_res.id as like_id, rate_res.id as rate_id, orders.id as order_id from users
left join like_res on users.id = like_res.user_id
left join rate_res on users.id = rate_res.user_id
left join orders on users.id = orders.user_id
where like_res.id is null
and rate_res.id is null 
and orders.id is null