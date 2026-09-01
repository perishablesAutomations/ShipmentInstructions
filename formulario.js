(async function () {
  const session = AUTH.requireSession();
  if (!session) return;

  document.getElementById("whoName").textContent = session.nombre;
  document.getElementById("whoCargo").textContent = session.cargo || "";
  document.getElementById("logoutBtn").addEventListener("click", () => {
    AUTH.logout();
    window.location.href = "index.html";
  });

  const params = new URLSearchParams(window.location.search);
  const modo = params.get("modo") === "actualizar" ? "actualizar" : "crear";
  const idExistente = params.get("id");

  const heading = document.getElementById("heading");
  const subheading = document.getElementById("subheading");
  const pageTitle = document.getElementById("pageTitle");
  const clienteInput = document.getElementById("clienteInput");
  const versionDisplay = document.getElementById("versionDisplay");
  const errorBox = document.getElementById("errorBox");
  const okBox = document.getElementById("okBox");
  const saveBtn = document.getElementById("saveBtn");
  const sendCard = document.getElementById("sendCard");

  FormRenderer.render(document.getElementById("formContainer"));

  let instructionId = idExistente || null;

  if (modo === "actualizar") {
    heading.textContent = "Actualizar instrucción";
    pageTitle.textContent = "Actualizar instrucción";
    subheading.textContent = "Editando una instrucción existente. Guardar crea una nueva versión.";
    if (!instructionId) {
      showError("Falta el id de la instrucción a actualizar.");
      saveBtn.disabled = true;
    } else {
      await cargarInstruccion(instructionId);
    }
  } else {
    // Si viene un id en modo crear, es "duplicar como nueva versión":
    // precarga los valores pero al guardar crea un registro nuevo.
    if (idExistente) {
      subheading.textContent = "Partiendo de una versión anterior. Al guardar se crea una versión nueva.";
      await cargarInstruccion(idExistente, /*soloPrecargar*/ true);
    }
  }

  async function cargarInstruccion(id, soloPrecargar) {
    try {
      const data = await API.obtenerInstruccion(session, id);
      clienteInput.value = data.cliente || "";
      versionDisplay.textContent = soloPrecargar
        ? "Se calculará una versión nueva al guardar"
        : "Versión " + (data.version || "—");
      FormRenderer.setValues(data);
      if (!soloPrecargar) instructionId = id;
    } catch (err) {
      showError("No se pudo cargar la instrucción: " + err.message);
    }
  }

  saveBtn.addEventListener("click", async () => {
    hideMessages();
    if (!clienteInput.value.trim()) {
      showError("El cliente es obligatorio.");
      return;
    }
    saveBtn.disabled = true;
    saveBtn.textContent = "Guardando...";
    const valores = FormRenderer.getValues();
    valores.cliente = clienteInput.value.trim();

    try {
      let resultado;
      if (modo === "actualizar" && instructionId && idExistente) {
        resultado = await API.actualizarInstruccion(session, instructionId, valores);
      } else {
        resultado = await API.crearInstruccion(session, valores);
        instructionId = resultado.id;
      }
      showOk("Instrucción guardada correctamente" + (resultado.id ? " (folio " + resultado.id + ")" : "") + ".");
      sendCard.style.display = "block";
    } catch (err) {
      showError(err.message);
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = "Guardar instrucción";
    }
  });

  document.getElementById("cancelBtn").addEventListener("click", () => {
    window.location.href = "home.html";
  });

  document.getElementById("sendFacturacionBtn").addEventListener("click", () => enviarCorreo("Facturacion"));
  document.getElementById("sendClienteBtn").addEventListener("click", () => enviarCorreo("Cliente"));

  async function enviarCorreo(tipo) {
    hideMessages();
    const boton = tipo === "Facturacion"
      ? document.getElementById("sendFacturacionBtn")
      : document.getElementById("sendClienteBtn");
    boton.disabled = true;
    boton.textContent = "Enviando...";
    try {
      const accion = modo === "actualizar" ? "Actualizacion" : "Creacion";
      const resultado = await API.enviarCorreo(session, instructionId, tipo, accion);
      showOk("Correo enviado. Folio " + resultado.folio + ".");
    } catch (err) {
      showError("No se pudo enviar el correo: " + err.message);
    } finally {
      boton.disabled = false;
      boton.textContent = tipo === "Facturacion" ? "Enviar instrucción de Facturación" : "Enviar instrucción de Cliente/Embarque";
    }
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.add("show");
  }
  function showOk(msg) {
    okBox.textContent = msg;
    okBox.classList.add("show");
  }
  function hideMessages() {
    errorBox.classList.remove("show");
    okBox.classList.remove("show");
  }
})();
