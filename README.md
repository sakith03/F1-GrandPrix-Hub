# 🏎️ Formula 1 Web Application

A simple and visually appealing Formula 1 themed full-stack web application built using:

* ⚙️ .NET 8 Minimal API (Backend)
* ⚛️ React 19 (Frontend)

This app displays drivers, teams, race calendar, and standings using in-memory data (no database).

---

## 🚀 Live Deployment

✅ The application is fully deployed on Azure:

* 🌐 **Frontend (React - Azure Static Web Apps):**
  https://victorious-island-0b104b800.2.azurestaticapps.net/

* 🔗 **Backend API (.NET - Azure App Service):**
  https://sakith-api-app-b8gkabeabve2apec.centralindia-01.azurewebsites.net

* 📡 Example API Endpoint:
  https://sakith-api-app-b8gkabeabve2apec.centralindia-01.azurewebsites.net/api/drivers

---

## 🚀 Features

* 🧑‍🏎️ View all F1 drivers
* 🏁 Explore teams
* 📅 Check 2024 race calendar
* 🏆 Driver & constructor standings
* 🎨 Modern F1-themed UI (dark + red design)
* 🔄 Client-side routing with React Router

---

## 🏗️ Project Structure

```
root/
│
├── BackendAPI/     # .NET 8 Minimal API
└── frontend/       # React 19 App
```

---

## 🔧 Backend Setup (.NET 8)

```bash
cd BackendAPI
dotnet run
```

Runs on:

```
http://localhost:5000
```

Swagger UI:

```
http://localhost:5000/swagger
```

---

## 📡 API Endpoints

| Method | Endpoint                    | Description           |
| ------ | --------------------------- | --------------------- |
| GET    | /api/drivers                | Get all drivers       |
| GET    | /api/drivers/{id}           | Get driver by ID      |
| GET    | /api/teams                  | Get all teams         |
| GET    | /api/teams/{id}             | Get team by ID        |
| GET    | /api/races                  | Get race calendar     |
| GET    | /api/standings/drivers      | Driver standings      |
| GET    | /api/standings/constructors | Constructor standings |

---

## 💻 Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

## 🌐 Pages

* 🏠 Home
* 🧑‍✈️ Drivers
* 🏎️ Teams
* 📅 Races
* 🏆 Standings

---

## 🎨 UI Design

* Dark theme with F1 red (#E10600) accents
* Modern typography using Outfit font
* Responsive layout with cards & tables

---

## ✅ Verification

* ✔ Backend tested via Swagger
* ✔ Frontend tested in browser
* ✔ Successfully deployed on Azure
* ✔ Frontend and backend fully integrated

---

## 📌 Notes

* No database used — all data is stored in-memory
* Designed for learning full-stack integration and cloud deployment
