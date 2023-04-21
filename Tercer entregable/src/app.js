import express from 'express';
import ProductManager from '../Manager/ProductManager.js';

const productManager = new ProductManager();

const PORT = 8080;
const app = express();
app.listen(PORT, () =>{
    console.log('Servidor funcionando en el puerto: ' + PORT);
})

app.get('/products', async (req,res)=>{
    const {limit} = req.query
    const mostrarProductos = await productManager.getProducts(limit);
    res.send(mostrarProductos);
});

app.get('/products/:pid', async (req,res)=>{

    const id = req.params.pid;
    const mostrarProductosById = await productManager.getProductsById(id);
    res.send(mostrarProductosById);
});