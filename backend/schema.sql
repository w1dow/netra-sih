-- NETRA Public Procurement Database Schema for MySQL

CREATE DATABASE IF NOT EXISTS netra_db;
USE netra_db;

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  shortName VARCHAR(50) NOT NULL
);

-- 2. Companies Table
CREATE TABLE IF NOT EXISTS companies (
  id VARCHAR(50) PRIMARY KEY,
  legalName VARCHAR(255) NOT NULL,
  registrationNumber VARCHAR(100) NOT NULL,
  gstin VARCHAR(50) NOT NULL,
  pan VARCHAR(20) NOT NULL,
  udyamNumber VARCHAR(50),
  category VARCHAR(100),
  address TEXT,
  riskStatus VARCHAR(20) DEFAULT 'LOW'
);

-- 3. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  designation VARCHAR(150),
  role VARCHAR(50) NOT NULL DEFAULT 'BIDDER',
  companyId VARCHAR(50),
  avatar VARCHAR(255),
  location VARCHAR(100),
  FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE SET NULL
);

-- 4. Tenders Table
CREATE TABLE IF NOT EXISTS tenders (
  id VARCHAR(50) PRIMARY KEY,
  tenderId VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  departmentId VARCHAR(50),
  departmentName VARCHAR(150),
  categoryId VARCHAR(50),
  categoryName VARCHAR(150),
  location VARCHAR(100),
  estimatedValue DECIMAL(15,2),
  currency VARCHAR(10) DEFAULT 'INR',
  deadline DATETIME,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Bids Table
CREATE TABLE IF NOT EXISTS bids (
  id VARCHAR(50) PRIMARY KEY,
  tenderId VARCHAR(50) NOT NULL,
  bidderCompanyId VARCHAR(50) NOT NULL,
  bidValue DECIMAL(15,2),
  status VARCHAR(50) DEFAULT 'DRAFT',
  complianceScore DECIMAL(5,2) DEFAULT 0.00,
  submittedAt DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  isEditable BOOLEAN DEFAULT TRUE,
  technicalNotes TEXT,
  FOREIGN KEY (tenderId) REFERENCES tenders(id) ON DELETE CASCADE,
  FOREIGN KEY (bidderCompanyId) REFERENCES companies(id) ON DELETE CASCADE
);

-- 6. Compliance Assessments Table
CREATE TABLE IF NOT EXISTS compliance_assessments (
  id VARCHAR(50) PRIMARY KEY,
  bidId VARCHAR(50) NOT NULL,
  tenderId VARCHAR(50) NOT NULL,
  overallScore DECIMAL(5,2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'PENDING',
  FOREIGN KEY (bidId) REFERENCES bids(id) ON DELETE CASCADE,
  FOREIGN KEY (tenderId) REFERENCES tenders(id) ON DELETE CASCADE
);

-- 7. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(50) PRIMARY KEY,
  userId VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  tenderId VARCHAR(50),
  bidId VARCHAR(50),
  isRead BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
