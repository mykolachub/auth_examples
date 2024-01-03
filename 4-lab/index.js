const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const { authorization: token } = req.headers;
  if (token) {
    const response = await axios.request({
      method: 'GET',
      url: `${DOMAIN}/userinfo`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;

    if (user) {
      return res.json({
        username: user.nickname,
        logout: 'http://localhost:3000/logout',
      });
    }
  }
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/logout', (req, res) => {
  res.redirect('/');
});

const API_TOKEN = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjlFTktnd09xcnRPbnBJR0laaFBfcSJ9.eyJpc3MiOiJodHRwczovL2Rldi14M2psYTBka2h5bjFnbmJ0LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhWEs2TUJ3aVEzVHptb0l0ODVJdDN5b3hWb3VKUjhFSEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYteDNqbGEwZGtoeW4xZ25idC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcwNDI5NTYwMywiZXhwIjoxNzA0MzgyMDAzLCJhenAiOiJhWEs2TUJ3aVEzVHptb0l0ODVJdDN5b3hWb3VKUjhFSCIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zX3N1bW1hcnkgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOnNjaW1fY29uZmlnIGNyZWF0ZTpzY2ltX2NvbmZpZyB1cGRhdGU6c2NpbV9jb25maWcgZGVsZXRlOnNjaW1fY29uZmlnIGNyZWF0ZTpzY2ltX3Rva2VuIHJlYWQ6c2NpbV90b2tlbiBkZWxldGU6c2NpbV90b2tlbiBkZWxldGU6cGhvbmVfcHJvdmlkZXJzIGNyZWF0ZTpwaG9uZV9wcm92aWRlcnMgcmVhZDpwaG9uZV9wcm92aWRlcnMgdXBkYXRlOnBob25lX3Byb3ZpZGVycyBkZWxldGU6cGhvbmVfdGVtcGxhdGVzIGNyZWF0ZTpwaG9uZV90ZW1wbGF0ZXMgcmVhZDpwaG9uZV90ZW1wbGF0ZXMgdXBkYXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6ZW5jcnlwdGlvbl9rZXlzIHJlYWQ6ZW5jcnlwdGlvbl9rZXlzIHVwZGF0ZTplbmNyeXB0aW9uX2tleXMgZGVsZXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOnNlc3Npb25zIGRlbGV0ZTpzZXNzaW9ucyByZWFkOnJlZnJlc2hfdG9rZW5zIGRlbGV0ZTpyZWZyZXNoX3Rva2VucyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.gw9CGIXQv10AIZT1wZnDQ_kibJAGCaRN9xdTAZHGOrz_a7y1TC0qShHXfeX2A6Ky8cYfqZwdY0p78RoWbnFQbw44OjK7qwPpgH1oKXnVFhAy1PEO8J48NY1KWTyFDgoYHvCxL43lHSazy8IQp8pbrXfebciUIUJ7vWA6Fx0_cbO3XAH2RrQaRmWgeAETBx3ept_kwi1NWYmkiC2tlv_TFVyd5RdHFNZ8UnOPA2a3AWOtWPsC28S_7nAyTJWVz962hJ3sMmDZ3muRSl6eN391rkMNrCsPMMubCScFshyKew9OUMUKn1JHi___duIsuHJ4UBVder2FHzgFGZnB-RrzVg`;
const DOMAIN = 'https://dev-x3jla0dkhyn1gnbt.us.auth0.com';
const CLIENT_ID = '7XXph6AKMGAKn9ABZYFy294N2SDhF1BS';
const CLIENT_SECRET =
  'lTqLfACfEg3DYZcyLTMD5cvpk3xlPjDGA3O5ZM-705qzUApOPvYA2TtXCzVQa-Lf';
const AUDIENCE = 'https://dev-x3jla0dkhyn1gnbt.us.auth0.com/api/v2/';
const CONNECTION = 'Username-Password-Authentication';

app.post('/api/login', async (req, res) => {
  const { login: email, password } = req.body;

  const login_config = {
    method: 'POST',
    url: `${DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {
      grant_type: 'password',
      username: email,
      password,
      audience: AUDIENCE,
      scope: 'offline_access openid',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    },
  };

  try {
    const response = await axios(login_config);
    const { access_token, refresh_token, expires_in } = response.data;
    res.json({ access_token, refresh_token, expires_in });
    console.log('user loged in', email);
  } catch (error) {
    res.status(401).json({ message: 'Wrong email or password' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { login: email, password } = req.body;

  // request config
  const create_user_config = {
    method: 'POST',
    url: `${DOMAIN}/dbconnections/signup`,
    headers: {
      'Content-Type': 'application/json',
      // Accept: 'application/json',
      // Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    data: JSON.stringify({
      client_id: CLIENT_ID,
      email,
      password,
      connection: CONNECTION,
      username: email,
    }),
  };

  try {
    await axios(create_user_config);
  } catch (error) {
    res.status(409).json({ message: 'User already exists' });
    return;
  }

  // request config
  const get_token_config = {
    method: 'POST',
    url: `${DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {
      grant_type: 'password',
      username: email,
      password,
      audience: AUDIENCE,
      scope: 'offline_access openid',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    },
  };

  const response = await axios(get_token_config);
  const { access_token, refresh_token, expires_in } = response.data;
  res.json({ access_token, refresh_token, expires_in });
  console.log('user created', email);
});

app.post('/api/refresh', async (req, res) => {
  const { authorization: token } = req.headers;

  const refresh_config = {
    method: 'POST',
    url: `${DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }).toString(),
  };

  const response = await axios(refresh_config);
  const { access_token, expires_in } = response.data;

  res.json({ access_token, expires_in });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
