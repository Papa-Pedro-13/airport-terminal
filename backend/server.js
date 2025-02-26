const express = require('express');
const https = require('https');
const fs = require('fs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(express.json());

const cors = require('cors');

const options = {
  key: fs.readFileSync('/etc/ssl/private/selfsigned.key'), // Путь к приватному ключу
  cert: fs.readFileSync('/etc/ssl/certs/selfsigned.crt'), // Путь к сертификату
};


const corsOptions = {
  origin: ['http://localhost:80', 'https://localhost:443', 'https://192.168.200.136'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

app.use(cors(corsOptions)); // Применить CORS ко всем маршрутам
app.options('*', cors(corsOptions)); // Разрешить предварительные запросы для всех маршрутов

// API ключи
const WEATHER_API_KEY = 'fee3e59b950cf1055d21f6054244e2ab';
const FLIGHT_API_KEY = 'cf2ad4a9765311d5113fd174d1a2f6b3';
const JWT_SECRET = '3c4862cdfd75cfd0e94134ae3e9f1ecf92c8679ccd7c16c94f1755b8c6e82d46';


function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Маршрут для авторизации
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  db.get('SELECT * FROM operators WHERE username = ?', [username], (err, operator) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (!operator) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = bcrypt.compareSync(password, operator.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password2' });
    }

    const token = jwt.sign({ id: operator.id, username: operator.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  });
});

// Маршрут для получения погоды в Санкт-Петербурге
app.get('/weather', authenticateToken, async (req, res) => {
  try {
    const city = 'Saint Petersburg';
    const url = `http://api.weatherstack.com/current?query=${city}&access_key=${WEATHER_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Маршрут для получения расписания рейсов в Санкт-Петербурге
app.get('/flights', authenticateToken, async (req, res) => {
  try {
    const airportCode = 'LED'; // Код аэропорта Пулково
    const url = `http://api.aviationstack.com/v1/flights?access_key=${FLIGHT_API_KEY}&dep_iata=${airportCode}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight data' });
  }
});

// Запуск сервера
const PORT = 5000;
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
