# Firearms E-Commerce Platform

This is a simple firearms e-commerce platform with a backend API using **Node.js**, **Express.js**, and **MySQL**, and a frontend built using **Vue.js** and **TailwindCSS**.

## How to Run the Project

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/clicky4u/Firearms-E-Commerce-Platform
```

### 2. Set Up Backend

After cloning, navigate to the `Backend` directory and start the server:

```bash
cd Firearms-E-Commerce-Platform/Backend
node server.js
```

This will start the backend server on `localhost:3000`.

### 3. Set Up Frontend

Open a new terminal window or command prompt, navigate to the `web1-dev1` folder, and run the frontend:

```bash
cd Firearms-E-Commerce-Platform/web1-dev1
npm run dev
```

This will start the Vue.js frontend on `localhost:8080`.

### 4. Database Setup

Make sure you have **MySQL** installed on your machine. Create a database named `mydb` and configure your connection settings in the `.env` file (if necessary).

### 5. Environment Variables

Ensure the `.env` file (located in the `Backend` folder) has the correct MySQL database credentials:

```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=mydb
```

### 6. Testing the Application

Once both the backend and frontend are running, you can open your browser and visit the frontend at `http://localhost:8080`. The backend API can be accessed at `http://localhost:3000`.

---

## Dependencies

- **Backend**:
  - Node.js
  - Express.js
  - MySQL
  - `cors`, `body-parser`, `mysql2`

- **Frontend**:
  - Vue.js
  - TailwindCSS
