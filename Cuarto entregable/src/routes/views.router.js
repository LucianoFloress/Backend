import {Router} from 'express';
import ProductManager from '../../Manager/ProductManager.js';

const manager = new ProductManager();

const router = Router();

router.get('/', async (req,res)=>{
    const productos = await manager.getProducts();
    res.render('index', {
        productos,
        // style:'index.css'
    })
})

router.get('/realtimeproducts', async (req,res)=>{
    const productos = await manager.getProducts();
    res.render('realTimeProducts', {
        productos,
        // style:'index.css'
    })
})

export default router;