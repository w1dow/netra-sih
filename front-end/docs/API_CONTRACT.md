# NETRA API Contract Specification

**Version:** 1.0.0  
**Base URL:** `http://localhost:5000/api` (Configurable via `VITE_API_BASE_URL`)  
**Format:** JSON (`Content-Type: application/json`)

---

## Overview

This document specifies the RESTful API contract between the NETRA React frontend and the Express.js / MySQL backend server.

All API responses follow a normalized JSON wrapper structure:

### Standard Success Response
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "TENDER_NOT_FOUND",
    "message": "The requested tender ID '8f1a2c' does not exist.",
    "status": 404,
    "details": [
      { "field": "id", "message": "ID 8f1a2c not found in tenders table" }
    ]
  }
}
```

---

## 1. Authentication Endpoints

### `POST /api/auth/login`
Authenticates a user and establishes a session/token.

- **Request Body:**
  ```json
  {
    "email": "rajesh.kumar@abctech.in",
    "password": "password123"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "user-001",
        "name": "Rajesh Kumar",
        "email": "rajesh.kumar@abctech.in",
        "phone": "+91 98765 43210",
        "designation": "Business Development Manager",
        "role": "BIDDER",
        "companyId": "company-001"
      }
    }
  }
  ```

### `GET /api/auth/me`
Retrieves the currently authenticated user's profile and company reference.

- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "id": "user-001",
      "name": "Rajesh Kumar",
      "email": "rajesh.kumar@abctech.in",
      "phone": "+91 98765 43210",
      "designation": "Business Development Manager",
      "role": "BIDDER",
      "companyId": "company-001"
    }
  }
  ```

---

## 2. Tender Endpoints

### `GET /api/tenders`
Retrieves a paginated list of public active tenders with optional filter parameters.

- **Query Parameters:**
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `department` (string)
  - `category` (string)
  - `location` (string)
  - `status` (ACTIVE | UPCOMING | UNDER_EVALUATION | CLOSED)
  - `search` (string — matches title, tenderId, department)
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "8f1a2c",
        "tenderId": "GEM/2026/PROC/01842",
        "title": "Supply and Installation of Smart Surveillance Systems",
        "description": "Procurement of AI-enabled smart surveillance camera systems...",
        "departmentId": "dept-1",
        "departmentName": "Ministry of Electronics & IT",
        "categoryId": "cat-2",
        "categoryName": "IT & Electronics",
        "location": "New Delhi",
        "estimatedValue": 24000000,
        "currency": "INR",
        "deadline": "2026-09-12T17:00:00+05:30",
        "status": "ACTIVE",
        "createdAt": "2026-08-01T10:00:00+05:30",
        "updatedAt": "2026-08-20T14:30:00+05:30"
      }
    ],
    "meta": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
  }
  ```

### `GET /api/tenders/:id`
Retrieves details for a single tender by internal ID.

- **Response `200 OK`:** Full `Tender` object.
- **Response `404 Not Found`:** If tender does not exist.

---

## 3. Bid Endpoints

### `GET /api/bids/my-bids`
Retrieves all bids submitted or drafted by the authenticated user's company.

- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:** Array of `Bid` objects.

### `GET /api/bids/:id`
Retrieves bid details by bid ID.

- **Response `200 OK`:** Single `Bid` object.

---

## 4. Compliance Endpoints

### `GET /api/compliance/bid/:bidId`
Retrieves the 5-stage AI compliance assessment report for a given bid.

- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "id": "ca-001",
      "bidId": "bid-001",
      "tenderId": "8f1a2c",
      "overallScore": 94,
      "status": "REVIEW_REQUIRED",
      "stages": [
        {
          "id": "stage-01",
          "assessmentId": "ca-001",
          "title": "Company Eligibility",
          "order": 1,
          "status": "VERIFIED",
          "requirements": [ ... ]
        }
      ]
    }
  }
  ```

---

## 5. Notification & Calendar Endpoints

### `GET /api/notifications`
- **Response `200 OK`:** Array of `Notification` objects.

### `GET /api/calendar`
- **Response `200 OK`:** Array of `CalendarEvent` objects.

### `GET /api/news`
- **Response `200 OK`:** Array of `NewsItem` objects.

---

## HTTP Status Code Guidelines

| Code | Usage |
|------|-------|
| `200` | Successful request |
| `201` | Resource successfully created |
| `400` | Bad request or invalid payload |
| `401` | Missing or expired authentication token |
| `403` | User does not have permission for action |
| `404` | Resource ID not found |
| `422` | Unprocessable entity (validation errors) |
| `500` | Internal server error |
