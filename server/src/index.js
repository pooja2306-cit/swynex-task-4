require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const ticketRoutes = require("./routes/ticket.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/tickets", ticketRoutes);

// Serve the built React app in production
const clientDist = path.join(__dirname, "..", "..", "client", "dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Error handler (also catches invalid JSON bodies)
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON body" } });
  }
  console.error(err);
  res.status(500).json({ error: { message: "Internal server error" } });
});

app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));