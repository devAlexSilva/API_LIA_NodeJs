const { json } = require("express");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    //buscar o token passado na req
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).json({fail: "token não encontrado"})

    const token = req.header('authorization').replace('Bearer ', '');
    jwt.verify(token, process.env.AUTH_CONFIG, (err, decoded) =>{
        if(err) return res.send("token incompativel!!");

        //id que foi repassado junto com o token na geração
        req.useId = decoded.id;

        return next();
    });

};