// server/models/user.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

function findByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function create({ email, password }) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, email });
        });
    });
}

module.exports = {
    findByEmail,
    create
};