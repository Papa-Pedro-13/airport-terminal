const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const db = new sqlite3.Database('./database.db');

// Создание таблицы для операторов
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS operators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Добавление тестового оператора (логин: admin, пароль: admin123)
  const username = 'admin';
  const password = bcrypt.hashSync('admin123', 8);
  console.log("Start DB")
  db.get('SELECT * FROM operators WHERE username = ?', [username], (err, row) => {
    if (!row) {
      db.run('INSERT INTO operators (username, password) VALUES (?, ?)', [username, password], (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
});

module.exports = db;