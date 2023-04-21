import express from 'express';
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, () =>{
    console.log('Servidor funcionando en el puerto: ' + PORT);
})

app.use('/api/products', productsRouter);
app.use('/api/products/:pid', productsRouter);

app.use('/api/carts/', cartRouter);
app.use('/api/carts/:cid', cartRouter);
