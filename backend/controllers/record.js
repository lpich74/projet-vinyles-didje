const Record = require('../models/Record')

exports.createRecord = (req, res) => {
    const recordObject = req.body;
    const record = new Record({
        ...recordObject,
        userId: req.auth.userId,
        coverUrl: `${req.protocol}://${req.get('host')}/images/${req.body.cover}`
    });
    console.log(userId);
    record.save()
        .then(() => res.status(201).json({ message: 'Disque enregistré !'}))
        .catch(error => res.status(400).json({ error })); 
};