# QuickDesk

A lightweight helpdesk web application where customers raise support tickets and support agents track, assign, and resolve them in one place.

> **Status:** Starter repository. This repo contains the architecture document and a basic project scaffold. Features are not fully implemented yet.

## Problem

Small teams often handle support through scattered emails and chats, so requests get lost, ownership is unclear, and there is no visibility into ticket status. QuickDesk gives them a single, simple place to manage support requests.

## Users and Roles

- **Customer:** creates tickets, views their status, and replies to agents
- **Agent:** views the ticket queue, assigns tickets, updates status, and replies
- **Admin (optional):** manages agents

## Core Features

- Register and log in
- Create a support ticket (title, description, priority)
- View my tickets and their status
- Agent queue with filters (status, priority)
- Assign tickets and update status (Open, In Progress, Resolved, Closed)
- Comment thread on each ticket

**Out of scope (for now):** email integration, file attachments, SLA timers, live chat, analytics.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router |
| Backend | Node.js, Express |
| Database | PostgreSQL with Prisma ORM |
| Auth | JWT-based authentication |

## Documentation

The full design lives in [`docs/architecture.md`](docs/architecture.md), covering:

- Product idea and scope
- System diagram
- Data models
- API routes
- Frontend screens

## Project Structure

```
quickdesk/
├── README.md
├── .gitignore
├── docs/
│   ├── architecture.md
│   └── diagrams/
├── server/        # Express API (starter)
└── client/        # React app (placeholder screens)
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- PostgreSQL (if running the backend with a database)

### Backend

```bash
cd server
npm install
cp .env.example .env     # then fill in your values
npm run dev
```

The API runs at `http://localhost:5000`. Check it with `GET /api/health`.

### Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment Variables

**server/.env**

```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/quickdesk
JWT_SECRET=your_secret_here
```

**client/.env**

```
VITE_API_URL=http://localhost:5000/api
```

## Planned Screens

- Login and Register
- My Tickets
- New Ticket
- Ticket Detail (with comments)
- Agent Queue

## Roadmap

- [x] Product idea and architecture document
- [x] Project scaffold
- [ ] Authentication
- [ ] Ticket CRUD
- [ ] Comments
- [ ] Agent queue and assignment
- [ ] Styling and polish

## Author

Pooja Ravi