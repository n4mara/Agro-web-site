const { create, findByEmail } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Користувача не знайдено' });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Невірний пароль' });
    }
   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.cookie('token', token, {
    httpOnly: true,
    secure: true,          
    sameSite: 'Strict',    
    maxAge: 3600000        
    });
    res.json({ email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
    
  }
};
exports.registration = async (req,res)=>{
    const { email, password } = req.body;
  
    if (!email || !password) return res.status(400).json({ message: 'Email і пароль обов’язкові' });
  
    try {
      const existing = await findByEmail(email);
      if (existing) return res.status(409).json({ message: 'Користувач вже існує' });
      console.log('Створення користувача з email:', email);

      const hash = await bcrypt.hash(password, 10);
      const user = create({email,password: hash})
    
      res.status(201).json({ message: 'Реєстрація успішна', email: user.email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Помилка сервера' });
    }
  }
exports.token = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Неавторизовано' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // можна тут витягти email з бази, якщо треба
    res.json({ id: decoded.id }); // або { id, email }
  } catch (err) {
    res.status(403).json({ message: 'Невалідний токен' });
  }
}
