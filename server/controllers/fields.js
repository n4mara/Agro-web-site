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

exports.getAllFields = (req, res) => {
  const userId = req.userId; 
  console.log(userId);
  const sql = `
    SELECT id, name, area, crop_type, soil_type, location, created_at
    FROM fields
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.all(sql, [userId], (err, rows) => {
    if (err) {
      console.error('DB error:', err.message);
      return res.status(500).json({ message: 'Помилка при отриманні полів' });
    }
    console.log({ fields: rows });
    res.json({ fields: rows });
  });
};

exports.getFieldById = (req, res) => {
  const userId = req.userId;
  const fieldId = req.params.id;
  db.get(
    `SELECT id, name, area, crop_type, soil_type, location 
     FROM fields 
     WHERE id = ? AND user_id = ?`,
    [fieldId, userId],
    (err, row) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      if (!row) return res.status(404).json({ message: 'Поле не знайдено' });
      res.json({ field: row });
    }
  );
};

exports.updateField = (req, res) => {
  const userId = req.userId;
  const fieldId = req.params.id;
  const { name, area, crop_type, soil_type, location } = req.body;
  const sql = `
    UPDATE fields 
    SET name=?, area=?, crop_type=?, soil_type=?, location=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=? AND user_id=?`;
  db.run(sql, [name, area, crop_type, soil_type, location, fieldId, userId], function(err){
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json({ message: 'Поле оновлено' });
  });
};