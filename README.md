# 💬 Chat-app (MERN + Gemini AI + DaisyUI)

A full-stack real-time chat application built with the **MERN stack** (MongoDB, Express.js, React, Node.js), featuring a smart **Gemini-powered AI Assistant** and styled beautifully using **DaisyUI**.

---

## 🚀 Features

- 🔐 **User Authentication** using JWT
- 💬 **Real-time Chat** via Socket.io
- 🤖 **Gemini AI Assistant** for smart replies and cyber-awareness help
- 🎨 **Modern UI** with DaisyUI (Tailwind CSS)
- 🌙 **Theme Switching** (Dark/Light)
- 💾 **Conversation History** stored in MongoDB
- 📱 **Responsive Design**

---

## 🛠️ Tech Stack

| Category       | Technology             |
|----------------|------------------------|
| Frontend       | React.js, Tailwind CSS, DaisyUI |
| Backend        | Node.js, Express.js    |
| Database       | MongoDB + Mongoose     |
| Authentication | JWT                    |
| AI Assistant   | Gemini API (Google)    |
| Real-time Chat | Socket.io              |

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/adityaa08/Chat-app.git
cd Chat-app
```

### 2. Backend Setup
``` bash
cd Backend
npm install
npm run dev
```

### 3. Frontend Setup
``` bash
cd ../Frontend
npm install
npm run dev
```

### Backend .env
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
