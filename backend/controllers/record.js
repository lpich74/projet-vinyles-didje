const Record = require('../models/Record');

exports.getAllRecords = (req, res) => {
    Record.find()
        .then(records => res.status(200).json(records))
        .catch(error => res.status(400).json({ error }))
};

exports.getMyRecords = (req, res) => {
    const userId = req.auth.userId;

    if (!userId) {
        return res.status(401).json({ error: "Accès non autorisé !" });
    }

    Record.find({ userId })
        .then(records => res.status(200).json(records))
        .catch(error => res.status(500).json({ error: "Internal Server Error" }));
};

exports.createRecord = (req, res) => {
    try {
        const { artist, album, genre, date, grade, state, comments } = req.body;
        if (!artist || !album || !date || !grade || !state) {
            return res.status(400).json({ error: 'Champs obligatoires non renseignés !' });
        }

        const coverUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const userId = req.auth.userId;
        const record = new Record({
            coverUrl,
            artist,
            album,
            genre,
            date,
            grade,
            state,
            comments,
            userId,
        });

        record.save()
            .then(() => res.status(201).json({ message: 'Disque enregistré !' }))
            .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};