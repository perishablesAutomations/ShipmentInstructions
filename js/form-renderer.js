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
        values[f.key] = el ? el.value : "";
      });
    });
    return values;
  },

  setValues(data) {
    FIELD_SECTIONS.forEach(section => {
      section.fields.forEach(f => {
        const el = document.getElementById("f_" + f.key);
        if (el && data[f.key] !== undefined) el.value = data[f.key];
      });
    });
  }
};
