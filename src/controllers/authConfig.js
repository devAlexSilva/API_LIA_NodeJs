const express = require('express');
const mongoose = require('mongoose');


const User = mongoose.model('user');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/*
configurações de autenticação
*/
router.post('/auth', async (req, res) => {
    const { email, password } = req.body;


    const user = await User.findOne({ email }).select('+password');




    if (!user)
        return res.status(400).json({ fail: 'usuario não encontrado' });

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).json({ fail: 'credenciais invalidas' });
    user.password = undefined;


    const token = jwt.sign({ id: user.id }, process.env.AUTH_CONFIG, {
        expiresIn: "3h"
    });


    
    res.json({ user, token });

})

module.exports = (app) => app.use('/api', router);