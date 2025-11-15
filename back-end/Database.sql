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

DELETE FROM `categories`;
INSERT INTO `categories` (`category_id`, `category_name`) VALUES
	(1, 'Data Scientist'),
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `chat`;
INSERT INTO `chat` (`chat_id`, `service_id_fk`, `timestamp`, `initiator_id`, `receiver_id`) VALUES
	(2, 4, '2024-07-13 22:04:45', 9, 4),
	(8, 2, '2024-07-13 22:09:52', 9, 1),
	(9, 5, '2024-05-09 15:03:56', 9, 5),
	(10, 8, '2024-07-14 08:53:37', 1, 5),
	(18, 8, '2024-07-15 11:30:21', 9, 5);

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
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `message`;
INSERT INTO `message` (`message_id`, `chat_id_fk`, `sender_id`, `message_content`, `timestamp`, `service_id_fk`) VALUES
	(116, 2, 9, 'Hello, do you want to negotiate?', '2024-07-13 22:04:25', 4),
	(117, 2, 4, 'No, I am sorry!', '2024-07-13 22:04:45', 4),
	(118, 9, 9, 'Hello, would you be interested in an exchange?', '2024-07-13 22:05:55', 5),
	(119, 9, 1, 'Yes, of course!', '2024-07-13 22:06:01', 5),
	(120, 9, 1, 'I would love to hear', '2024-07-13 22:06:08', 5),
	(121, 9, 1, 'What you have to offer', '2024-07-13 22:06:14', 5),
	(122, 9, 9, 'I will offer you barista services', '2024-07-13 22:06:26', 5),
	(123, 9, 1, 'oh sorry i dont need that..', '2024-07-13 22:06:36', 5),
	(124, 8, 9, 'Do you negotiate?', '2024-07-13 22:09:41', 2),
	(125, 8, 1, 'sorry i dont', '2024-07-13 22:09:46', 2),
	(126, 8, 1, 'have a nice day', '2024-07-13 22:09:49', 2),
	(127, 8, 9, 'you too', '2024-07-13 22:09:52', 2),
	(139, 18, 9, 'Hello i am intersted in your services', '2024-07-15 11:28:43', 8),
	(140, 18, 5, 'Hi, yes i am lookin for a cook, what can u offer me?', '2024-07-15 11:29:08', 8),
	(141, 18, 9, 'I am a data scientist, do you need work in this domain?', '2024-07-15 11:29:22', 8),
	(142, 18, 5, 'yes i do', '2024-07-15 11:30:21', 8);

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_fk_user_id` int(11) NOT NULL,
  `seller_fk_user_id` int(11) NOT NULL,
  `service_fk_service_id` int(11) NOT NULL,
  `service_in_exchange_id` int(11) DEFAULT NULL,
  `order_status_buyer` varchar(255) NOT NULL DEFAULT 'Pending',
  `order_status_seller` varchar(255) NOT NULL DEFAULT 'Pending',
  `chat_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `buyer_fk_user_id` (`buyer_fk_user_id`),
  KEY `seller_fk_user_id` (`seller_fk_user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`buyer_fk_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`seller_fk_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `orders`;
INSERT INTO `orders` (`order_id`, `buyer_fk_user_id`, `seller_fk_user_id`, `service_fk_service_id`, `service_in_exchange_id`, `order_status_buyer`, `order_status_seller`, `chat_id`) VALUES
	(43, 4, 9, 1, 4, 'Completed', 'InProgress', 2),
	(46, 2, 9, 4, 21, 'Completed', 'Completed', 9),
	(48, 9, 2, 1, 25, 'Closed', 'Closed', 7),
	(49, 9, 1, 2, 48, 'InProgress', 'Completed', 8),
	(52, 2, 9, 4, 21, 'InProgress', 'InProgress', 9),
	(55, 1, 9, 8, 26, 'InProgress', 'Completed', 10),
	(57, 9, 5, 8, 1, 'Closed', 'Closed', 18);

CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_fk_order_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `order_fk_order_id` (`order_fk_order_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`order_fk_order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `reviews`;
INSERT INTO `reviews` (`review_id`, `order_fk_order_id`, `rating`) VALUES
	(1, 49, 5),
	(2, 55, 5),
	(4, 48, 5);

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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `services`;
INSERT INTO `services` (`service_id`, `title`, `description`, `price`, `item_in_exchange`, `seller_fk_user_id`, `service_status`, `category_fk`, `locality`, `image_url`, `extra_image_1`, `extra_image_2`) VALUES
	(1, 'Custom Web Development', 'Providing teaching services from concept for children. Providing teaching services from concept for children. Providing teaching services from concept for children.Providing teaching services from concept for children', NULL, 'Farmer', 9, 'Denied', 3, 'Constanta', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/1.jpg?alt=media&token=ea1a0267-4694-4782-acf8-2f76009466b9', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/7.jpg?alt=media&token=c85837e9-47ed-4704-a6a7-93fff27664fd', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/4.jpg?alt=media&token=d3e95c96-d1bd-476c-892c-69af11acc9ba'),
	(2, 'Complete Garden Care', 'Full service garden care including planting, weeding, and landscape design.', NULL, 'HVAC Technician', 9, 'Denied', 8, 'Constanta', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/2.jpg?alt=media&token=2782d2ec-7d4d-4d8f-8263-ae485d75533d', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/fem.jpg?alt=media&token=29128720-d231-4e0e-94a9-4a224cdc3e86', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/gradinn.jpg?alt=media&token=90925e6d-952a-4aaf-bf99-13a3954ed032'),
	(3, 'Private Tutor for Sciences', 'Qualified teacher for one-on-one science tutoring sessions, focused on biology and chemistry.', NULL, 'Farmer', 3, 'Active', 3, 'Bucuresti', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/3.jpg?alt=media&token=d444c032-7dd3-4c39-a5a1-efcfe17a17be', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/tutor.jpg?alt=media&token=05e4e1c4-87d5-433b-b929-05480b499c40', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/tutor2.jpg?alt=media&token=6bbd7c58-b5ee-4ebe-a91f-0a491bcc134d'),
	(4, 'Household Electrical Jobs', 'All types of home electrical jobs, including wiring and appliance installation.', NULL, 'Electrician', 9, 'Active', 4, 'Bucuresti', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/4.jpg?alt=media&token=d3e95c96-d1bd-476c-892c-69af11acc9ba', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/elec2.jpg?alt=media&token=fc3bb3ce-e280-4268-a011-508becfe0de8', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/elec.jpg?alt=media&token=aaf7b8df-9467-4709-8e28-0dd8affd4315'),
	(5, 'Basic Carpentry Work', 'Offering carpentry services such as repairs, installations, and custom projects.', NULL, 'HVAC Technician', 5, 'Active', 7, 'Constanta', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/5.jpg?alt=media&token=f1cc20ad-a211-48e3-acb5-62608f77425f', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/carp2.jpg?alt=media&token=4a9d2ec0-d734-4e75-ad39-28658b311b93', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/carp.jpg?alt=media&token=109a7466-7f72-4e64-a191-a05a9cc50ee3'),
	(6, 'Plumbing Solutions', 'Experienced plumber available for leaks, installations, and maintenance.', NULL, 'Farmer', 6, 'Active', 6, 'Bucuresti', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/6.jpg?alt=media&token=3f6c14c1-d691-4f70-9482-172b651993ce', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/plumb2.jpg?alt=media&token=1f5916b1-528f-4095-a5b7-84422e01f566', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/plumb.jpg?alt=media&token=f1a30d37-75f7-44d6-b3f0-1917e228be0c'),
	(7, 'Residential Cleaning Services', 'Thorough cleaning services for apartments and homes. Trustworthy and efficient.', NULL, 'Farmer', 2, 'Active', 5, 'Constanta', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/7.jpg?alt=media&token=c85837e9-47ed-4704-a6a7-93fff27664fd', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/clean2.jpg?alt=media&token=b3c77623-e2bb-4206-8d28-a6188da92a18', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/clean.jpg?alt=media&token=193eef61-2bb3-40ee-ad1d-3001bd77087c'),
	(8, 'Graphic Design Services', 'Professional graphic design services for logos, brochures, and more.', NULL, 'Cook', 5, 'Active', 21, 'Cluj-Napoca', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/graphic.jpg?alt=media&token=3725bdd7-925f-4b64-9798-fbc3a519fd0c', NULL, NULL),
	(9, 'Auto Detailing', 'Complete auto detailing services for cars, trucks, and SUVs.', NULL, 'Welder', 2, 'Active', 15, 'Timisoara', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/detailer.jpg?alt=media&token=aec10dec-e760-46a8-b903-c1add067452d', NULL, NULL),
	(10, 'Welder Services', 'High-quality welding services for various types of metalwork.', NULL, 'Welder', 3, 'Active', 11, 'Iasi', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/wel.jpg?alt=media&token=0b3dc9d6-515d-488f-a732-7eb85dc50ace', NULL, NULL),
	(11, 'Housekeeping Services', 'Reliable housekeeping services for residential properties.', NULL, 'Housekeeper', 7, 'Active', 17, 'Brasov', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/housekeep.jpg?alt=media&token=37332489-3a28-48f0-bb14-44d13e26c890', NULL, NULL),
	(12, 'Tailoring Services', 'Custom tailoring services for all types of clothing.', NULL, 'Tailor', 5, 'Active', 24, 'Sibiu', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/tailor.jpg?alt=media&token=7bb0acd3-8230-4190-8323-26009249862c', NULL, NULL),
	(13, 'Massage Therapy', 'Professional massage therapy services for relaxation and pain relief.', NULL, 'Massage Therapist', 6, 'Active', 24, 'Oradea', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/chiro.jpg?alt=media&token=b785e0ad-b654-4eff-838a-89a0a617c431', NULL, NULL),
	(14, 'Barista Services', 'Expert barista available for events and private functions.', NULL, 'Barista', 9, 'Active', 20, 'Craiova', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/bc20a11a-0a93-4fe8-b862-acfbdc5097e5.jpg?alt=media&token=b022f77d-06be-4dc7-bac6-b9b5a77096ee', NULL, NULL),
	(60, 'Data Scientist', 'Provide data scientist support at junior level', NULL, 'Cook', 9, 'Pending', 1, 'Bucuresti', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/images%2Fd1.jpg?alt=media&token=e917f83d-6744-4711-a991-16228c2f1fbd', 'https://firebasestorage.googleapis.com/v0/b/serviceswap-b5da9.appspot.com/o/images%2Fd2.jpg?alt=media&token=f3923324-5ebf-4dc4-b100-e7234d62419a', NULL);

CREATE TABLE IF NOT EXISTS `tickets` (
  `ticket_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_title` varchar(255) NOT NULL,
  `ticket_message` text NOT NULL,
  `ticket_status` varchar(255) NOT NULL DEFAULT 'Open',
  `ticket_creator_user_id_fk` int(11) NOT NULL,
  `order_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `ticket_creator_user_id_fk` (`ticket_creator_user_id_fk`),
  KEY `order_id_fk` (`order_id_fk`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`ticket_creator_user_id_fk`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`order_id_fk`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `tickets`;
INSERT INTO `tickets` (`ticket_id`, `ticket_title`, `ticket_message`, `ticket_status`, `ticket_creator_user_id_fk`, `order_id_fk`) VALUES
	(2, 'Non-Delivery of Service', 'The service provider has not delivered the agreed-upon service. Please assist in resolving this issue.', 'Closed', 9, 46),
	(3, 'Service Provider Unresponsive', 'The service provider is not responding to my messages. I need assistance in contacting them.', 'Closed', 5, 43),
	(4, 'Service Quality Issue', 'The quality of the provided service does not meet the agreed standards. I would like to discuss this further.', 'Closed', 4, 48),
	(5, 'Payment Dispute', 'There is a disagreement regarding the payment for the service. Please help mediate this dispute.', 'Closed', 9, 48),
	(6, 'Service Cancellation Request', 'I would like to cancel the service as it is no longer needed.', 'Closed', 9, 46),
	(7, 'Follow-up on Previous Issue', 'Following up on the previous issue reported with no resolution yet.', 'Closed', 5, 43),
	(8, 'Overdue Service Delivery', 'The service delivery is overdue by two weeks. Please assist.', 'Open', 4, 48),
	(9, 'Incorrect Billing', 'I have been incorrectly billed for a service. Please rectify this error.', 'Closed', 9, 48),
	(10, 'Need Clarification on Service Terms', 'I need further clarification on the terms of the service agreement.', 'Open', 5, 43),
	(11, 'The other user did not respect his end of the deal.', 'The other user did not respect his end of the deal. I am disappointed, i would like some help', 'Open', 9, 57);

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_info` text DEFAULT NULL,
  `user_type` enum('normal','admin','banned') NOT NULL DEFAULT 'normal',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DELETE FROM `user`;
INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `profile_info`, `user_type`) VALUES
	(1, 'AlexGreen', 'alex.green@example.com', 'safePassword987', '', 'normal'),
	(2, 'CaseyRiver', 'casey.river@example.com', 'secureKey789', '', 'normal'),
	(3, 'sergiu', 'sergiurusu122@gmail.com', '41341@!22dasdD', 'a', 'normal'),
	(4, 'EmilyStone', 'emily.stone@example.com', 'emPassword12!', NULL, 'normal'),
	(5, 'MichaelBlanc', 'michael.blanc@example.com', 'pass123Michael!', NULL, 'normal'),
	(6, 'banat', 'sarah.connor@example.com', 'sdfDD2!33', NULL, 'banned'),
	(7, 'admin', 'james.tiberius@example.com', '1234', NULL, 'admin'),
	(8, 'user', 'anna.banana@example.com', 'dffsdfsd33!!', NULL, 'normal'),
	(9, 'sergiu123', 'sergiurusu33122@gmail.com', '123C86793c!', NULL, 'banned'),
	(14, 'serg', 'goodmail@some.com', 'serg123C!', NULL, 'normal');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
