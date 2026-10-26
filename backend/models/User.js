const { getDatabase } = require("../db");

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

const User = {
  async findOne(query) {
    if (mongooseModel && mongooseModel.db && mongooseModel.db.readyState === 1) {
      return await mongooseModel.findOne(query);
    }

    const adapter = getDatabase();

    if (adapter.type === "sqlite") {
      const { db } = adapter;
      if (query.email && query.password) {
        const stmt = db.prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND password = ?");
        const row = stmt.get(query.email.trim(), query.password);
        return formatUser(row);
      }
      if (query.email) {
        const stmt = db.prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?)");
        const row = stmt.get(query.email.trim());
        return formatUser(row);
      }
      if (query.id || query._id) {
        const id = query.id || query._id;
        const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
        const row = stmt.get(String(id));
        return formatUser(row);
      }
      return null;
    }

    // JSON fallback
    const data = adapter.read();
    let user = null;
    if (query.email && query.password) {
      user = data.users.find(u => u.email.toLowerCase() === query.email.trim().toLowerCase() && u.password === query.password);
    } else if (query.email) {
      user = data.users.find(u => u.email.toLowerCase() === query.email.trim().toLowerCase());
    } else if (query.id || query._id) {
      const id = query.id || query._id;
      user = data.users.find(u => String(u.id) === String(id));
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
      return formatUser({ id, name: name.trim(), email: cleanEmail, password, createdAt });
    }

    // JSON fallback
    const data = adapter.read();
    const newUser = { id, name: name.trim(), email: cleanEmail, password, createdAt };
    data.users.push(newUser);
    adapter.write(data);
    return formatUser(newUser);
  }
};

module.exports = User;
