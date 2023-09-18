import { productosDisponibles } from "./inicio.js"

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]))


document.addEventListener("DOMContentLoaded", () => {
    dibujarCarrito()
})


let carrito = JSON.parse(sessionStorage.getItem("carrito"))
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
const btnCarrito = document.getElementById("btnCarrito")

const carritoTable = document.getElementById("carrito")


btnCarrito.addEventListener("click", () => {    
    if(carritoTable.style.display === "block"){
        carritoTable.style.display = "none"
    }else{
        carritoTable.style.display = "block"
        dibujarCarrito()
    }
    
    })

export const comprarProducto = (idProducto) => {

    Toastify({
        text: 'Producto agregado al carrito',
        duration: 3000, // Duración en milisegundos
        gravity: 'top', // Posición de la notificación
        backgroundColor: 'green', // Color de fondo
      }).showToast();
    const producto = productosDisponibles.find((producto) => producto.id === idProducto)

    const { nombre, precio, imagen, id } = producto

    const productoCarrito = carrito.find((producto) => producto.id === idProducto)

    if(productoCarrito === undefined){
        const nuevoProductoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        }

    carrito.push(nuevoProductoCarrito)
    sessionStorage.setItem("carrito", JSON.stringify(carrito) )
    }else{
        const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto)

        carrito[indexProductoCarrito].cantidad++
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }
    carrito = JSON.parse(sessionStorage.getItem("carrito"))

     const compra = document.getElementById("contenedor");
     const compraste = document.createElement("p");
     compraste.textContent= `usted compro el producto ${nombre}`;
        compra.appendChild(compraste);

    /*alert(`usted compro el producto ${nombre}`)*/

}

const dibujarCarrito = () => {

        listaCarrito.innerHTML = ''
    carrito.forEach(producto => {
        const { imagen, nombre, cantidad, precio, id } = producto
        let body = document.createElement("tr")

        body.className = "producto__carrito"

        body.innerHTML = `
        <th><img id="fotoProductoCarrito" src="${imagen}" class="card-img-top" style="width:40%; height: 30%"</th>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio /cantidad}</td>
        <td>${precio}</td>
        <td>
        <button id="+${id}" class="btn btn-success">+</button>
        <button id="-${id}" class="btn btn-danger">-</button>
        </td>
        `

        listaCarrito.append(body)
        
        const btnAgregar = document.getElementById(`+${id}`)
        const btnRestar = document.getElementById(`-${id}`)

        btnAgregar.addEventListener("click", () => aumentarCantidad(id))
        btnRestar.addEventListener("click", () => restarCantidad(id))
        
    });

    dibujarFooter()
}

const dibujarFooter = () => {

    if(carrito.length > 0){
        footCarrito.innerHTML = ""

        let footer = document.createElement("tr")

        footer.innerHTML = `
        <th><b>Totales:</b></th>
        <td></td>
        <td>${generarTotales().cantidadTotal}</td>
        <td></td>
        <td>${generarTotales().costoTotal}</td>
        `

        footCarrito.append(footer)
    }else{
        footCarrito.innerHTML = "<h3>No hay producto en carrito</h3>"
    }

}


const generarTotales = () => {
    const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
    const cantidadTotal = carrito.reduce((total, {cantidad}) => total + cantidad, 0)

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
}


const aumentarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad++
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    dibujarCarrito()

}
const btnCerrarCarrito = document.getElementById("btnCerrarCarrito");

btnCerrarCarrito.addEventListener("click", () => {
  cerrarCarrito();
});

// Función para cerrar el carrito
function cerrarCarrito() {
  const carritoTable = document.getElementById("carrito");
  carritoTable.style.display = "none";
}
const restarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad--
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

    if(carrito[indexProductoCarrito].cantidad === 0){
        carrito.splice(indexProductoCarrito, 1)
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    dibujarCarrito()



}
