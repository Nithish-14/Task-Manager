# 📋 Task Manager

A full-stack task management application that allows users to create, edit, delete, and filter tasks based on their status. Built with a modern web stack using Next.js on the frontend and Express with TypeORM on the backend.

---

## 🛠 Tech Stack

### ✅ Backend
- Node.js
- Express.js
- TypeORM
- SQLite

### ✅ Frontend
- Next.js (App Router)
- React
- Plain CSS

---

## 🚀 Getting Started

### 1. Clone the Repository

Using HTTPS:
```bash
git clone https://github.com/Nithish-14/Task-Manager.git
```

or Using SSH
```
git clone git@github.com:Nithish-14/Task-Manager.git
```

### 2. Then navigate into the project directory:

```bash
cd Task-Manager
```

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

#### 1. Prerequisites
- Node.js (v16+)
- npm

#### 2. Installation
```bash
cd backend
npm install
```

#### 3. Environment Variables
Create a .env file in the backend directory:
```bash
PORT=5000
```
ℹ️ TypeORM will create a database.sqlite file automatically on first run in development mode.

#### 4. Run the Backend
```bash
npm run dev
```

#### 5. API Base URL
```bash
http://localhost:5000
```

### 🌐 Frontend Setup

#### 1. Prerequisites
- Node.js (v16+)
-  npm

#### 2. Installation
```bash
cd frontend
npm install
```

#### 3. Environment Variables
Create a .env.local file in the frontend directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### 4. Run the Frontend
```bash
npm run dev
```

#### 5. Frontend URL
```bash
http://localhost:3001
```

---

## 📚 API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | Get all tasks     |
| GET    | `/api/tasks/:id` | Get a task by ID  |
| POST   | `/api/tasks`     | Create a new task |
| PUT    | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

---

## 📄 Frontend Pages

| Route             | Description                     |
| ----------------- | ------------------------------- |
| `/`               | Home page (task list + filters) |
| `/tasks/add`      | Add a new task                  |
| `/tasks/edit/:id` | Edit an existing task           |

---

## ✨ Optional Features Implemented

- Task filtering (todo, in_progress, done)

- Delete confirmation modal

- Responsive UI

- Form validation for task title

---

## 🧪 Environment Files

### 📁 backend/.env.example
```bash
PORT=5000
```

### 📁 frontend/.env.local.example
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 📸 Screenshots/Demo

---

## ⚠️ Known Issues / Limitations

- No authentication (all features are public)

- SQLite is not suitable for production

- No pagination or search features yet

- Minimal error handling on frontend

---

## 📁 Folder Structure

task-manager/
│
├── backend/
│   ├── src/
│   ├── database.sqlite
│   ├── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── .env.local
│
└── README.md

---