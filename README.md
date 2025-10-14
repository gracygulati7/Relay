# 🗨️ Online Discussion Forum (Threads API)

This is a **basic project** for an Online Discussion Forum (like a mini StackOverflow/Reddit).
Currently, it supports **CRUD operations for threads (create, read, update, delete), user authentication with protected routes, and view and add comments** 
Later, you can extend it with **replies, upvotes/downvotes, search, and filters**.

---

## 🚀 Tech Stack

* **Node.js + Express** → Backend framework
* **MongoDB + Mongoose** → Database
* **dotenv** → Environment variables
* **CORS + body-parser** → Middleware
* **Reacts.js** → Frontend
* **JWT + bycrypt** → Authentication

---

## ⚙️ Installation & Setup

1. **Clone the repo**

   ```bash
   git clone <your-repo-link>
   cd <project-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file in the project root:

   ```
  MONGO_URI=mongodb://localhost:27017/forumDB
  PORT=5000
  JWT_SECRET=supersecretkey123
   ```

   > Replace `mongodb://localhost:27017/discussion-forum` with your actual MongoDB connection string if using MongoDB Atlas.

4. **Run the server**

   ```bash
   npm start
   ```

   You should see:

   ```
   MongoDB connected
   Server running on port 5000
   ```

---

## 📌 API Endpoints

Base URL: `http://localhost:5000/threads`

### 1️⃣ Create a Thread

**POST** `http://localhost:5000/threads/`

**Request Body (JSON):**

```json
{
  "title": "How to learn React?",
  "description": "I want resources to learn React as a beginner.",
  "tags": ["react", "javascript", "frontend"],
  "category": "Programming",
  "createdBy": "student123"
}
```

**Response:**

```json
{
  "_id": "64ff...",
  "title": "How to learn React?",
  "description": "I want resources to learn React as a beginner.",
  "tags": ["react", "javascript", "frontend"],
  "category": "Programming",
  "createdBy": "student123",
  "createdAt": "2025-08-21T12:34:56.789Z",
  "replies": [],
  "votes": []
}
```

---

### 2️⃣ Get All Threads

**GET** `http://localhost:5000/threads/`

**Response:**

```json
[
  {
    "_id": "64ff...",
    "title": "How to learn React?",
    "description": "I want resources to learn React as a beginner.",
    "tags": ["react", "javascript"],
    "category": "Programming",
    "createdBy": "student123",
    "createdAt": "2025-08-21T12:34:56.789Z"
  }
]
```

---

### 3️⃣ Get Single Thread by ID

**GET** `http://localhost:5000/threads/:threadId`

**Example:** `http://localhost:5000/threads/68a7f807a4172862c6844dca`

**Response:**

```json
{
  "_id": "64ff...",
  "title": "How to learn React?",
  "description": "I want resources to learn React as a beginner.",
  "tags": ["react", "javascript"],
  "category": "Programming",
  "createdBy": "student123",
  "createdAt": "2025-08-21T12:34:56.789Z",
  "replies": [],
  "votes": []
}
```

---

### 4️⃣ Update a Thread

**PUT** `http://localhost:5000/threads/:threadId`

**EXAMPLE:** `http://localhost:5000/threads/68a7f807a4172862c6844dca`

**Request Body (JSON):**

```json
{
  "title": "Best way to learn React?",
  "description": "Should I start with docs, YouTube, or a course?",
  "tags": ["react", "learning"],
  "category": "Frontend"
}
```

**Response:**

```json
{
  "_id": "64ff...",
  "title": "Best way to learn React?",
  "description": "Should I start with docs, YouTube, or a course?",
  "tags": ["react", "learning"],
  "category": "Frontend",
  "createdBy": "student123",
  "createdAt": "2025-08-21T12:34:56.789Z"
}
```

---

### 5️⃣ Delete a Thread

**DELETE** `http://localhost:5000/threads/:threadId`

**EXAMPLE:** `http://localhost:5000/threads/68a7f807a4172862c6844dca`

**Response:**

```json
{ "message": "Thread deleted successfully" }
```

---
### 6️⃣ Add Comments

**POST**  `/api/threads/:threadId/comments`

```json
{
  "text": "Following this thread!",
  "author": "Gunn"
}
```
---

### 7️⃣ Get Comments

**GET**  `/api/threads/:threadId/comments`

---

