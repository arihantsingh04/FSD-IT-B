// server.js (ESM) - minimal Express API with in-memory storage
// Run: node server.js
// Data resets on restart (in-memory only)

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App setup
const app = express();
app.use(cors());
app.use(express.json());

// PORT
const PORT = process.env.PORT || 5000;

// -------- In-memory Store --------
let ideas = [];
const uid = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

// Prevent vote-spam: track votes per IP
const voteTracker = {};
const VOTE_SPAM_MS = 5000;

// Seed sample
ideas.push({
  _id: uid(),
  title: "Sample idea: Campus composting",
  description: "Bins and pickup to compost food waste.",
  category: "Sustainability",
  tags: ["env", "waste"],
  votes: 3,
  status: "Submitted",
  createdBy: "demo",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// Helper
const findIdeaIndex = (id) =>
  ideas.findIndex((i) => i._id === id || i.id === id);

// -------- ROUTES --------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Create idea
app.post("/api/ideas", (req, res) => {
  const { title, description, category = "General", tags = [], createdBy } =
    req.body;

  if (!title || !description)
    return res.status(400).json({ error: "title & description required" });

  const idea = {
    _id: uid(),
    title,
    description,
    category,
    tags: Array.isArray(tags) ? tags : [tags],
    votes: 0,
    status: "Submitted",
    createdBy: createdBy || "anonymous",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  ideas.unshift(idea);
  res.status(201).json(idea);
});

// Get ideas
app.get("/api/ideas", (req, res) => {
  const { sortBy = "-createdAt", q, category, status } = req.query;

  let out = ideas.slice();

  if (q) {
    const rx = new RegExp(q, "i");
    out = out.filter(
      (i) =>
        rx.test(i.title) ||
        rx.test(i.description) ||
        (i.tags || []).some((t) => rx.test(t))
    );
  }

  if (category) out = out.filter((i) => i.category === category);
  if (status) out = out.filter((i) => i.status === status);

  if (sortBy === "-votes") {
    out.sort((a, b) => b.votes - a.votes);
  } else {
    out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  res.json(out);
});

// Vote
app.post("/api/ideas/:id/vote", (req, res) => {
  const id = req.params.id;
  const delta = Number(req.body?.delta ?? 1);

  const idx = findIdeaIndex(id);
  if (idx === -1) return res.status(404).json({ error: "Idea not found" });

  const ip = req.headers["x-forwarded-for"] || req.ip || "unknown";
  const now = Date.now();

  voteTracker[id] = voteTracker[id] || {};
  const lastVote = voteTracker[id][ip] || 0;

  if (now - lastVote < VOTE_SPAM_MS) {
    return res.status(429).json({ error: "Slow down — voting too fast" });
  }

  voteTracker[id][ip] = now;

  ideas[idx].votes = Math.max(0, ideas[idx].votes + Math.sign(delta));
  ideas[idx].updatedAt = new Date().toISOString();

  res.json(ideas[idx]);
});

// Update status
app.patch("/api/ideas/:id/status", (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  const allowed = ["Submitted", "In Review", "Approved", "Rejected"];
  if (!allowed.includes(status))
    return res.status(400).json({ error: "Invalid status" });

  const idx = findIdeaIndex(id);
  if (idx === -1) return res.status(404).json({ error: "Idea not found" });

  ideas[idx].status = status;
  ideas[idx].updatedAt = new Date().toISOString();

  res.json(ideas[idx]);
});

// Delete idea
app.delete("/api/ideas/:id", (req, res) => {
  const id = req.params.id;
  const idx = findIdeaIndex(id);

  if (idx === -1) return res.status(404).json({ error: "Idea not found" });

  const removed = ideas.splice(idx, 1);
  delete voteTracker[id];

  res.json({ message: "Deleted", removed: removed[0] });
});

// -------- FRONTEND BUILD (Optional for production) --------
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "client");
  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// -------- START SERVER --------
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
