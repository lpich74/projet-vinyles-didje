const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Ce serveur est utilisé pour le site des vinyles de Didje');
});

module.exports = app;