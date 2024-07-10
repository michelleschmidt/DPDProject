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
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `availability_id` int NOT NULL,
  `appointment_reason` json NOT NULL,
  `book_translation` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `availability_id` (`availability_id`),
  CONSTRAINT `appointment_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointment_ibfk_8` FOREIGN KEY (`doctor_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointment_ibfk_9` FOREIGN KEY (`availability_id`) REFERENCES `availability` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (4,16,12,31,'{\"notes\": \"Annual Health Check-Up\", \"reason\": \"Preventive Health Check-Ups\"}',0,'2024-07-06 13:03:58','2024-07-09 22:06:03',0),(5,4,9,15,'{\"notes\": \"Sudden worsening of chronic condition\", \"reason\": \"Acute Consultation\"}',1,'2024-07-06 14:07:45','2024-07-07 20:09:14',0),(7,16,9,16,'{\"notes\": \"Surgery\", \"reason\": \"Follow-Up checkup\"}',1,'2024-07-06 14:12:36','2024-07-06 14:12:36',0),(8,16,12,30,'{\"notes\": \"Surgery\", \"reason\": \"Follow-Up checkup\"}',1,'2024-07-06 14:27:23','2024-07-06 14:27:23',0),(11,14,11,25,'{\"notes\": \"Sudden worsening of chronic condition\", \"reason\": \"Acute Consultation\"}',1,'2024-07-07 13:08:54','2024-07-07 13:08:54',0),(13,7,10,20,'{\"notes\": \"Surgery\", \"reason\": \"Follow-Up checkup\"}',1,'2024-07-09 22:51:59','2024-07-09 22:51:59',0);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `availability`
--

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `availability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int NOT NULL,
  `availability_date` datetime NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `availability_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` VALUES (13,11,'2024-07-12 12:30:00',1,'2024-06-28 20:18:42','2024-06-28 20:18:42'),(14,9,'2024-07-13 11:00:00',0,'2024-06-28 20:25:23','2024-07-06 13:03:58'),(15,9,'2024-07-14 12:00:00',0,'2024-06-28 20:26:53','2024-07-06 14:07:45'),(16,9,'2024-07-15 13:00:00',0,'2024-06-28 20:27:06','2024-07-06 14:12:37'),(18,10,'2024-07-12 11:30:00',1,'2024-06-28 20:27:31','2024-06-28 20:27:31'),(19,10,'2024-07-13 12:30:00',1,'2024-06-28 20:28:30','2024-07-09 22:52:34'),(20,10,'2024-07-14 10:30:00',0,'2024-06-28 20:28:44','2024-07-09 22:52:00'),(21,10,'2024-07-15 11:00:00',1,'2024-06-28 20:29:00','2024-06-28 20:29:00'),(22,10,'2024-07-16 12:00:00',1,'2024-06-28 20:30:20','2024-06-28 20:30:20'),(23,11,'2024-07-12 12:30:00',1,'2024-06-28 20:30:36','2024-06-28 20:30:36'),(24,11,'2024-07-13 10:00:00',1,'2024-06-28 20:30:52','2024-06-28 20:30:52'),(25,11,'2024-07-14 11:00:00',0,'2024-06-28 20:31:09','2024-07-07 13:08:54'),(26,11,'2024-07-15 12:00:00',1,'2024-06-28 20:31:22','2024-07-09 15:30:53'),(27,11,'2024-07-16 13:00:00',1,'2024-06-28 20:31:44','2024-06-28 20:31:44'),(28,12,'2024-07-13 11:30:00',1,'2024-06-28 20:31:59','2024-06-28 20:31:59'),(29,12,'2024-07-14 12:30:00',1,'2024-06-28 20:33:25','2024-06-28 20:33:25'),(30,12,'2024-07-15 10:00:00',0,'2024-06-28 20:33:25','2024-07-06 14:27:23'),(31,12,'2024-07-16 11:00:00',1,'2024-06-28 20:33:25','2024-06-28 20:33:25'),(32,13,'2024-07-12 12:00:00',1,'2024-06-28 20:33:25','2024-06-28 20:33:25'),(33,13,'2024-07-13 13:00:00',1,'2024-06-28 20:33:25','2024-06-28 20:33:25'),(34,13,'2024-07-14 10:30:00',1,'2024-06-28 20:33:25','2024-06-28 20:33:25'),(35,13,'2024-07-15 11:30:00',1,'2024-06-28 20:33:25','2024-07-09 22:02:22'),(36,13,'2024-07-16 12:30:00',1,'2024-06-28 20:33:25','2024-06-28 20:33:25'),(38,9,'2024-07-28 10:00:00',1,'2024-07-09 23:53:11','2024-07-09 23:53:11');
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blog_title` varchar(100) NOT NULL,
  `blog_content` text NOT NULL,
  `created_by` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `id` int NOT NULL AUTO_INCREMENT,
  `language_name` varchar(55) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (1,'English'),(2,'German'),(3,'French'),(4,'Italian'),(5,'Spanish'),(6,'Dutch'),(7,'Portuguese'),(8,'Swedish'),(9,'Danish'),(10,'Finnish'),(11,'Greek'),(12,'Polish'),(13,'Romanian'),(14,'Hungarian'),(15,'Czech'),(16,'Slovak'),(17,'Bulgarian'),(18,'Lithuanian'),(19,'Latvian'),(20,'Estonian');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialization`
--

DROP TABLE IF EXISTS `specialization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialization` (
  `id` int NOT NULL AUTO_INCREMENT,
  `area_of_specialization` varchar(55) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialization`
--

LOCK TABLES `specialization` WRITE;
/*!40000 ALTER TABLE `specialization` DISABLE KEYS */;
INSERT INTO `specialization` VALUES (1,'Anesthesiology'),(2,'Cardiology'),(3,'Dermatology'),(4,'Emergency Medicine'),(5,'Endocrinology'),(6,'Family Medicine'),(7,'Gastroenterology'),(8,'Geriatrics'),(9,'Hematology'),(10,'Infectious Disease'),(11,'Internal Medicine'),(12,'Neurology'),(13,'Obstetrics and Gynecology'),(14,'Oncology'),(15,'Ophthalmology'),(16,'Orthopedics'),(17,'Otolaryngology'),(18,'Pediatrics'),(19,'Physical Medicine and Rehabilitation'),(20,'Psychiatry'),(21,'Pulmonology'),(22,'Radiology'),(23,'Rheumatology'),(24,'Surgery'),(25,'Urology');
/*!40000 ALTER TABLE `specialization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(15) DEFAULT NULL,
  `first_name` varchar(35) NOT NULL,
  `last_name` varchar(35) NOT NULL,
  `email` varchar(125) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone_number` varchar(25) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `insurance_type` varchar(25) NOT NULL DEFAULT 'public',
  `address` json NOT NULL,
  `location` point DEFAULT NULL,
  `role` varchar(25) NOT NULL DEFAULT 'normal_user',
  `accessibility_needs` varchar(255) DEFAULT 'none',
  `emergency_contact_details` json DEFAULT NULL,
  `specialization_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  KEY `specialization_id` (`specialization_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`specialization_id`) REFERENCES `specialization` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'Mrs.','Sophie','Hofmann','sophie@example.com','$2a$10$B7CApY1Pu0mmhwcV1fzH0uLU.1i/2y./UzLljaCtYvCcSjDlpvHO.','1998-07-30','+49 1566789012','Female','public','{\"city\": \"Munich\", \"state\": \"Bavaria\", \"street\": \"Schwanthalerstr. 10\", \"country\": \"\", \"postal_code\": \"\"}',_binary '\0\0\0\0\0\0\0°Ä\Ì`\ƒ\'@áoa\›xH@','normal_user','None','{\"name\": \"Lena Hofmann\", \"phone_number\": \"+49 1547890123\", \"relationship\": \"Mother\"}',NULL,'2024-06-28 17:49:51','2024-07-09 20:29:19'),(7,'Wizard','Mischi','Michelle Schmidt','marie11schmidt04@gmail.com','$2a$10$8jo7DRJfhRWfR72WVjWANud8zyb1gXYs0rSXCjerLamYhz9QsmpuC','2024-06-26','017671228227','','public','{\"city\": \"Ravensburg\", \"state\": \"Bavaria\", \"street\": \"√ñlschwang 14\", \"country\": \"Deutschland\", \"postcode\": \"88212\"}',_binary '\0\0\0\0\0\0\0:\\´=\ÏΩ#@Ù˙ì¯\‹\ÎH@','normal_user','none','{\"name\": \"Michelle Schmidt\", \"phone_number\": \"+4917671228226\", \"relationship\": \"dad\"}',NULL,'2024-06-28 18:05:48','2024-07-08 18:29:39'),(8,'Ms.','Olivia','Okoro','olivia@mail.com','$2a$10$bYOnaIVEFQE03V.lKhyEY.vN/ymEAVOeFUuuXPt3xs1WA8g58ewrm','1992-11-11','+49 1566789012',NULL,'public','{\"city\": \"Pfarrkirchen\", \"state\": \"Bavaria\", \"street\": \"Alois G√§ssl 4\", \"postcode\": \"84347\"}',_binary '\0\0\0\0\0\0\0íØRb\ﬂ)@π8*7Q7H@','admin','None','{\"name\": \"Lena Olive\", \"phone_number\": \"+49 1547890123\", \"relationship\": \"daughter\"}',NULL,'2024-06-28 18:17:53','2024-06-28 18:17:53'),(9,'Dr.','Julia','Schmidt','julia.schmidt@example.com','$2a$10$u.qgRVEn08BacPWcGf7wb.nFr/meXRnM4yyIYv6N2uKuNd.IXPZ7.','1990-08-14','+49 1598765432','female','public','{\"city\": \"Pfarrkirchen\", \"state\": \"Bayern\", \"street\": \"Bahnhofstr 12\", \"country\": \"Germany\", \"postcode\": \"84347\"}',_binary '\0\0\0\0\0\0\0¸ﬁ¨¡#)@≥Bë\Ó\ÁpH@','doctor','Visual Impairment','{\"name\": \"Peter Schmidt\", \"phone_number\": \"+49 1591234567\", \"relationship\": \"Brother\"}',1,'2024-06-28 18:29:18','2024-07-09 23:29:12'),(10,'Dr.','Sophia','M√ºller','sophia.mueller@mail.com','$2a$10$dW5eYY6PBChL0jWab6v80udBLgNoySrcw71TGDfGWHu/VnGwXGZXq','1975-03-15','+49 1762345678','female','public','{\"city\": \"Nuremberg\", \"state\": \"Bavaria\", \"street\": \"Hauptstr. 24\", \"country\": \"\", \"postcode\": \"\"}',_binary '\0\0\0\0\0\0\0¿îÅ;&@\Á\«_Z‘´H@','doctor','None','{\"name\": \"Karl M√ºller\", \"phone_number\": \"+49 1768765432\", \"relationship\": \"husband\"}',3,'2024-06-28 18:31:39','2024-07-09 23:27:40'),(11,'Dr.','Maximilian','Schneider','max.schneider@mail.com','$2a$10$FyPO//UL8.MAd/Pazkasg.uF7AomEd18Kcv4h3ftD1d9968Ins7ra','1980-05-20','+49 1761234567','male','public','{\"city\": \"Augsburg\", \"state\": \"Bavaria\", \"street\": \"M√ºnchner Str. 15\", \"postcode\": \"86150\"}',_binary '\0\0\0\0\0\0\0Rb\◊ˆv\„%@äé\‰Ú,H@','doctor','None','{\"name\": \"Anna Schneider\", \"phone_number\": \"+49 1767654321\", \"relationship\": \"wife\"}',2,'2024-06-28 18:33:11','2024-06-28 18:33:11'),(12,'Dr.','Lukas','Fischer','lukas.fischer@mail.com','$2a$10$Fbvp26uZ6UFFuDC7mz0/7eCkzFdb5VlFynW4cWIO6Mwe2maPLwchq','1985-11-30','+49 1763456789','male','public','{\"city\": \"Regensburg\", \"state\": \"Bavaria\", \"street\": \"Bahnhofstr. 8\", \"postcode\": \"93047\"}',_binary '\0\0\0\0\0\0\0:\Œm¬Ω:(@pCå◊ºÇH@','doctor','None','{\"name\": \"Laura Fischer\", \"phone_number\": \"+49 1769876543\", \"relationship\": \"sister\"}',6,'2024-06-28 18:34:13','2024-06-28 18:34:13'),(13,'Dr.','Hanna','Wagner','hanna.wagner@mail.com','$2a$10$ax100d4tuRpOh5Ya/R9.hOx2fc5/fdY98pCKbP/Tp4WP.SPMCtsjO','1982-08-25','+49 1764567890','female','public','{\"city\": \"Regensburg\", \"state\": \"Bavaria\", \"street\": \"Bahnhofstr. 10\", \"postcode\": \"93047\"}',_binary '\0\0\0\0\0\0\0:\Œm¬Ω:(@pCå◊ºÇH@','doctor','None','{\"name\": \"Jan Wagner\", \"phone_number\": \"+49 1760987654\", \"relationship\": \"brother\"}',3,'2024-06-28 18:35:45','2024-06-28 18:35:45'),(14,'Mr.','Leon','Hofmann','leon.hofmann@mail.com','$2a$10$fZgVjXLYd.oIJbASXz19iuaW2h4BADJult6tBxm84j39BnYDj2yVy','1990-04-18','+49 1765678901','male','public','{\"city\": \"Ingolstadt\", \"state\": \"Bavaria\", \"street\": \"Goethestr. 10\", \"postcode\": \"85049\"}',_binary '\0\0\0\0\0\0\0°∫π¯\€\ﬁ&@Hk:!ZH@','normal_user','None','{\"name\": \"Marie Hofmann\", \"phone_number\": \"+49 1761098765\", \"relationship\": \"mother\"}',NULL,'2024-06-28 18:37:17','2024-06-28 18:37:17'),(15,'Ms.','Emily','Weber','emily.weber@mail.com','$2a$10$LN2zKHQJGEfTIdZKWObZPOkAcCf8rAilalPfZV3gRiEed.CKomjWS','1995-02-11','+49 1766789012','female','public','{\"city\": \"Erlangen\", \"state\": \"Bavaria\", \"street\": \"Schillerstr. 12\", \"postcode\": \"91052\"}',_binary '\0\0\0\0\0\0\0<ÉÜ˛	\Œ%@Ω:«Ä\Ï\—H@','normal_user','None','{\"name\": \"Sophie Weber\", \"phone_number\": \"+49 1762109876\", \"relationship\": \"sister\"}',NULL,'2024-06-28 18:37:58','2024-06-28 18:37:58'),(16,'Mr.','Jonas','Bauer','jonas.bauer@mail.com','$2a$10$UhYbdxF0n5uU/kbgqhLGnedFCzt7lOsqX9uOxNO22nLve9lbAczXe','1993-09-22','+49 1767890123','male','public','{\"city\": \"Bayreuth\", \"state\": \"Bavaria\", \"street\": \"Hauptmarkt 1\", \"country\": \"\", \"postcode\": \"95444\"}',_binary '\0\0\0\0\0\0\07p\Íî\'&@N\Ów(\n∫H@','normal_user','None','{\"name\": \"Nina Bauer\", \"phone_number\": \"+49 1763210987\", \"relationship\": \"girlfriend\"}',NULL,'2024-06-28 18:38:32','2024-07-08 00:22:25'),(17,'Ms.','Laura','Schmidt','laura.schmidt@mail.com','$2a$10$Dl40g2sfqOwdfomGdj2pV.a/J8iw4AlmaLO/guyI3Qg6dNKi5Eq4C','1994-07-13','+49 1768901234','female','public','{\"city\": \"Munich\", \"state\": \"Bavaria\", \"street\": \"Prinzregentenstr. 22\", \"postcode\": \"80538\"}',_binary '\0\0\0\0\0\0\0uëBY8(@2<ˆ≥X\ÓG@','normal_user','None','{\"name\": \"Markus Schmidt\", \"phone_number\": \"+49 1764321098\", \"relationship\": \"father\"}',NULL,'2024-06-28 18:39:41','2024-06-28 18:39:41'),(18,'Dr.','Hanna','Manner','hanna@mail.com','$2a$10$c101CAqRB6IvRbH0OyrraObTKieiNdgHjRJGYPphXtbkh1NJCqxQ2','1987-05-25','+49 1764567890','female','public','{\"city\": \"Regensburg\", \"state\": \"Bavaria\", \"street\": \"Bahnhofstr. 6\", \"postcode\": \"93047\"}',_binary '\0\0\0\0\0\0\0:\Œm¬Ω:(@pCå◊ºÇH@','doctor','None','{\"name\": \"Jan Manner\", \"phone_number\": \"+49 1760987654\", \"relationship\": \"brother\"}',3,'2024-06-28 23:21:36','2024-06-28 23:21:36'),(21,'Mrs.','Michelle','Schmidt','schmidt@gmai.com','$2a$10$DiRt7KzZ6aN5RMbfs8paaeloSVQ7L3DSnhTKR5dOoHG1fJfmrLu/e','2024-07-02','017671228226',NULL,'public','{\"city\": \"Pfarrkirchen\", \"state\": \"Testing\", \"street\": \"Stadtplatz\", \"country\": \"Deutschland\", \"postcode\": \"84347\"}',_binary '\0\0\0\0\0\0\0íØRb\ﬂ)@π8*7Q7H@','doctor','none',NULL,4,'2024-07-08 17:36:34','2024-07-08 17:36:34'),(28,'Dr.','Michelle','Schmidt','teremakaseh@tv.de','$2a$10$fgR/2gEpCaiDpwL/624QwutmCJIX8ApLHBkiH4HVYucfdvh4LraFa','1990-08-13','017671228226','Male','private','{\"city\": \"Pfarrkirchen\", \"state\": \"Bavaria\", \"street\": \"Stadtplatz\", \"country\": \"Deutschland\", \"postcode\": \"84347\"}',_binary '\0\0\0\0\0\0\0íØRb\ﬂ)@π8*7Q7H@','normal_user','none','{\"name\": \"Michelle Schmidt\", \"phone_number\": \"017671228226\", \"relationship\": \"Mother\"}',NULL,'2024-07-09 21:53:52','2024-07-09 21:53:52'),(29,'Dr.','Uwe','Kornstaedt','uwe@mail.com','$2a$10$cxhkbIDra.hqw269eHs51ulu5H0VHyah.J/aKJmN0lexmq/ONIj/e','1992-07-25','017671228226','male','public','{\"city\": \"Pfarrkirchen\", \"state\": \"Bavaria\", \"street\": \"Stadtplatz, 27\", \"country\": \"Deutschland\", \"postcode\": \"84347\"}',_binary '\0\0\0\0\0\0\0˚ê∑\\˝\‡)@◊¢h[7H@','doctor','none',NULL,5,'2024-07-09 21:57:21','2024-07-09 21:57:21');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_language`
--

DROP TABLE IF EXISTS `user_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_language` (
  `user_id` int NOT NULL,
  `language_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`language_id`),
  UNIQUE KEY `user_language_language_id_user_id_unique` (`user_id`,`language_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `user_language_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_language_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_language`
--

LOCK TABLES `user_language` WRITE;
/*!40000 ALTER TABLE `user_language` DISABLE KEYS */;
INSERT INTO `user_language` VALUES (4,11,'2024-06-28 17:49:52','2024-06-28 17:49:52'),(4,12,'2024-06-28 17:49:52','2024-06-28 17:49:52'),(7,1,'2024-06-28 18:05:48','2024-06-28 18:05:48'),(8,1,'2024-06-28 18:17:53','2024-06-28 18:17:53'),(8,2,'2024-06-28 18:17:53','2024-06-28 18:17:53'),(9,1,'2024-07-04 15:50:42','2024-07-04 15:50:42'),(9,2,'2024-06-28 18:29:18','2024-06-28 18:29:18'),(10,1,'2024-06-28 18:31:39','2024-06-28 18:31:39'),(10,3,'2024-06-28 18:31:39','2024-06-28 18:31:39'),(11,1,'2024-06-28 18:33:11','2024-06-28 18:33:11'),(12,3,'2024-06-28 18:34:13','2024-06-28 18:34:13'),(12,6,'2024-06-28 18:34:13','2024-06-28 18:34:13'),(13,3,'2024-06-28 18:35:45','2024-06-28 18:35:45'),(13,6,'2024-06-28 18:35:45','2024-06-28 18:35:45'),(14,1,'2024-06-28 18:37:17','2024-06-28 18:37:17'),(14,2,'2024-06-28 18:37:17','2024-06-28 18:37:17'),(15,2,'2024-06-28 18:37:58','2024-06-28 18:37:58'),(15,3,'2024-06-28 18:37:58','2024-06-28 18:37:58'),(16,1,'2024-06-28 18:38:32','2024-06-28 18:38:32'),(16,4,'2024-06-28 18:38:32','2024-06-28 18:38:32'),(17,2,'2024-06-28 18:39:41','2024-06-28 18:39:41'),(17,3,'2024-06-28 18:39:41','2024-06-28 18:39:41'),(18,1,'2024-06-28 23:21:36','2024-06-28 23:21:36'),(18,3,'2024-06-28 23:21:36','2024-06-28 23:21:36'),(21,4,'2024-07-08 17:36:34','2024-07-08 17:36:34'),(21,13,'2024-07-08 17:36:34','2024-07-08 17:36:34'),(28,4,'2024-07-09 21:53:53','2024-07-09 21:53:53'),(29,5,'2024-07-09 21:57:21','2024-07-09 21:57:21'),(29,16,'2024-07-09 21:57:21','2024-07-09 21:57:21');
/*!40000 ALTER TABLE `user_language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'health_connect'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-10  3:54:34
