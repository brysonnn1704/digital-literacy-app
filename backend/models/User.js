const { getDatabase, DEFAULT_USERS } = require("../db");
const { fetchRemoteData, saveRemoteData } = require("../blobStore");

// Fallback / standard Mongoose model if MONGO_URI is active
let mongooseModel = null;
try {
  const mongoose = require("mongoose");
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, unique: true, trim: true, lowercase: true },
      password: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    });
    mongooseModel = mongoose.models.User || mongoose.model("User", userSchema);
  }
} catch (e) {}

function formatUser(row) {
  if (!row) return null;
  return {
    ...row,
    _id: row.id || row._id,
    id: row.id || row._id
  };
}

async function syncAllUsersAndProgress(adapter) {
  let allUsers = [];
  let allProgress = [];
  if (adapter.type === "sqlite") {
    allUsers = adapter.db.prepare("SELECT * FROM users").all();
    allProgress = adapter.db.prepare("SELECT * FROM user_progress").all();
  } else {
    const data = adapter.read();
    allUsers = data.users || [];
    allProgress = data.progress || [];
  }
  await saveRemoteData({ users: allUsers, progress: allProgress });
}

const User = {
  async findOne(query) {
    if (mongooseModel && mongooseModel.db && mongooseModel.db.readyState === 1) {
      return await mongooseModel.findOne(query);
    }

    const adapter = getDatabase();

    const searchLocal = () => {
      if (adapter.type === "sqlite") {
        const { db } = adapter;
        if (query.email && query.password) {
          const stmt = db.prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND password = ?");
          return stmt.get(query.email.trim(), query.password);
        }
        if (query.email) {
          const stmt = db.prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?)");
          return stmt.get(query.email.trim());
        }
        if (query.id || query._id) {
          const id = query.id || query._id;
          const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
          return stmt.get(String(id));
        }
        return null;
      }

      // JSON fallback
      const data = adapter.read();
      if (query.email && query.password) {
        return data.users.find(u => u.email.toLowerCase() === query.email.trim().toLowerCase() && u.password === query.password);
      } else if (query.email) {
        return data.users.find(u => u.email.toLowerCase() === query.email.trim().toLowerCase());
      } else if (query.id || query._id) {
        const id = query.id || query._id;
        return data.users.find(u => String(u.id) === String(id));
      }
      return null;
    };

    let user = searchLocal();

    // If not found locally, try fetching latest from remote Blob store
    if (!user && (process.env.VERCEL || process.env.BLOB_STORE_ID)) {
      const remote = await fetchRemoteData();
      if (remote && Array.isArray(remote.users)) {
        for (const ru of remote.users) {
          try {
            if (adapter.type === "sqlite") {
              const ex = adapter.db.prepare("SELECT id FROM users WHERE id = ?").get(ru.id);
              if (!ex) {
                adapter.db.prepare("INSERT INTO users (id, name, email, password, createdAt) VALUES (?, ?, ?, ?, ?)").run(
                  ru.id, ru.name, ru.email, ru.password, ru.createdAt
                );
              }
            } else {
              const data = adapter.read();
              if (!data.users.find(u => u.id === ru.id)) {
                data.users.push(ru);
                adapter.write(data);
              }
            }
          } catch (e) {}
        }
        user = searchLocal();
      }
    }

    return formatUser(user);
  },

  async findById(id) {
    return this.findOne({ id });
  },

  async create({ name, email, password }) {
    if (mongooseModel && mongooseModel.db && mongooseModel.db.readyState === 1) {
      return await mongooseModel.create({ name, email, password });
    }

    const adapter = getDatabase();
    const id = "usr_" + Date.now() + Math.random().toString(36).substring(2, 7);
    const createdAt = new Date().toISOString();
    const cleanEmail = email.trim();

    if (adapter.type === "sqlite") {
      const { db } = adapter;
      const stmt = db.prepare("INSERT INTO users (id, name, email, password, createdAt) VALUES (?, ?, ?, ?, ?)");
      stmt.run(id, name.trim(), cleanEmail, password, createdAt);
    } else {
      const data = adapter.read();
      data.users.push({ id, name: name.trim(), email: cleanEmail, password, createdAt });
      adapter.write(data);
    }

    // Sync to remote cloud storage if available
    syncAllUsersAndProgress(adapter).catch(() => {});

    return formatUser({ id, name: name.trim(), email: cleanEmail, password, createdAt });
  }
};

module.exports = User;
