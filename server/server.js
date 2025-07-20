require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

app.get('/', (req, res) => {
  res.send('✅ Discord сервер работает!');
});

// ✅ Авторизация Discord
app.get('/auth/discord', async (req, res) => {
  const code = req.query.code;
    if (!code) {
    return res.redirect('http://localhost:5000?auth=cancelled');
    }


  try {
    // 1) Получаем токен
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const accessToken = tokenResponse.data.access_token;

    // 2) Получаем данные пользователя
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    res.redirect(`http://localhost:5000?username=${encodeURIComponent(userResponse.data.username)}&avatar=${encodeURIComponent(`https://cdn.discordapp.com/avatars/${userResponse.data.id}/${userResponse.data.avatar}.png`)}`);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: 'Auth failed' });
  }
});

app.listen(3000, () => console.log('✅ Сервер запущен на http://localhost:3000'));
