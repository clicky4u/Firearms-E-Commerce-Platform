const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1612',
  database: 'mydb',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Middleware to authenticate token (if needed)
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

  // Verify token 
  // For simplicity, we'll assume the token is valid and contains the user's email
  req.user = { email: token.split(' ')[1] }; // Extract email from token
  next();
};

// Register User - Includes name field
app.post('/register', (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).send({ message: 'Email, password, and name are required' });
  }

  const sql = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
  db.query(sql, [email, password, name], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error occurred while registering the user' });
    }

    // Simulate token generation 
    const token = email; // For simplicity, use email as the token
    res.send({
      message: 'User registered successfully',
      token: token, // Send token to frontend
      user: { email, name }, // Send user data
    });
  });
});

// Login User - Returns name along with the email
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error occurred while logging in' });
    }
    if (result.length > 0) {
      const user = result[0];
      if (password === user.password) {
        // Simulate token generation (replace with JWT in production)
        const token = user.email; // Use email as the token
        res.send({
          auth: true,
          message: 'Login successful',
          token: token,
          user: { email: user.email, name: user.name },
        });
      } else {
        res.status(401).send({ auth: false, message: 'Invalid password' });
      }
    } else {
      res.status(404).send({ auth: false, message: 'User not found' });
    }
  });
});

// Fetch User Profile
app.get('/user', authenticateToken, (req, res) => {
  const { email } = req.user;

  const sql = 'SELECT email, name FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error fetching user profile' });
    }
    if (result.length > 0) {
      const user = result[0];
      res.send({ email: user.email, name: user.name });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});

// Update User Profile
app.put('/user', authenticateToken, (req, res) => {
  const { email } = req.user;
  const { name, password } = req.body;

  if (!name && !password) {
    return res.status(400).send({ message: 'Name or password is required for update' });
  }

  let sql = 'UPDATE users SET ';
  const updates = [];
  if (name) {
    sql += 'name = ?, ';
    updates.push(name);
  }
  if (password) {
    sql += 'password = ?, ';
    updates.push(password);
  }
  sql = sql.slice(0, -2); // Remove the trailing comma and space
  sql += ' WHERE email = ?';
  updates.push(email);

  db.query(sql, updates, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error updating user profile' });
    }
    if (result.affectedRows > 0) {
      res.send({ message: 'Profile updated successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});