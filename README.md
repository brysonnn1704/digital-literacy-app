# 🤝 DigiSaathi — Your Digital Companion

> **Empowering digital literacy for everyone — one step at a time.**

DigiSaathi is an accessible, multi-language digital literacy platform designed to help users with limited digital experience learn essential online skills — from using WhatsApp and email to recognizing scams and making safe UPI payments.

---

## 🎬 Demo Video

[![Watch the Demo](https://img.shields.io/badge/▶_Watch_Demo-Google_Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white)](https://drive.google.com/file/d/1r5ux5_2huIPzk8gSu5Asf1CjvjRoH8AA/view?usp=sharing)

🔗 **[Click here to watch the full demo →](https://drive.google.com/file/d/1r5ux5_2huIPzk8gSu5Asf1CjvjRoH8AA/view?usp=sharing)**

---

## ✨ Features

| Feature | Description |
|---|---|
| 📚 **Interactive Lessons** | Step-by-step modules on WhatsApp, Email, Google Search, UPI, Phone Settings & more |
| 🛡️ **Scam Detection** | Real-time URL safety checker powered by Google Safe Browsing API |
| 🎮 **Practice Mode** | Hands-on UPI payment simulator for safe, risk-free learning |
| 🌐 **Multi-Language Support** | Localized content and video tutorials for wider accessibility |
| 🔊 **Read Aloud** | Built-in text-to-speech for users who prefer audio guidance |
| 🆘 **SOS Button** | Global emergency/help reporting button accessible from every page |
| 🏆 **Certificates** | Earn and verify completion certificates after finishing courses |
| 📊 **Progress Tracking** | Dashboard to monitor learning progress and identify areas for improvement |
| 🔐 **Security Training** | Dedicated module on internet safety and recognizing online threats |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router v7, React Icons |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB (Mongoose ODM) |
| **APIs** | Google Safe Browsing API |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
SEB_Digisaathi_AmosNunes_10683/
├── frontend/                  # React application
│   ├── public/                # Static assets
│   └── src/
│       ├── components/        # Navbar, SOS Button, Read Aloud, Protected Route
│       ├── pages/             # All page components (Login, Dashboard, Lessons, etc.)
│       ├── services/          # API service layer
│       └── utils/             # Utility functions
├── backend/                   # Express API server
│   ├── models/                # Mongoose schemas (User, UserProgress)
│   ├── db.js                  # MongoDB connection
│   └── server.js              # API routes & server entry point
└── vercel.json                # Deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local instance or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/SEB_Digisaathi_AmosNunes_10683.git
   cd SEB_Digisaathi_AmosNunes_10683
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure MongoDB**
   - Update the connection string in `backend/db.js` with your MongoDB URI.

### Running Locally

1. **Start the backend server**
   ```bash
   cd backend
   node server.js
   ```
   The API server will start on `http://localhost:5005`

2. **Start the frontend dev server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   The app will open at `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Authenticate a user |
| `POST` | `/progress` | Save lesson progress |
| `GET` | `/progress/:userId` | Get user's learning progress |
| `POST` | `/check-url` | Check if a URL is safe (Scam Detector) |
| `POST` | `/save-certificate` | Save a completion certificate |
| `GET` | `/verify/:id` | Verify a certificate by ID |

---

## 👤 Author

**Amos Nunes** — _10683_

---

## 📄 License

This project is for educational purposes as part of the SEB initiative.
