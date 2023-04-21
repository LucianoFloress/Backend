import { Router } from 'express';
import ProductManager from '../../Manager/ProductManager.js';

const products = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
    const {limit} = req.query
    const mostrarProductos = await products.getProducts(limit);
    res.send(mostrarProductos);
})

router.get('/:pid', async (req, res) => {
    const id = req.params.pid;
    const mostrarProductosById = await products.getProductsById(id);
    res.send(mostrarProductosById);
})

router.post('/', async (req,res)=>{

    const {title, description, price, thumbnail, code, stock, category} = req.body

    if(!title || !description || !price || !thumbnail || !code || !stock || !category){
        res.send('Faltan datos')
        return
    }

    const producto = {
        title, description, price, thumbnail, code, stock, status:true, category
    }

    const msg  = await products.addProduct(producto);
    res.send(msg);
})

router.put('/:pid', async (req,res)=>{
    const id = req.params.id;

    const updateProduct = req.body
    res.send(await products.modifyProduct(id, updateProduct));
})

router.delete('/:pid', async (req,res)=>{
    const id = req.params.pid;
    const msg = await products.deleteProduct(id);
    res.send(msg)
})

export default router;