const express = require('express');

const app = express();

const userRoutes = require('./routes/user');

const mongoose = require('mongoose');
require('dotenv').config();
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/', (req, res) => {
    res.send('Ce serveur est utilisé pour le site des vinyles de Didje');
});

app.use('/api/auth', userRoutes);

module.exports = app;