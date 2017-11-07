-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 08, 2017 at 12:09 AM
-- Server version: 5.7.20-0ubuntu0.17.04.1
-- PHP Version: 7.0.22-0ubuntu0.17.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wallet_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `sum` double NOT NULL DEFAULT '0',
  `team_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`uuid`, `name`, `startDate`, `endDate`, `location`, `sum`, `team_id`) VALUES
('01187259-6d36-4cde-a90d-8c3b03d4af6a', 'fddf', NULL, NULL, 'fdsdf', 34, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('095b5734-cfd9-4764-8292-890017a33855', '1 nices Event', NULL, NULL, 'Gelsenkirchen', 23, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('11c8d332-fd0d-4e46-ba0e-b6a1c32086ca', 'hehejobaf', NULL, NULL, 'bla', 23, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('5776b2e5-7227-493b-a3a6-c847e4f5aeba', 'fdsfsd', NULL, NULL, 'dsffs', 23, '10a021b3-c466-4ef8-abaa-066c57e16fae'),
('bf10cce1-e44c-4e5c-8ae6-11ecc46915e0', 'hehejo', NULL, NULL, 'Flingern', 25, '10a021b3-c466-4ef8-abaa-066c57e16fae');

-- --------------------------------------------------------

--
-- Table structure for table `invites`
--

CREATE TABLE `invites` (
  `team_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `penalties`
--

CREATE TABLE `penalties` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_id` char(36) DEFAULT NULL,
  `team_id` char(36) DEFAULT NULL,
  `sum` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `penalties`
--
DELIMITER $$
CREATE TRIGGER `before_insert_penalty` BEFORE INSERT ON `penalties` FOR EACH ROW SET new.uuid = uuid()
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `owner_id` char(36) DEFAULT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `invite_token` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`uuid`, `name`, `owner_id`, `balance`, `invite_token`) VALUES
('10a021b3-c466-4ef8-abaa-066c57e16fae', 'Cide Reaper', '5b7fa85e-bca9-11e7-bff5-080027c12564', 1454.42, 'slxet');

-- --------------------------------------------------------

--
-- Table structure for table `user`
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
-- Dumping data for table `user`
--

INSERT INTO `user` (`uuid`, `email`, `password`, `prename`, `surname`, `team_id`, `admin`, `back_number`, `position`, `token`, `balance`) VALUES
('2aed3803-bca8-11e7-bff5-080027c12564', 'c', '$2a$10$8NLcFyUFMnZNQQW5uqCshu215FBJVpXZx5xhL2MsiymCEJwd2PSOe', NULL, NULL, NULL, 0, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDkzOTk0MzF9.jOFRsVpmXJHv6F6Z-9aSrTLWxzXs4X57lic5BR6QM04', 0),
('5b7fa85e-bca9-11e7-bff5-080027c12564', 'a', '$2a$10$NYjJHr1aOB6wz84m9B5h.uYNpzRZbjqX1v3Ep60gSCy7oQULxboE.', 'Alexander', 'Rustee', '10a021b3-c466-4ef8-abaa-066c57e16fae', 1, 7, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTAwOTQyMjZ9.hNemZRUuKbGhw2mLwSuCOyG6xl8J_hj_AIA9_YzXj60', 0),
('f819dff0-c01d-11e7-8758-080027c12564', 'frank', '$2a$10$W0haIbWOnT8fa9d14jOeGekb1aHXvsoq5o05f3jgA4Ag7CVma/2rO', 'Frank', 'Rust', NULL, 0, 9, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDk2NjIwNjZ9.aZYhZh_8BWpVC7Ig-jTVKIDpj-iEZ-us__YC39UjJbY', 0),
('fe13d609-bcb7-11e7-8dd7-080027c12564', 'b', '$2a$10$wgcCGaRzq5JFZU5V5duHjuysnRsCavjx8P1LT3QLSzU23AiwBMZay', 'Björn', 'Soika', NULL, 0, 5, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTAwOTUxMjV9.B4f4I6cW-th0oFf85uFaWSPUX7uC4HL6wAJRsbOm2GE', 0);

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `before_insert` BEFORE INSERT ON `user` FOR EACH ROW SET new.uuid = uuid()
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `penalties`
--
ALTER TABLE `penalties`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`uuid`);

--
-- Constraints for table `penalties`
--
ALTER TABLE `penalties`
  ADD CONSTRAINT `penalties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`),
  ADD CONSTRAINT `penalties_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `team` (`uuid`);

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`uuid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
