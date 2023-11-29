/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `camio`;
CREATE TABLE `camio` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `matricula` varchar(7) NOT NULL,
  `marca_model` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_camio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `camio_no_disponible`;
CREATE TABLE `camio_no_disponible` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_camio` bigint unsigned NOT NULL,
  `dia` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_poden_estar_camio` (`id`),
  KEY `id_camio` (`id_camio`),
  KEY `id_no_disponible` (`dia`),
  CONSTRAINT `camio_no_disponible_ibfk_3` FOREIGN KEY (`id_camio`) REFERENCES `camio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `direccio`;
CREATE TABLE `direccio` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `adreca` varchar(200) NOT NULL,
  `poblacio` varchar(50) NOT NULL,
  `codi_postal` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_direccio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `icones`;
CREATE TABLE `icones` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `icona` varchar(1) NOT NULL,
  `data` date NOT NULL,
  `id_xofer` bigint unsigned NOT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `id_xofer` (`id_xofer`),
  CONSTRAINT `icones_ibfk_1` FOREIGN KEY (`id_xofer`) REFERENCES `xofer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `remolc`;
CREATE TABLE `remolc` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `matricula` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_remolc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `remolc_no_disponible`;
CREATE TABLE `remolc_no_disponible` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_remolc` bigint unsigned NOT NULL,
  `dia` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_poden_estar_remolc` (`id`),
  KEY `id_remolc` (`id_remolc`),
  KEY `id_no_disponible` (`dia`),
  CONSTRAINT `remolc_no_disponible_ibfk_3` FOREIGN KEY (`id_remolc`) REFERENCES `remolc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom_rol` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `ruta`;
CREATE TABLE `ruta` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_xofer` bigint unsigned NOT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `id_xofer` (`id_xofer`),
  CONSTRAINT `ruta_ibfk_1` FOREIGN KEY (`id_xofer`) REFERENCES `xofer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `usuari`;
CREATE TABLE `usuari` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(40) DEFAULT NULL,
  `cognoms` varchar(80) DEFAULT NULL,
  `telefon` int NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id_rol` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_usuari` (`id`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuari_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `viatge`;
CREATE TABLE `viatge` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_direccio_origen` bigint unsigned NOT NULL,
  `id_direccio_desti` bigint unsigned NOT NULL,
  `comentari` varchar(255) DEFAULT NULL,
  `id_ruta` bigint unsigned DEFAULT NULL,
  `externa` varchar(255) DEFAULT NULL,
  `dia` date DEFAULT NULL,
  `tipus` tinyint(1) NOT NULL,
  `data_inicial` date NOT NULL,
  `n_comanda` varchar(255) DEFAULT NULL,
  `amagat` tinytext,
  `dividit` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_anada` (`id`),
  KEY `id_direccio_origen` (`id_direccio_origen`),
  KEY `id_direccio_desti` (`id_direccio_desti`),
  KEY `id_ruta` (`id_ruta`),
  CONSTRAINT `viatge_ibfk_2` FOREIGN KEY (`id_direccio_origen`) REFERENCES `direccio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `viatge_ibfk_3` FOREIGN KEY (`id_direccio_desti`) REFERENCES `direccio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `viatge_ibfk_4` FOREIGN KEY (`id_ruta`) REFERENCES `ruta` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `xofer`;
CREATE TABLE `xofer` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `cognoms` varchar(80) NOT NULL,
  `telefon` int NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `dni` varchar(9) NOT NULL,
  `id_camio` bigint unsigned DEFAULT '1',
  `id_remolc` bigint unsigned DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_xofer` (`id`),
  KEY `id_remolc` (`id_remolc`),
  KEY `id_camio` (`id_camio`),
  CONSTRAINT `xofer_ibfk_11` FOREIGN KEY (`id_camio`) REFERENCES `camio` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `xofer_ibfk_12` FOREIGN KEY (`id_remolc`) REFERENCES `remolc` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `xofer_no_disponible`;
CREATE TABLE `xofer_no_disponible` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_xofer` bigint unsigned NOT NULL,
  `dia` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_poden_estar_xofer` (`id`),
  KEY `id_no_disponible` (`dia`),
  KEY `id_xofer` (`id_xofer`),
  CONSTRAINT `xofer_no_disponible_ibfk_3` FOREIGN KEY (`id_xofer`) REFERENCES `xofer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

INSERT INTO `camio` (`id`, `matricula`, `marca_model`) VALUES
(1, ' ', 'Null');








INSERT INTO `remolc` (`id`, `matricula`) VALUES
(1, '(Null)');




INSERT INTO `rol` (`id`, `nom_rol`) VALUES
(1, 'Administrador');
INSERT INTO `rol` (`id`, `nom_rol`) VALUES
(2, 'Visitant');




INSERT INTO `usuari` (`id`, `username`, `cognoms`, `telefon`, `email`, `password`, `id_rol`) VALUES
(1, 'jordi', 'Marimon', 977605152, 'titu@transportstitu.com', '$2a$12$KjWLbupY5k.r4O8Sc/b2pujzrItSXGq52PZH/cNW8TUf0a0C0e2bG', 1);









/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;