const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [pays] = await connection.query('SELECT DISTINCT id_pays, nom_pays FROM pays');
    await connection.end();
    res.json(pays);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des pays', error });
  }
});

module.exports = router;
