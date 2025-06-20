const express = require("express");
const router = express.Router();
const db = require('../config/db');

exports.addField = (req, res) => {
  const userId = req.userId; // Витягнуто з JWT
  const { name, area, crop_type, soil_type, location } = req.body;

  if (!name || !area) {
    return res.status(400).json({ message: 'Назва і площа поля обовʼязкові' });
  }

  const sql = `
    INSERT INTO fields (user_id, name, area, crop_type, soil_type, location)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [userId, name, area, crop_type, soil_type, location], function (err) {
    if (err) {
      console.error('DB error:', err.message);
      return res.status(500).json({ message: 'Помилка при додаванні поля' });
    }

    res.status(201).json({ message: 'Поле додано', fieldId: this.lastID });
  });
};