Formula 1 Web Application

A simple Formula 1 themed full-stack web application built with .NET 8 Minimal API (backend) and React 19 (frontend). The app shows drivers, teams, race calendar, and standings using in-memory data.

Features

View F1 drivers and teams

Check 2024 race calendar

Driver and constructor standings

Responsive F1-themed UI with dark background and red accents

Client-side routing with React Router

Project Structure
root/
├── BackendAPI/   # .NET 8 Minimal API
└── frontend/     # React 19 App
Backend Setup
cd BackendAPI
dotnet run

Runs on http://localhost:5000

Swagger UI: http://localhost:5000/swagger

API Endpoints

GET /api/drivers

GET /api/drivers/{id}

GET /api/teams

GET /api/teams/{id}

GET /api/races

GET /api/standings/drivers

GET /api/standings/constructors

Frontend Setup
cd frontend
npm install
npm start

Runs on http://localhost:3000

Pages

Home

Drivers

Teams

Races

Standings

Notes

All data is stored in-memory

Designed for learning full-stack integration with Azure deployment
