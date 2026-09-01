(function () {
  const session = AUTH.requireSession();
  if (!session) return;

  document.getElementById("whoName").textContent = session.nombre;
  document.getElementById("whoCargo").textContent = session.cargo || "";
  document.getElementById("logoutBtn").addEventListener("click", () => {
    AUTH.logout();
    window.location.href = "index.html";
  });

  const input = document.getElementById("buscador");
  const table = document.getElementById("resultTable");
  const body = document.getElementById("resultBody");
  const empty = document.getElementById("resultEmpty");
  const errorBox = document.getElementById("errorBox");

  let debounceTimer;
  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => buscar(input.value.trim()), 350);
  });

  async function buscar(texto) {
    errorBox.classList.remove("show");
    if (texto.length < 2) {
      table.style.display = "none";
      empty.style.display = "block";
      empty.querySelector("h3").textContent = "Escribe un nombre de cliente";
      return;
    }
    try {
      const data = await API.consultarInstrucciones(session, texto);
      const items = data.items || [];
      if (items.length === 0) {
        table.style.display = "none";
        empty.style.display = "block";
        empty.querySelector("h3").textContent = "Sin resultados para \"" + texto + "\"";
        return;
      }
      empty.style.display = "none";
      table.style.display = "table";
      body.innerHTML = "";
      items.forEach(item => {
        const tr = document.createElement("tr");
        tr.className = "clickable";
        const fecha = item.modified ? new Date(item.modified).toLocaleString("es-CO") : "—";
        tr.innerHTML = `
          <td>${item.cliente || ""}</td>
          <td>${item.version || ""}</td>
          <td>${item.codigoSalog || ""}</td>
          <td>${fecha}</td>
          <td>${item.modificadoPor || item.creadoPor || ""}</td>
        `;
        tr.addEventListener("click", () => {
          window.location.href = "formulario.html?modo=actualizar&id=" + item.id;
        });
        body.appendChild(tr);
      });
    } catch (err) {
      errorBox.textContent = err.message;
      errorBox.classList.add("show");
    }
  }
})();
