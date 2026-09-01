(async function () {
  const session = AUTH.requireSession();
  if (!session) return;

  document.getElementById("whoName").textContent = session.nombre;
  document.getElementById("whoCargo").textContent = session.cargo || "";
  document.getElementById("logoutBtn").addEventListener("click", () => {
    AUTH.logout();
    window.location.href = "index.html";
  });

  const errorBox = document.getElementById("errorBox");
  const table = document.getElementById("hoyTable");
  const body = document.getElementById("hoyBody");
  const empty = document.getElementById("hoyEmpty");

  try {
    // Trae todo y filtra en el navegador por "creado hoy por mí".
    // Cuando construyamos el flujo Consultar, si la lista crece mucho
    // conviene mover este filtro al propio flujo (filtro OData por
    // CreadoPor + Created) en vez de traer todo cada vez.
    const data = await API.consultarInstrucciones(session, "");
    const hoy = new Date().toDateString();
    const mias = (data.items || []).filter(item => {
      const creado = item.creadoPor === session.nombre;
      const esHoy = item.created && new Date(item.created).toDateString() === hoy;
      return creado && esHoy;
    });

    if (mias.length === 0) {
      empty.style.display = "block";
      table.style.display = "none";
      return;
    }

    empty.style.display = "none";
    table.style.display = "table";
    mias.forEach(item => {
      const tr = document.createElement("tr");
      const hora = item.created ? new Date(item.created).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }) : "—";
      tr.innerHTML = `
        <td>${item.cliente || ""}</td>
        <td>${item.version || ""}</td>
        <td>${hora}</td>
        <td><a href="formulario.html?modo=actualizar&id=${item.id}">Ver / editar</a></td>
      `;
      body.appendChild(tr);
    });
  } catch (err) {
    errorBox.textContent = "No se pudo cargar el listado: " + err.message;
    errorBox.classList.add("show");
    empty.style.display = "block";
  }
})();
