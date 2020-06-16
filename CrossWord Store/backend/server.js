import express from 'express';
import data from "./data";

const app = express();

app.get("/api/products/:id", (req, res) => {

    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if(product)
        res.send(product);
    else
        res.status(404).send({msg: "Produto Não Encontrado."})

});

app.get("/api/products", (req, res) => {

    res.send(data.products);

});

app.listen(5000, () => {console.log("Servidor iniciado em http://localhost:5000")});


/* Basta digitar "npm start" que estara setado para que abra o servidor */