const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

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
        minlength: 6,
    },
    observation: {
        type: String,
    },
    createdAt: {
        type: Date,
        timestamps: true,
    } 

});


User.pre('save', async function() {
    cryptPassword = await bcrypt.hash(this.password, 10);
    this.password = cryptPassword; 
    
    
});

//(nome da model a ser criada no db, nome do schema sendo usado);
 mongoose.model('user', User);
