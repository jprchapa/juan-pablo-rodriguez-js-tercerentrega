//Productos en stock
let productos = [
    { nombre: "producto 1", precio: 100, tipo: "categoria 1", id:"1", imagen:"./multimedia/producto1.jpg"  },
    { nombre: "producto 2", precio: 200, tipo: "categoria 2", id:"2", imagen:"./multimedia/producto2.jpg" },
    { nombre: "producto 3", precio: 300, tipo: "categoria 2", id:"3", imagen:"./multimedia/producto3.jpg" },
    { nombre: "producto 4", precio: 400, tipo: "categoria 3", id:"4", imagen:"./multimedia/producto4.jpg" },
    { nombre: "producto 5", precio: 500, tipo: "categoria 3", id:"5", imagen:"./multimedia/producto5.jpg" }
]

const contenedorProductos = document.querySelector("#contenedor-productos")

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    mostrarStock();
    mostrarCarritoEnHTML();
    totalCarrito();
});
//Mostrar Stock

function mostrarStock(){
    productos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
        <h2 class="producto-nombre">${producto.nombre}</h2>
        <p>Descripción del Producto 1</p>
        <p class="precio">$${producto.precio}</p>
        <button class="agregar-carrito" id="${producto.id}">Agregar al Carrito</button>
        `
        contenedorProductos.append(div)
    })    
}

mostrarStock()

//Agregar productos al carrito 
/* let carrito = [] */

function botonAgregar() {
    const botonesAgregar = document.querySelectorAll(".agregar-carrito")
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

botonAgregar()

function agregarAlCarrito(e) {
    const idboton = e.currentTarget.id
    const productoEncontrado = productos.find(producto => producto.id === idboton)
    const productoEnCarrito = carrito.find(item => item.id === productoEncontrado.id)

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++
    } else {
        productoEncontrado.cantidad = 1
        carrito.push(productoEncontrado)
    }

    mostrarCarritoEnHTML()
    totalCarrito()

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//calcular total carrito

function totalCarrito(){
    let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
    console.log(`El total del carrito es: ${totalCarrito}`)
}


function mostrarCarritoEnHTML() {
    const listaProductosCarrito = document.querySelector('#lista-carrito')
    listaProductosCarrito.innerHTML = ''

    let total = 0

    for (let producto of carrito) {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerHTML = `
            <img class="producto-imagen-carrito" src="${producto.imagen}" alt="${producto.nombre}">
            Producto: ${producto.nombre}, 
            Precio: $${producto.precio},   
            Cantidad: ${producto.cantidad}    
            Precio Total: $${producto.precio * producto.cantidad}
            <button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>
        `;

        listaProductosCarrito.appendChild(itemCarrito);

        total += producto.precio * producto.cantidad;
    }

    const totalCarritoEnHTML = document.querySelector('#total-carrito')
    totalCarritoEnHTML.innerHTML = total

    // Agregar event listener para eliminar productos
    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarProducto);
    });
}
function eliminarProducto(e) {
    const idProducto = e.target.dataset.id;
    const productoEnCarrito = carrito.find(item => item.id === idProducto);

    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad--;
        } else {
            carrito = carrito.filter(producto => producto.id !== idProducto);
        }
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarritoEnHTML();
    totalCarrito();
}