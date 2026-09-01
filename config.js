// Reemplaza cada URL por la URL real que te da Power Automate al guardar
// cada flujo (Trigger HTTP -> "Cuando se completa" te la muestra, o
// entra a la acción del trigger y copia "HTTP URL").
const CONFIG = {
  FLOW_LOGIN: "https://prod-00.region.logic.azure.com:443/workflows/PON_AQUI_LOGIN",
  FLOW_CREAR: "https://prod-00.region.logic.azure.com:443/workflows/PON_AQUI_CREAR",
  FLOW_ACTUALIZAR: "https://prod-00.region.logic.azure.com:443/workflows/PON_AQUI_ACTUALIZAR",
  FLOW_ENVIAR_CORREO: "https://prod-00.region.logic.azure.com:443/workflows/PON_AQUI_ENVIAR",
  // Estos dos todavía no los hemos construido -- ver nota en el chat.
  FLOW_CONSULTAR: "https://prod-00.region.logic.azure.com:443/workflows/PON_AQUI_CONSULTAR",
  FLOW_DETALLE: "https://prod-00.region.logic.azure.com:443/workflows/PON_AQUI_DETALLE",

  // Duración de sesión en el navegador antes de forzar login de nuevo,
  // en minutos. Debe ser igual o menor a la que usa Sesiones_Activas.
  SESSION_MAX_MINUTES: 480
};
