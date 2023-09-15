-- ------------------------------------------------------------
-- Database Setup Script for MySQL Database:
-- Create database, user and grant priviledges.
-- ------------------------------------------------------------

DROP DATABASE IF EXISTS smm_db;
CREATE DATABASE IF NOT EXISTS smm_db;
CREATE USER IF NOT EXISTS 'smm_root'@'localhost' IDENTIFIED BY 'smm_root_pwd';
GRANT ALL PRIVILEGES ON `smm_db`.* TO 'smm_root'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'smm_root'@'localhost';
FLUSH PRIVILEGES;