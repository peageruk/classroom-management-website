CREATE database final;

use final;

CREATE TABLE `account` (
	`id` int NOT NULL AUTO_INCREMENT,
	`username` varchar(50) NOT NULL UNIQUE,
	`date_of_birth` DATE NOT NULL,
	`address` varchar(255) NOT NULL,
	`password` varchar(500) NOT NULL,
	`full_name` varchar(50),
	`role` enum('ADMIN', 'MENTOR', 'TUTOR', 'STUDENT') NOT NULL,
	`phone_number` varchar(12) NOT NULL UNIQUE,
	`email` varchar(50) NOT NULL UNIQUE,
	`facebook` varchar(50) NOT NULL UNIQUE,
	`information` varchar(255),
	`class_id` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `zoom` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL UNIQUE,
	`link` varchar(100) NOT NULL UNIQUE,
	`description` varchar(500),
	`note` varchar(500),
	`meeting_id` varchar(15) NOT NULL UNIQUE,
	`pass_code` varchar(15) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `class_room` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL UNIQUE,
	`address` varchar(100) NOT NULL,
	`note` varchar(500),
    `size` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `class` (
	`id` int NOT NULL AUTO_INCREMENT,
	`class_name` varchar(50) NOT NULL UNIQUE,
	`start_date` DATE NOT NULL,
	`end_date` DATE NOT NULL,
	`class_status` enum('PENDING', 'IN_PROGRESS','CLOSED') NOT NULL,
	`teaching_form` enum ('ONLINE', 'OFFLINE', 'ALL') NOT NULL,
	`mentor_id` int NOT NULL,
	`zoom_id` int NOT NULL,
	`class_zoom_id` int NOT NULL,
	`description` varchar(255),
	`schedule` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);
CREATE TABLE token (
                         id int unsigned NOT NULL AUTO_INCREMENT,
                         token varchar(255) NOT NULL,
                         user_agent varchar(255) NOT NULL,
                         is_black_list tinyint(1) DEFAULT NULL,
                         refresh_time datetime DEFAULT NULL,
                         expiration datetime DEFAULT NULL,
                         PRIMARY KEY (id),
                         UNIQUE KEY token (token)
);

ALTER TABLE `account` ADD CONSTRAINT `account_fk0` FOREIGN KEY (`class_id`) REFERENCES `class`(`id`);

ALTER TABLE `class` ADD CONSTRAINT `class_fk0` FOREIGN KEY (`mentor_id`) REFERENCES `account`(`id`);

ALTER TABLE `class` ADD CONSTRAINT `class_fk1` FOREIGN KEY (`zoom_id`) REFERENCES `zoom`(`id`);

ALTER TABLE `class` ADD CONSTRAINT `class_fk2` FOREIGN KEY (`class_zoom_id`) REFERENCES `class_room`(`id`);




