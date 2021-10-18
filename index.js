const express = require('express');
const app = express();

// config para JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//rota inicial
app.listen(4000);

app.get('/', (req, res) => {
    try {
        res.json({
            message:'conectado na porta 4000',
        });
    } catch (err) {
        console.error(`verifique o erro -> ${err}`);
    }
})

//pass >> RJSvJisMidIJfk0K

//conect >> mongodb+srv://Alex:<password>@cluster0.0bzor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority