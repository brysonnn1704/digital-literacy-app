const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  lesson_id: {
    type: Number,
    required: true
  },
  completed: {
    type: Number,
    default: 1
  },
  score: {
    type: Number,
    default: 0
  },
  mistakes_scam: {
    type: Number,
    default: 0
  },
  mistakes_upi: {
    type: Number,
    default: 0
  },
  certificate_id: {
    type: String,
    default: null
  },
  completed_at: {
    type: String,
    default: null
  }
});

/* Compound index: one progress entry per user per lesson */
userProgressSchema.index({ user_id: 1, lesson_id: 1 }, { unique: true });

module.exports = mongoose.model("UserProgress", userProgressSchema);
