# Expense Tracker

A full-stack expense management application that helps users track income and expenses, monitor spending patterns, and manage their personal finances through an interactive dashboard.

## Features

* **User Authentication:** Secure registration and login using JWT authentication.
* **Income & Expense Tracking:** Record and manage financial transactions.
* **Dashboard Analytics:** View financial summaries and spending patterns through interactive charts.
* **Profile Management:** Manage user profile information.
* **Responsive UI:** User-friendly interface for different screen sizes.
* **Data Persistence:** Store user and transaction data in MongoDB.

## Tech Stack

**Frontend:** React.js, JavaScript, HTML, CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB

**Authentication:** JSON Web Token (JWT)

## Project Structure

* `frontend/` – React user interface and dashboard.
* `backend/` – Express APIs, authentication, and database operations.

*Adjust the folder names above to match your actual repository structure.*

## Getting Started

### Prerequisites

* Node.js and npm
* MongoDB database
* Git

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Navigate to the frontend and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Navigate to the backend and install dependencies:

   ```bash
   cd ../backend
   npm install
   ```

4. Configure the required environment variables in the backend `.env` file:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

5. Start the backend:

   ```bash
   npm run dev
   ```

6. Start the frontend in a separate terminal using the appropriate frontend directory:

   ```bash
   npm run dev
   ```

## Learning Outcomes

* Developed REST APIs using Node.js and Express.js.
* Implemented JWT-based authentication.
* Integrated MongoDB for persistent data storage.
* Built reusable React components and interactive dashboard charts.
* Practiced full-stack development and frontend-backend integration.

## Author

**Neeraj Pathak**

* GitHub: https://github.com/neerajpathak05
