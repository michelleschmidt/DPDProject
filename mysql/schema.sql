-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2024 at 08:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `health_hub`
--
CREATE DATABASE IF NOT EXISTS `health_hub` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `health_hub`;

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `availability_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `user_id`, `doctor_id`, `availability_id`, `createdAt`, `updatedAt`) VALUES
(3, 1, 7, 1, '2024-05-20 18:21:18', '2024-05-20 18:40:10');

-- --------------------------------------------------------

--
-- Table structure for table `availability`
--

CREATE TABLE `availability` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `availability_date` datetime NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `availability`
--

INSERT INTO `availability` (`id`, `doctor_id`, `availability_date`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 5, '2024-05-22 10:00:00', 0, '2024-05-20 17:56:05', '2024-05-20 18:21:18'),
(2, 5, '2024-05-25 13:30:00', 1, '2024-05-20 17:56:44', '2024-05-20 18:03:39'),
(4, 5, '2024-05-26 12:30:00', 0, '2024-05-20 18:11:14', '2024-05-20 18:20:09'),
(5, 5, '2024-05-26 12:00:00', 1, '2024-05-20 18:11:26', '2024-05-20 18:11:26');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `content`, `created_by`, `createdAt`, `updatedAt`) VALUES
(2, 'My Updated Second Blog', 'Sequelize is a Node.js-based Object Relational Mapper that makes it easy to work with MySQL, MariaDB, SQLite, PostgreSQL databases, and more. An Object Relational Mapper performs functions like handling database records by representing the data as objects. Sequelize has a powerful migration mechanism that can transform existing database schemas into new versions. Overall, Sequelize provides excellent support for database synchronization, eager loading, associations, transactions, and database migrations while reducing development time and preventing SQL injections.', 3, '2024-05-20 17:33:39', '2024-05-20 17:49:34'),
(3, 'My First Blog Recreated', 'This is the content of my first blog post.', 3, '2024-05-20 17:51:44', '2024-05-20 17:51:44');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_id` int(11) NOT NULL,
  `title` varchar(25) DEFAULT NULL,
  `first_name` varchar(35) NOT NULL,
  `last_name` varchar(35) NOT NULL,
  `email` varchar(125) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `street` varchar(100) NOT NULL,
  `city` varchar(55) NOT NULL,
  `postcode` int(11) NOT NULL,
  `state` varchar(55) NOT NULL,
  `country` varchar(35) NOT NULL,
  `role` varchar(25) NOT NULL DEFAULT 'doctor',
  `location` point DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `title`, `first_name`, `last_name`, `email`, `password`, `street`, `city`, `postcode`, `state`, `country`, `role`, `location`, `createdAt`, `updatedAt`) VALUES
(1, 'Dr.', 'Sara', 'Schmidt', 'sara.schmidt@mail.com', '$2a$10$zwwKXpMHQy9RrKL5Az/8Y.liWDOp/a/yMZ/lRHSYrd2mX6n/hhTpK', 'Alois-Gaessl 4', 'pfarrkirchen', 84347, 'Bayern', 'Germany', 'doctor', NULL, '2024-05-04 21:13:33', '2024-05-04 21:13:33');

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `id` int(11) NOT NULL,
  `language_name` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`id`, `language_name`) VALUES
(1, 'English'),
(2, 'German'),
(3, 'French'),
(4, 'Italian'),
(5, 'Spanish'),
(6, 'Dutch'),
(7, 'Portuguese'),
(8, 'Swedish'),
(9, 'Danish'),
(10, 'Finnish'),
(11, 'Greek'),
(12, 'Polish'),
(13, 'Romanian'),
(14, 'Hungarian'),
(15, 'Czech'),
(16, 'Slovak'),
(17, 'Bulgarian'),
(18, 'Lithuanian'),
(19, 'Latvian'),
(20, 'Estonian');

-- --------------------------------------------------------

--
-- Table structure for table `specialization`
--

CREATE TABLE `specialization` (
  `id` int(11) NOT NULL,
  `area_of_specialization` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specialization`
--

INSERT INTO `specialization` (`id`, `area_of_specialization`) VALUES
(1, 'Anesthesiology'),
(2, 'Cardiology'),
(3, 'Dermatology'),
(4, 'Emergency Medicine'),
(5, 'Endocrinology'),
(6, 'Family Medicine'),
(7, 'Gastroenterology'),
(8, 'Geriatrics'),
(9, 'Hematology'),
(10, 'Infectious Disease'),
(11, 'Internal Medicine'),
(12, 'Neurology'),
(13, 'Obstetrics and Gynecology'),
(14, 'Oncology'),
(15, 'Ophthalmology'),
(16, 'Orthopedics'),
(17, 'Otolaryngology'),
(18, 'Pediatrics'),
(19, 'Physical Medicine and Rehabilitation'),
(20, 'Psychiatry'),
(21, 'Pulmonology'),
(22, 'Radiology'),
(23, 'Rheumatology'),
(24, 'Surgery'),
(25, 'Urology');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `title` varchar(15) DEFAULT NULL,
  `first_name` varchar(35) NOT NULL,
  `last_name` varchar(35) NOT NULL,
  `email` varchar(125) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`address`)),
  `location` point DEFAULT NULL,
  `role` varchar(25) NOT NULL DEFAULT 'normal_user',
  `specialization_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `title`, `first_name`, `last_name`, `email`, `password`, `address`, `location`, `role`, `specialization_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Mr', 'John', 'Griffineth ', 'griffin@mail.com', '$2a$10$Sm4H3pzHnuL5MGZl.OWk0eoZ4YtlkX8pvxLC5zdWh185.p.q0nd5e', '{\"street\":\" Baumgarten Street 8\",\"city\":\"Mooshof \",\"postcode\":94249,\"state\":\" Bavaria\",\"country\":\"Germany\"}', NULL, 'normal_user', NULL, '2024-05-20 15:09:53', '2024-05-20 16:45:25'),
(3, 'Ms', 'Olivia', 'Okoro', 'olivia@mail.com', '$2a$10$bAJ5MNOz2bh.qDjFBa1AsOtCTHB8aAxjqUrLQ04i3F4CLDHtR2xjq', '{\"street\":\"Alois-Gaessl 4\",\"city\":\"Pfarrkirchen\",\"postcode\":84347,\"state\":\"Bavaria\",\"country\":\"Germany\"}', NULL, 'admin', NULL, '2024-05-20 15:30:20', '2024-05-20 15:30:20'),
(5, 'Dr', 'John', 'Monroe', 'monroe@mail.com', '$2a$10$83Cs26ndy/3nhDVihnUpvuF.FvgJ2kgXlDCLcV2bgNDnK/XP2nM9m', '{\"street\":\" Am Burggraben 6\",\"city\":\"Pfarrkirchen\",\"postcode\":84347,\"state\":\" Bavaria\",\"country\":\"Germany\"}', NULL, 'doctor', 2, '2024-05-20 15:34:03', '2024-05-20 15:34:03'),
(7, 'Dr', 'Anita', 'Mayer', 'meyer@mail.com', '$2a$10$uZsfugehHiOUjiiAcUhHeOGbrq67jTrvNq87NuCX.LhmCE8zBKAVG', '{\"street\":\"Passauer Street 10\",\"city\":\"Pfarrkirchen\",\"postcode\":84347,\"state\":\" Bavaria\",\"country\":\"Germany\"}', NULL, 'doctor', 6, '2024-05-20 18:34:16', '2024-05-20 18:34:16');

-- --------------------------------------------------------

--
-- Table structure for table `user_language`
--

CREATE TABLE `user_language` (
  `user_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_language`
--

INSERT INTO `user_language` (`user_id`, `language_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2024-05-20 15:09:53', '2024-05-20 15:09:53'),
(1, 2, '2024-05-20 15:09:53', '2024-05-20 15:09:53'),
(1, 7, '2024-05-20 15:09:53', '2024-05-20 15:09:53'),
(3, 1, '2024-05-20 15:30:20', '2024-05-20 15:30:20'),
(3, 2, '2024-05-20 15:30:20', '2024-05-20 15:30:20'),
(3, 6, '2024-05-20 15:30:20', '2024-05-20 15:30:20'),
(5, 1, '2024-05-20 15:34:03', '2024-05-20 15:34:03'),
(5, 2, '2024-05-20 15:34:03', '2024-05-20 15:34:03'),
(5, 6, '2024-05-20 15:34:03', '2024-05-20 15:34:03'),
(7, 1, '2024-05-20 18:34:16', '2024-05-20 18:34:16'),
(7, 2, '2024-05-20 18:34:16', '2024-05-20 18:34:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `availability_id` (`availability_id`);

--
-- Indexes for table `availability`
--
ALTER TABLE `availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialization`
--
ALTER TABLE `specialization`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `specialization_id` (`specialization_id`);

--
-- Indexes for table `user_language`
--
ALTER TABLE `user_language`
  ADD PRIMARY KEY (`user_id`,`language_id`),
  ADD UNIQUE KEY `user_language_language_id_user_id_unique` (`user_id`,`language_id`),
  ADD KEY `language_id` (`language_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `availability`
--
ALTER TABLE `availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `specialization`
--
ALTER TABLE `specialization`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`availability_id`) REFERENCES `availability` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `availability`
--
ALTER TABLE `availability`
  ADD CONSTRAINT `availability_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`specialization_id`) REFERENCES `specialization` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `user_language`
--
ALTER TABLE `user_language`
  ADD CONSTRAINT `user_language_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_language_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
