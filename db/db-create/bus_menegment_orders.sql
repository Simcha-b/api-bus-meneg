-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: bus_menegment
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `contact_id` int DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `trip_details` text,
  `bus_quantity` int DEFAULT NULL,
  `price_per_bus_customer` decimal(10,2) DEFAULT NULL,
  `extra_pay_customer` decimal(10,2) DEFAULT NULL,
  `notes_customer` text,
  `invoice` varchar(50) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  `total_paid_customer` decimal(10,2) DEFAULT NULL,
  `price_per_bus_company` decimal(10,2) DEFAULT NULL,
  `notes_company` text,
  `extra_pay_company` decimal(10,2) DEFAULT NULL,
  `submitted_invoice` tinyint(1) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `company_id` (`company_id`),
  KEY `fk_contact` (`contact_id`),
  KEY `fk_order_customer` (`customer_id`),
  CONSTRAINT `fk_contact` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `fk_order_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,1,'2024-10-10','09:00:00','17:00:00','טיול לירושלים',3,1000.00,200.00,'כולל עצירה בכביש 6','INV-100',1,3200.00,2700.00,'שעות נוספות עלו 200',150.00,1,'בתהליך'),(2,2,2,2,'2024-11-05','08:00:00','15:00:00','סיור בתל אביב',2,1200.00,300.00,'עצירה בנמל תל אביב','INV-101',1,2700.00,2200.00,'חניה נוספת',100.00,1,'בביצוע'),(3,1,1,3,'2024-11-22','00:00:00','08:00:00','טיול בגליל',1,900.00,400.00,'כולל ארוחת צהריים','INV-102',1,0.00,3300.00,'נסיעה ארוכה',200.00,0,'בתהליך'),(34,2,9,4,'2024-11-25','06:00:00','22:00:00','לירושלים',2,2000.00,200.00,'',NULL,1,0.00,1800.00,'',200.00,0,'בביצוע'),(36,3,3,3,'2024-11-01','06:00:00','22:00:00','לחולון',2,3000.00,0.00,'',NULL,0,0.00,0.00,'',0.00,0,'הושלם'),(37,4,11,2,'2024-11-03','06:00:00','22:00:00','לחולון',2,3000.00,200.00,'200 ש\"ח כביש 6',NULL,0,0.00,0.00,'',0.00,0,'בביצוע'),(38,4,4,1,'2024-11-03','06:00:00','22:00:00','לירושלים',2,0.00,0.00,'',NULL,0,0.00,0.00,'',0.00,0,'בביצוע'),(50,1,1,3,NULL,'00:00:00','00:00:00','לירושלים',3,3000.00,0.00,'',NULL,0,0.00,0.00,'',0.00,0,NULL),(51,6,14,0,'2024-11-17','06:00:00','19:00:00','למירון הלו\"ש',2,2000.00,0.00,'',NULL,1,0.00,0.00,'',0.00,0,'חסר שיבוץ'),(52,2,2,0,'2024-11-11','06:00:00','06:00:00','לירושלים',2,NULL,NULL,'',NULL,0,NULL,NULL,'',NULL,0,'חסר שיבוץ'),(53,1,1,0,'2024-11-11','00:00:00','00:00:00','למירון',2,NULL,NULL,'',NULL,0,NULL,NULL,'',NULL,0,'חסר שיבוץ'),(54,2,8,0,'2024-11-22','22:30:00','06:55:00','למירון',3,NULL,NULL,'',NULL,0,NULL,NULL,'',NULL,0,'חסר שיבוץ');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20  0:11:48
