import ProductManager from "./Manager/ProductManager.js";

let manager = new ProductManager('./files/Productos.json');

const env = async () => {

    let producto = {
        title: "Xiaomi Note 11 Pro",
        description: "Nuevo dispositivo inteligente",
        price: "50000",
        thumbnail: "",
        code: "300",
        stock: "8",
    }

// CODIGOS PARA LLAMAR A LOS METODOS

    // let mostrarProductos = await manager.getProducts();
    // console.log(mostrarProductos);

    // let crearProducto = await manager.crearProducto(producto);
    // console.log(crearProducto);

    // let Consultarproductos = await manager.consultarProductos();
    // console.log(Consultarproductos); 

    // let traerProductoById = await manager.getProductsById(2);
    // console.log(traerProductoById);

    // let borrarProductosById = await manager.deleteProducts(3);
    // console.log(borrarProductosById);

    // let ModificarProducto = await manager.updateProduct(2, '280000');
    // console.log(ModificarProducto);
}

env();