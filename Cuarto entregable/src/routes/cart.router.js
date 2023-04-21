import { Router } from 'express';
import CarritosManager from '../../Manager/carritoManager.js';

const carritoManager = new CarritosManager();

const router = Router();

router.get('/', async (req, res) => {
    const mostrarCarritos = await carritoManager.getCarritos();
    res.send({mostrarCarritos});
});

router.get('/:cid', async (req, res) => {
    const id = req.params.cid;
    const traerCarritoById = await carritoManager.getCarritoById(id);
    res.send(traerCarritoById);
})

router.post('/', async (req, res) => {
    let nuevoCarro = await carritoManager.agregarCarrito();
    res.send({nuevoCarro});
});


router.post('/:cid/product/:pid', async (req,res) => {
    try{
        const idCart = req.params.cid
        const idProd = req.params.pid
        const resultado = await carritoManager.agregarProdAlCart(idCart, idProd)

        res.send(resultado);
    }catch (error){
        res.status(400).send({error: "not found"})
    }
})

export default router;