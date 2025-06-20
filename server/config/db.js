const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.resolve(__dirname, '../data/agro_iot.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Не вдалося відкрити БД', err.message);
    process.exit(1);
  }
  console.log('Підключено до SQLite БД.');
});


module.exports = db;
