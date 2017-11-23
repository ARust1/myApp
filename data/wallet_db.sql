-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Nov 2017 um 17:43
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
('06d63b79-d56c-43b3-8392-cac77c355c45', 'Saufen', '23.11.2017', '24.11.2017', 'Heidelberg', 55, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('14122e7e-0cd2-421c-8d72-6c61bbe4c162', 'llll', '23.11.2017', '25.11.2017', 'lllll', 454, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('19e0c371-af67-4178-a944-76e3f0286488', 'hhh', '24.11.2017', '28.11.2017', 'hhh', 344, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('3cd0edf8-9603-47da-b01c-ac0485ec9d5d', 'njhjj', '24.11.2017', '25.11.2017', 'jjj', 455, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('6ed7123f-2fef-4039-8218-a696fa97742b', 'Nomma saufen', '23.11.2017', '25.11.2017', 'Heidelberg', 44343, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('ba01abc1-6e1d-4302-8b44-4b1b259d9b85', 'fff', '23.11.2017', '25.11.2017', 'fff', 333, '10a021b3-c466-4ef8-abaa-066c57e16fae');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `event_invite`
--

CREATE TABLE `event_invite` (
  `uuid` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `event_id` char(36) NOT NULL,
  `participation` int(3) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `event_invite`
--

INSERT INTO `event_invite` (`uuid`, `user_id`, `event_id`, `participation`) VALUES
('00309285-2488-4b01-8410-760c0247b351', '5b7fa85e-bca9-11e7-bff5-080027c12564', '06d63b79-d56c-43b3-8392-cac77c355c45', 0),
('0cdbe02f-b3b0-4273-8888-e401a686afb0', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '19e0c371-af67-4178-a944-76e3f0286488', 0),
('15eaa339-bffa-4304-aca6-a14a3f7814b0', 'f819dff0-c01d-11e7-8758-080027c12564', '6ed7123f-2fef-4039-8218-a696fa97742b', 0),
('66ab3988-ec91-4122-83dc-841e788f5311', 'f819dff0-c01d-11e7-8758-080027c12564', '19e0c371-af67-4178-a944-76e3f0286488', 0),
('893b28e7-0525-4ca6-b1aa-a7cecefd8e94', 'f819dff0-c01d-11e7-8758-080027c12564', '14122e7e-0cd2-421c-8d72-6c61bbe4c162', 0),
('8cee0d27-8234-4631-a6d0-f7fc2ef608b0', '5b7fa85e-bca9-11e7-bff5-080027c12564', '6ed7123f-2fef-4039-8218-a696fa97742b', 0),
('984bad03-9a06-4d69-9dfd-ede4888e412b', '5b7fa85e-bca9-11e7-bff5-080027c12564', '14122e7e-0cd2-421c-8d72-6c61bbe4c162', 0),
('a168b3d8-a369-41fe-b3d2-8fb95070dea8', '5b7fa85e-bca9-11e7-bff5-080027c12564', 'ba01abc1-6e1d-4302-8b44-4b1b259d9b85', 0),
('a1ad0c2d-b6a4-462c-b153-eb3384d0b950', '5b7fa85e-bca9-11e7-bff5-080027c12564', '3cd0edf8-9603-47da-b01c-ac0485ec9d5d', 0),
('b31b19b2-7c06-426a-8e04-59579372b706', '5b7fa85e-bca9-11e7-bff5-080027c12564', '19e0c371-af67-4178-a944-76e3f0286488', 0),
('bb4b4347-67cb-4f0b-b229-6be2a04cc4c4', 'f819dff0-c01d-11e7-8758-080027c12564', '06d63b79-d56c-43b3-8392-cac77c355c45', 0),
('c95b5a5b-123b-45c1-9e14-f39697e94213', 'f819dff0-c01d-11e7-8758-080027c12564', 'ba01abc1-6e1d-4302-8b44-4b1b259d9b85', 0);

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
  `invite_token` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `team`
--

INSERT INTO `team` (`uuid`, `name`, `owner_id`, `balance`, `invite_token`) VALUES
('10a021b3-c466-4ef8-abaa-066c57e16fae', 'Cide Reaper', '5b7fa85e-bca9-11e7-bff5-080027c12564', 1454.42, 'MOPRu');

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
  `team_id` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `back_number` int(11) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `balance` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`uuid`, `email`, `password`, `prename`, `surname`, `team_id`, `admin`, `back_number`, `position`, `token`, `balance`) VALUES
('2aed3803-bca8-11e7-bff5-080027c12564', 'c', '$2a$10$8NLcFyUFMnZNQQW5uqCshu215FBJVpXZx5xhL2MsiymCEJwd2PSOe', NULL, NULL, NULL, 0, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDkzOTk0MzF9.jOFRsVpmXJHv6F6Z-9aSrTLWxzXs4X57lic5BR6QM04', 0),
('5b7fa85e-bca9-11e7-bff5-080027c12564', 'a', '$2a$10$NYjJHr1aOB6wz84m9B5h.uYNpzRZbjqX1v3Ep60gSCy7oQULxboE.', 'Alexander', 'Rust', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 7, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTE0NTE0NTV9.4LPfSGjgBkSIknCKR3Yl0wG2e-WJD1SHGJy1rBQ8hbk', 0),
('f819dff0-c01d-11e7-8758-080027c12564', 'frank', '$2a$10$W0haIbWOnT8fa9d14jOeGekb1aHXvsoq5o05f3jgA4Ag7CVma/2rO', 'Frank', 'Rust', '10a021b3-c466-4ef8-abaa-066c57e16fae', 0, 9, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDk2NjIwNjZ9.aZYhZh_8BWpVC7Ig-jTVKIDpj-iEZ-us__YC39UjJbY', 0),
('fe13d609-bcb7-11e7-8dd7-080027c12564', 'b', '$2a$10$wgcCGaRzq5JFZU5V5duHjuysnRsCavjx8P1LT3QLSzU23AiwBMZay', 'Björn', 'Soika', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 5, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTAzMjY5Mzd9.UJ9ufZ6eSVZ1bCMVgDGXcr7AYadaDfC2p2ap3eXqZ2I', 0);

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
  ADD PRIMARY KEY (`uuid`),
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
  ADD UNIQUE KEY `email` (`email`);

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
