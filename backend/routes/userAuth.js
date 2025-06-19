const express = require('express');
const bcrypt = require('bcrypt');
const { getConnection } = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /register
router.post('/register', async (req, res) => {
  const { nom, prenom, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);

    const [result] = await connection.query(
      'INSERT INTO user (nom, prenom, email, password) VALUES (?, ?, ?, ?)',
      [nom, prenom, email, hashedPassword]
    );

    await connection.end();
    res.status(201).json({ message: 'Utilisateur créé', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [users] = await connection.query(
      'SELECT * FROM user WHERE email = ?',
      [identifier]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.JWT_SECRET || 'secret', // à mettre dans .env
      { expiresIn: '2h' }
    );

    res.json({ message: 'Connexion réussie', userId: user.id_user, lang: user.lang, token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
});

module.exports = router;