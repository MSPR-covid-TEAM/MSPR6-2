const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [pandemies] = await connection.query('SELECT DISTINCT id_pandemie, nom_pandemie FROM pandemie');
    await connection.end();
    res.json(pandemies);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des pandémies', error });
  }
});

module.exports = router;
