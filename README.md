# Kanban Board Project

A full-stack Kanban board application built with **React.js** on the frontend and **Flask + MongoDB** on the backend. This project supports user authentication, task management (CRUD), and JWT-based secure API endpoints.

---

## Project Structure

kanbanfrontend/
└── backend/
└── frontend/


---

## Setup Instructions

### Backend (Flask + MongoDB)

1. Navigate to the backend folder:
   ```bash
   cd kanbanfrontend/backend

pip install -r requirements.txt

flask run
cd kanbanfrontend
npm install
npm start


Backend Documentation
Main Application (app.py)

Initializes the Flask app, JWT, Bcrypt, and MongoDB connection.

Registers blueprints for authentication (/api/auth) and tasks (/api/tasks).

Enables CORS for the frontend at http://localhost:5173.

Handles preflight OPTIONS requests globally.