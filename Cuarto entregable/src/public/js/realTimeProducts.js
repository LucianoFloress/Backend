const socket = io();

const btnAgregarProd = document.getElementById('btnAgregarProd');

btnAgregarProd.addEventListener('click', ()=>{   
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const status = true;

    const nuevoProducto = {title, description, price, thumbnail, code, stock, status, category};

    socket.emit('message', nuevoProducto)
})


socket.on('agregado', productos => {
    let listaProductos = document.getElementById('productos')
    listaProductos.innerHTML = 'Lista de productos: \n';
    productos.forEach(prod =>{
        let p = document.createElement('p');
        p.innerHTML = `
        id: ${prod.id}
        title: ${prod.title}
        description: ${prod.description}
        code: ${prod.code}
        price: ${prod.price}
        status: true
        stock: ${prod.stock}
        category: ${prod.category}
        thumbnail: ${prod.thumbnail}`;
        listaProductos.appendChild(p);
    })
})

const formDelete = document.querySelector('#formDelete');
const deleteButton = document.querySelector('#delete-button');
deleteButton.addEventListener('click', () => {
    const id = document.querySelector('#number-input').value;
    socket.emit('productDelete', id);
});

socket.on('eliminado', productos =>{
    let listaProductos = document.getElementById('productos')
    listaProductos.innerHTML = '';
    productos.forEach(prod =>{
        let p = document.createElement('p');
        p.innerHTML = `
        id: ${prod.id}
        title: ${prod.title}
        description: ${prod.description}
        code: ${prod.code}
        price: ${prod.price}
        status: true
        stock: ${prod.stock}
        category: ${prod.category}
        thumbnail: ${prod.thumbnail}`;
        listaProductos.appendChild(p);
    })
});