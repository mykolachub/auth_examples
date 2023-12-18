const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const JWT_SECRET = 'super_secret_jwt';
const JWT_EXPIRES_IN = '1h';

app.use((req, res, next) => {
  const { authorization: token } = req.headers;

  if (token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  }
  next();
});

app.get('/', async (req, res) => {
  if (req.user) {
    return res.json({
      username: req.user.username,
      logout: 'http://localhost:3000/logout',
    });
  }
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/logout', (req, res) => {
  sessions.destroy(req, res);
  res.redirect('/');
});

const users = [
  {
    login: 'Login',
    password: 'Password',
    username: 'Username',
  },
  {
    login: 'Login1',
    password: 'Password1',
    username: 'Username1',
  },
];

app.post('/api/login', (req, res) => {
  const { login, password } = req.body;

  // find user in db
  const user = users.find((user) => {
    if (user.login == login && user.password == password) {
      return true;
    }
    return false;
  });

  //sign jwt token with user data
  if (user) {
    const token = jwt.sign(user, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({ token });
  }

  res.status(401).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
