const { getDatabase } = require("../db");

// Fallback Mongoose model if custom MONGO_URI is active
let mongooseModel = null;
try {
  const mongoose = require("mongoose");
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    const userProgressSchema = new mongoose.Schema({
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      lesson_id: { type: Number, required: true },
      completed: { type: Number, default: 1 },
      score: { type: Number, default: 0 },
      mistakes_scam: { type: Number, default: 0 },
      mistakes_upi: { type: Number, default: 0 },
      certificate_id: { type: String, default: null },
      completed_at: { type: String, default: null }
    });
    userProgressSchema.index({ user_id: 1, lesson_id: 1 }, { unique: true });
    mongooseModel = mongoose.models.UserProgress || mongoose.model("UserProgress", userProgressSchema);
  }
} catch (e) {}

function makeInstance(row, adapter) {
  if (!row) return null;
  const instance = { ...row };

  instance.save = async function () {
    if (adapter.type === "sqlite") {
      const { db } = adapter;
      if (instance.id) {
        db.prepare(`
          UPDATE user_progress
          SET completed = ?, score = ?, mistakes_scam = ?, mistakes_upi = ?, certificate_id = ?, completed_at = ?
          WHERE id = ?
        `).run(
          instance.completed ?? 1,
          instance.score ?? 0,
          instance.mistakes_scam ?? 0,
          instance.mistakes_upi ?? 0,
          instance.certificate_id ?? null,
          instance.completed_at ?? null,
          instance.id
        );
      } else {
        db.prepare(`
          UPDATE user_progress
          SET completed = ?, score = ?, mistakes_scam = ?, mistakes_upi = ?, certificate_id = ?, completed_at = ?
          WHERE user_id = ? AND lesson_id = ?
        `).run(
          instance.completed ?? 1,
          instance.score ?? 0,
          instance.mistakes_scam ?? 0,
          instance.mistakes_upi ?? 0,
          instance.certificate_id ?? null,
          instance.completed_at ?? null,
          instance.user_id,
          instance.lesson_id
        );
      }
    } else {
      const data = adapter.read();
      const idx = data.progress.findIndex(p => 
        (instance.id && p.id === instance.id) || 
        (p.user_id === instance.user_id && p.lesson_id === instance.lesson_id)
      );
      if (idx !== -1) {
        data.progress[idx] = { ...data.progress[idx], ...instance };
        adapter.write(data);
      }
    }
    return instance;
  };

  return instance;
}

const UserProgress = {
  async findOne(query) {
    if (mongooseModel && mongooseModel.db && mongooseModel.db.readyState === 1) {
      return await mongooseModel.findOne(query);
    }

    const adapter = getDatabase();

    if (adapter.type === "sqlite") {
      const { db } = adapter;
      let row = null;
      if (query.user_id !== undefined && query.lesson_id !== undefined) {
        const stmt = db.prepare("SELECT * FROM user_progress WHERE user_id = ? AND lesson_id = ?");
        row = stmt.get(String(query.user_id), Number(query.lesson_id));
      } else if (query.certificate_id !== undefined) {
        const stmt = db.prepare("SELECT * FROM user_progress WHERE certificate_id = ?");
        row = stmt.get(String(query.certificate_id));
      } else if (query.user_id !== undefined && query.completed !== undefined) {
        const stmt = db.prepare("SELECT * FROM user_progress WHERE user_id = ? AND completed = ? LIMIT 1");
        row = stmt.get(String(query.user_id), Number(query.completed));
      }
      return makeInstance(row, adapter);
    }

    // JSON fallback
    const data = adapter.read();
    let row = null;
    if (query.user_id !== undefined && query.lesson_id !== undefined) {
      row = data.progress.find(p => String(p.user_id) === String(query.user_id) && Number(p.lesson_id) === Number(query.lesson_id));
    } else if (query.certificate_id !== undefined) {
      row = data.progress.find(p => p.certificate_id === query.certificate_id);
    } else if (query.user_id !== undefined && query.completed !== undefined) {
      row = data.progress.find(p => String(p.user_id) === String(query.user_id) && Number(p.completed) === Number(query.completed));
    }
    return makeInstance(row, adapter);
  },

  async find(query) {
    if (mongooseModel && mongooseModel.db && mongooseModel.db.readyState === 1) {
      return await mongooseModel.find(query);
    }

    const adapter = getDatabase();

    if (adapter.type === "sqlite") {
      const { db } = adapter;
      if (query && query.user_id !== undefined) {
        const stmt = db.prepare("SELECT * FROM user_progress WHERE user_id = ?");
        const rows = stmt.all(String(query.user_id));
        return rows.map(r => makeInstance(r, adapter));
      }
      const stmt = db.prepare("SELECT * FROM user_progress");
      return stmt.all().map(r => makeInstance(r, adapter));
    }

    // JSON fallback
    const data = adapter.read();
    if (query && query.user_id !== undefined) {
      return data.progress.filter(p => String(p.user_id) === String(query.user_id)).map(r => makeInstance(r, adapter));
    }
    return data.progress.map(r => makeInstance(r, adapter));
  },

  async create(data) {
    if (mongooseModel && mongooseModel.db && mongooseModel.db.readyState === 1) {
      return await mongooseModel.create(data);
    }

    const adapter = getDatabase();
    const entry = {
      user_id: String(data.user_id),
      lesson_id: Number(data.lesson_id),
      completed: data.completed !== undefined ? Number(data.completed) : 1,
      score: data.score !== undefined ? Number(data.score) : 0,
      mistakes_scam: data.mistakes_scam !== undefined ? Number(data.mistakes_scam) : 0,
      mistakes_upi: data.mistakes_upi !== undefined ? Number(data.mistakes_upi) : 0,
      certificate_id: data.certificate_id || null,
      completed_at: data.completed_at || null
    };

    if (adapter.type === "sqlite") {
      const { db } = adapter;
      const stmt = db.prepare(`
        INSERT INTO user_progress (user_id, lesson_id, completed, score, mistakes_scam, mistakes_upi, certificate_id, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(
        entry.user_id,
        entry.lesson_id,
        entry.completed,
        entry.score,
        entry.mistakes_scam,
        entry.mistakes_upi,
        entry.certificate_id,
        entry.completed_at
      );
      entry.id = Number(info.lastInsertRowid);
      return makeInstance(entry, adapter);
    }

    // JSON fallback
    const dbData = adapter.read();
    entry.id = Date.now();
    dbData.progress.push(entry);
    adapter.write(dbData);
    return makeInstance(entry, adapter);
  }
};

module.exports = UserProgress;
