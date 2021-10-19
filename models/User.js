const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    observation: {
        type: String,
    },
    createdAt: {
        type: Date,
        timestamps: true,
    } 

});
//(nome da model a ser criada no db, nome do schema sendo usado);
 mongoose.model('user', User);
