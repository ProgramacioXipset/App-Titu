/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `anada`;
CREATE TABLE `anada` (
  `id_anada` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_ruta` bigint unsigned DEFAULT NULL,
  `id_direccio_origen` bigint unsigned NOT NULL,
  `id_direccio_desti` bigint unsigned NOT NULL,
  `comentari` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_anada`),
  UNIQUE KEY `id_anada` (`id_anada`),
  KEY `id_ruta` (`id_ruta`),
  KEY `id_direccio_origen` (`id_direccio_origen`),
  KEY `id_direccio_desti` (`id_direccio_desti`),
  CONSTRAINT `anada_ibfk_1` FOREIGN KEY (`id_ruta`) REFERENCES `ruta` (`id_ruta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `anada_ibfk_2` FOREIGN KEY (`id_direccio_origen`) REFERENCES `direccio` (`id_direccio`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `anada_ibfk_3` FOREIGN KEY (`id_direccio_desti`) REFERENCES `direccio` (`id_direccio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `avui_x_avui`;
CREATE TABLE `avui_x_avui` (
  `id_avuixavui` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_ruta` bigint unsigned DEFAULT NULL,
  `id_direccio_origen` bigint unsigned NOT NULL,
  `id_direccio_desti` bigint unsigned NOT NULL,
  `comentari` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_avuixavui`),
  UNIQUE KEY `id_avuixavui` (`id_avuixavui`),
  KEY `id_ruta` (`id_ruta`),
  KEY `id_direccio_origen` (`id_direccio_origen`),
  KEY `id_direccio_desti` (`id_direccio_desti`),
  CONSTRAINT `avui_x_avui_ibfk_1` FOREIGN KEY (`id_ruta`) REFERENCES `ruta` (`id_ruta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `avui_x_avui_ibfk_2` FOREIGN KEY (`id_direccio_origen`) REFERENCES `direccio` (`id_direccio`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `avui_x_avui_ibfk_3` FOREIGN KEY (`id_direccio_desti`) REFERENCES `direccio` (`id_direccio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `camio`;
CREATE TABLE `camio` (
  `id_camio` bigint unsigned NOT NULL AUTO_INCREMENT,
  `matricula` varchar(7) NOT NULL,
  `marca_model` varchar(50) DEFAULT NULL,
  UNIQUE KEY `id_camio` (`id_camio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `direccio`;
CREATE TABLE `direccio` (
  `id_direccio` bigint unsigned NOT NULL AUTO_INCREMENT,
  `adreca` varchar(200) NOT NULL,
  `poblacio` varchar(50) NOT NULL,
  `codi_postal` int NOT NULL,
  PRIMARY KEY (`id_direccio`),
  UNIQUE KEY `id_direccio` (`id_direccio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `no_disponible`;
CREATE TABLE `no_disponible` (
  `id_no_disponible` bigint unsigned NOT NULL AUTO_INCREMENT,
  `dia` date DEFAULT NULL,
  PRIMARY KEY (`id_no_disponible`),
  UNIQUE KEY `id_no_disponible` (`id_no_disponible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `poden_estar_camio`;
CREATE TABLE `poden_estar_camio` (
  `id_poden_estar_camio` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_camio` bigint unsigned NOT NULL,
  `id_no_disponible` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_poden_estar_camio`),
  UNIQUE KEY `id_poden_estar_camio` (`id_poden_estar_camio`),
  KEY `id_camio` (`id_camio`),
  KEY `id_no_disponible` (`id_no_disponible`),
  CONSTRAINT `poden_estar_camio_ibfk_1` FOREIGN KEY (`id_camio`) REFERENCES `camio` (`id_camio`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `poden_estar_camio_ibfk_2` FOREIGN KEY (`id_no_disponible`) REFERENCES `no_disponible` (`id_no_disponible`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `poden_estar_remolc`;
CREATE TABLE `poden_estar_remolc` (
  `id_poden_estar_remolc` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_remolc` bigint unsigned NOT NULL,
  `id_no_disponible` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_poden_estar_remolc`),
  UNIQUE KEY `id_poden_estar_remolc` (`id_poden_estar_remolc`),
  KEY `id_remolc` (`id_remolc`),
  KEY `id_no_disponible` (`id_no_disponible`),
  CONSTRAINT `poden_estar_remolc_ibfk_1` FOREIGN KEY (`id_remolc`) REFERENCES `remolc` (`id_remolc`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `poden_estar_remolc_ibfk_2` FOREIGN KEY (`id_no_disponible`) REFERENCES `no_disponible` (`id_no_disponible`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `poden_estar_xofer`;
CREATE TABLE `poden_estar_xofer` (
  `id_poden_estar_xofer` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_xofer` bigint unsigned NOT NULL,
  `id_no_disponible` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_poden_estar_xofer`),
  UNIQUE KEY `id_poden_estar_xofer` (`id_poden_estar_xofer`),
  KEY `id_xofer` (`id_xofer`),
  KEY `id_no_disponible` (`id_no_disponible`),
  CONSTRAINT `poden_estar_xofer_ibfk_1` FOREIGN KEY (`id_xofer`) REFERENCES `xofer` (`id_xofer`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `poden_estar_xofer_ibfk_2` FOREIGN KEY (`id_no_disponible`) REFERENCES `no_disponible` (`id_no_disponible`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `remolc`;
CREATE TABLE `remolc` (
  `id_remolc` bigint unsigned NOT NULL AUTO_INCREMENT,
  `matricula` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`id_remolc`),
  UNIQUE KEY `id_remolc` (`id_remolc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `id_rol` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom_rol` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `id_rol` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ruta`;
CREATE TABLE `ruta` (
  `id_ruta` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_xofer` bigint unsigned DEFAULT NULL,
  `data` date DEFAULT NULL,
  `externa` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_ruta`),
  UNIQUE KEY `id_ruta` (`id_ruta`),
  KEY `id_xofer` (`id_xofer`),
  CONSTRAINT `ruta_ibfk_1` FOREIGN KEY (`id_xofer`) REFERENCES `xofer` (`id_xofer`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `tornada`;
CREATE TABLE `tornada` (
  `id_tornada` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_ruta` bigint unsigned DEFAULT NULL,
  `id_direccio_origen` bigint unsigned NOT NULL,
  `id_direccio_desti` bigint unsigned NOT NULL,
  `comentari` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_tornada`),
  UNIQUE KEY `id_tornada` (`id_tornada`),
  KEY `id_ruta` (`id_ruta`),
  KEY `id_direccio_origen` (`id_direccio_origen`),
  KEY `id_direccio_desti` (`id_direccio_desti`),
  CONSTRAINT `tornada_ibfk_1` FOREIGN KEY (`id_ruta`) REFERENCES `ruta` (`id_ruta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tornada_ibfk_2` FOREIGN KEY (`id_direccio_origen`) REFERENCES `direccio` (`id_direccio`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tornada_ibfk_3` FOREIGN KEY (`id_direccio_desti`) REFERENCES `direccio` (`id_direccio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `usuari`;
CREATE TABLE `usuari` (
  `id_usuari` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cognoms` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telefon` int NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dni` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_rol` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_usuari`),
  UNIQUE KEY `id_usuari` (`id_usuari`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuari_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `xofer`;
CREATE TABLE `xofer` (
  `id_xofer` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `cognoms` varchar(80) NOT NULL,
  `telefon` int NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `dni` varchar(9) NOT NULL,
  `id_camio` bigint unsigned DEFAULT NULL,
  `id_remolc` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id_xofer`),
  UNIQUE KEY `id_xofer` (`id_xofer`),
  KEY `id_camio` (`id_camio`),
  KEY `id_remolc` (`id_remolc`),
  CONSTRAINT `xofer_ibfk_1` FOREIGN KEY (`id_camio`) REFERENCES `camio` (`id_camio`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `xofer_ibfk_2` FOREIGN KEY (`id_remolc`) REFERENCES `remolc` (`id_remolc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;






























/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;