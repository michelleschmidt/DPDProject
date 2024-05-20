-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2024 at 07:06 PM
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
(6, 15, 14, 4, '2024-05-14 17:59:41', '2024-05-14 17:59:41');

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
(3, 14, '2024-05-20 10:00:00', 1, '2024-05-14 17:42:15', '2024-05-14 17:42:15'),
(4, 14, '2024-05-20 11:00:00', 0, '2024-05-14 17:42:28', '2024-05-14 17:59:41'),
(5, 14, '2024-05-19 11:00:00', 1, '2024-05-14 17:42:41', '2024-05-14 17:42:41');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `blog_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `body` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `doctor_language`
--

CREATE TABLE `doctor_language` (
  `doctor_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_language`
--

INSERT INTO `doctor_language` (`doctor_id`, `language_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2024-05-04 21:13:33', '2024-05-04 21:13:33'),
(1, 5, '2024-05-04 21:13:33', '2024-05-04 21:13:33'),
(1, 7, '2024-05-04 21:13:33', '2024-05-04 21:13:33');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_specialization`
--

CREATE TABLE `doctor_specialization` (
  `doctor_id` int(11) NOT NULL,
  `specialization_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_specialization`
--

INSERT INTO `doctor_specialization` (`doctor_id`, `specialization_id`, `createdAt`, `updatedAt`) VALUES
(11, 1, '2024-05-13 15:25:16', '2024-05-13 15:25:16'),
(11, 3, '2024-05-13 15:25:16', '2024-05-13 15:25:16'),
(11, 6, '2024-05-13 15:25:16', '2024-05-13 15:25:16'),
(14, 2, '2024-05-14 14:50:52', '2024-05-14 14:50:52'),
(14, 5, '2024-05-14 14:50:52', '2024-05-14 14:50:52'),
(14, 6, '2024-05-14 14:50:52', '2024-05-14 14:50:52');

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
  `street` varchar(100) NOT NULL,
  `city` varchar(35) NOT NULL,
  `postcode` int(11) NOT NULL,
  `state` varchar(45) NOT NULL,
  `country` varchar(25) NOT NULL,
  `location` point DEFAULT NULL,
  `role` varchar(25) NOT NULL DEFAULT 'normal_user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `title`, `first_name`, `last_name`, `email`, `password`, `street`, `city`, `postcode`, `state`, `country`, `location`, `role`, `createdAt`, `updatedAt`) VALUES
(11, 'Dr', 'Olivia', 'Okoro', 'olivia.okoro@mail.com', '$2a$10$flvzMHOYKAkbLMZFpbG/.elo0wt/aQHG.pw2qF9wDiVlZZ8E/6dOC', 'Alois-Gaessl 4', 'pfarrkirchen', 84347, 'Bayern', 'Germany', NULL, 'doctor', '2024-05-13 15:25:16', '2024-05-13 15:25:16'),
(14, 'Dr', 'Michelle', 'Schmidt', 'michelle.schmidt@mail.com', '$2a$10$RCb0omSDBQZPMem.YejxVe1kCBukFb0/PZ.D.bx7UQXmmDP0FJWI.', 'Alois-Gaessl 4', 'pfarrkirchen', 84347, 'Bayern', 'Germany', NULL, 'doctor', '2024-05-14 14:50:52', '2024-05-14 14:50:52'),
(15, 'Ms', 'Helana', 'Mensah', 'helena.mensah@mail.com', '$2a$10$.L.P7haf.7BxdWCVVWQ2M.C/CEToEEivzldRtVsKCb6qYrcmT92GS', 'Alois-Gaessl 4', 'pfarrkirchen', 84347, 'Bayern', 'Germany', NULL, 'normal_user', '2024-05-14 16:24:47', '2024-05-14 16:24:47');

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
(11, 1, '2024-05-13 15:25:16', '2024-05-13 15:25:16'),
(11, 2, '2024-05-13 15:25:16', '2024-05-13 15:25:16'),
(11, 7, '2024-05-13 15:25:16', '2024-05-13 15:25:16'),
(14, 1, '2024-05-14 14:50:52', '2024-05-14 14:50:52'),
(14, 6, '2024-05-14 14:50:52', '2024-05-14 14:50:52'),
(14, 8, '2024-05-14 14:50:52', '2024-05-14 14:50:52'),
(15, 1, '2024-05-14 16:24:47', '2024-05-14 16:24:47'),
(15, 6, '2024-05-14 16:24:47', '2024-05-14 16:24:47'),
(15, 8, '2024-05-14 16:24:47', '2024-05-14 16:24:47');

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
  ADD PRIMARY KEY (`blog_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `doctor_language`
--
ALTER TABLE `doctor_language`
  ADD PRIMARY KEY (`doctor_id`,`language_id`),
  ADD KEY `language_id` (`language_id`);

--
-- Indexes for table `doctor_specialization`
--
ALTER TABLE `doctor_specialization`
  ADD PRIMARY KEY (`doctor_id`,`specialization_id`),
  ADD UNIQUE KEY `doctor_specialization_specialization_id_user_id_unique` (`doctor_id`,`specialization_id`),
  ADD KEY `specialization_id` (`specialization_id`);

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
  ADD UNIQUE KEY `email` (`email`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `availability`
--
ALTER TABLE `availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`availability_id`) REFERENCES `availability` (`id`);

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
-- Constraints for table `doctor_language`
--
ALTER TABLE `doctor_language`
  ADD CONSTRAINT `doctor_language_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  ADD CONSTRAINT `doctor_language_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);

--
-- Constraints for table `doctor_specialization`
--
ALTER TABLE `doctor_specialization`
  ADD CONSTRAINT `doctor_specialization_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `doctor_specialization_ibfk_2` FOREIGN KEY (`specialization_id`) REFERENCES `specialization` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
