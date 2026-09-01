// key debe coincidir exactamente con lo que esperan los flujos de
// Crear/Actualizar (ver flujo_crear_instruccion.md).
// type: "text" | "textarea" | "email" | "csc" (selector Consignee/Shipper/Ambos)
const FIELD_SECTIONS = [
  {
    title: "Checklist de documentos",
    fields: [
      { key: "dc", label: "DC (Aplica / No aplica)", type: "text" },
      { key: "da", label: "DA (Aplica / No aplica)", type: "text" },
      { key: "thermometer", label: "Thermometer", type: "text" },
      { key: "vacuum", label: "Vacuum", type: "text" },
      { key: "fitosanitary", label: "Fitosanitary", type: "text" },
      { key: "certificadoOrigen", label: "Certificado de Origen", type: "text" },
      { key: "paletizado", label: "Paletizado", type: "text" },
      { key: "cargosAdicionales", label: "Cargos adicionales", type: "text" }
    ]
  },
  {
    title: "Datos generales del cliente",
    fields: [
      { key: "dae", label: "DAE", type: "text" },
      { key: "billingTo", label: "Billing to (Customer Code)", type: "text" },
      { key: "nombreEmpresa", label: "Nombre de empresa (marcación)", type: "text" },
      { key: "paisOrigen", label: "País origen", type: "text" },
      { key: "codigoSalog", label: "Código SALOG", type: "text" },
      { key: "cid", label: "CID", type: "text" },
      { key: "debtor", label: "Debtor", type: "text" },
      { key: "taxVatEoriInnRutNit", label: "TAX / VAT / EORI / INN / RUT / NIT", type: "text" },
      { key: "direccion", label: "Dirección", type: "text" },
      { key: "ciudad", label: "Ciudad", type: "text" },
      { key: "pais", label: "País", type: "text" },
      { key: "codigoPostal", label: "Código postal", type: "text" },
      { key: "producto", label: "Producto", type: "text" },
      { key: "generalObservations", label: "Observaciones generales", type: "textarea" }
    ]
  },
  {
    title: "Contactos",
    fields: [
      { key: "nombreContactoPrincipal", label: "Nombre contacto principal", type: "text" },
      { key: "telefono1", label: "Teléfono 1", type: "text" },
      { key: "email", label: "E-mail", type: "email" },
      { key: "nombreContactoCoordinacion", label: "Nombre contacto de coordinación", type: "text" },
      { key: "telefono2", label: "Teléfono 2", type: "text" },
      { key: "email2", label: "E-mail 2", type: "email" }
    ]
  },
  {
    title: "Operación aérea",
    fields: [
      { key: "destinoGuia", label: "Destino de la guía (siglas aeropuerto)", type: "text" },
      { key: "aerolineasConfirmadas", label: "Aerolíneas confirmadas", type: "text" },
      { key: "aerolineasProhibidas", label: "Aerolíneas prohibidas", type: "text" },
      { key: "nombreComercial", label: "Nombre del comercial", type: "text" },
      { key: "nombreCCL", label: "Nombre del CCL", type: "text" },
      { key: "diaSalidaVuelo", label: "Día de salida del vuelo", type: "text" },
      { key: "consolidadoOAwbDirecta", label: "Consolidado o AWB directa", type: "text" },
      { key: "mawbConsignadaA", label: "MAWB consignada a", type: "text" },
      { key: "notificadoA", label: "Notificado a", type: "text" },
      { key: "brokerDestino", label: "Broker en destino", type: "text" },
      { key: "hawbConsignadaA", label: "HAWB consignada a", type: "text" },
      { key: "nombreCamionEntrega", label: "Nombre del camión de entrega", type: "text" }
    ]
  },
  {
    title: "Facturación / pago",
    fields: [
      { key: "responsablePago", label: "Responsable del pago", type: "text" },
      { key: "exportadores", label: "Exportadores", type: "text" },
      { key: "facturarA", label: "Facturar a", type: "text" },
      { key: "terminosPago", label: "Términos de pago", type: "text" },
      { key: "aNombreQuienDestino", label: "A nombre de quien y destino", type: "text" }
    ]
  },
  {
    title: "Envío de documentos por email — quién aplica",
    hint: "Consignee, Shipper, o ambos",
    fields: [
      { key: "chkAWB", label: "AWB", type: "csc" },
      { key: "chkInvoice", label: "Invoice", type: "csc" },
      { key: "chkCertificado", label: "Certificado", type: "csc" },
      { key: "chkTemperaturas", label: "Temperaturas", type: "csc" },
      { key: "chkHAWB", label: "HAWB", type: "csc" },
      { key: "chkPacking", label: "Packing", type: "csc" },
      { key: "chkReportePeso", label: "Reporte de peso", type: "csc" },
      { key: "chkPinter", label: "Pinter", type: "csc" },
      { key: "chkFinalAlert", label: "Final Alert", type: "csc" },
      { key: "chkHawbCons", label: "HAWB Cons", type: "csc" },
      { key: "chkFinalReport", label: "Final Report", type: "csc" },
      { key: "chkFitos", label: "Fitos", type: "csc" },
      { key: "chkWarehouse", label: "Warehouse", type: "csc" }
    ]
  },
  {
    title: "Destinatarios de notificación por grupo",
    hint: "Información de referencia — no se usa para el envío del resumen, que siempre va a las cuentas fijas de Facturación / Cliente",
    fields: [
      { key: "emailsShipper", label: "E-mails notificación Shipper", type: "textarea" },
      { key: "emailsConsignatario", label: "E-mails notificación Consignatario", type: "textarea" },
      { key: "emailsBroker", label: "E-mails notificación Broker", type: "textarea" },
      { key: "emailsFacturacion", label: "E-mails de Facturación/Balances", type: "textarea" },
      { key: "emailsKN", label: "E-mails Kuehne+Nagel", type: "textarea" },
      { key: "emailsNotifTarifas", label: "E-mails de notificaciones y tarifas", type: "textarea" }
    ]
  },
  {
    title: "Instrucciones adicionales",
    fields: [
      { key: "instruccionesCCL", label: "Instrucciones CCL", type: "textarea" }
    ]
  }
];
