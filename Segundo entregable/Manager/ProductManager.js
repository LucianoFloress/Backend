import fs from 'fs';

const path = './files/Productos.json';

export default class ProductManager {
    
    constructor(path){
        this.path = path;
    }

    consultarProductos = async () => {
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8')
            const productos = JSON.parse(data);
            return productos;
        }else{
            return [];
        }
    }

    crearProducto = async (producto) => {
        const productos = await this.consultarProductos();

        if(productos.length === 0){
            producto.id = 1
        }else{
            producto.id = productos[productos.length-1].id+1;
        }
        productos.push(producto);

        await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
        return producto;
    } 
    
    getProducts = async () => {
        const contenido = await fs.promises.readFile(this.path, 'utf-8');
        return contenido ? JSON.parse(contenido) : []; 
    }

    getProductsById = async (id) => {
        const producto = await this.getProducts();

        let productoId = producto.find(productos => productos.id === id);
        if(productoId){
            return productoId;
        }else{
            return console.log("El producto con ese ID no existe")
        }
    }

    updateProduct = async (id, price) => {
        let products = await fs.promises.readFile(this.path, 'utf-8');
        products = JSON.parse(products);

        let product = products.find((producto) => producto.id === id)

        if(product){
            product.price = price;

            products.map((product) => {
                if(product.id === id){
                    product = product;
                }
                return product;
            });

            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
            console.log(`Precio del producto ${id} actualizado a: ${price}`);
        }
    }

    deleteProducts = async (id) => {
        const productos = await this.getProducts();
        const index = productos.findIndex(productoId => productoId.id === id);

        if (index !== -1){
            const deletedProduct = productos.splice(index, 1)[0];
            fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'));
            return deletedProduct, `El producto con el id "${id}" ha sido eliminado`;
        }else{
            return console.log("Producto inexistente");
        }
    }

}
