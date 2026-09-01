const AUTH = {
  KEY: "kn_instrucciones_session",

  async login(username, password) {
    const res = await fetch(CONFIG.FLOW_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.mensaje || "Usuario o contraseña incorrectos");
    }
    const session = {
      token: data.token,
      nombre: data.nombre,
      email: data.email,
      cargo: data.cargo,
      guardadoEn: Date.now()
    };
    sessionStorage.setItem(this.KEY, JSON.stringify(session));
    return session;
  },

  getSession() {
    const raw = sessionStorage.getItem(this.KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    const minutos = (Date.now() - session.guardadoEn) / 60000;
    if (minutos > CONFIG.SESSION_MAX_MINUTES) {
      this.logout();
      return null;
    }
    return session;
  },

  logout() {
    sessionStorage.removeItem(this.KEY);
  },

  // Llamar al inicio de cada pantalla protegida (todas menos index.html).
  requireSession() {
    const session = this.getSession();
    if (!session) {
      const volver = window.location.pathname.split("/").pop() + window.location.search;
      window.location.href = "index.html?next=" + encodeURIComponent(volver);
      return null;
    }
    return session;
  }
};
