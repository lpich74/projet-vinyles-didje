const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require('./routes/user');
const recordRoutes = require('./routes/record');

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

app.use('/api/auth', userRoutes);
app.use('/api/records', recordRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;