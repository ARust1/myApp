-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 08. Jan 2018 um 01:59
-- Server-Version: 10.1.21-MariaDB
-- PHP-Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `wallet_db`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `events`
--

CREATE TABLE `events` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `startDate` varchar(255) DEFAULT NULL,
  `endDate` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `sum` double NOT NULL DEFAULT '0',
  `team_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `events`
--

INSERT INTO `events` (`uuid`, `name`, `startDate`, `endDate`, `location`, `sum`, `team_id`) VALUES
('17b91aa9-66bd-472d-bac4-ddbe8f68b6ff', 'Budapest', '16.01.2018', '17.01.2018', 'Ungarn', 150, '5332e53a-7d81-4ea7-9bd6-add9e09cd9bb'),
('5db699ac-87da-428c-a074-e0f445e8974a', 'Gggvg', '28.11.2017', '30.11.2017', 'Vgjhvgg', 300, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('6d984fc4-2304-4f80-9888-9d094b885431', 'Saufen', '26.11.2017', '30.11.2017', 'Heidelberg', 30, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('fc339bec-cd8a-4c0b-8144-41ef39cd0981', 'fff', '26.11.2017', '28.11.2017', 'fff', 23, '10a021b3-c466-4ef8-abaa-066c57e16fae');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `event_invite`
--

CREATE TABLE `event_invite` (
  `e_uuid` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `event_id` char(36) NOT NULL,
  `participation` int(3) DEFAULT '0',
  `paid` tinyint(1) DEFAULT '0',
  `payment_method` int(11) DEFAULT '0',
  `date_of_payment` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `event_invite`
--

INSERT INTO `event_invite` (`e_uuid`, `user_id`, `event_id`, `participation`, `paid`, `payment_method`, `date_of_payment`) VALUES
('078a61d9-5f8b-45ca-bf55-82e8a9604c7f', 'f819dff0-c01d-11e7-8758-080027c12564', '6d984fc4-2304-4f80-9888-9d094b885431', 0, 0, 0, NULL),
('15367203-cd23-4631-bd7a-f12dc24dcfec', '5b7fa85e-bca9-11e7-bff5-080027c12564', '5db699ac-87da-428c-a074-e0f445e8974a', 2, 1, 0, '2018-01-02 23:25:48'),
('2664f7f3-132b-47eb-a205-9cc01dea013a', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '6d984fc4-2304-4f80-9888-9d094b885431', 2, 0, 0, '2017-12-13 16:03:35'),
('2ad3862d-faf7-4fb2-8086-c831f7e6be44', 'fde723cf-f3b8-11e7-af46-fcaa14968dfd', '17b91aa9-66bd-472d-bac4-ddbe8f68b6ff', 2, 1, 0, '2018-01-07 15:46:02'),
('6b3dff3b-f844-4559-8046-12e4f0108e10', 'fe13d609-bcb7-11e7-8dd7-080027c12564', 'fc339bec-cd8a-4c0b-8144-41ef39cd0981', 2, 0, 0, '2017-12-13 16:05:01'),
('767ecfe0-14f0-4208-84e1-0e099e374f8b', '5b7fa85e-bca9-11e7-bff5-080027c12564', '6d984fc4-2304-4f80-9888-9d094b885431', 2, 1, 0, '2018-01-04 10:25:12'),
('7d9e461a-0616-4afb-b4ee-d1569bf85a4e', '5b7fa85e-bca9-11e7-bff5-080027c12564', 'fc339bec-cd8a-4c0b-8144-41ef39cd0981', 2, 0, 0, '2017-12-12 20:32:36'),
('7f9eaba9-c65a-4a91-8341-ef0181e3ab84', 'f819dff0-c01d-11e7-8758-080027c12564', '5db699ac-87da-428c-a074-e0f445e8974a', 2, 0, 0, NULL),
('c5d7266d-957f-4a50-8319-92eb71fdbecc', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '5db699ac-87da-428c-a074-e0f445e8974a', 2, 1, 0, '2018-01-02 23:40:12');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `invites`
--

CREATE TABLE `invites` (
  `uuid` char(36) NOT NULL,
  `team_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `penalties`
--

CREATE TABLE `penalties` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_id` char(36) DEFAULT NULL,
  `team_id` char(36) DEFAULT NULL,
  `sum` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Trigger `penalties`
--
DELIMITER $$
CREATE TRIGGER `before_insert_penalty` BEFORE INSERT ON `penalties` FOR EACH ROW SET new.uuid = uuid()
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `team`
--

CREATE TABLE `team` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `owner_id` char(36) DEFAULT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `invite_token` char(36) DEFAULT NULL,
  `team_logo` varchar(255) DEFAULT NULL,
  `stripeToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `team`
--

INSERT INTO `team` (`uuid`, `name`, `owner_id`, `balance`, `invite_token`, `team_logo`, `stripeToken`) VALUES
('10a021b3-c466-4ef8-abaa-066c57e16fae', 'Cide Reaper', '5b7fa85e-bca9-11e7-bff5-080027c12564', 10159.42, 'HOagg', 'https://firebasestorage.googleapis.com/v0/b/test-2d3d6.appspot.com/o/a_1515363635143?alt=media&token=94c28deb-0a13-447e-b735-c7ca50498335', NULL),
('5332e53a-7d81-4ea7-9bd6-add9e09cd9bb', 'Zzzzz', 'fde723cf-f3b8-11e7-af46-fcaa14968dfd', 150, 'YybNy', 'https://firebasestorage.googleapis.com/v0/b/test-2d3d6.appspot.com/o/k_1515336197259?alt=media&token=929b8257-4f47-4be5-bc1d-587d9229800a', 'acct_1BhfN0AaBOC1EYY5'),
('7612441e-7d62-4f99-a425-32bb5fbee8ca', 'Hhuj', '154ffaff-f32b-11e7-af46-fcaa14968dfd', 0, NULL, NULL, 'acct_1BhfJlDFXlUdJc0g');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `uuid` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `prename` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `team_id` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `back_number` int(11) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `accountToken` char(36) DEFAULT NULL,
  `file_id` varchar(255) DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`uuid`, `email`, `password`, `prename`, `surname`, `birthday`, `team_id`, `admin`, `back_number`, `position`, `token`, `balance`, `accountToken`, `file_id`, `profile_img`) VALUES
('0bfc6908-d3c3-11e7-8b8e-fcaa14968dfd', 'alex', '$2a$10$bH.5R3Bp0PuTMYJjlpDVhu1uIi8vEZhFQ4VwqLQ8w1uMy99FCdiOe', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'acct_1BYdqGCyiCLSYGZL', NULL, NULL),
('154ffaff-f32b-11e7-af46-fcaa14968dfd', 's', '$2a$10$QYjtxlHZrqSjz7mEJ4RN7OF0UpXY3EXZmIEc6voci0pv7QsMA9OOK', 'S', 'S', '26.12.1989', '7612441e-7d62-4f99-a425-32bb5fbee8ca', 1, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTUzMzY3NDd9.rg8OJQE69jmZuhORgWwRvapmsdfafsgrQmmjulSHl5U', 0, 'acct_1BhPV2BysGHm8psl', NULL, 'https://firebasestorage.googleapis.com/v0/b/test-2d3d6.appspot.com/o/s_1515336013238?alt=media&token=f2051663-7bc1-4d5d-92a1-fc67763d9f30'),
('5b7fa85e-bca9-11e7-bff5-080027c12564', 'a', '$2a$10$NYjJHr1aOB6wz84m9B5h.uYNpzRZbjqX1v3Ep60gSCy7oQULxboE.', 'Alexander', 'Rust', '26.12.1989', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 7, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTUzNjkzNjJ9.3tTQqPLmJvrgNDAeMjizx3ytHftCPqfh5g__39u7mRE', 0, 'acct_1BbE8vFDl2q5tObj', NULL, NULL),
('c662b833-f326-11e7-af46-fcaa14968dfd', 'p', '$2a$10$AgAXeyad3UxDCuEYE7K/OOeflkZbIQlSqDvl7/8Rc0.G26cfT0/7W', 'sada', 'dasd', '12.12.1989', NULL, 0, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTUyNzQ1NTF9.KisrnG2oK1NqXexUC6IarG0LG2hAn9prOoZ7Bjv1W5g', 0, 'acct_1BhP1CJ8DgyZoYP2', NULL, NULL),
('f819dff0-c01d-11e7-8758-080027c12564', 'frank', '$2a$10$W0haIbWOnT8fa9d14jOeGekb1aHXvsoq5o05f3jgA4Ag7CVma/2rO', 'Frank', 'Rust', NULL, '10a021b3-c466-4ef8-abaa-066c57e16fae', 0, 9, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDk2NjIwNjZ9.aZYhZh_8BWpVC7Ig-jTVKIDpj-iEZ-us__YC39UjJbY', 0, 'acct_1BeWOPLkw0gmFrzE', NULL, NULL),
('fde723cf-f3b8-11e7-af46-fcaa14968dfd', 'k', '$2a$10$DA4IiGzKj6S35U31OlnPuehK5Fk.EkRyJxcRULceABjb1W78giL1a', 'A', 'R', '26.12.1989', '5332e53a-7d81-4ea7-9bd6-add9e09cd9bb', 1, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTUzNjE3Nzh9.gNa9OqONfaaU0si5WzPJNfbZcmjakK2nsyjdAZnbktw', 0, 'acct_1BhfM5Clz1BK1JaT', NULL, 'https://firebasestorage.googleapis.com/v0/b/test-2d3d6.appspot.com/o/k_1515336197259?alt=media&token=929b8257-4f47-4be5-bc1d-587d9229800a'),
('fe13d609-bcb7-11e7-8dd7-080027c12564', 'b', '$2a$10$wgcCGaRzq5JFZU5V5duHjuysnRsCavjx8P1LT3QLSzU23AiwBMZay', 'Björn', 'Soika', NULL, '10a021b3-c466-4ef8-abaa-066c57e16fae', 0, 5, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTQ5Mzk5MTl9.exe4OB_p5jh0aRy-buFx1QvX6VOvD2N4WvdPHy_u_Z4', 0, 'acct_1BZ3SgHJtRWJvZhs', NULL, NULL);

--
-- Trigger `user`
--
DELIMITER $$
CREATE TRIGGER `before_insert` BEFORE INSERT ON `user` FOR EACH ROW SET new.uuid = uuid()
$$
DELIMITER ;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `team_id` (`team_id`);

--
-- Indizes für die Tabelle `event_invite`
--
ALTER TABLE `event_invite`
  ADD PRIMARY KEY (`e_uuid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indizes für die Tabelle `invites`
--
ALTER TABLE `invites`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indizes für die Tabelle `penalties`
--
ALTER TABLE `penalties`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indizes für die Tabelle `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `token` (`token`),
  ADD KEY `team_id` (`team_id`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`uuid`);

--
-- Constraints der Tabelle `invites`
--
ALTER TABLE `invites`
  ADD CONSTRAINT `invites_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`uuid`),
  ADD CONSTRAINT `invites_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`);

--
-- Constraints der Tabelle `penalties`
--
ALTER TABLE `penalties`
  ADD CONSTRAINT `penalties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`),
  ADD CONSTRAINT `penalties_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `team` (`uuid`);

--
-- Constraints der Tabelle `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`uuid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
