# create Database

CREATE DATABASE node44;

USE node44;

# create TABLE
# create table user
# chuẩn đặt tên
# không được đặt tên trùng với keyword
# không có ký tự đặt biệt

CREATE TABLE users(
	user_id INT,
	full_name VARCHAR(50),
	email VARCHAR(50),
	pass_word varchar(255)
)

# 3 kiểu dữ liệu chính
# numberic: int, float,...
# string: varchar, text, ...
# date: datetime, timestamp,...

# create DATA
INSERT INTO users (user_id, full_name, email, pass_word) VALUES
(1, 'John Doe', 'johndoe@example.com', 'password123'),
(2, 'Jane Smith', 'janesmith@example.com', 'password123'),
(3, 'Michael Johnson', 'michaelj@example.com', 'password123'),
(4, 'Emily Davis', 'emilyd@example.com', 'password123'),
(5, 'Chris Brown', 'chrisb@example.com', 'password123'),
(6, 'Sarah Wilson', 'sarahw@example.com', 'password123'),
(7, 'David Miller', 'davidm@example.com', 'password123'),
(8, 'Jessica Taylor', 'jessicat@example.com', 'password123'),
(9, 'Daniel Anderson', 'daniela@example.com', 'password123'),
(10, 'Laura Thomas', 'laurat@example.com', 'password123'),
(11, 'Paul Moore', 'paulm@example.com', 'password123'),
(12, 'Anna Jackson', 'annaj@example.com', 'password123'),
(13, 'Mark Lee', 'markl@example.com', 'password123'),
(14, 'Sophia Harris', 'sophiah@example.com', 'password123'),
(15, 'Peter Clark', 'peterc@example.com', 'password123'),
(16, 'Olivia Lewis', 'olivial@example.com', 'password123'),
(17, 'James Walker', 'jamesw@example.com', 'password123'),
(18, 'Linda Young', 'linday@example.com', 'password123'),
(19, 'Robert Hall', 'roberth@example.com', 'password123'),
(20, 'Susan Allen', 'susana@example.com', 'password123');

# interact data

# query
SELECT * FROM users

# add, delete, update

Alter TABLE users
ADD COLUMN age INT

alter table users
modify COLUMN full_name varchar(250)

INSERT INTO users (user_id, full_name, email, pass_word, age) VALUES
(1, 'John Doe', 'johndoe@example.com', 'password123', 28),
(2, 'Jane Smith', 'janesmith@example.com', 'password123', 34),
(3, 'Michael Johnson', 'michaelj@example.com', 'password123', 40),
(4, 'Emily Davis', 'emilyd@example.com', 'password123', 25),
(5, 'Chris Brown', 'chrisb@example.com', 'password123', 31),
(6, 'Sarah Wilson', 'sarahw@example.com', 'password123', 27),
(7, 'David Miller', 'davidm@example.com', 'password123', 45),
(8, 'Jessica Taylor', 'jessicat@example.com', 'password123', 22),
(9, 'Daniel Anderson', 'daniela@example.com', 'password123', 33),
(10, 'Laura Thomas', 'laurat@example.com', 'password123', 29),
(11, 'Paul Moore', 'paulm@example.com', 'password123', 36),
(12, 'Anna Jackson', 'annaj@example.com', 'password123', 24),
(13, 'Mark Lee', 'markl@example.com', 'password123', 38),
(14, 'Sophia Harris', 'sophiah@example.com', 'password123', 26),
(15, 'Peter Clark', 'peterc@example.com', 'password123', 32),
(16, 'Olivia Lewis', 'olivial@example.com', 'password123', 30),
(17, 'James Walker', 'jamesw@example.com', 'password123', 42),
(18, 'Linda Young', 'linday@example.com', 'password123', 37),
(19, 'Robert Hall', 'roberth@example.com', 'password123', 50),
(20, 'Susan Allen', 'susana@example.com', 'password123', 28);

SELECT * from users
where age <= 30 and age >= 25


SELECT * from users
where age between 30 and 25

select * from users
where ( full_name like '%John%') and (age BETWEEN 25 and 30)

select * from users
order by age DESC
limit 5

# thêm constraint (ràng buộc) cho COLUMN
Alter table users
Modify column full_name VARCHAR(255) not null,
modify column email varchar(50) not null,
modify column pass_word varchar(255) not null

#thêm khoá chính (primary key) cho column user_id
Alter table users
modify column user_id int primary key auto_increment

# update 
update users 
set full_name = "Minh Tuan"
where user_id = 1

select * from users
where user_id=1

#delete
#hard delete
delete from users 
where user_id = 2

#soft delete -> them flag is_deteted de khong show DATA

alter table users
add column is_deleted int not null default 1

# tìm những người có tuổi lớn nhất

select * from users
where age = (
	select age from users
	order by age DESC
	limit 1
)

