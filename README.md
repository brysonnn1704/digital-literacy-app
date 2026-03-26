//Push on github
git init
git add . 
git commit -m "Initial Commit"
git remote add origin "repo url"
git branch -M main
git push -u origin main

//Clone git repo
git clone https://github.com/yourusername/digital-literacy-app.git
cd digital-literacy-app

//Pull(make changes)
git pull

//add + commit changes
git add .
git commit -m "added new feature"

git push

#Update Your Code

git pull

Below are all the stepwise procedure with db

# Project Setup Guide

Follow the steps below to run the project locally on your system.

---

## 1. Clone Repository

git clone https://github.com/your-username/elderly-digital-literacy-platform.git  
cd elderly-digital-literacy-platform

---

## 2. Install Dependencies

Frontend:
cd client  
npm install  

Backend:
cd ../server  
npm install  

---

## 3. Setup MySQL Database

Open MySQL Workbench and run:

CREATE DATABASE digital_literacy;  
USE digital_literacy;  

CREATE TABLE users (  
  id INT AUTO_INCREMENT PRIMARY KEY,  
  name VARCHAR(100),  
  email VARCHAR(100),  
  password VARCHAR(100)  
);  

CREATE TABLE lessons (  
  id INT AUTO_INCREMENT PRIMARY KEY,  
  title VARCHAR(255),  
  description TEXT,  
  category VARCHAR(100)  
);  

CREATE TABLE user_progress (  
  user_id INT,  
  lesson_id INT,  
  completed INT DEFAULT 0,  
  score INT DEFAULT 0,  
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  PRIMARY KEY (user_id, lesson_id)  
);  

INSERT INTO lessons (title, description, category) VALUES  
('UPI Payment', 'Learn how to send money using UPI', 'Payments'),  
('Ticket Booking', 'Learn how to book train tickets', 'Services'),  
('Online Form Filling', 'Learn how to fill forms', 'Services');  

---

## 4. Configure Database Connection

Open server/db.js and update:

const mysql = require("mysql");  

const db = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "YOUR_PASSWORD",  
  database: "digital_literacy"  
});  

module.exports = db;  

---

## 5. Run Project

Start Backend:
cd server  
node server.js  

Backend runs on: http://localhost:5000  

Start Frontend:
cd client  
npm start  

Frontend runs on: http://localhost:3000  

---

## 6. Test Application

Register a new user  
Login  
Open lessons  
Mark a lesson as completed  
Check progress update  

---

## Requirements

Node.js (v16 or higher)  
MySQL  
npm
