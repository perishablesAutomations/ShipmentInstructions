const API = {
  async _post(url, body) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    let data;
    try { data = await res.json(); }
    catch (e) { throw new Error("Respuesta inválida del servidor (" + res.status + ")"); }
    if (!res.ok || data.success === false) {
      throw new Error(data.mensaje || "Ocurrió un error, intenta de nuevo.");
    }
    return data;
  },

  crearInstruccion(session, datosFormulario) {
    return this._post(CONFIG.FLOW_CREAR, { token: session.token, ...datosFormulario });
  },

  actualizarInstruccion(session, id, datosFormulario) {
    return this._post(CONFIG.FLOW_ACTUALIZAR, { token: session.token, id, ...datosFormulario });
  },

  enviarCorreo(session, instructionId, tipoInstruccion, accion) {
    return this._post(CONFIG.FLOW_ENVIAR_CORREO, {
      token: session.token, instructionId, tipoInstruccion, accion
    });
  },

  // Pendientes de construir -- ver flujo "Consultar" y "Detalle" en el chat.
  consultarInstrucciones(session, filtroCliente) {
    return this._post(CONFIG.FLOW_CONSULTAR, { token: session.token, cliente: filtroCliente || "" });
  },

  obtenerInstruccion(session, id) {
    return this._post(CONFIG.FLOW_DETALLE, { token: session.token, id });
  }
};
