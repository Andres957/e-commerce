
const btnRegister = document.getElementById("btn__register");
const formRegister = document.getElementById("user__register");
const formLogin = document.getElementById("user__login");
const btnLogin = document.getElementById("btn__logearse");

let usuarios = JSON.parse(localStorage.getItem("usuarios"));

class newUser {
  constructor(user, pass) {
    this.id = usuarios.length + 1;
    this.user = user;
    this.pass = pass;
    this.admin = false;
  }
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  const user = formLogin.children[0].children[1].value;
  const pass = formLogin.children[1].children[1].value;

  validarYlogear(user, pass);
});

const validarYlogear = (user, pass) => {
  const userExiste = usuarios.find((usuario) => usuario?.user === user);

  if (userExiste === undefined || userExiste.pass !== pass) {
    const contenedor = document.getElementById("contenedor");
    const valores = document.createElement("p");
    valores.textContent = "alguno de los campos cargados es incorrecto";
    contenedor.appendChild(valores);
    /* alert("error en usuario o contraseña")*/
  } else {
    /* alert(`Bienvenido ${user}`)*/

    const nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = `Bienvenid@ ${user}`;
    const contenedor = document.getElementById("contenedor2");
    contenedor2.appendChild(nuevoParrafo);

    let usuario = {
      user: userExiste.user,
      pass: userExiste.pass,
      admin: userExiste.admin,
    };

    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    location.href = "../index.html";
  }
};

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();

  const user = formRegister.children[0].children[1].value;
  const pass = formRegister.children[1].children[1].value;

  const nuevoUsuario = new newUser(user, pass);

  validarYRegistrar(nuevoUsuario);
});

const validarYRegistrar = (nuevoUsuario) => {
  const userNuevo = usuarios.find(
    (usuario) => usuario?.user === nuevoUsuario.user
  );
  if (userNuevo === undefined) {
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    const contenedor3 = document.getElementById("contenedor3");
    const registro = document.createElement("p");
    registro.textContent = `Gracias ${nuevoUsuario.user} por registrarte.. usted sera redirigido a la pagina principal`;
    contenedor3.appendChild(registro);
    /*alert(
      `Gracias ${nuevoUsuario.user} por registrarte.. usted sera redirigido a la pagina principal`
    );*/
    console.log(usuarios);
    location.href = "../index.html";
  } else {
    const contenedor4 = document.getElementById("contenedor4");
    const registroExistente = document.createElement("p");
    registroExistente.textContent = `El usuario ya existe`;
    contenedor4.appendChild(registroExistente);
    /*alert(`El usuario ya existe`);*/

    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    location.href = "../inicio.html";
  }
};
