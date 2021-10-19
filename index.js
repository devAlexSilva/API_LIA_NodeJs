const express = require('express');
const app = express();
const mongoose = require('mongoose');

//utilizando a model
require('./models/User');
const User = mongoose.model('user');

// config para JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//conect >> mongodb+srv://Alex:<password>@cluster0.0bzor.mongodb.net/LIAbancoAPI?retryWrites=true&w=majority
//pass >> RJSvJisMidIJfk0K
const DB_USER = 'Alex';
const DB_PASSWORD = encodeURIComponent('RJSvJisMidIJfk0K');

//conectar ao Mongo Db
try {
    mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.0bzor.mongodb.net/LIAbancoAPI?retryWrites=true&w=majority`
    ).then(() => {
        app.listen(4000);
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

//rota para criar usuarios @method POST 
app.post("/user", async (req, res) => {
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
app.get("/user", async (req, res) => {
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
app.get("/user/:id", async (req, res) => {
    try {
        const data = await User.findById(req.params.id);

/* as vezes retorna null quando não encontra usuario 
 * então vou tratar esse dado de forma individual nesses casos*/
data ?? res.status(422).json({message: "Nenhum usuario encontrado"}); 


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
