const mongoose = require('mongoose');


const Form = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    status: {
        type: String,
        lowercase: true,
        required: true
    },

    body: {
        type: String,
    },

    time: {
        type: Date,
        default: Date.now
    },

    ofUser: {
        type: String, //vai receber o id do usuario logado como referencia para consultas e update/delete
    }
});

mongoose.model('form', Form);