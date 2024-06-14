CREATE DATABASE  IF NOT EXISTS `health_connect` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `health_connect`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: healthconnect-db.mysql.database.azure.com    Database: health_connect
-- ------------------------------------------------------
-- Server version	8.0.36-cluster

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `availability_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`my_row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` (`my_row_id`, `id`, `user_id`, `doctor_id`, `availability_id`, `createdAt`, `updatedAt`) VALUES (1,3,1,7,1,'2024-05-20 18:21:18','2024-05-20 18:40:10');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `availability`
--

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `availability` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `availability_date` datetime NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`my_row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` (`my_row_id`, `id`, `doctor_id`, `availability_date`, `active`, `createdAt`, `updatedAt`) VALUES (1,1,5,'2024-05-22 10:00:00',0,'2024-05-20 17:56:05','2024-05-20 18:21:18'),(2,2,5,'2024-05-25 13:30:00',1,'2024-05-20 17:56:44','2024-05-20 18:03:39'),(3,4,5,'2024-05-26 12:30:00',0,'2024-05-20 18:11:14','2024-05-20 18:20:09'),(4,5,5,'2024-05-26 12:00:00',1,'2024-05-20 18:11:26','2024-05-20 18:11:26');
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `id` int NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_by` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`my_row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` (`my_row_id`, `id`, `title`, `content`, `created_by`, `createdAt`, `updatedAt`) VALUES (1,2,'My Updated Second Blog','Sequelize is a Node.js-based Object Relational Mapper that makes it easy to work with MySQL, MariaDB, SQLite, PostgreSQL databases, and more. An Object Relational Mapper performs functions like handling database records by representing the data as objects. Sequelize has a powerful migration mechanism that can transform existing database schemas into new versions. Overall, Sequelize provides excellent support for database synchronization, eager loading, associations, transactions, and database migrations while reducing development time and preventing SQL injections.',3,'2024-05-20 17:33:39','2024-05-20 17:49:34'),(2,3,'My First Blog Recreated','This is the content of my first blog post.',3,'2024-05-20 17:51:44','2024-05-20 17:51:44');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `doctor_id` int NOT NULL,
  `title` varchar(25) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name` varchar(35) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(35) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(125) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `street` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(55) COLLATE utf8mb4_general_ci NOT NULL,
  `postcode` int NOT NULL,
  `state` varchar(55) COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(35) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(25) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'doctor',
  `location` point DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`my_row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` (`my_row_id`, `doctor_id`, `title`, `first_name`, `last_name`, `email`, `password`, `street`, `city`, `postcode`, `state`, `country`, `role`, `location`, `createdAt`, `updatedAt`) VALUES (1,1,'Dr.','Sara','Schmidt','sara.schmidt@mail.com','$2a$10$zwwKXpMHQy9RrKL5Az/8Y.liWDOp/a/yMZ/lRHSYrd2mX6n/hhTpK','Alois-Gaessl 4','pfarrkirchen',84347,'Bayern','Germany','doctor',NULL,'2024-05-04 21:13:33','2024-05-04 21:13:33');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `id` int NOT NULL,
  `language_name` varchar(55) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`my_row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` (`my_row_id`, `id`, `language_name`) VALUES (1,1,'English'),(2,2,'German'),(3,3,'French'),(4,4,'Italian'),(5,5,'Spanish'),(6,6,'Dutch'),(7,7,'Portuguese'),(8,8,'Swedish'),(9,9,'Danish'),(10,10,'Finnish'),(11,11,'Greek'),(12,12,'Polish'),(13,13,'Romanian'),(14,14,'Hungarian'),(15,15,'Czech'),(16,16,'Slovak'),(17,17,'Bulgarian'),(18,18,'Lithuanian'),(19,19,'Latvian'),(20,20,'Estonian');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialization`
--

DROP TABLE IF EXISTS `specialization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialization` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `id` int NOT NULL,
  `area_of_specialization` varchar(55) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`my_row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialization`
--

LOCK TABLES `specialization` WRITE;
/*!40000 ALTER TABLE `specialization` DISABLE KEYS */;
INSERT INTO `specialization` (`my_row_id`, `id`, `area_of_specialization`) VALUES (1,1,'Anesthesiology'),(2,2,'Cardiology'),(3,3,'Dermatology'),(4,4,'Emergency Medicine'),(5,5,'Endocrinology'),(6,6,'Family Medicine'),(7,7,'Gastroenterology'),(8,8,'Geriatrics'),(9,9,'Hematology'),(10,10,'Infectious Disease'),(11,11,'Internal Medicine'),(12,12,'Neurology'),(13,13,'Obstetrics and Gynecology'),(14,14,'Oncology'),(15,15,'Ophthalmology'),(16,16,'Orthopedics'),(17,17,'Otolaryngology'),(18,18,'Pediatrics'),(19,19,'Physical Medicine and Rehabilitation'),(20,20,'Psychiatry'),(21,21,'Pulmonology'),(22,22,'Radiology'),(23,23,'Rheumatology'),(24,24,'Surgery'),(25,25,'Urology');
/*!40000 ALTER TABLE `specialization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specializations`
--

DROP TABLE IF EXISTS `specializations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specializations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `area_of_specialization` varchar(55) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specializations`
--

LOCK TABLES `specializations` WRITE;
/*!40000 ALTER TABLE `specializations` DISABLE KEYS */;
/*!40000 ALTER TABLE `specializations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `id` int NOT NULL,
  `title` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name` varchar(35) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(35) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(125) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `location` point DEFAULT NULL,
  `role` varchar(25) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'normal_user',
  `specialization_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`my_row_id`),
  CONSTRAINT `user_chk_1` CHECK (json_valid(`address`))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`my_row_id`, `id`, `title`, `first_name`, `last_name`, `email`, `password`, `address`, `location`, `role`, `specialization_id`, `createdAt`, `updatedAt`) VALUES (1,1,'Mr','John','Griffineth ','griffin@mail.com','$2a$10$Sm4H3pzHnuL5MGZl.OWk0eoZ4YtlkX8pvxLC5zdWh185.p.q0nd5e','{\"street\":\" Baumgarten Street 8\",\"city\":\"Mooshof \",\"postcode\":94249,\"state\":\" Bavaria\",\"country\":\"Germany\"}',NULL,'normal_user',NULL,'2024-05-20 15:09:53','2024-05-20 16:45:25'),(2,3,'Ms','Olivia','Okoro','olivia@mail.com','$2a$10$bAJ5MNOz2bh.qDjFBa1AsOtCTHB8aAxjqUrLQ04i3F4CLDHtR2xjq','{\"street\":\"Alois-Gaessl 4\",\"city\":\"Pfarrkirchen\",\"postcode\":84347,\"state\":\"Bavaria\",\"country\":\"Germany\"}',NULL,'admin',NULL,'2024-05-20 15:30:20','2024-05-20 15:30:20'),(3,5,'Dr','John','Monroe','monroe@mail.com','$2a$10$83Cs26ndy/3nhDVihnUpvuF.FvgJ2kgXlDCLcV2bgNDnK/XP2nM9m','{\"street\":\" Am Burggraben 6\",\"city\":\"Pfarrkirchen\",\"postcode\":84347,\"state\":\" Bavaria\",\"country\":\"Germany\"}',NULL,'doctor',2,'2024-05-20 15:34:03','2024-05-20 15:34:03'),(4,7,'Dr','Anita','Mayer','meyer@mail.com','$2a$10$uZsfugehHiOUjiiAcUhHeOGbrq67jTrvNq87NuCX.LhmCE8zBKAVG','{\"street\":\"Passauer Street 10\",\"city\":\"Pfarrkirchen\",\"postcode\":84347,\"state\":\" Bavaria\",\"country\":\"Germany\"}',NULL,'doctor',6,'2024-05-20 18:34:16','2024-05-20 18:34:16');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_language`
--

DROP TABLE IF EXISTS `user_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_language` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `user_id` int NOT NULL,
  `language_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`my_row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_language`
--

LOCK TABLES `user_language` WRITE;
/*!40000 ALTER TABLE `user_language` DISABLE KEYS */;
INSERT INTO `user_language` (`my_row_id`, `user_id`, `language_id`, `createdAt`, `updatedAt`) VALUES (1,1,1,'2024-05-20 15:09:53','2024-05-20 15:09:53'),(2,1,2,'2024-05-20 15:09:53','2024-05-20 15:09:53'),(3,1,7,'2024-05-20 15:09:53','2024-05-20 15:09:53'),(4,3,1,'2024-05-20 15:30:20','2024-05-20 15:30:20'),(5,3,2,'2024-05-20 15:30:20','2024-05-20 15:30:20'),(6,3,6,'2024-05-20 15:30:20','2024-05-20 15:30:20'),(7,5,1,'2024-05-20 15:34:03','2024-05-20 15:34:03'),(8,5,2,'2024-05-20 15:34:03','2024-05-20 15:34:03'),(9,5,6,'2024-05-20 15:34:03','2024-05-20 15:34:03'),(10,7,1,'2024-05-20 18:34:16','2024-05-20 18:34:16'),(11,7,2,'2024-05-20 18:34:16','2024-05-20 18:34:16');
/*!40000 ALTER TABLE `user_language` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14 13:38:21
