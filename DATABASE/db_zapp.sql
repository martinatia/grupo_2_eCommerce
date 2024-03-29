CREATE DATABASE  IF NOT EXISTS `db_zappv2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db_zappv2`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_zappv2
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(100) NOT NULL,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Nike'),(2,'Adidas'),(3,'John Foos'),(4,'Puma'),(5,'Fila'),(6,'Reebok'),(7,'Diadora'),(8,'Asics');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_description` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Niños'),(2,'Mujeres'),(3,'Hombres');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `id_compra` int(11) NOT NULL AUTO_INCREMENT,
  `date_compra` datetime NOT NULL,
  `description_compra` varchar(200) DEFAULT NULL,
  `total_price_compra` float NOT NULL,
  `payment_method` varchar(100) NOT NULL,
  `supplier` varchar(100) NOT NULL,
  PRIMARY KEY (`id_compra`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,'2023-12-29 12:35:52','Compra 1',10000.5,'Efectivo','Proveedor1'),(2,'2024-01-05 09:27:15','Compra 2',20005.8,'Tarjeta de crédito','Proveedor2'),(3,'2024-02-29 10:59:40','Compra 3',37500.2,'Transferencia bancaria','Proveedor3');
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `product_description` varchar(250) DEFAULT NULL,
  `product_image_url` varchar(250) DEFAULT NULL,
  `product_price` decimal(5,2) NOT NULL,
  `product_section` varchar(50) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id_idx` (`category_id`),
  KEY `brand_id_idx` (`brand_id`),
  CONSTRAINT `brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Ultraboost','Alguna descripción..','ultraboost.jpg',999.99,'in-sale',3,1),(2,'ZAPP#1','Deportivo','Zapp1.png',999.99,'featured',3,2),(3,'ZAPP#2','Urbano','Zapp2.jpg',999.99,'last-colection',1,1),(4,'ZAPP#3','Urbano','Zapp7.jpg',999.99,'featured',3,5),(5,'ZAPP#4','Deportivo','Zapp8.jpg',999.99,'last-colection',2,4),(6,'ZAPP#5','Deportivo','Zapp9.jpg',999.99,'featured',2,3),(7,'ZAPP#6','Urbano','Zapp10.jpg',999.99,'featured',1,8),(8,'ZAPP#7','Urbano','Zapp11.jpg',999.99,'in-sale',3,6),(9,'ZAPP#8','Deportivo','Zapp12.jpg',999.99,'last-colection',2,2),(10,'ZAPP#9','Deportivo','Zapp13.jpg',999.99,'in-sale',3,6),(11,'ZAPP#10','Deportivo','Zapp3.jpg',999.99,'last-colection',2,7),(12,'ZAPP#11','Urbano','Zapp14.jpg',999.99,'in-sale',1,8);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_compras`
--

DROP TABLE IF EXISTS `products_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_compras` (
  `id_products_compras` int(11) NOT NULL AUTO_INCREMENT,
  `compra_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id_products_compras`),
  KEY `compra_id_idx` (`compra_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `size_id_idx` (`size_id`),
  CONSTRAINT `fk_compra_id` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_size_id` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`size_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_compras`
--

LOCK TABLES `products_compras` WRITE;
/*!40000 ALTER TABLE `products_compras` DISABLE KEYS */;
INSERT INTO `products_compras` VALUES (1,1,1,1,20),(2,1,2,2,20),(3,1,3,3,20),(4,1,4,4,20),(5,2,5,13,20),(6,2,6,14,20),(7,2,7,15,20),(8,2,8,16,20),(9,3,9,17,20),(10,3,10,18,20),(11,3,11,19,20),(12,3,12,20,20);
/*!40000 ALTER TABLE `products_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `size_id` int(11) NOT NULL AUTO_INCREMENT,
  `size_name` varchar(50) NOT NULL,
  PRIMARY KEY (`size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'24'),(2,'25'),(3,'26'),(4,'27'),(5,'28'),(6,'29'),(7,'30'),(8,'31'),(9,'32'),(10,'33'),(11,'34'),(12,'35'),(13,'36'),(14,'37'),(15,'38'),(16,'39'),(17,'40'),(18,'41'),(19,'42'),(20,'43'),(21,'44'),(22,'45');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_idx` (`product_id`),
  KEY `size_id_idx` (`size_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `size_id` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`size_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (1,1,1,20),(2,2,2,20),(3,3,3,20),(4,4,4,20),(5,5,13,20),(6,6,14,20),(7,7,15,20),(8,8,16,20),(9,9,17,20),(10,10,18,20),(11,11,19,20),(12,12,20,20);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` varchar(100) NOT NULL,
  `profile_image_url` varchar(200) NOT NULL,
  `user_type` varchar(15) NOT NULL DEFAULT 'Cliente',
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Martin','Atia','Mi casa','$2b$10$V.VtgPpIyY42zBoe/Z4mVeC9PEpU5/h0wTbZh2BzSyI','atia.walter.martin@gmail.com','Avatar1.png','Admin','2023-10-15 08:00:00'),(2,'Fausto','Tenaglia','Algun lugar','$2b$10$V.VtgPpIyY42zBoe/Z4mVeC9PEpU5/h0wTbZh2BzSyI','fausto.tenaglia@gmail.com','Avatar2.jpg','Admin','2024-03-29 12:00:00'),(3,'Jose','Lodi','Random place','$2b$10$V.VtgPpIyY42zBoe/Z4mVeC9PEpU5/h0wTbZh2BzSyI','jose.lodi@gmail.com','Avatar3.png','Admin','2024-04-11 08:00:00'),(4,'Luana','Capilla','Home, Sweet home','$2b$10$V.VtgPpIyY42zBoe/Z4mVeC9PEpU5/h0wTbZh2BzSyI','luana.capilla@gmail.com','Avatar4.png','Admin','2024-03-29 18:47:00'),(5,'Joaquin','Rodriguez','Su casa','$2b$10$V.VtgPpIyY42zBoe/Z4mVeC9PEpU5/h0wTbZh2BzSyI','joaquin.rodriguez@gmail.com','1706505305656','Admin','2023-12-29 05:15:00'),(6,'Pepito','Gomez','Belgrano 135','$2b$10$V.VtgPpIyY42zBoe/Z4mVeC9PEpU5/h0wTbZh2BzSyI','pepito.gomez@gmail.com','Avatar4.png','Cliente','2024-01-29 11:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL AUTO_INCREMENT,
  `date_venta` datetime NOT NULL,
  `id_usuario_comprador` int(11) NOT NULL,
  `precio_total` float NOT NULL,
  `payment_method` varchar(45) NOT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `id_usuario_comprador_idx` (`id_usuario_comprador`),
  CONSTRAINT `id_usuario_comprador` FOREIGN KEY (`id_usuario_comprador`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,'2024-03-29 13:00:00',1,150.25,'Tarjeta de crédito'),(2,'2024-03-29 14:00:00',2,100.5,'Efectivo');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas_products`
--

DROP TABLE IF EXISTS `ventas_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas_products` (
  `venta_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `monto_parcial` float NOT NULL,
  PRIMARY KEY (`venta_id`,`product_id`,`size_id`),
  KEY `product_id` (`product_id`),
  KEY `size_id` (`size_id`),
  CONSTRAINT `ventas_products_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id_venta`),
  CONSTRAINT `ventas_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `ventas_products_ibfk_3` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`size_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas_products`
--

LOCK TABLES `ventas_products` WRITE;
/*!40000 ALTER TABLE `ventas_products` DISABLE KEYS */;
INSERT INTO `ventas_products` VALUES (1,1,1,1,999.99),(2,2,2,1,999.99);
/*!40000 ALTER TABLE `ventas_products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-29 12:52:25
