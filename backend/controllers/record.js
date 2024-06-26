const Record = require('../models/Record');
const fs = require('fs');

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

exports.getOneRecord = (req, res) => {
    const paramsId = req.params.id
    const userId = req.auth.userId;

    if (!userId) {
        return res.status(401).json({ error: "Accès non autorisé !" });
    }

    Record.findOne({ _id: paramsId, userId })
        .then(record => res.status(200).json(record))
        .catch(error => res.status(404).json({ error }))
};

exports.createRecord = (req, res) => {
    try {
        const { artist, album, genre, date, grade, state, seriesNumber, comments } = req.body;
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
            seriesNumber,
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

exports.modifyRecord = (req, res) => {
    const paramsId = req.params.id
    const userId = req.auth.userId;
    const coverUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    const { artist, album, genre, date, grade, state, seriesNumber, comments } = req.body
    if (!artist || !album || !date || !grade || !state) {
        return res.status(400).json({ error: 'Champs obligatoires non renseignés !' });
    }

    const recordObject = req.file ? {
        ...req.body,
        coverUrl
    } : { ...req.body };

    Record.findOne({ _id: paramsId })
        .then((record) => {
            if (record.userId != userId) {
                res.status(403).json({ message: 'Requête non autorisée' });
            } else {
                const filename = record.coverUrl.split('/images/')[1];
                fs.unlink(`images/resized_images/${filename}`, () => {
                    Record.updateOne({ _id: paramsId }, { ...recordObject, _id: paramsId})
                        .then(() => res.status(200).json({ message: 'Disque modifié !' }))
                        .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deleteRecord = (req, res) => {
    const paramsId = req.params.id
    const userId = req.auth.userId;

    Record.findOne({ _id: paramsId })
        .then((record) => {
            if (record.userId != userId) {
                res.status(403).json({ message: 'Requête non autorisée' });
            } else {
                const filename = record.coverUrl.split('/images/')[1];
                fs.unlink(`images/resized_images/${filename}`, () => {
                    Record.deleteOne({ _id: paramsId })
                    .then(() => res.status(200).json({ message: 'Disque supprimé !' }))
                    .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch(error => res.status(500).json({ error }));
};