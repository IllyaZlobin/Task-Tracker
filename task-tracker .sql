﻿--
-- Script was generated by Devart dbForge Studio 2019 for MySQL, Version 8.2.23.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 03.07.2020 17:01:46
-- Server version: 8.0.18
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE `task-tracker`;

--
-- Drop table `task`
--
DROP TABLE IF EXISTS task;

--
-- Drop table `user`
--
DROP TABLE IF EXISTS user;

--
-- Set default database
--
USE `task-tracker`;

--
-- Create table `user`
--
CREATE TABLE user (
  id int(11) NOT NULL AUTO_INCREMENT,
  firstname varchar(55) NOT NULL,
  lastname varchar(55) NOT NULL,
  email varchar(55) NOT NULL,
  age int(11) DEFAULT NULL,
  password varchar(255) NOT NULL,
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 24,
AVG_ROW_LENGTH = 910,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

--
-- Create table `task`
--
CREATE TABLE task (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  description varchar(255) NOT NULL,
  status enum ('View', 'In-Progress', 'Done') NOT NULL,
  userId int(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

--
-- Create foreign key
--
ALTER TABLE task
ADD CONSTRAINT FK_task_userId FOREIGN KEY (userId)
REFERENCES user (id);

-- 
-- Dumping data for table user
--
INSERT INTO user VALUES
(1, 'illia', 'zlobin', 'illiazlobin@gmail.com', 22, '123456', NULL),
(2, 'test1', 'test1', 'test1@gmail.com', 10, 'test123', '2020-07-02 22:18:48'),
(3, 'test2', 'test2', 'test2@gmail.com', 12, 'test333', '2020-07-02 22:39:25'),
(5, 'test3', 'test3', 'test3@gmail.com', 13, 'test333', '2020-07-02 23:39:00'),
(6, 'test4', 'test4', 'test4@gmail.com', 14, 'test444', '2020-07-02 23:49:18'),
(7, 'test5', 'test5', 'test5@gmail.com', 15, 'test555', '2020-07-02 23:50:13'),
(8, 'test6', 'test6', 'test6@gmail.com', 16, 'test666', '2020-07-03 00:20:09'),
(9, 'test7', 'test7', 'test7@gmail.com', 17, 'test777', '2020-07-03 00:55:13'),
(11, 'test9', 'test9', 'test9@gmail.com', 19, 'test9', '2020-07-03 00:56:29'),
(12, 'test10', 'test10', 'test10@gmail.com', 20, 'test10', '2020-07-03 00:59:10'),
(13, 'test11', 'test11', 'test11@gmail.com', 21, 'test11', '2020-07-03 00:59:27'),
(14, 'test12', 'test12', 'test12@gmail.com', 22, 'test12', '2020-07-03 10:27:13'),
(15, 'test13', 'test13', 'test13@gmail.com', 23, 'test13', '2020-07-03 10:27:28'),
(16, 'test14', 'test14', 'test14@gmail.com', 24, 'test14', '2020-07-03 10:27:40'),
(17, 'test15', 'test15', 'test15@gmail.com', 25, 'test15', '2020-07-03 10:27:49'),
(18, 'updated16', 'updated16', 'updated16@mail.ru', 16, 'updated16', '2020-07-03 10:28:09'),
(19, 'test17', 'test17', 'test17@mail.ru', 17, 'test17', '2020-07-03 11:22:25'),
(22, 'test18', 'test18', 'test18@mail.ru', 18, 'test18', '2020-07-03 11:34:46');

-- 
-- Dumping data for table task
--
INSERT INTO task VALUES
(3, 'task1', 'task1 description', 'View', NULL),
(4, 'task2', 'task2 description', 'View', 1),
(5, 'task3', 'task3 description', 'View', 3),
(7, 'task4', 'task4 description', 'In-Progress', 5),
(8, 'task5', 'task5 description', 'Done', 6),
(10, 'task6', 'task6 description', 'Done', 3),
(11, 'task7 after update', 'task7 description', 'In-Progress', 3);

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;