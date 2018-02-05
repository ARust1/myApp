-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 06. Feb 2018 um 00:00
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
('04b8e3b6-2c29-4705-9e81-45ebbf351068', 'Mmmmmm      ', '2018-01-27 18:55:37', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('19705180-cd27-4077-9ef4-a35a08acff40', 'gegegeegge', '2018-01-15 00:10:56', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('5b33aacb-c5ac-4cef-90d6-7e8d7ecf4263', 'Test123', '2018-01-25 16:33:55', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('66d42ed8-e6a9-4c82-81d2-ae99fce40e34', 'dddddd', '2018-01-22 22:44:12', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('7ea324ac-bd79-4f05-9235-3b308afe4a32', 'BnkkNykjhyhbkkjJbsbjjjsjjsj', '2018-01-18 21:30:20', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('899b47d1-e447-45cc-bf29-e3746f18658f', 'egegegegeg', '2018-01-15 00:11:27', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('96d413a7-0a88-45df-b1c6-641f314b2cd8', 'heheheehehjo', '2018-01-15 00:11:09', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('a810ca86-cd38-45f8-9565-fabc14840d53', 'Yo leute morgen ist team meeting', '2018-01-19 16:21:37', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('b5f5ddac-c343-424a-b47a-a9c8e35501e9', 'gegegegege', '2018-01-15 00:11:25', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('b711bd3a-201f-482b-bd1d-f45420060e19', 'Hehejo', '2018-01-23 17:55:05', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('c59689bc-c63f-4928-aa86-9f47c1a1739f', 'gegegegegeg', '2018-01-15 00:12:24', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('ca238165-5cdf-442c-97c2-a6829afe8b68', 'Hehejo alles cool!', '2018-01-17 00:35:07', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('ee781900-03c1-4dce-8e04-8d70003f8405', 'gegegegegeeg', '2018-01-15 00:12:21', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('fcdd19fa-0870-4c67-80db-1cc2c94e644a', 'gegegeggeeg', '2018-01-15 00:09:58', '10a021b3-c466-4ef8-abaa-066c57e16fae');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `deposits`
--

CREATE TABLE `deposits` (
  `uuid` char(36) NOT NULL,
  `recipient` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `team_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deposit_token` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `payment_method` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `deposits`
--

INSERT INTO `deposits` (`uuid`, `recipient`, `timestamp`, `team_id`, `user_id`, `description`, `deposit_token`, `type`, `amount`, `sender`, `payment_method`) VALUES
('0dbfbbe2-af85-4b83-b8f8-2369681ca8ab', 'Cide Reaper', '2018-01-23 21:44:36', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', NULL, 'cash', 100, 'Alexander Rust', NULL),
('1391b0e5-47e9-4f9a-be06-a6a549edc268', 'Vfb Bottrop', '2018-01-27 13:34:29', '10a021b3-c466-4ef8-abaa-066c57e16fae', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '', NULL, 'cash', 100, 'Björn Soika', NULL),
('15fa0c64-7f25-4157-8da8-c8db9dea5b5a', 'Vfb Bottrop', '2018-01-27 13:29:51', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', NULL, 'cash', 100, 'Alexander Rust', NULL),
('1670dbd7-e437-453d-bce7-918958c4192c', 'Vfb Bottrop', '2018-01-27 13:46:03', '10a021b3-c466-4ef8-abaa-066c57e16fae', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '', NULL, 'cash', 100, 'Björn Soika', NULL),
('1becb7cd-cf81-41a7-9fbf-6f42255604ed', 'Cide Reaper', '2018-01-23 22:14:07', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', NULL, 'cash', 100, 'Alexander Rust', NULL),
('1ffffc15-37fb-49ad-92af-b7f6e6d620cb', 'Vfb Bottrop', '2018-01-27 13:42:41', '10a021b3-c466-4ef8-abaa-066c57e16fae', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '', NULL, 'cash', 100, 'Björn Soika', NULL),
('3d9e0a64-fd78-434a-9dbd-5629d437ca6a', 'Cide Reaper', '2018-01-26 18:14:11', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', 'ch_1BobiJJ1lJBgMAwIKOo2I2j3', 'card', 1200, 'Alexander Rust', NULL),
('485b8d61-ccc7-4a3a-afbe-28a042888306', 'Vfb Bottrop', '2018-01-27 13:46:19', '10a021b3-c466-4ef8-abaa-066c57e16fae', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '', NULL, 'cash', 100, 'Björn Soika', NULL),
('4a24214a-8b10-4daf-89ab-f9d7c41e1f53', 'Cide Reaper', '2018-01-23 23:01:45', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', 'ch_1BnalzJ1lJBgMAwIRcRR84ut', 'card', 100, 'Alexander Rust', NULL),
('66550239-e1df-44e9-ac70-051f33b7fea5', 'Vfb Bottrop', '2018-01-27 13:29:29', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', NULL, 'cash', 100, 'Alexander Rust', NULL),
('86741217-07f7-4bb1-8fc5-88db707b18e7', 'Vfb Bottrop', '2018-02-02 18:18:25', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', 'ch_1Br97GJ1lJBgMAwIufptk7fm', 'card', 1200, 'Alexander Rust', NULL),
('a795ece8-6156-4171-827c-6cad73a2cf1d', 'Cide Reaper', '2018-01-25 16:42:46', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', NULL, 'cash', 2000, 'Alexander Rust', NULL),
('ab42d9d5-a4bd-415a-a4d2-9ad6be2ad166', 'Vfb Bottrop', '2018-01-27 13:37:03', '10a021b3-c466-4ef8-abaa-066c57e16fae', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '', NULL, 'cash', 100, 'Björn Soika', NULL),
('b5056870-f0ba-4bfe-8f31-31e67583083c', 'Cide Reaper', '2018-01-23 19:36:54', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', 'tr_1BnXZlJ1lJBgMAwIGoaxgoIX', 'balance', 100, 'Alexander Rust', NULL),
('c407e071-3ba6-4d32-8c00-4961055298ed', 'Cide Reaper', '2018-01-23 19:46:05', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', 'tr_1BnXieJ1lJBgMAwIPQT9f09B', 'balance', 100, 'Alexander Rust', NULL),
('e3c861d6-0ca9-4603-97a3-dfa164b0fb80', 'Cide Reaper', '2018-01-23 19:36:54', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', 'tr_1BnXZlJ1lJBgMAwIGoaxgoIX', 'balance', 100, 'Alexander Rust', NULL),
('f11ea103-6644-4a23-8925-68533978a1cf', 'Vfb Bottrop', '2018-02-02 21:55:40', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', '', 'ch_1BrCVVJ1lJBgMAwI5Wa0etmu', 'card', 1290, 'Alexander Rust', NULL),
('f31b9f8e-2c87-443d-b902-4e5a808a9165', 'Vfb Bottrop', '2018-01-27 13:39:50', '10a021b3-c466-4ef8-abaa-066c57e16fae', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '', NULL, 'cash', 0, 'Björn Soika', NULL),
('f869e4c7-7c37-4983-8617-c3197248b381', 'Vfb Bottrop', '2018-01-27 13:22:18', '10a021b3-c466-4ef8-abaa-066c57e16fae', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '', NULL, 'cash', 100, 'Björn Soika', NULL);

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
('06010819-648d-4aaf-a5bd-3fe6f009fa6f', 'Hhghh', '27.01.2018', '28.01.2018', 'Hhhh', 25, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('17b91aa9-66bd-472d-bac4-ddbe8f68b6ff', 'Budapest', '16.01.2018', '17.01.2018', 'Ungarn', 150, '5332e53a-7d81-4ea7-9bd6-add9e09cd9bb'),
('40d901a6-95b6-4efe-a7fa-b0839072ca4e', 'Jfjdjd', '28.01.2018', '30.01.2018', 'Mfjdjd', 30, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('57ad11c8-119e-4155-a26d-13815e7b5b82', 'Hfhd', '28.01.2018', '29.01.2018', 'Fjkvjv', 30, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('5db699ac-87da-428c-a074-e0f445e8974a', 'Gggvg', '28.11.2017', '30.11.2017', 'Vgjhvgg', 1, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('6d984fc4-2304-4f80-9888-9d094b885431', 'Saufen', '26.11.2017', '30.11.2017', 'Heidelberg', 1, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('715dbf86-6589-41d4-839a-15712ae66d38', 'Zelten', '27.01.2018', '31.01.2018', 'Holland', 20, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('c1a535c1-6149-4349-b2cf-4d10fc7df717', 'Zzhh', '27.01.2018', '28.01.2018', 'Gggg', 23, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('c80408ba-97da-43f1-ab05-c318c79b3bf1', 'Kfjf', '06.12.2017', '27.01.2018', 'Nfjfj', 5454, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
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
('04b6830a-da0b-4a4e-a254-d1570c887f91', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '40d901a6-95b6-4efe-a7fa-b0839072ca4e', 2, 0, 0, NULL),
('078a61d9-5f8b-45ca-bf55-82e8a9604c7f', 'f819dff0-c01d-11e7-8758-080027c12564', '6d984fc4-2304-4f80-9888-9d094b885431', 0, 0, 0, NULL),
('15367203-cd23-4631-bd7a-f12dc24dcfec', '5b7fa85e-bca9-11e7-bff5-080027c12564', '5db699ac-87da-428c-a074-e0f445e8974a', 2, 1, 0, '2018-01-02 23:25:48'),
('189213b7-845a-461b-b1c0-80846e29d5ff', '5b7fa85e-bca9-11e7-bff5-080027c12564', '06010819-648d-4aaf-a5bd-3fe6f009fa6f', 2, 0, 0, NULL),
('1f2dd87a-4481-4337-aa6c-337a9bc309e6', 'f819dff0-c01d-11e7-8758-080027c12564', '715dbf86-6589-41d4-839a-15712ae66d38', 0, 0, 0, NULL),
('21929307-5b48-42ee-bd5f-1f9a0b07e874', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '57ad11c8-119e-4155-a26d-13815e7b5b82', 0, 0, 0, NULL),
('2664f7f3-132b-47eb-a205-9cc01dea013a', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '6d984fc4-2304-4f80-9888-9d094b885431', 2, 0, 1, '2018-01-15 21:16:38'),
('2ad3862d-faf7-4fb2-8086-c831f7e6be44', 'fde723cf-f3b8-11e7-af46-fcaa14968dfd', '17b91aa9-66bd-472d-bac4-ddbe8f68b6ff', 2, 0, 0, '2018-01-07 15:46:02'),
('376072bb-5c11-410b-ba93-f7a168d4d511', '5b7fa85e-bca9-11e7-bff5-080027c12564', '715dbf86-6589-41d4-839a-15712ae66d38', 0, 0, 0, NULL),
('3a85a2ed-9945-4a60-9726-4a96f2ad9310', '5b7fa85e-bca9-11e7-bff5-080027c12564', 'c1a535c1-6149-4349-b2cf-4d10fc7df717', 0, 0, 0, NULL),
('5d4cfa3f-d5cd-48d2-98f4-67d54f48e668', 'fe13d609-bcb7-11e7-8dd7-080027c12564', 'c1a535c1-6149-4349-b2cf-4d10fc7df717', 0, 0, 0, NULL),
('640a29bc-5ca8-45e2-935d-aadef26e6a4a', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '715dbf86-6589-41d4-839a-15712ae66d38', 0, 0, 0, NULL),
('6b3dff3b-f844-4559-8046-12e4f0108e10', 'fe13d609-bcb7-11e7-8dd7-080027c12564', 'fc339bec-cd8a-4c0b-8144-41ef39cd0981', 2, 0, 1, '2018-01-15 21:31:27'),
('6ce2af01-a265-4645-b00a-3d090d2f5492', 'fe13d609-bcb7-11e7-8dd7-080027c12564', 'c80408ba-97da-43f1-ab05-c318c79b3bf1', 0, 0, 0, NULL),
('6f7701c7-5876-4d6b-a5b8-5fe5cb733d24', 'f819dff0-c01d-11e7-8758-080027c12564', '40d901a6-95b6-4efe-a7fa-b0839072ca4e', 0, 0, 0, NULL),
('767ecfe0-14f0-4208-84e1-0e099e374f8b', '5b7fa85e-bca9-11e7-bff5-080027c12564', '6d984fc4-2304-4f80-9888-9d094b885431', 2, 1, 0, '2018-01-04 10:25:12'),
('7d9e461a-0616-4afb-b4ee-d1569bf85a4e', '5b7fa85e-bca9-11e7-bff5-080027c12564', 'fc339bec-cd8a-4c0b-8144-41ef39cd0981', 2, 1, 0, '2017-12-12 20:32:36'),
('7f4f84c1-8e51-4c1b-9444-1430a1230cc4', '5b7fa85e-bca9-11e7-bff5-080027c12564', '57ad11c8-119e-4155-a26d-13815e7b5b82', 0, 0, 0, NULL),
('7f9eaba9-c65a-4a91-8341-ef0181e3ab84', 'f819dff0-c01d-11e7-8758-080027c12564', '5db699ac-87da-428c-a074-e0f445e8974a', 2, 0, 0, NULL),
('84dee043-8646-43b0-8a4f-9859d621b3c0', 'f819dff0-c01d-11e7-8758-080027c12564', '57ad11c8-119e-4155-a26d-13815e7b5b82', 0, 0, 0, NULL),
('90a19155-a38c-4828-a355-3bc662a926b0', '5b7fa85e-bca9-11e7-bff5-080027c12564', 'c80408ba-97da-43f1-ab05-c318c79b3bf1', 0, 0, 0, NULL),
('9bb7fbc7-3266-461e-9b91-7029d6f3fe13', 'f819dff0-c01d-11e7-8758-080027c12564', 'c1a535c1-6149-4349-b2cf-4d10fc7df717', 0, 0, 0, NULL),
('bc07da96-fcc5-47ff-8b6d-290a24c6e211', '5b7fa85e-bca9-11e7-bff5-080027c12564', '40d901a6-95b6-4efe-a7fa-b0839072ca4e', 0, 0, 0, NULL),
('c5d7266d-957f-4a50-8319-92eb71fdbecc', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '5db699ac-87da-428c-a074-e0f445e8974a', 2, 1, 0, '2018-01-02 23:40:12'),
('d5fd647d-e0ae-47a1-ae06-d3e1bb7c3898', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '06010819-648d-4aaf-a5bd-3fe6f009fa6f', 0, 0, 0, NULL),
('e3e6405d-1370-41e1-baae-94d5d8e23148', 'f819dff0-c01d-11e7-8758-080027c12564', '06010819-648d-4aaf-a5bd-3fe6f009fa6f', 0, 0, 0, NULL),
('f667bf70-63ec-43ba-b40c-757ccd710547', 'f819dff0-c01d-11e7-8758-080027c12564', 'c80408ba-97da-43f1-ab05-c318c79b3bf1', 0, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `payouts`
--

CREATE TABLE `payouts` (
  `uuid` char(36) NOT NULL,
  `recipient` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `team_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `payout_token` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `payouts`
--

INSERT INTO `payouts` (`uuid`, `recipient`, `timestamp`, `team_id`, `user_id`, `description`, `payout_token`, `type`, `amount`) VALUES
('221e7ed6-d9bd-4c75-a7a8-ded8825cff1f', 'Alexander Rust', '2018-01-26 18:21:06', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', NULL, 'acct_1Bi2jpL6azr2z1xp', 'online', 0),
('67f93f0b-ac44-4be6-94e9-1f2553a22bf9', 'Alexander Rust', '2018-01-23 23:40:07', '10a021b3-c466-4ef8-abaa-066c57e16fae', '5b7fa85e-bca9-11e7-bff5-080027c12564', NULL, 'acct_1Bi2jpL6azr2z1xp', 'card', 100);

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
('2cdf4c3d-f86e-11e7-865c-fcaa14968dfd', 'zu spät zum Training', '5b7fa85e-bca9-11e7-bff5-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 0, 0, NULL),
('7df655af-f86f-11e7-865c-fcaa14968dfd', 'unnötige gelbe/gelb-rote Karte', '5b7fa85e-bca9-11e7-bff5-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 0, 1, '2018-01-13 15:52:14'),
('838e0965-037e-11e8-a068-fcaa14968dfd', 'unnötige rote Karte', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 0, 1, '2018-01-27 17:28:35'),
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
-- Tabellenstruktur für Tabelle `push_tokens`
--

CREATE TABLE `push_tokens` (
  `token` varchar(255) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `team_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `push_tokens`
--

INSERT INTO `push_tokens` (`token`, `user_id`, `team_id`) VALUES
('cfgfTwiJeok:APA91bGbcP_2G0JejOkiAofZaaVrd2o67LpZqW_PQeHLWn9xasWYR7XxkylYXyO9oxR_E8XsUdurope0EbaoeEUxZ8ZtDTGi1noAp4LoN8oIN4SDnZzrkWqI7qT0vez7UT51U7O9QafN', '5b7fa85e-bca9-11e7-bff5-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('ee6whaIA8po:APA91bEe9E191v0Gh6OzPrWD5NTE74kXhQ7W6341Pinq9TCFXLg9WmVo1dItilIpvL_PufXPPXZVv4t98vl8tTIqifmnInoRHt6YHwZrnLweEFTy1la6eBfBOtmkw9uB8dEqdnWpNl3p', '5b7fa85e-bca9-11e7-bff5-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('fcNFFdAo6ic:APA91bFoe3RBFG3a-QgE0aVczWitvHpcPOeHn0ev77Pxk_RyVL1XcGAEoNBzp45TWnWGHHqrg_VwBBjSBk0TlU09TvsR_uFj0pMup4jaqyrhzxn92ZdB-7riwTPi-9yYulz9JPw7Pz9R', 'fe13d609-bcb7-11e7-8dd7-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('fhxh2crUKuc:APA91bEVhWxfv-HLRkM4_7XAleaSP-cYu9AFvPe5tk8kD4XMpkiUH_hAzSFkCynJSSh_ocF0nsx7bxJ1Fup_4rHWP2Kl1nAkjS3fPmnxF_O5EsO0yalk_oYsomFwZ9ntZe9PXFBzQg8g', '5b7fa85e-bca9-11e7-bff5-080027c12564', '10a021b3-c466-4ef8-abaa-066c57e16fae');

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
('10a021b3-c466-4ef8-abaa-066c57e16fae', 'Vfb Bottrop', '5b7fa85e-bca9-11e7-bff5-080027c12564', 348.5, 'XBnsK', 'https://firebasestorage.googleapis.com/v0/b/test-2d3d6.appspot.com/o/a_1516994668837?alt=media&token=52d404f2-4ec0-4d4d-b2ca-d07855a15a1d', 'acct_1Bi2jpL6azr2z1xp'),
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
  `user_id` char(36) DEFAULT NULL,
  `transaction_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `transactions`
--

INSERT INTO `transactions` (`uuid`, `recipient`, `description`, `timestamp`, `type`, `team_id`, `amount`, `user_id`, `transaction_token`) VALUES
('0386f792-5dd8-4f2b-9582-c3db438aca60', 'Björn Soika', 'gdfgfdgdf', '2018-01-18 23:13:41', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 10, 'fe13d609-bcb7-11e7-8dd7-080027c12564', NULL),
('0d3d29fb-38b1-4d20-b892-4b64dfdeffa3', 'Alexander Rust', 'fdfs', '2018-01-23 18:27:14', 'balance', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, '5b7fa85e-bca9-11e7-bff5-080027c12564', 'tr_1BnWULJ1lJBgMAwIea2IwE4z'),
('3d3f860f-5d45-4ca9-b580-8a022859f358', 'Björn Soika', 'dfsfsdfdsfssdf', '2018-01-19 14:10:00', 'balance', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 'fe13d609-bcb7-11e7-8dd7-080027c12564', NULL),
('44613bcf-dfb9-4064-b22a-0a2496229fb1', 'Alexander Rust', 'gegege', '2018-01-23 18:24:36', 'balance', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, '5b7fa85e-bca9-11e7-bff5-080027c12564', NULL),
('5ba4f2e6-eb0b-4319-8f44-51e4cde455ac', 'Alexander Rust', 'gddddada', '2018-01-23 18:24:28', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, '5b7fa85e-bca9-11e7-bff5-080027c12564', NULL),
('6016a6c8-8d72-4690-8eb7-6923630e0544', 'Björn Soika', 'dssdfsdfsdf', '2018-01-19 14:15:08', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 'fe13d609-bcb7-11e7-8dd7-080027c12564', NULL),
('6582a3bd-d29c-48db-aa41-9d98d9a69730', 'Frank Rust', 'fdsfsdfd', '2018-01-18 23:15:25', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 10, 'f819dff0-c01d-11e7-8758-080027c12564', NULL),
('758a8e57-0d90-49db-82a3-0a876e4c6bcb', 'Alexander Rust', 'Hehe', '2018-01-27 14:39:15', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, '5b7fa85e-bca9-11e7-bff5-080027c12564', NULL),
('b0deee62-d0d3-4a00-93b4-632a6a8e900b', 'Alexander Rust', 'hehejo', '2018-01-23 18:01:42', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, '5b7fa85e-bca9-11e7-bff5-080027c12564', NULL),
('bb2e2154-1462-475b-b980-e6a1d2203be9', 'Björn Soika', 'gjhgggh', '2018-01-18 22:50:03', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 10, 'fe13d609-bcb7-11e7-8dd7-080027c12564', NULL),
('c50dff64-fe6c-4343-aa36-669921135b2f', 'Alexander Rust', 'fdsfdsfdsfd', '2018-01-18 22:40:43', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1.5, '5b7fa85e-bca9-11e7-bff5-080027c12564', NULL),
('cf1926e2-0bce-477d-a20d-a223901e6576', 'Alexander Rust', 'Strafe', '2018-01-26 18:29:14', 'balance', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, '5b7fa85e-bca9-11e7-bff5-080027c12564', 'tr_1BobwuJ1lJBgMAwI84pywYCD'),
('d43c5265-fcad-41ab-afd3-c72d7c32c97e', 'Alexander Rust', 'ggggggg', '2018-01-23 18:25:39', 'balance', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, '5b7fa85e-bca9-11e7-bff5-080027c12564', NULL),
('e18e40d6-fa8d-4b36-be19-7eb772a91e9b', 'Frank Rust', 'dfssfsd', '2018-01-18 23:14:48', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 10, 'f819dff0-c01d-11e7-8758-080027c12564', NULL),
('f67f37de-53c7-4b08-9eb1-622c277ba436', 'Alexander Rust', 'Hallo', '2018-01-26 18:15:35', 'balance', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, '5b7fa85e-bca9-11e7-bff5-080027c12564', 'tr_1BobjgJ1lJBgMAwIvpaluFE3'),
('fb05e1ba-9d54-4693-b0af-5468192ffd63', 'Alexander Rust', 'fdfsf', '2018-01-18 22:56:45', 'cash', '10a021b3-c466-4ef8-abaa-066c57e16fae', 3, '5b7fa85e-bca9-11e7-bff5-080027c12564', NULL),
('ffe2c851-cdcb-43cd-a153-e1243d48b3a6', 'Alexander Rust', 'hehejo', '2018-01-23 18:01:50', 'balance', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, '5b7fa85e-bca9-11e7-bff5-080027c12564', NULL);

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
  `profile_img` varchar(255) DEFAULT NULL,
  `laundry` tinyint(1) DEFAULT '0',
  `validated` tinyint(1) DEFAULT '0',
  `validation_code` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`uuid`, `email`, `password`, `prename`, `surname`, `birthday`, `team_id`, `admin`, `back_number`, `position`, `token`, `balance`, `accountToken`, `file_id`, `profile_img`, `laundry`, `validated`, `validation_code`) VALUES
('40524588-fafc-11e7-a882-fcaa14968dfd', 'h', '$2a$10$6Tuh.qe1KUP3jIj8oegQOuN4YAMiRQzcNftkrOBQB0Y/FwOJRqZda', 'Bla', 'Bla', '26.12.1989', '06c07203-0e5f-45c6-8833-caa41a5510e3', 1, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTY2NDc2MjB9.HuS5Y2xjLjltGHOF5r-ygyqm25VH5tz-DcYHnSxfFxY', 0, 'acct_1Bl15rIviKSOP5Jf', NULL, NULL, 0, 0, NULL),
('5b7fa85e-bca9-11e7-bff5-080027c12564', 'me@alexanderrust.de', '$2a$10$NYjJHr1aOB6wz84m9B5h.uYNpzRZbjqX1v3Ep60gSCy7oQULxboE.', 'Alexander', 'Rust', '26.12.1989', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 7, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTc2MTI0MzZ9.VnzIwHfJB5bIOXlSiP3UPGdVl8uwXAhO-9jiHr6ISfw', 3, 'acct_1BbE8vFDl2q5tObj', 'file_1BrO2EJ1lJBgMAwInPH0ylEL', 'https://firebasestorage.googleapis.com/v0/b/test-2d3d6.appspot.com/o/me%40alexanderrust.de_1517104554648?alt=media&token=e7c3d421-d86a-44d8-958f-14418ab8a359', 0, 1, 8570),
('bc296374-0438-11e8-a068-fcaa14968dfd', 'dd', '$2a$10$F2wYmF.HdSdXYKd9o2dbD.of2fMwyb7qfpmxBxfLrFuYQipUCyCX2', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'acct_1BpHHUH5VeuiSySR', NULL, NULL, 0, 0, NULL),
('d668c74c-0438-11e8-a068-fcaa14968dfd', 'A', '$2a$10$F4lOSuMqlfAuScP1MSme1.rxEzzV/Ba34l3VAOBggu2J0S21oAc4m', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'acct_1BpHICHYHGu0tPTR', NULL, NULL, 0, 0, NULL),
('dad40d60-09da-11e8-8c58-fcaa14968dfd', 'herelivesalex@googlemail.com', '$2a$10$d/CKmR1RVcnnl58mj2guYeKSDWU6a6atLjE3LExclYQZxjBCgpsXC', 'Alexander', 'Rust', NULL, NULL, 1, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTc3NzA1NjF9.w-J36Z58MSK7E7Qn_BpTyO7QQSESbMeeorKqyWTi2jw', 0, 'acct_1BrsPbEB46MaWHPA', NULL, NULL, 0, 1, 6773),
('f819dff0-c01d-11e7-8758-080027c12564', 'frank', '$2a$10$W0haIbWOnT8fa9d14jOeGekb1aHXvsoq5o05f3jgA4Ag7CVma/2rO', 'Frank', 'Rust', NULL, '10a021b3-c466-4ef8-abaa-066c57e16fae', 0, 9, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDk2NjIwNjZ9.aZYhZh_8BWpVC7Ig-jTVKIDpj-iEZ-us__YC39UjJbY', 0, 'acct_1BeWOPLkw0gmFrzE', NULL, NULL, 1, 0, NULL),
('fde723cf-f3b8-11e7-af46-fcaa14968dfd', 'k', '$2a$10$DA4IiGzKj6S35U31OlnPuehK5Fk.EkRyJxcRULceABjb1W78giL1a', 'A', 'R', '26.12.1989', '5332e53a-7d81-4ea7-9bd6-add9e09cd9bb', 1, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTU0MjU2NDd9.05VTuNvdNDcEY4OhU0ahuk8RrvUZoXW2TMheNeikDv4', 0, 'acct_1BhfM5Clz1BK1JaT', NULL, 'https://firebasestorage.googleapis.com/v0/b/test-2d3d6.appspot.com/o/k_1515336197259?alt=media&token=929b8257-4f47-4be5-bc1d-587d9229800a', 0, 0, NULL),
('fe13d609-bcb7-11e7-8dd7-080027c12564', 'b', '$2a$10$wgcCGaRzq5JFZU5V5duHjuysnRsCavjx8P1LT3QLSzU23AiwBMZay', 'Björn', 'Soika', NULL, '10a021b3-c466-4ef8-abaa-066c57e16fae', 0, 5, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTc1OTExNzF9.QsGWe6GE1KIzfAG_D6Wdh2F4-riV4LtVUa8OT8YHbn0', 1, 'acct_1Bi2FeGsSj7kv9O1', NULL, NULL, 0, 1, 3717);

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
-- Indizes für die Tabelle `deposits`
--
ALTER TABLE `deposits`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `user_id` (`user_id`);

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
-- Indizes für die Tabelle `payouts`
--
ALTER TABLE `payouts`
  ADD PRIMARY KEY (`uuid`);

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
-- Indizes für die Tabelle `push_tokens`
--
ALTER TABLE `push_tokens`
  ADD UNIQUE KEY `token` (`token`),
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
