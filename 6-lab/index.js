const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { AuthenticationClient, UserInfoClient } = require('auth0');
const { auth } = require('express-oauth2-jwt-bearer');

const PORT = 3000;

const DOMAIN = 'dev-x3jla0dkhyn1gnbt.us.auth0.com';
const CLIENT_ID = '7XXph6AKMGAKn9ABZYFy294N2SDhF1BS';
const CLIENT_SECRET =
  'lTqLfACfEg3DYZcyLTMD5cvpk3xlPjDGA3O5ZM-705qzUApOPvYA2TtXCzVQa-Lf';
const AUDIENCE = 'https://dev-x3jla0dkhyn1gnbt.us.auth0.com/api/v2/';
const ISSUER_BASE_URL = 'https://dev-x3jla0dkhyn1gnbt.us.auth0.com/';

const authClient = new AuthenticationClient({
  domain: DOMAIN,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

const checkJwt = auth({
  audience: AUDIENCE,
  issuerBaseURL: ISSUER_BASE_URL,
});

const userClient = new UserInfoClient({
  domain: DOMAIN,
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/token', async (req, res) => {
  const { code, redirect_uri } = req.body;

  try {
    const { data } = await authClient.oauth.authorizationCodeGrant({
      code,
      redirect_uri: 'http://localhost:3000',
      grant_type: 'authorization_code',
    });
    const { access_token, refresh_token, expires_in } = data;
    return res.json({ access_token, refresh_token, expires_in });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Something went wrong' });
  }
});

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

app.post('/api/refresh', async (req, res) => {
  const refresh_token = req.get('Authorization');
  const { data } = await authClient.oauth.refreshTokenGrant({ refresh_token });
  res.json(data).send();
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
