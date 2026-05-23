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
const buscadorPedidos = document.getElementById("buscadorPedidos");

const btnStock = document.getElementById("btnStock");
const pantallaStock = document.getElementById("pantallaStock");
const volverStock = document.getElementById("volverStock");
const stockForm = document.getElementById("stockForm");
const listaStock = document.getElementById("listaStock");
const buscadorStock = document.getElementById("buscadorStock");
const avisoStock = document.getElementById("avisoStock");

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
const pedidosPendientes = document.getElementById("pedidosPendientes");
const pedidosEntregados = document.getElementById("pedidosEntregados");

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let stock = JSON.parse(localStorage.getItem("stock")) || [];

function guardarPedidos() {
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

function guardarStock() {
  localStorage.setItem("stock", JSON.stringify(stock));
}

function ocultarPantallas() {
  pantallaPedidos.classList.add("oculto");
  pantallaStock.classList.add("oculto");
  pantallaTareas.classList.add("oculto");
  pantallaProduccion.classList.add("oculto");
  pantallaEstadisticas.classList.add("oculto");
}

function actualizarTodo() {
  mostrarPedidos();
  mostrarStock();
  mostrarProduccion();
  mostrarEstadisticas();
  mostrarAvisoStock();
}

function claseEstado(estado) {
  if (estado === "En proceso") return "proceso";
  if (estado === "Entregado") return "finalizado";
  return "pendiente";
}

function estadoStock(unidades) {
  const numero = Number(unidades);

  if (numero <= 5) {
    return {
      texto: "Stock bajo",
      clase: "stock-bajo"
    };
  }

  if (numero <= 15) {
    return {
      texto: "Stock medio",
      clase: "stock-medio"
    };
  }

  return {
    texto: "Stock correcto",
    clase: "stock-correcto"
  };
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

btnPedidos.addEventListener("click", function() {
  menuPrincipal.classList.add("oculto");
  ocultarPantallas();
  pantallaPedidos.classList.remove("oculto");
  mostrarPedidos();
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
    fecha: fecha,
    estado: "Pendiente",
    descontadoStock: false
  };

  pedidos.push(nuevoPedido);
  guardarPedidos();

  pedidoForm.reset();
  actualizarTodo();
});

buscadorPedidos.addEventListener("input", function() {
  mostrarPedidos();
});

function mostrarPedidos() {
  listaPedidos.innerHTML = "";

  const textoBusqueda = buscadorPedidos.value.toLowerCase();

  const pedidosFiltrados = pedidos.filter(function(pedido) {
    return pedido.cliente.toLowerCase().includes(textoBusqueda) ||
           pedido.prenda.toLowerCase().includes(textoBusqueda);
  });

  if (pedidosFiltrados.length === 0) {
    listaPedidos.innerHTML = `
      <tr>
        <td colspan="6">No hay pedidos que mostrar.</td>
      </tr>
    `;
    return;
  }

  pedidosFiltrados.forEach(function(pedido) {
    if (!pedido.estado) pedido.estado = "Pendiente";
    if (pedido.descontadoStock === undefined) pedido.descontadoStock = false;

    const indexReal = pedidos.indexOf(pedido);

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${pedido.cliente}</td>
      <td>${pedido.prenda}</td>
      <td>${pedido.cantidad}</td>
      <td>${pedido.fecha}</td>
      <td><span class="estado ${claseEstado(pedido.estado)}">${pedido.estado}</span></td>
      <td><button class="delete-btn" onclick="eliminarPedido(${indexReal})">🗑️</button></td>
    `;

    listaPedidos.appendChild(fila);
  });

  guardarPedidos();
}

function eliminarPedido(index) {
  const confirmar = confirm("¿Deseas eliminar este pedido?");

  if (!confirmar) {
    return;
  }

  pedidos.splice(index, 1);
  guardarPedidos();
  actualizarTodo();
}

btnStock.addEventListener("click", function() {
  menuPrincipal.classList.add("oculto");
  ocultarPantallas();
  pantallaStock.classList.remove("oculto");
  mostrarStock();
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
  guardarStock();

  stockForm.reset();
  actualizarTodo();
});

buscadorStock.addEventListener("input", function() {
  mostrarStock();
});

function mostrarStock() {
  listaStock.innerHTML = "";

  const textoBusqueda = buscadorStock.value.toLowerCase();

  const stockFiltrado = stock.filter(function(item) {
    return item.material.toLowerCase().includes(textoBusqueda) ||
           item.categoria.toLowerCase().includes(textoBusqueda);
  });

  if (stockFiltrado.length === 0) {
    listaStock.innerHTML = `
      <tr>
        <td colspan="5">No hay materiales que mostrar.</td>
      </tr>
    `;
    return;
  }

  stockFiltrado.forEach(function(item) {
    const indexReal = stock.indexOf(item);
    const estado = estadoStock(item.unidades);

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${item.material}</td>
      <td>${item.unidades}</td>
      <td>${item.categoria}</td>
      <td><span class="estado-stock ${estado.clase}">${estado.texto}</span></td>
      <td><button class="delete-btn" onclick="eliminarStock(${indexReal})">🗑️</button></td>
    `;

    listaStock.appendChild(fila);
  });
}

function eliminarStock(index) {
  const confirmar = confirm("¿Deseas eliminar este material del stock?");

  if (!confirmar) {
    return;
  }

  stock.splice(index, 1);
  guardarStock();
  actualizarTodo();
}

function mostrarAvisoStock() {
  const materialesBajos = stock.filter(function(item) {
    return Number(item.unidades) <= 5;
  });

  if (materialesBajos.length === 0) {
    avisoStock.classList.add("oculto");
    avisoStock.innerHTML = "";
    return;
  }

  avisoStock.classList.remove("oculto");

  avisoStock.innerHTML = `
    ⚠️ Atención: hay ${materialesBajos.length} material/es con stock bajo.
  `;
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
    if (!pedido.estado) pedido.estado = "Pendiente";
    if (pedido.descontadoStock === undefined) pedido.descontadoStock = false;

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("produccion-card");

    tarjeta.innerHTML = `
      <h3>${pedido.cliente}</h3>
      <p><strong>Prenda:</strong> ${pedido.prenda}</p>
      <p><strong>Cantidad:</strong> ${pedido.cantidad}</p>
      <p><strong>Entrega:</strong> ${pedido.fecha}</p>

      <span class="estado ${claseEstado(pedido.estado)}">${pedido.estado}</span>

      <div class="estado-botones">
        <button onclick="cambiarEstado(${index}, 'Pendiente')">Pendiente</button>
        <button onclick="cambiarEstado(${index}, 'En proceso')">En proceso</button>
        <button onclick="cambiarEstado(${index}, 'Entregado')">Entregado</button>
      </div>
    `;

    listaProduccion.appendChild(tarjeta);
  });

  guardarPedidos();
}

function cambiarEstado(index, nuevoEstado) {
  const pedido = pedidos[index];

  if (nuevoEstado === "En proceso" && pedido.descontadoStock === false) {
    descontarDelStock(pedido.prenda, Number(pedido.cantidad));
    pedido.descontadoStock = true;
  }

  pedido.estado = nuevoEstado;
  guardarPedidos();
  guardarStock();
  actualizarTodo();
}

function descontarDelStock(nombrePrenda, cantidadPedido) {
  const prendaNormalizada = nombrePrenda.toLowerCase();

  const materialEncontrado = stock.find(function(item) {
    return item.material.toLowerCase().includes(prendaNormalizada) ||
           prendaNormalizada.includes(item.material.toLowerCase());
  });

  if (materialEncontrado) {
    materialEncontrado.unidades = Math.max(0, Number(materialEncontrado.unidades) - cantidadPedido);
  } else {
    alert("No se ha encontrado en stock un material que coincida con la prenda del pedido.");
  }
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

  const pendientes = pedidos.filter(function(pedido) {
    return !pedido.estado || pedido.estado === "Pendiente";
  }).length;

  const entregados = pedidos.filter(function(pedido) {
    return pedido.estado === "Entregado";
  }).length;

  totalPedidos.textContent = pedidos.length;
  totalPrendas.textContent = sumaPrendas;
  totalMateriales.textContent = stock.length;
  totalUnidadesStock.textContent = sumaUnidadesStock;
  pedidosPendientes.textContent = pendientes;
  pedidosEntregados.textContent = entregados;
}