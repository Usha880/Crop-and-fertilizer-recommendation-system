# 🌾 Smart Crop & Fertilizer Recommendation System

An AI-powered **Smart Agriculture Decision Support System** that recommends the most suitable crops and fertilizers based on **district location, real-time weather conditions, soil parameters, and seasonal suitability.**

This project helps farmers take **data-driven agricultural decisions** instead of traditional guesswork.

---

## 🚀 Project Overview

The **Crop & Fertilizer Recommendation System** is a web-based application that provides intelligent suggestions to farmers using:

- Location-based data  
- Soil parameters  
- Weather conditions  
- Predefined agricultural knowledge base  

It is designed to be simple, fast, and useful for real-world agricultural planning.

---

## 🎯 Objectives

- To recommend suitable crops based on district conditions  
- To suggest appropriate fertilizers for each crop  
- To analyze soil and weather factors  
- To help farmers increase productivity  
- To reduce fertilizer misuse  
- To provide a user-friendly interface for farmers  

---

## 🧩 Key Features

### 🌱 Core Features

- 🔐 Secure user registration and login  
- 🌍 District-based crop recommendation  
- 🌦 Real-time weather integration using OpenWeather API  
- 🧪 Soil parameter estimation (NPK, pH, texture)  
- 🌾 Crop & fertilizer suggestion  
- 📊 Interactive dashboard with visualizations  
- 📄 Report generation  
- 🔄 Data persistence across pages  
- 🗃 MongoDB database storage  

---

## 🛠 Technology Stack

### Frontend
- React.js  
- JavaScript  
- HTML5  
- CSS3  
- Recharts (Data Visualization)  

### Backend
- Python  
- Flask Framework  
- REST APIs  

### Database
- MongoDB  

### APIs Used
- OpenWeather API  

### Tools
- VS Code  
- Postman  
- MongoDB Compass  

---

## ⚙ System Architecture

User Interface (React)

↓

Flask Backend API

↓

Weather API + Crop Logic

↓

MongoDB Database



---

## 🧪 Parameters Used for Prediction

### 🌦 Weather Parameters
- Temperature  
- Humidity  
- Rainfall  

### 🌱 Soil Parameters
- Nitrogen (N)  
- Phosphorus (P)  
- Potassium (K)  
- pH Value  
- Soil Texture  

### 📍 Location Parameter
- District (Telangana based)

---

## 🌾 Supported Crops

The system supports major Telangana crops such as:

- Paddy  
- Cotton  
- Maize  
- Groundnut  
- Red Gram  
- Chilli  
- Turmeric  
- Soybean  

---

## 🌱 Realistic Soil Suitability

| Crop | Suitable Soil Texture | Ideal pH |
|------|----------------------|----------|
| Paddy | Clayey / Loamy | 6.0 – 7.5 |
| Cotton | Black / Loamy | 6.0 – 8.0 |
| Maize | Sandy Loam | 5.5 – 7.0 |
| Groundnut | Sandy Loam | 6.0 – 7.0 |
| Red Gram | Loamy | 6.5 – 7.5 |
| Chilli | Well Drained Loam | 6.0 – 6.8 |

---

## 📊 Visualizations in Dashboard

The dashboard provides:

- Crop suitability pie charts  
- NPK requirement bar charts  
- Seasonal suitability line charts  
- Weather condition display  
- Soil texture display  

---

## 🗃 Database Structure (MongoDB)

### Collections Used

- `users` – Stores user registration details  
- `login_logs` – Stores login and logout times  
- `predictions` – Stores user predictions  
- `district_crops` – Stores district-wise crop data  
- `feedback` – Stores user feedback  

---

## 🔄 Project Flow

1. User logs in  
2. Enters district name  
3. System fetches real-time weather  
4. Soil parameters are calculated  
5. Suitable crops are retrieved  
6. Fertilizer suggestions are displayed  
7. Data stored in MongoDB  
8. Dashboard visualizes results  

---

## 🧪 Sample Test Cases

### Functional Test Cases

| Input | Expected Output | Result |
|------|----------------|--------|
| Valid district name | Crop recommendations | Pass |
| Invalid district | Error message | Pass |
| Login with correct credentials | Login successful | Pass |
| Empty district field | Validation error | Pass |

### Fail Test Cases

| Input | Expected Output | Result |
|------|----------------|--------|
| Wrong API key | Weather fetch fail | Fail |
| Database not running | Data storage fail | Fail |

---

## 🛠 Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/crop-fertilizer-recommendation.git

