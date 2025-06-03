require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/pays', require('./routes/pays'));
app.use('/pandemie', require('./routes/pandemie'));
app.use('/stats', require('./routes/stats'));
app.use('/stats', require('./routes/crud'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
