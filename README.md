# ⚡ Charging Station Management System — Frontend

This is the **frontend** of the Charging Station Management System built using **Vue 3**, **Vite**, and **Leaflet** for mapping.

🔗 **Live Demo:** [charging-frontend10.onrender.com](https://charging-frontend10.onrender.com/)

---

## 🚀 Features

- 🔐 **User Authentication** (Login)
- 📄 **Add / Edit / Delete Charging Stations**
- 🌍 **Map View** of all charging stations using Leaflet & OpenStreetMap
- 📊 **All stations listed in a clean table**
- 🔒 **Route protection & Logout**

---

## 🧱 Tech Stack

- **Vue 3** + **Vite**
- **Vue Router**
- **Axios**
- **Leaflet** (OpenStreetMap)
- **Render** (for hosting)

---

## ⚙️ Setup Instructions

### 📁 Clone the repo

```bash
git clone https://github.com/InduS37/charging-frontend1.git
cd charging-frontend1
npm install
npm run dev

🏗️ Build for production
npm run build

🔐 Environment Variables
VITE_API_BASE_URL=https://your-backend-url/api

🧭 Project Structure

├── public/
├── src/
│   ├── components/        # Vue components
│   ├── router/            # Vue Router config
│   ├── axios.js           # Axios setup with token handling
│   └── main.js            # Entry file
├── .env                   # API base URL
├── index.html             # Root HTML
└── vite.config.js         # Vite config

📡 Backend Repository
👉 https://github.com/InduS37/charging-backend.git

🙋‍♀️ Author
Name: Indhu
Branch: B.Tech CSE
