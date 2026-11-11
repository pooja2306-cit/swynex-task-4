const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "..", "quickdesk.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'OPEN'
      CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
    priority TEXT NOT NULL DEFAULT 'MEDIUM'
      CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);
const count = db.prepare("SELECT COUNT(*) AS n FROM tickets").get().n;
if (count === 0) {
  const insert = db.prepare(
    "INSERT INTO tickets (title, description, status, priority) VALUES (?, ?, ?, ?)"
  );
  insert.run("Cannot reset password", "The reset link shows an error.", "OPEN", "HIGH");
  insert.run("Invoice not received", "I did not get my October invoice.", "IN_PROGRESS", "MEDIUM");
  insert.run("Update billing address", "Please change my billing address.", "RESOLVED", "LOW");
}
module.exports = db;