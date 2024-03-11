const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash
            });
            const userId = user._id;
            const token = jwt.sign(
                { userId: userId },
                process.env.SECRET_TOKEN,
                { expiresIn: '24h' }
            );
            user.save()
                .then(() => res.status(200).json({ message: 'Utilisateur enregistré !', token: token }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

exports.login = (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect !' });
                    }
                    const userId = user._id;
                    const token = jwt.sign(
                        { userId: userId },
                        process.env.SECRET_TOKEN,
                        { expiresIn: '24h' }
                    );
                    res.status(200).json({ userId: userId, token: token }); // Send response
                })
                .catch(error => res.status(500).json({ error })); // Handle bcrypt error
        })
        .catch(error => res.status(500).json({ error })); // Handle findOne error
};