const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
 
const app = express();
app.use(express.json());

//liberando a API
app.use(cors());


//conectar ao Mongo Db
try {
    mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0bzor.mongodb.net/LIAbancoAPI?retryWrites=true&w=majority`
    ).then(() => {
        app.listen(process.env.DB_PORT);
        console.log('conectado ao Db com sucesso');
    });
    //******* não consigo mostrar o erro no log
} catch (err) { console.log(`verifique o erro -> ${err}`); };


//------------------------rotas-----------------//


app.get("/", (req, res) => {
    try {
        res.sendStatus(200);
    } catch (err) { console.error(`Ops! houve um erro -> ${err}`); }
})

//passando o app para os controlers, dessa forma não duplica a inicialização da aplicação
require('./controllers/formsController')(app);
require('./controllers/usersController')(app);

require('./controllers/configs/authConfig')(app);










