const express = require("express");
const router = express.Router();
const db = require('../config/db');


exports.uploadAvatar = (req, res) => {
  const userId = req.userId;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Файл не надано' });
  }

  db.run('UPDATE users SET avatar = ? WHERE id = ?', [file.buffer, userId], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Помилка оновлення аватара' });
    }

    res.json({ message: 'Аватар збережено', id: userId });
  });
};

exports.getAvatar = (req, res) => {
  const userId = req.params.id;

  db.get('SELECT avatar FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Помилка сервера');
    }

    if (!row || !row.avatar) {
      return res.status(404).send('Зображення не знайдено');
    }

    res.set('Content-Type', 'image/jpeg');
    res.send(row.avatar);
  });
};

exports.getName = (req,res)=>{
    const userId=req.params.id;
    db.get('SELECT name FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Помилка сервера');
    }

    if (!row || !row.avatar) {
      return res.status(404).send('Зображення не знайдено');
    }

    //res.set('Content-Type', 'image/jpeg');
    res.send(row.name);
  });

}
