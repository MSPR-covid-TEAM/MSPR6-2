const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

// READ ALL users
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [users] = await connection.query('SELECT * FROM user');
    await connection.end();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération users', error: err });
  }
});

// READ ONE user by id
router.get('/:id', async (req, res) => {
  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [users] = await connection.query('SELECT * FROM user WHERE id_user = ?', [req.params.id]);
    await connection.end();
    if (users.length === 0)
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération user', error: err });
  }
});

// CREATE user
router.post('/', async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [result] = await connection.query(
      'INSERT INTO user (nom, prenom, email, password) VALUES (?, ?, ?, ?)',
      [nom, prenom, email, password]
    );
    await connection.end();
    res.status(201).json({ message: 'Utilisateur créé', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Erreur création user', error: err });
  }
});

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [result] = await connection.query(
      'UPDATE user SET nom = ?, prenom = ?, email = ?, password = ? WHERE id_user = ?',
      [nom, prenom, email, password, req.params.id]
    );
    await connection.end();
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur mis à jour' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur mise à jour user', error: err });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [result] = await connection.query(
      'DELETE FROM user WHERE id_user = ?',
      [req.params.id]
    );
    await connection.end();
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur suppression user', error: err });
  }
});

module.exports = router;