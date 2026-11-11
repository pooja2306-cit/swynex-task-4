# QuickDesk: Architecture Document

## 1. Overview

### 1.1 Product idea
QuickDesk is a lightweight helpdesk web application where customers raise support tickets and support agents track, assign, and resolve them in one place.

### 1.2 Problem
Small teams often handle support through scattered emails and chats. Requests get lost, ownership is unclear, and nobody has visibility into ticket status.

### 1.3 Users and roles
| Role | Description |
|---|---|
| Customer | Creates tickets, views their own tickets, and replies in comment threads |
| Agent | Views the ticket queue, assigns tickets, updates status, and replies |
| Admin | Optional. Manages agents and can access all tickets |

### 1.4 Core features
1. Register and log in
2. Create a ticket (title, description, priority)
3. View my tickets and their status
4. Agent queue with filters (status, priority)
5. Assign a ticket and update its status
6. Comment thread on each ticket

### 1.5 Out of scope
Email integration, file attachments, SLA timers, live chat, notifications, and analytics.

### 1.6 Primary user flow
Customer submits a ticket → it appears in the agent queue → an agent assigns it and replies → the customer sees the reply → the agent marks the ticket resolved.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React (Vite) + React Router | Fast setup, component-based, simple routing |
| Backend | Node.js + Express | Lightweight REST API, same language as the frontend |
| Database | PostgreSQL | Relational data with clear relationships |
| ORM | Prisma | Type-safe queries and easy schema management |
| Auth | JWT + bcrypt | Stateless authentication and secure password hashing |

---

## 3. System Architecture

![System diagram](diagrams/system-diagram.svg)