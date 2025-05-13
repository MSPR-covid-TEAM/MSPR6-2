const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");

// READ ALL
router.get("/", async (req, res) => {
  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [rows] = await connection.query("SELECT * FROM stat_pandemie");
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération stats", error: err });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [rows] = await connection.query(
      "SELECT * FROM stat_pandemie WHERE id_stat = ?",
      [req.params.id]
    );
    await connection.end();
    if (rows.length === 0)
      return res.status(404).json({ message: "Statistique non trouvée" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération stat", error: err });
  }
});

// CREATE
router.post("/create", async (req, res) => {
  try {
    const {
      id_pays,
      id_pandemie,
      date,
      nouveaux_cas,
      nouveaux_deces,
      nouveaux_gueris,
      cas_actifs,
    } = req.body;
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [result] = await connection.query(
      `INSERT INTO stat_pandemie 
        (id_pays, id_pandemie, date, nouveaux_cas, nouveaux_deces, nouveaux_gueris, cas_actifs) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id_pays,
        id_pandemie,
        date,
        nouveaux_cas,
        nouveaux_deces,
        nouveaux_gueris,
        cas_actifs,
      ]
    );
    await connection.end();
    res.status(201).json({ message: "Stat créée", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "Erreur création stat", error: err });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);

    // 1. Récupérer la statistique existante
    const [rows] = await connection.query(
      "SELECT * FROM stat_pandemie WHERE id_stat = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      await connection.end();
      return res.status(404).json({ message: "Statistique non trouvée" });
    }
    const existing = rows[0];

    // 2. Fusionner les données reçues avec l'existant
    const {
      id_pays = existing.id_pays,
      id_pandemie = existing.id_pandemie,
      date = existing.date,
      nouveaux_cas = existing.nouveaux_cas,
      nouveaux_deces = existing.nouveaux_deces,
      nouveaux_gueris = existing.nouveaux_gueris,
      cas_actifs = existing.cas_actifs,
    } = req.body;

    // 3. Mettre à jour avec les valeurs finales
    const [result] = await connection.query(
      `UPDATE stat_pandemie SET 
          id_pays = ?, 
          id_pandemie = ?, 
          date = ?, 
          nouveaux_cas = ?, 
          nouveaux_deces = ?, 
          nouveaux_gueris = ?, 
          cas_actifs = ?
         WHERE id_stat = ?`,
      [
        id_pays,
        id_pandemie,
        date,
        nouveaux_cas,
        nouveaux_deces,
        nouveaux_gueris,
        cas_actifs,
        req.params.id,
      ]
    );

    await connection.end();
    res.json({ message: "Stat mise à jour" });
  } catch (err) {
    res.status(500).json({ message: "Erreur mise à jour stat", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const connection = await getConnection(process.env.DB_MSPR_CLEAN);
    const [result] = await connection.query(
      "DELETE FROM stat_pandemie WHERE id_stat = ?",
      [req.params.id]
    );
    await connection.end();
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Statistique non trouvée" });
    res.json({ message: "Stat supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression stat", error: err });
  }
});

module.exports = router;
