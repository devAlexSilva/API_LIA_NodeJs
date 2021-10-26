//definindo rotas para usuarios
const express = require('express');
const mongoose = require('mongoose');
require('../models/User');

const User = mongoose.model('user');
const router = express.Router();


const authAcess = require('./configs/middleConfig');
router.use(authAcess);

//rota para criar usuarios
router.post("/add", async (req, res) => {
    try {
        await User.create(req.body)

        return res.status(200).json({ message: "cadastrado com sucesso" })
    } catch (err) {
        return res.status(500).json({
            message: "falha ao cadastrar",
            fail: err
        })
    }
});


//rota para listar todos os usuarios do DB
router.get("/", async (req, res) => {
    try {
        const data = await User.find();
        return res.status(200).json(data);

    } catch (err) {
        return res.status(400).json({
            message: "Nenhum usuario encontrado",
            fail: err
        });
    }

})



//rota para listar usuarios por id
router.get("/:id", async (req, res) => {
    try {
        const data = await User.findById(req.params.id);

        /* as vezes retorna null quando não encontra usuario 
         * então vou tratar esse dado de forma individual nesses casos*/
        data ?? res.status(422).json({ message: "Nenhum usuario encontrado" });


        return res.status(200).json(data);

    } catch (err) {
        return res.status(400).json({
            message: "Nenhum usuario encontrado",
            fail: err
        });
    }

})




/*rota para editar (estudar melhor as diferenças do method put e patch)
* nesse caso, usando o patch porque é uma atualização parcial */
router.post("/:id/edit", async (req, res) => {
    const { name, observation } = req.body;
    const id = req.params.id;

 


    try {
        await User.updateOne({ _id: id }, {
            $set: {
                name: name,
                observation: observation,
            },
            $currentDate: {
                lastModfied: true,
            },
        });

        return res.status(200).json({ message: "atualizado com sucesso" })

    } catch (err) {
        return res.status(500).json({
            message: "falha ao atualizar",
            fail: err
        })
    }
});



//rota para excluir um usuario
router.post("/:id/delete", async (req, res) => {
    const id = req.params.id;

    try {
        await User.deleteOne({ _id: id })
        return res.status(200).json({ message: "Deletado com sucesso" })

    } catch (err) {
        return res.status(500).json({
            message: "falha ao deletar",
            fail: err
        });
    }
});







//pegando o app que foi passado pra ca e indexando as rotas daqui com o prefixo /auth
module.exports = (app) => app.use('/user', router);