const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { AuthenticationClient, UserInfoClient } = require('auth0');
const { auth } = require('express-oauth2-jwt-bearer');

const PORT = 3000;
const AUDIENCE = 'https://dev-x3jla0dkhyn1gnbt.us.auth0.com/api/v2/';
const CONNECTION = 'Username-Password-Authentication';

const authClient = new AuthenticationClient({
  domain: 'dev-x3jla0dkhyn1gnbt.us.auth0.com',
  clientId: '7XXph6AKMGAKn9ABZYFy294N2SDhF1BS',
  clientSecret:
    'lTqLfACfEg3DYZcyLTMD5cvpk3xlPjDGA3O5ZM-705qzUApOPvYA2TtXCzVQa-Lf',
});

const checkJwt = auth({
  audience: 'https://dev-x3jla0dkhyn1gnbt.us.auth0.com/api/v2/',
  issuerBaseURL: `https://dev-x3jla0dkhyn1gnbt.us.auth0.com/`,
});

const userClient = new UserInfoClient({
  domain: 'dev-x3jla0dkhyn1gnbt.us.auth0.com',
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/me', checkJwt, async (req, res) => {
  const auth = req.auth;
  if (auth) {
    const token = auth.token;
    const { data } = await userClient.getUserInfo(token);
    return res.json(data);
  }
  return res.status(401).json({ error: 'Forbidden' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    const { data } = await authClient.oauth.passwordGrant({
      username: login,
      password,
      scope: 'offline_access openid',
      audience: AUDIENCE,
    });
    res.json(data).send();
  } catch (err) {
    res.status(401).send();
  }
});

app.post('/api/signup', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await authClient.database.signUp({
      email: login,
      password,
      connection: CONNECTION,
    });
    const { data } = await authClient.oauth.passwordGrant({
      username: login,
      password,
      scope: 'offline_access openid',
      audience: AUDIENCE,
    });
    res.json(data).send();
  } catch (err) {
    res.status(401).send();
  }
});

app.post('/api/refresh', async (req, res) => {
  const refresh_token = req.get('Authorization');
  const { data } = await authClient.oauth.refreshTokenGrant({ refresh_token });
  res.json(data).send();
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
