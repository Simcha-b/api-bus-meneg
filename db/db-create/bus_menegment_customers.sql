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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'ישיבת ירושלים','052-1234567','israel@example.com'),(2,'מכון מאיר','053-9876543','moshe@example.com'),(3,'אולפנת רעות','054-4567890','dana@example.com'),(4,'ביה\"ס מוריה','055-1230987','hana@example.com'),(5,'כולל אברכים','056-7654321','yaakov@example.com'),(6,'חברת לוי','03-5551234','contact@levicorp.com'),(7,'פתרונות כהן','03-5555678','info@cohensolutions.com'),(8,'מזרחי בע\"מ','04-7778888','contact@mizrahi.com'),(9,'מיזוג קדוש','02-3334455','support@kadoshenterprises.com'),(10,'שירותי פרץ','03-6667788','service@peretzservices.com'),(11,'גלובל שושן','09-9991122','contact@shushanglobal.com'),(12,'כהן ושות\'','03-8887766','contact@cohenco.com'),(13,'תעשיות גולן','04-2233445','contact@golanindustries.com'),(14,'חדשנות אמיר','03-5544332','contact@amirinnovations.com'),(15,'קבוצת רומנו','02-1122334','info@romanogroup.com'),(16,'פתרונות שפריר','03-6677889','contact@shafirsolutions.com'),(17,'לוי ושות\'','02-3344556','support@levipartners.com'),(19,'גיי בי אייצ','058329611111','Sincere@april.biz'),(20,'חיידר גור','054444444','yyg8603@ss.com');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20  0:11:47
