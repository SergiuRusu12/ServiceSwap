/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `serviceswap` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `serviceswap`;

CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
	(2, 'Farmer'),
	(3, 'Teacher'),
	(4, 'Electrician'),
	(5, 'Cleaner'),
	(6, 'Plumber'),
	(7, 'Carpenter'),
	(8, 'Landscaper'),
	(9, 'Mechanic'),
	(10, 'Welder'),
	(11, 'Painter'),
	(12, 'Roofing Contractor'),
	(13, 'HVAC Technician'),
	(14, 'Machinist'),
	(15, 'Auto Detailer'),
	(16, 'Janitor'),
	(17, 'Housekeeper'),
	(18, 'Gardener'),
	(19, 'Security Guard'),
	(20, 'Delivery Driver'),
	(21, 'Barista'),
	(22, 'Hairdresser'),
	(23, 'Massage Therapist'),
	(24, 'Dental Assistant'),
	(25, 'Veterinary Technician'),
	(26, 'Cook'),
	(27, 'Baker'),
	(28, 'Tailor'),
	(29, 'Graphic Designer'),
	(30, 'Web Developer'),
	(31, 'Accountant'),
	(32, 'Lawyer'),
	(33, 'Nurse'),
	(34, 'Doctor'),
	(35, 'Architect'),
	(36, 'Interior Designer'),
	(37, 'Fitness Trainer'),
	(38, 'Event Planner'),
	(39, 'Photographer'),
	(40, 'Real Estate Agent'),
	(41, 'Flight Attendant'),
	(42, 'Police Officer'),
	(43, 'Firefighter'),
	(44, 'Paramedic'),
	(45, 'Social Worker'),
	(46, 'Journalist'),
	(47, 'Librarian'),
	(48, 'Chef'),
	(49, 'Other');

CREATE TABLE IF NOT EXISTS `chat` (
  `chat_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id_fk` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `initiator_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`chat_id`),
  KEY `service_id_fk` (`service_id_fk`),
  KEY `initiator_id` (`initiator_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`service_id_fk`) REFERENCES `services` (`service_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`initiator_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `chat_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `chat` (`chat_id`, `service_id_fk`, `timestamp`, `initiator_id`, `receiver_id`) VALUES
	(2, 4, '2024-05-02 20:20:36', 4, 8);

CREATE TABLE IF NOT EXISTS `message` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_id_fk` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `message_content` text NOT NULL,
  `timestamp` datetime NOT NULL,
  `service_id_fk` int(11) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `chat_id_fk` (`chat_id_fk`),
  KEY `sender_id` (`sender_id`),
  KEY `service_id_fk` (`service_id_fk`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`chat_id_fk`) REFERENCES `chat` (`chat_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_3` FOREIGN KEY (`service_id_fk`) REFERENCES `services` (`service_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `message` (`message_id`, `chat_id_fk`, `sender_id`, `message_content`, `timestamp`, `service_id_fk`) VALUES
	(2, 2, 8, 'asdas', '2024-05-02 20:03:28', NULL),
	(3, 2, 4, 'aa', '2024-05-02 20:09:33', NULL),
	(4, 2, 8, 'sada', '2024-05-02 20:09:37', NULL),
	(5, 2, 4, 'aa', '2024-05-02 20:17:16', NULL),
	(6, 2, 4, 'sal', '2024-05-02 20:37:06', NULL),
	(44, 2, 8, 'buna', '2024-05-02 23:54:33', NULL),
	(45, 2, 4, 'buna', '2024-05-02 23:54:36', NULL),
	(46, 2, 8, 'te pup frumosule', '2024-05-02 23:54:40', NULL),
	(47, 2, 4, 'si eu', '2024-05-02 23:54:42', NULL),
	(48, 2, 4, 'ai servicii? milsugi', '2024-05-02 23:54:46', NULL),
	(49, 2, 8, 'da', '2024-05-02 23:54:48', NULL),
	(50, 2, 8, 'ambele da', '2024-05-02 23:54:51', NULL),
	(51, 2, 8, 'buna', '2024-05-02 23:56:53', NULL),
	(52, 2, 4, 'buna frate', '2024-05-02 23:56:59', NULL),
	(53, 2, 8, 'cf', '2024-05-02 23:57:08', NULL),
	(54, 2, 4, 'bine tuu', '2024-05-02 23:57:16', NULL),
	(55, 2, 8, 'sal', '2024-05-02 23:59:52', NULL),
	(56, 2, 4, 'cf', '2024-05-02 23:59:55', NULL),
	(57, 2, 8, 'bine tu', '2024-05-02 23:59:59', NULL),
	(58, 2, 4, 'bine si eu rege', '2024-05-03 00:00:02', NULL),
	(59, 2, 8, 'uauauauia', '2024-05-03 00:00:04', NULL);

CREATE TABLE IF NOT EXISTS `orderitems` (
  `order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_fk` int(11) NOT NULL,
  `order_fk` int(11) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `service_fk` (`service_fk`),
  KEY `order_fk` (`order_fk`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`service_fk`) REFERENCES `services` (`service_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`order_fk`) REFERENCES `orders` (`order_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `orderitems` (`order_item_id`, `service_fk`, `order_fk`) VALUES
	(1, 1, 1);

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_fk_user_id` int(11) NOT NULL,
  `service_fk_service_id` int(11) NOT NULL,
  `order_status` varchar(255) NOT NULL,
  `payment_info` text DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `buyer_fk_user_id` (`buyer_fk_user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`buyer_fk_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `orders` (`order_id`, `buyer_fk_user_id`, `service_fk_service_id`, `order_status`, `payment_info`) VALUES
	(1, 2, 1, 'Completed', 'Paid via credit card. Transaction ID: 123456789.');

CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_fk_order_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `review_text` text NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `order_fk_order_id` (`order_fk_order_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`order_fk_order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `reviews` (`review_id`, `order_fk_order_id`, `rating`, `review_text`) VALUES
	(1, 1, 5, 'Outstanding! Highly recommend. The quality of work was beyond my expectations.');

CREATE TABLE IF NOT EXISTS `services` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `item_in_exchange` varchar(255) DEFAULT NULL,
  `seller_fk_user_id` int(11) NOT NULL,
  `service_status` varchar(255) NOT NULL,
  `category_fk` int(11) NOT NULL,
  `locality` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `extra_image_1` varchar(255) DEFAULT NULL,
  `extra_image_2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  KEY `category_fk` (`category_fk`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`category_fk`) REFERENCES `categories` (`category_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `services` (`service_id`, `title`, `description`, `price`, `item_in_exchange`, `seller_fk_user_id`, `service_status`, `category_fk`, `locality`, `image_url`, `extra_image_1`, `extra_image_2`) VALUES
	(1, 'Custom Web Development', 'Providing teaching services from concept for children. Providing teaching services from concept for children. Providing teaching services from concept for children.Providing teaching services from concept for children', NULL, 'Farming', 2, 'Active', 3, 'Constanta', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/1.jpg?alt=media&token=ea1a0267-4694-4782-acf8-2f76009466b9', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/7.jpg?alt=media&token=c85837e9-47ed-4704-a6a7-93fff27664fd', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/4.jpg?alt=media&token=d3e95c96-d1bd-476c-892c-69af11acc9ba'),
	(2, 'Complete Garden Care', 'Full service garden care including planting, weeding, and landscape design.', NULL, 'Gardening tools', 1, 'Active', 8, 'Constanta', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/2.jpg?alt=media&token=2782d2ec-7d4d-4d8f-8263-ae485d75533d', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/2.jpg?alt=media&token=2782d2ec-7d4d-4d8f-8263-ae485d75533d', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/2.jpg?alt=media&token=2782d2ec-7d4d-4d8f-8263-ae485d75533d'),
	(3, 'Private Tutor for Sciences', 'Qualified teacher for one-on-one science tutoring sessions, focused on biology and chemistry.', NULL, 'Lab equipment', 3, 'Active', 3, 'Bucuresti', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/3.jpg?alt=media&token=d444c032-7dd3-4c39-a5a1-efcfe17a17be', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/3.jpg?alt=media&token=d444c032-7dd3-4c39-a5a1-efcfe17a17be', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/3.jpg?alt=media&token=d444c032-7dd3-4c39-a5a1-efcfe17a17be'),
	(4, 'Household Electrical Jobs', 'All types of home electrical jobs, including wiring and appliance installation.', NULL, 'Electrical supplies', 4, 'Active', 4, 'Bucuresti', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/4.jpg?alt=media&token=d3e95c96-d1bd-476c-892c-69af11acc9ba', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/4.jpg?alt=media&token=d3e95c96-d1bd-476c-892c-69af11acc9ba', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/4.jpg?alt=media&token=d3e95c96-d1bd-476c-892c-69af11acc9ba'),
	(5, 'Basic Carpentry Work', 'Offering carpentry services such as repairs, installations, and custom projects.', NULL, 'Wood', 5, 'Active', 7, 'Constanta', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/5.jpg?alt=media&token=f1cc20ad-a211-48e3-acb5-62608f77425f', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/5.jpg?alt=media&token=f1cc20ad-a211-48e3-acb5-62608f77425f', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/5.jpg?alt=media&token=f1cc20ad-a211-48e3-acb5-62608f77425f'),
	(6, 'Plumbing Solutions', 'Experienced plumber available for leaks, installations, and maintenance.', NULL, 'Plumbing tools', 6, 'Active', 6, 'Bucuresti', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/6.jpg?alt=media&token=3f6c14c1-d691-4f70-9482-172b651993ce', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/6.jpg?alt=media&token=3f6c14c1-d691-4f70-9482-172b651993ce', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/6.jpg?alt=media&token=3f6c14c1-d691-4f70-9482-172b651993ce'),
	(7, 'Residential Cleaning Services', 'Thorough cleaning services for apartments and homes. Trustworthy and efficient.', NULL, 'Cleaning supplies', 2, 'Active', 5, 'Constanta', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/7.jpg?alt=media&token=c85837e9-47ed-4704-a6a7-93fff27664fd', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/7.jpg?alt=media&token=c85837e9-47ed-4704-a6a7-93fff27664fd', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/7.jpg?alt=media&token=c85837e9-47ed-4704-a6a7-93fff27664fd'),
	(11, 'Private Tutor', 'I give math tutorials. I am a nerd, a big one! I give math tutorials. I am a nerd, a big one! I give math tutorials. I am a nerd, a big one! I give math tutorials. I am a nerd, a big one! I give math tutorials. I am a nerd, a big one! Very big one! !!!\n', NULL, 'Electrician', 8, 'Active', 7, 'Brasov', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/images%2F3.jpg?alt=media&token=5f70d817-fa9c-4cec-b8f0-d7d7bf949386', NULL, NULL);

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_info` text DEFAULT NULL,
  `user_type` enum('normal','admin') NOT NULL DEFAULT 'normal',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `profile_info`, `user_type`) VALUES
	(1, 'AlexGreen', 'alex.green@example.com', 'safePassword987', 'Job: Farmer. Passionate about sustainable agriculture and organic farming.', 'normal'),
	(2, 'CaseyRiver', 'casey.river@example.com', 'secureKey789', 'Job: Teacher. Dedicated to inspiring young minds through innovative education.', 'normal'),
	(4, 'EmilyStone', 'emily.stone@example.com', 'emPassword12!', NULL, 'normal'),
	(5, 'MichaelBlanc', 'michael.blanc@example.com', 'pass123Michael!', NULL, 'normal'),
	(6, 'SarahConnor', 'sarah.connor@example.com', 'terminator2!', NULL, 'normal'),
	(7, 'admin', 'james.tiberius@example.com', '1234', NULL, 'admin'),
	(8, 'user', 'anna.banana@example.com', '1234', NULL, 'normal'),
	(9, 'sergiu', 'sergiurusu122@gmail.com', '1234', NULL, 'normal');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
