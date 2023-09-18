
import { eliminarProducto } from "./administrador.js";

import { comprarProducto } from "./carrito.js";

const userLogin = document.getElementById("userLogin");
const divProductos = document.getElementById("productos");
const filterInput = document.getElementById("filter__input");
const filterLista = document.getElementById("filter__lista");
const filterNombre = document.getElementById("filter__nombre");
const filterPrecio = document.getElementById("filter__precio");

export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));
let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"));

document.addEventListener("DOMContentLoaded", () => {
  if (usuarioLogeado === null) {
    const a = document.createElement("a");
    a.href = "./html/usuarios.html";
    a.innerHTML = "Login";
    userLogin.appendChild(a);
  } else {
    const p = document.createElement("p");
    const close = document.createElement("button");

    p.innerHTML = `Bienvenido ${usuarioLogeado.user}`;
    close.id = "cerrar__sesion";
    close.innerHTML = "cerrar sesion";
    close.addEventListener("click", () => {
      p.innerHTML = `Gracias por comprar en nuestra tienda ${usuarioLogeado.user}. Usuario deslogeado`;

      sessionStorage.removeItem("usuario");
      location.reload();
    });
    userLogin.appendChild(p);
    userLogin.appendChild(close);
  }

  generarCardsProductos(productosDisponibles);
});

export const generarCardsProductos = (productos) => {
  divProductos.innerHTML = "";

  productos.forEach((producto) => {
    const { imagen, nombre, categoria, precio, id } = producto;

    let card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
      <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${imagen}" alt="Card image cap">
      <div class="card-body">
      <p class="card-title">${nombre}</p>
      <p class="card-text">Categoria: ${categoria}</p>
  
      <p class="card-text">Precio: <b>$${precio}</b></p>
      <button id="btn${id}" class="btn btn-primary">Comprar</button>

      ${
        usuarioLogeado?.admin === true
          ? `<button id="eliminar${id}" class="btn btn-danger">Eliminar</button>`
          : ""
      }
  
      </div>
      </div>`;

    divProductos.appendChild(card);

    const btnComprar = document.getElementById(`btn${id}`);
    btnComprar.addEventListener("click", () => comprarProducto(id));
   
    if (usuarioLogeado?.admin === true) {
      const btnEliminar = document.getElementById(`eliminar${id}`);
      btnEliminar.addEventListener("click", () => eliminarProducto(id));
    }
  });
};


filterInput.addEventListener("keyup", (e) => {
  const productosFilter = productosDisponibles.filter((producto) =>
    producto.nombre.toLowerCase().includes(e.target.value)
  );

  productosDisponibles = productosFilter;

  if (e.target.value !== "") {
    generarCardsProductos(productosFilter);
  } else {
    productosDisponibles = JSON.parse(localStorage.getItem("productos"));
    generarCardsProductos(productosDisponibles);
  }
});



filterLista.addEventListener("click", (e) => {
  const productosFilter = productosDisponibles.filter((producto) =>
    producto.categoria.toLowerCase().includes(e.target.innerHTML.toLowerCase())
  );

  productosDisponibles = productosFilter;

  if (e.target.innerHTML !== "Todos") {
    generarCardsProductos(productosFilter);
  } else {
    productosDisponibles = JSON.parse(localStorage.getItem("productos"));
    generarCardsProductos(productosDisponibles);
  }
});


filterNombre.addEventListener("click", (e) => {
  filtrarPorNombre(e.target.innerHTML);
});



const filtrarPorNombre = (orden) => {
  let productos;

  if (orden === "Ascendente") {
    productos = productosDisponibles.sort((a, b) => {
      if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
        return 1;
      } else if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (orden === "Descendente") {
    productos = productosDisponibles.sort((a, b) => {
      if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
        return 1;
      } else if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  generarCardsProductos(productos);
};



filterPrecio.addEventListener("click", (e) => {
  const orden = e.target.innerHTML;
  let productos;

  if (orden === "Ascendente") {
    productos = productosDisponibles.sort((a, b) => a.precio - b.precio);
  } else if (orden === "Descendente") {
    productos = productosDisponibles.sort((a, b) => b.precio - a.precio);
  }

  generarCardsProductos(productos);
});
