const Record = require('../models/Record');

exports.getAllRecords = (req, res) => {
    Record.find()
        .then(records => res.status(200).json(records))
        .catch(error => res.status(400).json({ error }))
};

exports.createRecord = (req, res) => {
    const { artist, album, genre, date, grade, state, comments } = req.body;
    const coverUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const userId = req.auth.userId;

    const record = new Record({
        coverUrl: coverUrl,
        artist: artist,
        album: album,
        genre: genre,
        date: date,
        grade: grade,
        state: state,
        comments: comments,
        userId: userId
    });

    record.save()
        .then(() => res.status(201).json({ message: 'Disque enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};