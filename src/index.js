const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


app.use(express.json())

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
        res.json({
            message: "conectado na porta 4000",
        });
    } catch (err) { console.error(`verifique o erro -> ${err}`); }
})

//passando o app para os controlers, dessa forma não duplica a inicialização da aplicação
require('./controllers/authUsers')(app);
require('./controllers/authConfig')(app);










