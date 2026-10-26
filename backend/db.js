const path = require("path");
const fs = require("fs");
const { fetchRemoteData, saveRemoteData } = require("./blobStore");
require("dotenv").config();

let dbAdapter = null;

const DEFAULT_USERS = [
  {
    id: "usr_demo",
    name: "DigiSaathi Student",
    email: "demo@digisaathi.com",
    password: "password123",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr_bryson",
    name: "Bryson Almeida",
    email: "bryson@gmail.com",
    password: "password123",
    createdAt: new Date().toISOString()
  }
];

function initTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      lesson_id INTEGER NOT NULL,
      completed INTEGER DEFAULT 1,
      score INTEGER DEFAULT 0,
      mistakes_scam INTEGER DEFAULT 0,
      mistakes_upi INTEGER DEFAULT 0,
      certificate_id TEXT,
      completed_at TEXT,
      UNIQUE(user_id, lesson_id)
    );
  `);

  // Seed default demo users if not present
  try {
    for (const u of DEFAULT_USERS) {
      const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(u.email);
      if (!exists) {
        db.prepare("INSERT INTO users (id, name, email, password, createdAt) VALUES (?, ?, ?, ?, ?)").run(
          u.id,
          u.name,
          u.email,
          u.password,
          u.createdAt
        );
      }
    }
  } catch (e) {}
}

function getDatabase() {
  if (dbAdapter) return dbAdapter;

  const dataDir = process.env.VERCEL ? "/tmp" : path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch (e) {}
  }

  // 1. Try Node.js built-in SQLite (Node 22+, completely free & local)
  try {
    const { DatabaseSync } = require("node:sqlite");
    const dbPath = process.env.SQLITE_DB_PATH || path.join(dataDir, "digisaathi.sqlite");
    const db = new DatabaseSync(dbPath);
    initTables(db);
    console.log(`✅ Using Free SQLite Database at: ${dbPath}`);
    dbAdapter = {
      type: "sqlite",
      db,
      dataDir
    };
    return dbAdapter;
  } catch (err) {
    console.warn("⚠️ node:sqlite not available, using persistent JSON database fallback:", err.message);
  }

  // 2. Persistent JSON Database fallback for any Node version
  const jsonPath = path.join(dataDir, "database.json");
  if (!fs.existsSync(jsonPath)) {
    try {
      fs.writeFileSync(jsonPath, JSON.stringify({
        users: DEFAULT_USERS,
        progress: []
      }, null, 2), "utf8");
    } catch (e) {}
  }

  dbAdapter = {
    type: "json",
    path: jsonPath,
    read() {
      try {
        return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
      } catch (e) {
        return { users: [...DEFAULT_USERS], progress: [] };
      }
    },
    write(data) {
      try {
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");
      } catch (e) {}
    }
  };

  console.log(`✅ Using Persistent File Database at: ${jsonPath}`);
  return dbAdapter;
}

const connectDB = async () => {
  if (process.env.MONGO_URI) {
    try {
      const mongoose = require("mongoose");
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ Connected to custom MongoDB URI");
      return;
    } catch (err) {
      console.warn("⚠️ MongoDB connection failed, falling back to Free SQLite Database:", err.message);
    }
  }

  getDatabase();
};

module.exports = connectDB;
module.exports.getDatabase = getDatabase;
module.exports.DEFAULT_USERS = DEFAULT_USERS;
