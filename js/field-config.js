const FormRenderer = {
  CSC_OPTIONS: [
    { value: "", label: "No aplica" },
    { value: "C", label: "Consignee" },
    { value: "S", label: "Shipper" },
    { value: "CS", label: "Ambos" }
  ],

  render(container) {
    container.innerHTML = "";
    FIELD_SECTIONS.forEach((section, i) => {
      const details = document.createElement("details");
      details.className = "section";
      if (i === 0) details.open = true;

      const summary = document.createElement("summary");
      summary.textContent = section.title;
      details.appendChild(summary);

      const body = document.createElement("div");
      body.className = "section-body";
      if (section.hint) {
        const hint = document.createElement("p");
        hint.className = "meta-line";
        hint.textContent = section.hint;
        body.appendChild(hint);
      }

      const grid = document.createElement("div");
      grid.className = "field-grid";
      section.fields.forEach(f => grid.appendChild(this._buildField(f)));
      body.appendChild(grid);
      details.appendChild(body);
      container.appendChild(details);
    });
  },

  _buildField(f) {
    const wrap = document.createElement("div");
    wrap.className = "field";

    if (f.type === "toggle") {
      const label = document.createElement("label");
      label.textContent = f.label;
      wrap.appendChild(label);

      const row = document.createElement("div");
      row.className = "toggle-row";

      const switchWrap = document.createElement("label");
      switchWrap.className = "toggle-switch";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = "f_" + f.key;
      input.name = f.key;
      const track = document.createElement("span");
      track.className = "toggle-track";
      switchWrap.appendChild(input);
      switchWrap.appendChild(track);

      const stateLabel = document.createElement("span");
      stateLabel.className = "toggle-label";
      stateLabel.textContent = "No aplica";
      input.addEventListener("change", () => {
        stateLabel.textContent = input.checked ? "Aplica" : "No aplica";
        stateLabel.classList.toggle("on", input.checked);
      });

      row.appendChild(switchWrap);
      row.appendChild(stateLabel);
      wrap.appendChild(row);
      return wrap;
    }

    const label = document.createElement("label");
    label.textContent = f.label;
    label.setAttribute("for", "f_" + f.key);
    wrap.appendChild(label);

    let input;
    if (f.type === "textarea") {
      input = document.createElement("textarea");
    } else if (f.type === "csc") {
      input = document.createElement("select");
      this.CSC_OPTIONS.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.value;
        o.textContent = opt.label;
        input.appendChild(o);
      });
    } else {
      input = document.createElement("input");
      input.type = f.type === "email" ? "email" : "text";
    }
    input.id = "f_" + f.key;
    input.name = f.key;
    wrap.appendChild(input);
    return wrap;
  },

  getValues() {
    const values = {};
    FIELD_SECTIONS.forEach(section => {
      section.fields.forEach(f => {
        const el = document.getElementById("f_" + f.key);
        if (!el) { values[f.key] = ""; return; }
        if (f.type === "toggle") {
          values[f.key] = el.checked ? "Aplica" : "No aplica";
        } else {
          values[f.key] = el.value;
        }
      });
    });
    return values;
  },

  setValues(data) {
    FIELD_SECTIONS.forEach(section => {
      section.fields.forEach(f => {
        const el = document.getElementById("f_" + f.key);
        if (!el || data[f.key] === undefined) return;
        if (f.type === "toggle") {
          const aplica = (data[f.key] || "").trim().toLowerCase() === "aplica";
          el.checked = aplica;
          el.dispatchEvent(new Event("change"));
        } else {
          el.value = data[f.key];
        }
      });
    });
  }
};
