import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import ProductManager from '../Manager/ProductManager.js'
// import cartRouter from './routes/cart.router.js';
// import productsRouter from './routes/products.router.js';

const manager = new ProductManager();
const PORT = 8080;
const app = express();

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public')); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', viewRouter);

const httpServer = app.listen(PORT, () =>{
    console.log('Servidor funcionando en el puerto: ' + PORT);
})

const socketServerIO = new Server(httpServer)

socketServerIO.on('connection', socket=>{
    console.log('Usuario conectado');

    socket.on("message", async nuevoProducto =>{
        nuevoProducto = await manager.addProduct(nuevoProducto)
        const productos = await manager.getProducts();
        socketServerIO.emit('agregado', productos);
    })

    socket.on('productDelete', async data =>{
        console.log('Se eliminó el producto con el id: '+data);
        await manager.deleteProduct(data);
        const productos = await manager.getProducts();
        socketServerIO.emit('eliminado', productos);
    })
})

// app.use('/api/products', productsRouter);
// app.use('/api/products/:pid', productsRouter);

// app.use('/api/carts/', cartRouter);
// app.use('/api/carts/:cid', cartRouter);

