require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/pays', require('./routes/pays'));
app.use('/pandemie', require('./routes/pandemie'));
app.use('/stats', require('./routes/stats'));
app.use('/stats', require('./routes/crudStats'));
app.use('/user', require('./routes/crudUser'));

// ✅ Export uniquement l'app pour les tests
module.exports = app;

// ✅ Si exécuté directement : démarrer le serveur
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}
