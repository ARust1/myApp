-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 19. Jan 2018 um 17:25
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
-- Tabellenstruktur für Tabelle `board_messages`
--

CREATE TABLE `board_messages` (
  `uuid` char(36) NOT NULL,
  `message` text NOT NULL,
  `timestamp` datetime NOT NULL,
  `team_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `board_messages`
--

INSERT INTO `board_messages` (`uuid`, `message`, `timestamp`, `team_id`) VALUES
('19705180-cd27-4077-9ef4-a35a08acff40', 'gegegeegge', '2018-01-15 00:10:56', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('7ea324ac-bd79-4f05-9235-3b308afe4a32', 'BnkkNykjhyhbkkjJbsbjjjsjjsj', '2018-01-18 21:30:20', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('899b47d1-e447-45cc-bf29-e3746f18658f', 'egegegegeg', '2018-01-15 00:11:27', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('96d413a7-0a88-45df-b1c6-641f314b2cd8', 'heheheehehjo', '2018-01-15 00:11:09', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('a810ca86-cd38-45f8-9565-fabc14840d53', 'Yo leute morgen ist team meeting', '2018-01-19 16:21:37', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('b5f5ddac-c343-424a-b47a-a9c8e35501e9', 'gegegegege', '2018-01-15 00:11:25', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('c59689bc-c63f-4928-aa86-9f47c1a1739f', 'gegegegegeg', '2018-01-15 00:12:24', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('ca238165-5cdf-442c-97c2-a6829afe8b68', 'Hehejo alles cool!', '2018-01-17 00:35:07', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('ee781900-03c1-4dce-8e04-8d70003f8405', 'gegegegegeeg', '2018-01-15 00:12:21', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('fcdd19fa-0870-4c67-80db-1cc2c94e644a', 'gegegeggeeg', '2018-01-15 00:09:58', '10a021b3-c466-4ef8-abaa-066c57e16fae');

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
  `amount` double NOT NULL DEFAULT '0',
  `team_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `events`
--

INSERT INTO `events` (`uuid`, `name`, `startDate`, `endDate`, `location`, `amount`, `team_id`) VALUES
('17b91aa9-66bd-472d-bac4-ddbe8f68b6ff', 'Budapest', '16.01.2018', '17.01.2018', 'Ungarn', 150, '5332e53a-7d81-4ea7-9bd6-add9e09cd9bb'),
('5db699ac-87da-428c-a074-e0f445e8974a', 'Gggvg', '28.11.2017', '30.11.2017', 'Vgjhvgg', 1, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('6d984fc4-2304-4f80-9888-9d094b885431', 'Saufen', '26.11.2017', '30.11.2017', 'Heidelberg', 1, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('fc339bec-cd8a-4c0b-8144-41ef39cd0981', 'fff', '26.11.2017', '28.11.2017', 'fff', 1, '10a021b3-c466-4ef8-abaa-066c57e16fae');

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
('2664f7f3-132b-47eb-a205-9cc01dea013a', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '6d984fc4-2304-4f80-9888-9d094b885431', 2, 0, 1, '2018-01-15 21:16:38'),
('2ad3862d-faf7-4fb2-8086-c831f7e6be44', 'fde723cf-f3b8-11e7-af46-fcaa14968dfd', '17b91aa9-66bd-472d-bac4-ddbe8f68b6ff', 2, 0, 0, '2018-01-07 15:46:02'),
('6b3dff3b-f844-4559-8046-12e4f0108e10', 'fe13d609-bcb7-11e7-8dd7-080027c12564', 'fc339bec-cd8a-4c0b-8144-41ef39cd0981', 2, 0, 1, '2018-01-15 21:31:27'),
('767ecfe0-14f0-4208-84e1-0e099e374f8b', '5b7fa85e-bca9-11e7-bff5-080027c12564', '6d984fc4-2304-4f80-9888-9d094b885431', 2, 1, 0, '2018-01-04 10:25:12'),
('7d9e461a-0616-4afb-b4ee-d1569bf85a4e', '5b7fa85e-bca9-11e7-bff5-080027c12564', 'fc339bec-cd8a-4c0b-8144-41ef39cd0981', 2, 1, 0, '2017-12-12 20:32:36'),
('7f9eaba9-c65a-4a91-8341-ef0181e3ab84', 'f819dff0-c01d-11e7-8758-080027c12564', '5db699ac-87da-428c-a074-e0f445e8974a', 2, 0, 0, NULL),
('c5d7266d-957f-4a50-8319-92eb71fdbecc', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '5db699ac-87da-428c-a074-e0f445e8974a', 2, 1, 0, '2018-01-02 23:40:12');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `penalties`
--

CREATE TABLE `penalties` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_id` char(36) DEFAULT NULL,
  `team_id` char(36) DEFAULT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `payment_method` int(3) DEFAULT '0',
  `paid` tinyint(1) DEFAULT '0',
  `date_of_payment` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `penalties`
--

INSERT INTO `penalties` (`uuid`, `name`, `user_id`, `team_id`, `amount`, `payment_method`, `paid`, `date_of_payment`) VALUES
('274e7a5b-f715-11e7-95a8-fcaa14968dfd', 'Handy klingelt während der Mannschaftssitzung', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1.5, 0, 0, NULL),
('2cdf4c3d-f86e-11e7-865c-fcaa14968dfd', 'zu spät zum Training', '5b7fa85e-bca9-11e7-bff5-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 0, 0, NULL),
('7df655af-f86f-11e7-865c-fcaa14968dfd', 'unnötige gelbe/gelb-rote Karte', '5b7fa85e-bca9-11e7-bff5-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 0, 1, '2018-01-13 15:52:14'),
('b06f39e4-fd34-11e7-a882-fcaa14968dfd', 'unnötige rote Karte', 'f819dff0-c01d-11e7-8758-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 0, 0, NULL);

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
('068ffa92-6b32-4eec-9309-99162fdf9826', 'hhehehe', '40524588-fafc-11e7-a882-fcaa14968dfd', 0, NULL, NULL, 'acct_1Bl1F3L3sajv5GXx'),
('06c07203-0e5f-45c6-8833-caa41a5510e3', 'fefef', '40524588-fafc-11e7-a882-fcaa14968dfd', 0, NULL, NULL, 'acct_1Bl1I0CLYNYvWogB'),
('10a021b3-c466-4ef8-abaa-066c57e16fae', 'Cide Reaper', '5b7fa85e-bca9-11e7-bff5-080027c12564', 298, 'gYuvR', 'https://firebasestorage.googleapis.com/v0/b/test-2d3d6.appspot.com/o/a_1516379036802?alt=media&token=fa01987f-4b4c-4305-8ad0-544d63924e8a', 'acct_1Bi2jpL6azr2z1xp'),
('5332e53a-7d81-4ea7-9bd6-add9e09cd9bb', 'Zzzzz', 'fde723cf-f3b8-11e7-af46-fcaa14968dfd', 150, 'dxvxf', 'https://firebasestorage.googleapis.com/v0/b/test-2d3d6.appspot.com/o/k_1515336197259?alt=media&token=929b8257-4f47-4be5-bc1d-587d9229800a', 'acct_1BhfN0AaBOC1EYY5'),
('f38f9b3a-77d7-4fd8-8dc9-5c13233e32e2', 'BLALBLA', '40524588-fafc-11e7-a882-fcaa14968dfd', 0, NULL, NULL, 'acct_1Bl16EFUvqFjjzQp');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `transactions`
--

CREATE TABLE `transactions` (
  `uuid` char(36) NOT NULL,
  `recipient` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `team_id` char(36) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `user_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `transactions`
--

INSERT INTO `transactions` (`uuid`, `recipient`, `description`, `timestamp`, `type`, `team_id`, `amount`, `user_id`) VALUES
('0386f792-5dd8-4f2b-9582-c3db438aca60', 'Björn Soika', 'gdfgfdgdf', '2018-01-18 23:13:41', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 10, 'fe13d609-bcb7-11e7-8dd7-080027c12564'),
('3d3f860f-5d45-4ca9-b580-8a022859f358', 'Björn Soika', 'dfsfsdfdsfssdf', '2018-01-19 14:10:00', 'balance', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 'fe13d609-bcb7-11e7-8dd7-080027c12564'),
('6016a6c8-8d72-4690-8eb7-6923630e0544', 'Björn Soika', 'dssdfsdfsdf', '2018-01-19 14:15:08', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 'fe13d609-bcb7-11e7-8dd7-080027c12564'),
('6582a3bd-d29c-48db-aa41-9d98d9a69730', 'Frank Rust', 'fdsfsdfd', '2018-01-18 23:15:25', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 10, 'f819dff0-c01d-11e7-8758-080027c12564'),
('bb2e2154-1462-475b-b980-e6a1d2203be9', 'Björn Soika', 'gjhgggh', '2018-01-18 22:50:03', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 10, 'fe13d609-bcb7-11e7-8dd7-080027c12564'),
('c50dff64-fe6c-4343-aa36-669921135b2f', 'Alexander Rust', 'fdsfdsfdsfd', '2018-01-18 22:40:43', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1.5, '5b7fa85e-bca9-11e7-bff5-080027c12564'),
('e18e40d6-fa8d-4b36-be19-7eb772a91e9b', 'Frank Rust', 'dfssfsd', '2018-01-18 23:14:48', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 10, 'f819dff0-c01d-11e7-8758-080027c12564'),
('fb05e1ba-9d54-4693-b0af-5468192ffd63', 'Alexander Rust', 'fdfsf', '2018-01-18 22:56:45', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 3, '5b7fa85e-bca9-11e7-bff5-080027c12564');

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
('0fc049d2-f4a9-11e7-af46-fcaa14968dfd', 'J', '$2a$10$LNDaCdy7zyToYy9nZTxVmO0xa.7DkQGPpev2AcgfD83Dy84rHPnWK', 'J', 'J', '08.01.1993', NULL, 0, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTU0MzkyNjh9.sv7UhRmnRSpUV7ZCNjQnWXn8REAviXEydQ9oxS22R64', 0, 'acct_1Bi6B7K8bdvO4oev', NULL, NULL),
('35aebe25-f4a8-11e7-af46-fcaa14968dfd', 'c', '$2a$10$fE043pujTPuAPpZOc3hh..1ia08YDohVwIwKGiq0vG7BVv1k4jbKO', 'C', 'C', '26.12.1989', NULL, 0, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTU0Mzg5MDF9.7XsBY1XpmmoOLVppoIArurSS9KLC-wY681R9QNtCdNA', 0, 'acct_1Bi65EHH622qUDee', NULL, NULL),
('40524588-fafc-11e7-a882-fcaa14968dfd', 'h', '$2a$10$6Tuh.qe1KUP3jIj8oegQOuN4YAMiRQzcNftkrOBQB0Y/FwOJRqZda', 'Bla', 'Bla', '26.12.1989', '06c07203-0e5f-45c6-8833-caa41a5510e3', 1, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYxMzU0NDd9.Cl4CX-OAIJJq6XS_BZtPZctHlRwCaoXIWLmwPYlGv40', 0, 'acct_1Bl15rIviKSOP5Jf', NULL, NULL),
('5b7fa85e-bca9-11e7-bff5-080027c12564', 'a', '$2a$10$NYjJHr1aOB6wz84m9B5h.uYNpzRZbjqX1v3Ep60gSCy7oQULxboE.', 'Alexander', 'Rust', '26.12.1989', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 7, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYzNzg2NzV9.FLTtxI0xiYRvBUMGKCtRkfoIIXX8Tn8JbSCYyICMK38', 0, 'acct_1BbE8vFDl2q5tObj', NULL, NULL),
('f819dff0-c01d-11e7-8758-080027c12564', 'frank', '$2a$10$W0haIbWOnT8fa9d14jOeGekb1aHXvsoq5o05f3jgA4Ag7CVma/2rO', 'Frank', 'Rust', NULL, '10a021b3-c466-4ef8-abaa-066c57e16fae', 0, 9, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDk2NjIwNjZ9.aZYhZh_8BWpVC7Ig-jTVKIDpj-iEZ-us__YC39UjJbY', 0, 'acct_1BeWOPLkw0gmFrzE', NULL, NULL),
('fde723cf-f3b8-11e7-af46-fcaa14968dfd', 'k', '$2a$10$DA4IiGzKj6S35U31OlnPuehK5Fk.EkRyJxcRULceABjb1W78giL1a', 'A', 'R', '26.12.1989', '5332e53a-7d81-4ea7-9bd6-add9e09cd9bb', 1, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTU0MjU2NDd9.05VTuNvdNDcEY4OhU0ahuk8RrvUZoXW2TMheNeikDv4', 0, 'acct_1BhfM5Clz1BK1JaT', NULL, 'https://firebasestorage.googleapis.com/v0/b/test-2d3d6.appspot.com/o/k_1515336197259?alt=media&token=929b8257-4f47-4be5-bc1d-587d9229800a'),
('fe13d609-bcb7-11e7-8dd7-080027c12564', 'b', '$2a$10$wgcCGaRzq5JFZU5V5duHjuysnRsCavjx8P1LT3QLSzU23AiwBMZay', 'Björn', 'Soika', NULL, '10a021b3-c466-4ef8-abaa-066c57e16fae', 0, 5, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYzNzEwMzR9.rkdMEtMqSvHKA5Xz1mVfX5WufsOrps2lzKFukbETZJc', 1, 'acct_1Bi2FeGsSj7kv9O1', NULL, NULL);

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
-- Indizes für die Tabelle `board_messages`
--
ALTER TABLE `board_messages`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `uuid` (`uuid`),
  ADD KEY `team_id` (`team_id`);

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
-- Indizes für die Tabelle `penalties`
--
ALTER TABLE `penalties`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `uuid` (`uuid`),
  ADD KEY `user_id_2` (`user_id`),
  ADD KEY `team_id_2` (`team_id`);

--
-- Indizes für die Tabelle `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indizes für die Tabelle `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `uuid_2` (`uuid`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `user_id` (`user_id`);

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
