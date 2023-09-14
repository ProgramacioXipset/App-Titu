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
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb3;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `direccio`;
CREATE TABLE `direccio` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `adreca` varchar(200) NOT NULL,
  `poblacio` varchar(50) NOT NULL,
  `codi_postal` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_direccio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `remolc`;
CREATE TABLE `remolc` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `matricula` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_remolc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3;

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
  `externa` tinyint(1) DEFAULT NULL,
  `dia` date DEFAULT NULL,
  `tipus` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_anada` (`id`),
  KEY `id_direccio_origen` (`id_direccio_origen`),
  KEY `id_direccio_desti` (`id_direccio_desti`),
  KEY `id_ruta` (`id_ruta`),
  CONSTRAINT `viatge_ibfk_2` FOREIGN KEY (`id_direccio_origen`) REFERENCES `direccio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `viatge_ibfk_3` FOREIGN KEY (`id_direccio_desti`) REFERENCES `direccio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `viatge_ibfk_4` FOREIGN KEY (`id_ruta`) REFERENCES `ruta` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `xofer`;
CREATE TABLE `xofer` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `cognoms` varchar(80) NOT NULL,
  `telefon` int NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `dni` varchar(9) NOT NULL,
  `id_camio` bigint unsigned DEFAULT NULL,
  `id_remolc` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_xofer` (`id`),
  KEY `id_remolc` (`id_remolc`),
  KEY `id_camio` (`id_camio`),
  CONSTRAINT `xofer_ibfk_4` FOREIGN KEY (`id_remolc`) REFERENCES `remolc` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `xofer_ibfk_5` FOREIGN KEY (`id_camio`) REFERENCES `camio` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb3;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

INSERT INTO `camio` (`id`, `matricula`, `marca_model`) VALUES
(1, ' ', 'Null');
INSERT INTO `camio` (`id`, `matricula`, `marca_model`) VALUES
(2, '4321CBC', 'Iveco S-Way');
INSERT INTO `camio` (`id`, `matricula`, `marca_model`) VALUES
(3, '6789HIJ', 'Volvo FH');
INSERT INTO `camio` (`id`, `matricula`, `marca_model`) VALUES
(4, '3475HUU', 'Mercedes Actros'),
(61, '9876CBA', 'Test2'),
(81, '6666AAA', 'TEST');

INSERT INTO `camio_no_disponible` (`id`, `id_camio`, `dia`) VALUES
(1, 1, '2023-04-12');
INSERT INTO `camio_no_disponible` (`id`, `id_camio`, `dia`) VALUES
(2, 1, '2023-08-17');
INSERT INTO `camio_no_disponible` (`id`, `id_camio`, `dia`) VALUES
(3, 3, '2024-01-14');
INSERT INTO `camio_no_disponible` (`id`, `id_camio`, `dia`) VALUES
(4, 4, '2023-11-23');

INSERT INTO `direccio` (`id`, `adreca`, `poblacio`, `codi_postal`) VALUES
(1, 'Carrer major n20', 'Montblanc', 43420);
INSERT INTO `direccio` (`id`, `adreca`, `poblacio`, `codi_postal`) VALUES
(2, 'Carretera Barcelona n1', 'Valls', 43800);
INSERT INTO `direccio` (`id`, `adreca`, `poblacio`, `codi_postal`) VALUES
(3, 'Camí a Montblanc n1', 'Barberà de la Conca', 43422);
INSERT INTO `direccio` (`id`, `adreca`, `poblacio`, `codi_postal`) VALUES
(4, 'Calle Arturio Soria n63', 'Madrid', 28001),
(5, 'Calle de la Dra. Oeste', 'Sevilla', 41001),
(6, 'Av. Catalunya m71', 'Brafim', 43812),
(11, 'Carrer major n20', 'TEst', 43420),
(21, 'Test', 'TEst', 1111);

INSERT INTO `remolc` (`id`, `matricula`) VALUES
(1, '(Null)');
INSERT INTO `remolc` (`id`, `matricula`) VALUES
(2, '6479NJA');
INSERT INTO `remolc` (`id`, `matricula`) VALUES
(3, '5723KLA');
INSERT INTO `remolc` (`id`, `matricula`) VALUES
(4, '2039JIO'),
(5, '9283PKL'),
(6, '9384RRS'),
(11, 'holaaa'),
(21, '4324asd'),
(31, '6666AAA'),
(41, '7777BBB');

INSERT INTO `remolc_no_disponible` (`id`, `id_remolc`, `dia`) VALUES
(1, 1, '2023-07-11');
INSERT INTO `remolc_no_disponible` (`id`, `id_remolc`, `dia`) VALUES
(2, 1, '2024-01-11');
INSERT INTO `remolc_no_disponible` (`id`, `id_remolc`, `dia`) VALUES
(3, 3, '2023-10-12');
INSERT INTO `remolc_no_disponible` (`id`, `id_remolc`, `dia`) VALUES
(4, 4, '2023-09-02'),
(5, 5, '2023-05-20');

INSERT INTO `rol` (`id`, `nom_rol`) VALUES
(1, 'Administrador');
INSERT INTO `rol` (`id`, `nom_rol`) VALUES
(2, 'Visitant');


INSERT INTO `ruta` (`id`, `id_xofer`) VALUES
(46, 101);
INSERT INTO `ruta` (`id`, `id_xofer`) VALUES
(48, 101);
INSERT INTO `ruta` (`id`, `id_xofer`) VALUES
(53, 101);

INSERT INTO `usuari` (`id`, `username`, `cognoms`, `telefon`, `email`, `password`, `id_rol`) VALUES
(1, 'jordi', 'Marimon', 977605152, 'titu@transportstitu.com', '$2a$12$h4Vy5nAJ/TVU/wxyjSw5k.jOHcfTjS65cj1PSEEjIVfCdMbl5FUIu', 1);
INSERT INTO `usuari` (`id`, `username`, `cognoms`, `telefon`, `email`, `password`, `id_rol`) VALUES
(2, 'Mquel Angel', 'Cobos', 977605152, 'macobos@transportstitu.com', 'cfdf0683627486077fe9fa501c4e7a11ac74de98', 2);
INSERT INTO `usuari` (`id`, `username`, `cognoms`, `telefon`, `email`, `password`, `id_rol`) VALUES
(3, 'Anouar', 'El Haji', 977605152, 'aelhaji@transportstitu.com', '0d9b65c6627c7bae5f87c260156ea21448f0a820', 2);
INSERT INTO `usuari` (`id`, `username`, `cognoms`, `telefon`, `email`, `password`, `id_rol`) VALUES
(4, 'Quintiliano', 'Garcia', 977605152, 'qgarcia@transportstitu.com', '412ad8288a5d2eca112ea2cc0fa2d49832b24570', 2),
(5, 'Carlos', 'Gil', 977605152, 'cgil@transportstitu.com', '702f7b8845d2713aae83088c4921a7b4c0900126', 2),
(6, 'Ramon Antonio', 'Gil', 977605152, 'rgil@transportstitu.com', '796f524be9fe9eac4904ee5ff57ffe62388ba579', 2),
(7, 'Josep Maria', 'Guardia', 977605152, 'jmguardia@transportstitu.com', '3d093c1a55afae39495d64d945b3e4fe296ad1f8', 2),
(8, 'Manuel', 'Hernandez', 977605152, 'mhernandez@transportstitu.com', '6ffd82756b94c3dda8144aa0deab133a7ec0992c', 2),
(9, 'Antonio', 'Hernandez', 977605152, 'ahernandez@transportstitu.com', '9c1dd8d328c68365012678c813126a9ab48798c8', 2),
(10, 'Jose Manuel', 'Infantes', 977605152, 'jminfantes@transportstitu.com', '21567419c6b456a7748453f85e34fe7305f718d2', 2),
(11, 'Aretas', 'Krasauskas', 977605152, 'akrasauskas@transportstitu.com', '	b5cfadaa6c26a3e79786d5fa7c2c1709f301bd4d', 2);

INSERT INTO `viatge` (`id`, `id_direccio_origen`, `id_direccio_desti`, `comentari`, `id_ruta`, `externa`, `dia`, `tipus`) VALUES
(74, 1, 1, 'cghkcgh', 53, NULL, '2023-09-07', 2);
INSERT INTO `viatge` (`id`, `id_direccio_origen`, `id_direccio_desti`, `comentari`, `id_ruta`, `externa`, `dia`, `tipus`) VALUES
(76, 2, 6, 'Hola', 53, NULL, '2023-09-07', 2);
INSERT INTO `viatge` (`id`, `id_direccio_origen`, `id_direccio_desti`, `comentari`, `id_ruta`, `externa`, `dia`, `tipus`) VALUES
(77, 1, 3, 'Test', 48, NULL, '2023-09-07', 1);
INSERT INTO `viatge` (`id`, `id_direccio_origen`, `id_direccio_desti`, `comentari`, `id_ruta`, `externa`, `dia`, `tipus`) VALUES
(78, 5, 4, 'Prova', NULL, NULL, '2023-09-08', 3),
(79, 1, 2, 'Prova des de Angular', 53, NULL, '2023-09-08', 1);

INSERT INTO `xofer` (`id`, `nom`, `cognoms`, `telefon`, `email`, `dni`, `id_camio`, `id_remolc`) VALUES
(101, 'Miquel', 'Montero Martí', 616147047, 'mmontero@xipset.net', '49874838M', 1, 1);
INSERT INTO `xofer` (`id`, `nom`, `cognoms`, `telefon`, `email`, `dni`, `id_camio`, `id_remolc`) VALUES
(111, 'Diego', 'Burgos', 123523123, 'dburgos@xipset.net', '32513552L', 1, 1);





/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;