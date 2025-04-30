const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

app.use(express.json({ limit: '10mb' })); // Augmente la limite à 10 Mo
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuration des bases de données
const dbConfigs = {
  mspr_clean: {
    host: 'mysql-mspr.alwaysdata.net',
    port: 3306,
    user: 'mspr',
    password: 'GMW2bwi1',
    database: 'mspr_clean',
  },
  mspr_bdd: {
    host: 'mysql-mspr.alwaysdata.net',
    port: 3306,
    user: 'mspr',
    password: 'GMW2bwi1',
    database: 'mspr_bdd',
  },
};

// Route pour récupérer les pays (utilise mspr_clean)
app.get('/pays', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfigs.mspr_clean);
    const query = `SELECT DISTINCT id_pays, nom_pays FROM mspr_clean.pays`;
    const [pays] = await connection.query(query);
    await connection.end();
    res.json(pays);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des pays', error });
  }
});

// Route pour récupérer toutes les pandémies (utilise mspr_clean)
app.get('/pandemie', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfigs.mspr_clean);
    const query = `SELECT DISTINCT id_pandemie, nom_pandemie FROM mspr_clean.pandemie`;
    const [pandemies] = await connection.query(query);
    await connection.end();
    res.json(pandemies);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des pandémies', error });
  }
});

// Route pour récupérer les statistiques filtrées
app.post('/stats', async (req, res) => {
  try {
    const { countryId, typeId, startDate, endDate } = req.body;

    let query = `
      SELECT 
        stat_pandemie.nouveaux_cas,
        stat_pandemie.nouveaux_deces,
        stat_pandemie.nouveaux_gueris,
        stat_pandemie.cas_actifs,
        stat_pandemie.id_pays,
        pandemie.nom_pandemie,
        stat_pandemie.id_pandemie,
        pays.nom_pays,
        stat_pandemie.date
      FROM mspr_clean.stat_pandemie
      JOIN mspr_clean.pays ON stat_pandemie.id_pays = pays.id_pays
      JOIN mspr_clean.pandemie ON stat_pandemie.id_pandemie = pandemie.id_pandemie
      WHERE 1=1
    `;

    const params = [];
    if (countryId) {
      query += ' AND stat_pandemie.id_pays = ?';
      params.push(countryId);
    }
    if (typeId) {
      query += ' AND stat_pandemie.id_pandemie = ?';
      params.push(typeId);
    }
    if (startDate) {
      query += ' AND stat_pandemie.date >= ?';
      params.push(startDate);
    }
    if (endDate) {
      query += ' AND stat_pandemie.date <= ?';
      params.push(endDate);
    }

    query += ' ORDER BY stat_pandemie.date';

    const connection = await mysql.createConnection(dbConfigs.mspr_clean);
    const [stats] = await connection.query(query, params);
    await connection.end();

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques', error });
  }
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
