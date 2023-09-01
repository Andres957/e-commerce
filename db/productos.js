export const productos = [
  {
    id: 1,
    nombre: "Cama 2 plazas",
    precio: 50.0,
    imagen:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    categoria: "camas",
  },

  {
    id: 2,
    nombre: "Sillon confortable",
    precio: 75.0,
    imagen:
      "https://images.unsplash.com/photo-1550226891-ef816aed4a98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    categoria: "sillon",
  },
  {
    id: 3,
    nombre: "Cama Rustica",
    precio: 30.0,
    imagen:
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    categoria: "camas",
  },
  {
    id: 4,
    nombre: "Ropero funcional",
    precio: 150,
    imagen:
      "https://images.unsplash.com/photo-1631048499455-4f9e26f23b9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    categoria: "ropero",
  },
  {
    id: 5,
    nombre: "Sillon Comedor",
    precio: 50.0,
    imagen:
      "https://images.unsplash.com/photo-1567136455399-50178035b557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    categoria: "sillon",
  },
];

JSON.parse(localStorage.getItem("productos")) ||
  localStorage.setItem("productos", JSON.stringify(productos));
