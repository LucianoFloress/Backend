import fs from 'fs';

const path = '../files/Productos.json';

export default class ProductManager {

    getProducts = async (limit) => {
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const products = JSON.parse(data);
            if (limit) {
                if (limit > 0){
                    const productsLimit = products.splice(0, limit)
                    return productsLimit;
                }else{
                    return `El limite debe ser mayor a 0`
                }
            }else{
                return products;
            }
        }else{
            return [];
        }
    }

    getProductsById = async (id) => {
        const producto = await this.getProducts();
        const productoId = producto.filter(producto => producto.id == id);
        if(productoId){
            return productoId;
        }else{
            return `El producto con ese ID no existe`
        }
    }

    addProduct = async (producto) => {
        const productos = await this.getProducts();

        if(productos.length === 0){
            producto.id = 1
        }else{
            producto.id = productos[productos.length-1].id+1;
        }
        productos.push(producto);

        try{
            await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
            return 'Producto creado'
        }catch (error){
            return error
        }
    }

    deleteProduct = async (id) =>{
        const productos = await this.getProducts();
        const productoIndex = productos.findIndex ((producto)=>{
            return producto.id == id
        })
        productos.splice(productoIndex,1)
        try{
            await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
            return 'Producto eliminado'
        }catch(error){
            return error
        }
    }

    modifyProduct = async (id, product)=>{
        const productById = await this.getProducts(id);

        if(!productById) return 'Producto no encontrado';
        await this.deleteProduct(id);

        const productoViejo = await this.getProducts();
        const products = [{...product, id : id}, ...productoViejo]
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
        return 'Producto modificado';        
    }
}