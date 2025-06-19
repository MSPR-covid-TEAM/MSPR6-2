const express = require('express');
const bcrypt = require('bcrypt');
const { getConnection } = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all users
router.get('/', auth, async (req, res) => {
  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [users] = await connection.query('SELECT id_user, nom, prenom, lang, email FROM user');
    await connection.end();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération user', error: err });
  }
});

// UPDATE user (modification partielle, hash password si fourni, sécurisé par Bearer)
router.put('/:id', auth, async (req, res) => {
  if (parseInt(req.params.id) !== req.user.id_user) {
    return res.status(403).json({ message: 'Accès interdit : vous ne pouvez modifier que votre propre profil.' });
  }

  try {
    const { nom, prenom, email, password, lang } = req.body;
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);

    // Récupérer l'utilisateur existant
    const [rows] = await connection.query(
      'SELECT * FROM user WHERE id_user = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      await connection.end();
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Préparer les champs à mettre à jour
    let fields = [];
    let values = [];

    if (nom !== undefined) {
      fields.push('nom = ?');
      values.push(nom);
    }
    if (prenom !== undefined) {
      fields.push('prenom = ?');
      values.push(prenom);
    }
    if (email !== undefined) {
      fields.push('email = ?');
      values.push(email);
    }
    if (lang !== undefined) {
      const allowedLangs = ['FRENCH', 'ENGLISH', 'SPANISH', 'GERMAN'];
      if (!allowedLangs.includes(lang)) {
        await connection.end();
        return res.status(400).json({ message: 'Langue non autorisée' });
      }
      fields.push('lang = ?');
      values.push(lang);
    }
    if (password !== undefined && password !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push('password = ?');
      values.push(hashedPassword);
    }

    if (fields.length === 0) {
      await connection.end();
      return res.status(400).json({ message: 'Aucun champ à mettre à jour' });
    }

    values.push(req.params.id);

    const sql = `UPDATE user SET ${fields.join(', ')} WHERE id_user = ?`;
    const [result] = await connection.query(sql, values);
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