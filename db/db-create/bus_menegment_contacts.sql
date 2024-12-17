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
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_customer` (`customer_id`),
  CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'יוסי לוי','052-1234567','yossi@eduA.com',1),(2,'רינה כהן','052-2345678','rina@charityB.org',2),(3,'משה ישראל','052-3456789','moshe@toursC.co.il',3),(4,'חיים הרצוג','052-44223331','gha@sdd.ss',4),(6,'דוד לוי','054-1234567','david.levi@example.com',1),(8,'משה בן-דוד','052-1122334','moshe.ben.david@example.com',2),(9,'שרה קצב','052-3344556','sara.katz@example.com',2),(10,'עומר מזרחי','050-9988776','omer.mizrahi@example.com',3),(11,'ליאת קדוש','050-2233445','liat.kadosh@example.com',4),(12,'יוסי פרץ','053-5566778','yossi.peretz@example.com',5),(13,'אליאור שושן','054-9988776','elior.shushan@example.com',6),(14,'רחל מלכה','053-2233112','rachel.malka@example.com',6),(15,'אבי כהן','050-4433221','avi.cohen@example.com',7),(16,'רוני גולן','052-6677889','roni.golan@example.com',8),(17,'יסמין לוי','050-7766554','yasmin.levi@example.com',8),(18,'טל עמיר','053-8899001','tal.amir@example.com',9),(19,'שירה גרין','052-3345566','shira.green@example.com',9),(20,'גיא רומנו','054-1122112','guy.romano@example.com',10),(21,'אלון בר','050-9988775','alon.bar@example.com',10),(22,'מיה שפריר','053-4455667','maya.shafir@example.com',11),(23,'דן שמעוני','054-3344221','dan.shimoni@example.com',11),(24,'תומר לוי','052-5533442','tomer.levi@example.com',12),(25,'נועה זהב','050-6677885','noa.gold@example.com',12),(26,'חיים זיסוביץ','0542222222','fff@ddd',19),(27,'אייזיק','054885555','',20);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
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
