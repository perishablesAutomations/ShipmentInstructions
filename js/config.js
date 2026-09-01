// Reemplaza cada URL por la URL real que te da Power Automate al guardar
// cada flujo (Trigger HTTP -> "Cuando se completa" te la muestra, o
// entra a la acción del trigger y copia "HTTP URL").
const CONFIG = {
FLOW_LOGIN: "https://bd4a763d737defaeacf0e99a4d082f.58.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/27/workflows/aefaa172a6f5448bb4ee41ff7266acc0/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YQas8-PtNRiA60nFWxitLmlsPxosGw93OpenmIfHNqA",
  FLOW_CREAR: "https://bd4a763d737defaeacf0e99a4d082f.58.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/08/workflows/46af808da56c444aa5cd652c60ffc67a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CP566oOf-CJwcIzMGMESl-kHE-iTkK91QxNoKX7Qji0",
  FLOW_ACTUALIZAR: "https://bd4a763d737defaeacf0e99a4d082f.58.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/14/workflows/d13fd82f74834f0cae9e703d0fbf70ee/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=O3bBzuVGcJ6e31bYzsCOSw_22cD18j_ANpEc3xdXsr0",
  FLOW_ENVIAR_CORREO: "https://prod-00.region.logic.azure.com:443/workflows/PON_AQUI_ENVIAR",
  // Estos dos todavía no los hemos construido -- ver nota en el chat.
  FLOW_CONSULTAR: "https://prod-00.region.logic.azure.com:443/workflows/PON_AQUI_CONSULTAR",
  FLOW_DETALLE: "https://prod-00.region.logic.azure.com:443/workflows/PON_AQUI_DETALLE",

  // Duración de sesión en el navegador antes de forzar login de nuevo,
  // en minutos. Debe ser igual o menor a la que usa Sesiones_Activas.
  SESSION_MAX_MINUTES: 480
};
