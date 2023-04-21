import fs from 'fs';
const path = '../files/carritos.json';

export default class CarritosManager {

    agregarProdAlCart = async (idCart, idProd) => {
        const carritos = await this.getCarritos();
        
        const findedCart = carritos.find((cart) => cart.id == idCart);
      
        let productosEnElCarrito = findedCart.products;

        const productoIndex = productosEnElCarrito.findIndex((prodIndex)=> prodIndex.id === idCart);

        if(productoIndex !== -1){
            productosEnElCarrito[productoIndex].quantity = productosEnElCarrito[productoIndex].quantity + 1;
        }else{
            let producto = {
                id: idProd,
                quantity: 1,
            }
            productosEnElCarrito.push(producto);
        }
        await fs.promises.writeFile(path, JSON.stringify(carritos, null, '\t'));
        return findedCart;
    };

    getCarritos = async () => {
        if (fs.existsSync(path)){
            const data = await fs.promises.readFile(path, "utf-8");
            const carritos = JSON.parse(data);
            return carritos;
        }else{
            return [];
        }
    };

    getCarritoById = async (idCart) => {
        const carritos = await this.getCarritos();
        const carritoId = carritos.find(cart => cart.id == idCart);
        if(carritoId){
            return carritoId;
        }else{
            return `El producto con ese ID no existe`
        }
    };

    agregarCarrito = async () => {
        const carritos = await this.getCarritos();
        let carrito = {
            products: []
        };

        if (carritos.length === 0) {
            carrito.id - 1;
        }else{
            carrito.id = carritos [carritos.length - 1].id + 1;
        }
        carritos.push(carrito)

        await fs.promises.writeFile(path, JSON.stringify(carritos, null, '\t'));
        return carrito;
    }
}