const loginForm = document.getElementById("loginForm");
const mensajeError = document.getElementById("mensajeError");
const loginScreen = document.getElementById("loginScreen");
const appScreen = document.getElementById("appScreen");
const logoutBtn = document.getElementById("logoutBtn");

const menuPrincipal = document.getElementById("menuPrincipal");

const btnPedidos = document.getElementById("btnPedidos");
const pantallaPedidos = document.getElementById("pantallaPedidos");
const volverPedidos = document.getElementById("volverPedidos");
const pedidoForm = document.getElementById("pedidoForm");
const listaPedidos = document.getElementById("listaPedidos");

const btnStock = document.getElementById("btnStock");
const pantallaStock = document.getElementById("pantallaStock");
const volverStock = document.getElementById("volverStock");
const stockForm = document.getElementById("stockForm");
const listaStock = document.getElementById("listaStock");

const btnTareas = document.getElementById("btnTareas");
const pantallaTareas = document.getElementById("pantallaTareas");
const volverTareas = document.getElementById("volverTareas");

const btnProduccion = document.getElementById("btnProduccion");
const pantallaProduccion = document.getElementById("pantallaProduccion");
const volverProduccion = document.getElementById("volverProduccion");
const listaProduccion = document.getElementById("listaProduccion");

const btnEstadisticas = document.getElementById("btnEstadisticas");
const pantallaEstadisticas = document.getElementById("pantallaEstadisticas");
const volverEstadisticas = document.getElementById("volverEstadisticas");

const totalPedidos = document.getElementById("totalPedidos");
const totalPrendas = document.getElementById("totalPrendas");
const totalMateriales = document.getElementById("totalMateriales");
const totalUnidadesStock = document.getElementById("totalUnidadesStock");

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let stock = JSON.parse(localStorage.getItem("stock")) || [];

function ocultarPantallas() {
  pantallaPedidos.classList.add("oculto");
  pantallaStock.classList.add("oculto");
  pantallaTareas.classList.add("oculto");
  pantallaProduccion.classList.add("oculto");
  pantallaEstadisticas.classList.add("oculto");
}

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  if (usuario === "admin" && password === "1234") {
    loginScreen.classList.add("oculto");
    appScreen.classList.remove("oculto");
    menuPrincipal.classList.remove("oculto");
    ocultarPantallas();

    mensajeError.textContent = "";

    actualizarTodo();
  } else {
    mensajeError.textContent = "Usuario o contraseña incorrectos";
  }
});

logoutBtn.addEventListener("click", function() {
  appScreen.classList.add("oculto");
  loginScreen.classList.remove("oculto");
  loginForm.reset();
});

function actualizarTodo() {
  mostrarPedidos();
  mostrarStock();
  mostrarProduccion();
  mostrarEstadisticas();
}

btnPedidos.addEventListener("click", function() {
  menuPrincipal.classList.add("oculto");
  ocultarPantallas();
  pantallaPedidos.classList.remove("oculto");
});

volverPedidos.addEventListener("click", function() {
  ocultarPantallas();
  menuPrincipal.classList.remove("oculto");
});

pedidoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const cliente = document.getElementById("cliente").value;
  const prenda = document.getElementById("prenda").value;
  const cantidad = document.getElementById("cantidad").value;
  const fecha = document.getElementById("fecha").value;

  if (cliente === "" || prenda === "" || cantidad === "" || fecha === "") {
    alert("Por favor, completa todos los campos del pedido.");
    return;
  }

  const nuevoPedido = {
    cliente: cliente,
    prenda: prenda,
    cantidad: cantidad,
    fecha: fecha
  };

  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  pedidoForm.reset();
  actualizarTodo();
});

function mostrarPedidos() {
  listaPedidos.innerHTML = "";

  pedidos.forEach(function(pedido, index) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${pedido.cliente}</td>
      <td>${pedido.prenda}</td>
      <td>${pedido.cantidad}</td>
      <td>${pedido.fecha}</td>
      <td>
        <button class="delete-btn" onclick="eliminarPedido(${index})">🗑️</button>
      </td>
    `;

    listaPedidos.appendChild(fila);
  });
}

function eliminarPedido(index) {
  pedidos.splice(index, 1);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  actualizarTodo();
}

btnStock.addEventListener("click", function() {
  menuPrincipal.classList.add("oculto");
  ocultarPantallas();
  pantallaStock.classList.remove("oculto");
});

volverStock.addEventListener("click", function() {
  ocultarPantallas();
  menuPrincipal.classList.remove("oculto");
});

stockForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const material = document.getElementById("material").value;
  const unidades = document.getElementById("unidades").value;
  const categoria = document.getElementById("categoria").value;

  if (material === "" || unidades === "" || categoria === "") {
    alert("Por favor, completa todos los campos del material.");
    return;
  }

  const nuevoMaterial = {
    material: material,
    unidades: unidades,
    categoria: categoria
  };

  stock.push(nuevoMaterial);
  localStorage.setItem("stock", JSON.stringify(stock));

  stockForm.reset();
  actualizarTodo();
});

function mostrarStock() {
  listaStock.innerHTML = "";

  stock.forEach(function(item, index) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${item.material}</td>
      <td>${item.unidades}</td>
      <td>${item.categoria}</td>
      <td>
        <button class="delete-btn" onclick="eliminarStock(${index})">🗑️</button>
      </td>
    `;

    listaStock.appendChild(fila);
  });
}

function eliminarStock(index) {
  stock.splice(index, 1);
  localStorage.setItem("stock", JSON.stringify(stock));
  actualizarTodo();
}

btnTareas.addEventListener("click", function() {
  menuPrincipal.classList.add("oculto");
  ocultarPantallas();
  pantallaTareas.classList.remove("oculto");
});

volverTareas.addEventListener("click", function() {
  ocultarPantallas();
  menuPrincipal.classList.remove("oculto");
});

btnProduccion.addEventListener("click", function() {
  menuPrincipal.classList.add("oculto");
  ocultarPantallas();
  pantallaProduccion.classList.remove("oculto");
  mostrarProduccion();
});

volverProduccion.addEventListener("click", function() {
  ocultarPantallas();
  menuPrincipal.classList.remove("oculto");
});

function mostrarProduccion() {
  listaProduccion.innerHTML = "";

  if (pedidos.length === 0) {
    listaProduccion.innerHTML = "<p class='descripcion'>Todavía no hay pedidos registrados.</p>";
    return;
  }

  pedidos.forEach(function(pedido, index) {
    let estadoClase = "pendiente";
    let estadoTexto = "Pendiente";

    if (index % 3 === 1) {
      estadoClase = "proceso";
      estadoTexto = "En proceso";
    }

    if (index % 3 === 2) {
      estadoClase = "finalizado";
      estadoTexto = "Finalizado";
    }

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("produccion-card");

    tarjeta.innerHTML = `
      <h3>${pedido.cliente}</h3>
      <p><strong>Prenda:</strong> ${pedido.prenda}</p>
      <p><strong>Cantidad:</strong> ${pedido.cantidad}</p>
      <p><strong>Entrega:</strong> ${pedido.fecha}</p>
      <span class="estado ${estadoClase}">${estadoTexto}</span>
    `;

    listaProduccion.appendChild(tarjeta);
  });
}

btnEstadisticas.addEventListener("click", function() {
  menuPrincipal.classList.add("oculto");
  ocultarPantallas();
  pantallaEstadisticas.classList.remove("oculto");
  mostrarEstadisticas();
});

volverEstadisticas.addEventListener("click", function() {
  ocultarPantallas();
  menuPrincipal.classList.remove("oculto");
});

function mostrarEstadisticas() {
  const sumaPrendas = pedidos.reduce(function(total, pedido) {
    return total + Number(pedido.cantidad);
  }, 0);

  const sumaUnidadesStock = stock.reduce(function(total, item) {
    return total + Number(item.unidades);
  }, 0);

  totalPedidos.textContent = pedidos.length;
  totalPrendas.textContent = sumaPrendas;
  totalMateriales.textContent = stock.length;
  totalUnidadesStock.textContent = sumaUnidadesStock;
}