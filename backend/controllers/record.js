const Record = require('../models/Record')

exports.createRecord = (req, res) => {
    const recordObject = req.body;
    const userId = req.auth.userId;
    const coverUrl = `${req.protocol}://${req.get('host')}/images/${req.body.cover}`;
    const record = new Record({
        ...recordObject,
        userId: userId,
        coverUrl: coverUrl
    });
    record.save()
        .then(() => res.status(201).json({ message: 'Disque enregistré !'}))
        .catch(error => res.status(400).json({ error })); 
};