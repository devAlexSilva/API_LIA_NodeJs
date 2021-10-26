const express = require('express');
const mongoose = require('mongoose');
require('../models/Form');

const Form = mongoose.model('form');
const router = express.Router();


const authAcess = require('./configs/middleConfig');
router.use(authAcess);

//rota para criar formulários
router.post("/add", async (req, res) => {
    let form = req.body;
    let formRegistration = {
        title: form.title,
        status: form.status,
        body: form.body,
        idOfUser: idInToken //peguei o id do usuario logado pelo token, pra criar os forms com esse id e relacionar o form com o usuario.
    }
    
    try {
        await Form.create(formRegistration);

        return res.status(200).json({ message: "cadastrado com sucesso" })
    } catch (err) {
        return res.status(500).json({
            message: "falha ao cadastrar",
            fail: err
        })
    }
});


//rota para listar todos os formulários do DB de acordo com o usuario logado
router.get("/", async (req, res) => {
    try {
        const formData = await Form.find({ idOfUser: idInToken });
        return res.status(200).json(formData);

    } catch (err) {
        return res.status(400).json({
            message: "Nenhum formulário encontrado",
            fail: err
        });
    }

})



//rota para listar forms por id
router.get("/:id", async (req, res) => {
    try {
        const formData = await Form.findById(req.params.id);

        /* as vezes retorna null quando não encontra usuario 
         * então vou tratar esse dado de forma individual nesses casos*/
        formData ?? res.status(422).json({ message: "Nenhum formulário encontrado" });


        return res.status(200).json(formData);

    } catch (err) {
        return res.status(400).json({
            message: "Nenhum formulário encontrado",
            fail: err
        });
    }

})




router.post("/:id/edit", async (req, res) => {
    const { title, status, body } = req.body;
    const id = req.params.id;

 
    try {
        await Form.updateOne({ _id: id }, {
            $set: {
                title: title,
                status: status,
                body: body
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



//rota para excluir um formulario
router.post("/:id/delete", async (req, res) => {
    const id = req.params.id;

    try {
        await Form.deleteOne({ _id: id })
        return res.status(200).json({ message: "Deletado com sucesso" })

    } catch (err) {
        return res.status(500).json({
            message: "falha ao deletar",
            fail: err
        });
    }
});







//pegando o app que foi passado pra cá e indexando as rotas daqui com o prefixo /auth
module.exports = (app) => app.use('/form', router);