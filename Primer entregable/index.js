class ProductManager {

    constructor (){
        this.products = [];
    }
        
    getProducts(){
        return this.products;
    }

    addProduct(title, description, price, thumbnail, stock, code){
        let id_product = this.getProducts().length;

        let producto = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            stock: stock,
            id: ++id_product,
            code: code
        }

        
        if (!title || !description || !price || !code || !stock) {
            return console.log(`Todos los campos son obligatorios.`);
            
        }
        
        let codigo = this.products.find((prod) => prod.code == producto.code)

        if(codigo){
            return console.log("El codigo ya existe, ingrese uno nuevo");
        }else{
            this.products.push(producto);
            return this.products;
        }
    }

    getProductById(id_product){

        let producto = this.products.find(producto => producto.id === id_product)

        if(producto){
            return producto;

        }else{
            return console.log("not found");
        }
    }
}


const productos = new ProductManager()
productos.addProduct("Samsung S23 Ultra", "256GB + Cargador de 45W Batería de 5000 mAh", 430000, "#", 12, 500);
productos.addProduct("Samsung S22 Ultra", "Muere el Galaxy Note, en pos de un modelo Ultra que hereda el S-Pen.", 250000, "#", 3, 400)
productos.addProduct("Xiaomi Redmi Note 8", "Este Redmi tiene buen diseño, el resto de elementos tienen mucho margen de mejora.", 60000, "#", 4, 300);


console.log(productos.getProductById(1));
console.log(productos.getProductById(2));
console.log(productos.getProductById(4));



