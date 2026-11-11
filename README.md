# QuickDesk

A lightweight helpdesk web application where customers raise support tickets and support agents track, update, and resolve them in one place.

**Live demo:** https://swynex-task-4-1.onrender.com
**GitHub repository:** https://github.com/pooja2306-cit/YOUR-REPO-NAME

> The live demo runs on a free hosting plan. The first visit after a period of inactivity can take up to a minute to load, and because the database is a SQLite file on a temporary disk, data may reset when the service restarts.

## Problem

Small teams often handle support through scattered emails and chats, so requests get lost, ownership is unclear, and there is no visibility into ticket status. QuickDesk gives them a single, simple place to manage support requests.

## Features

- Create, view, update, and delete support tickets
- Ticket status (Open, In Progress, Resolved, Closed) and priority (Low, Medium, High)
- Agent queue with status and priority filters
- Server-side validation with clear error messages shown in the UI
- Loading spinners, error messages with a retry option, empty states, and success messages
- Persistent storage using SQLite
- Single-service deployment: Express serves both the API and the built React app

## Screenshots

### My Tickets
![My Tickets](docs/screenshots/tickets-list.png)

### Create a ticket
![New Ticket](docs/screenshots/new-ticket.png)

### Validation errors from the API
![Validation error](docs/screenshots/validation-error.png)

### Ticket detail with status controls
![Ticket detail](docs/screenshots/ticket-detail.png)

### Agent queue with filters
![Agent queue](docs/screenshots/agent-queue.png)

### Loading state
![Loading state](docs/screenshots/loading-state.png)

### Error state
![Error state](docs/screenshots/error-state.png)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Fetch API |
| Backend | Node.js, Express |
| Database | SQLite (better-sqlite3) |
| Deployment | Render (single web service) |

## Project Structure

```
quickdesk/
├── README.md
├── .gitignore
├── docs/
│   ├── architecture.md
│   ├── diagrams/
│   └── screenshots/
├── client/                          # React frontend
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/tickets.js           # API calls (fetch wrapper)
│       ├── components/              # Loading, ErrorMessage
│       └── pages/                   # Login, Register, MyTickets, NewTicket, TicketDetail, AgentQueue
└── server/                          # Express REST API
    ├── package.json
    ├── .env.example
    └── src/
        ├── index.js                 # Entry point, serves API and built frontend
        ├── db.js                    # SQLite connection and table setup
        ├── routes/ticket.routes.js
        └── validators/ticket.validator.js
```

## Setup

### Prerequisites

- Node.js 18 or later

### Option 1: Development mode (two terminals)

**Terminal 1: API**
```bash
cd server
npm install
cp .env.example .env      # Windows CMD: copy .env.example .env
npm run dev
```
The API runs at `http://localhost:5000`.

**Terminal 2: Frontend**
```bash
cd client
npm install
cp .env.example .env      # Windows CMD: copy .env.example .env
npm run dev
```
The app runs at `http://localhost:5173`. Restart the frontend after creating or changing `.env`.

### Option 2: Production mode (one terminal)

```bash
cd client
npm install
npm run build

cd ../server
npm install
npm start
```
Open `http://localhost:5000`. Express serves the API and the built React app from the same address.

### Environment variables

**server/.env**
```
PORT=5000
```

**client/.env**
```
VITE_API_URL=http://localhost:5000/api
```
If `VITE_API_URL` is not set, the frontend uses the relative path `/api`, which is what the production build uses.

## API Reference

Base URL: `/api`

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/tickets` | List tickets (optional filters: `?status=OPEN&priority=HIGH`) |
| GET | `/tickets/:id` | Get a single ticket |
| POST | `/tickets` | Create a ticket |
| PATCH | `/tickets/:id` | Update a ticket (any of title, description, status, priority) |
| DELETE | `/tickets/:id` | Delete a ticket |

### Ticket fields

| Field | Type | Rules |
|---|---|---|
| id | Integer | Auto-generated |
| title | String | Required, 3 to 100 characters |
| description | String | Required, 10 to 1000 characters |
| status | String | `OPEN` (default), `IN_PROGRESS`, `RESOLVED`, `CLOSED` |
| priority | String | `LOW`, `MEDIUM` (default), `HIGH` |
| createdAt | Timestamp | Auto-generated |
| updatedAt | Timestamp | Auto-updated |

### Example: create a ticket

Request: `POST /api/tickets`
```json
{
  "title": "Cannot reset password",
  "description": "The reset link shows an error.",
  "priority": "HIGH"
}
```

Response: `201 Created`
```json
{
  "id": 1,
  "title": "Cannot reset password",
  "description": "The reset link shows an error.",
  "status": "OPEN",
  "priority": "HIGH",
  "createdAt": "2026-11-11 10:30:00",
  "updatedAt": "2026-11-11 10:30:00"
}
```

### Errors

Invalid requests return a `400` status with the list of problems:
```json
{
  "error": {
    "message": "Validation failed",
    "details": [
      "title is required and must be 3-100 characters",
      "priority must be one of: LOW, MEDIUM, HIGH"
    ]
  }
}
```

| Status | Meaning |
|---|---|
| 200 | Success |
| 201 | Ticket created |
| 204 | Ticket deleted |
| 400 | Validation error, invalid id, or invalid JSON body |
| 404 | Ticket or route not found |
| 500 | Internal server error |

## Deployment

The app is deployed as a single web service on Render.

- **Build command:** `cd client && npm install && npm run build && cd ../server && npm install`
- **Start command:** `cd server && npm start`
- Express serves the built React app from `client/dist` and handles all `/api` routes.
- The database is a SQLite file created automatically on first run. When the database is empty, a few sample tickets are added so the demo is not blank.

## Documentation

The original design, including data models, API routes, and the system diagram, is in [`docs/architecture.md`](docs/architecture.md).

## Roadmap

- [x] Product idea and architecture document
- [x] Frontend screens
- [x] REST API for Tickets with validation
- [x] Persistent storage (SQLite)
- [x] Frontend integrated with the API, including loading and error states
- [x] Deployment
- [ ] Authentication (JWT) and user roles
- [ ] Comments on tickets
- [ ] Assign tickets to agents
- [ ] Migrate to PostgreSQL

## Author

Pooja Ravi
