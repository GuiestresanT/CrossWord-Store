import express from 'express';
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {

    res.send(data.products);

});

app.listen(5000, () => {console.log("Servidor iniciado em http://localhost:5000")});


/* Basta digitar "npm start" que estara setado para que abra o servidor */