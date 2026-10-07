/* =====================================================
   FOOTER DE CARPOINT
   Hace funcionar los botones del footer y el bloque
   "Vehículos nuevos en stock".
   Se usa agregando UNA línea antes de </body> en cada página:
       <script src="footer.js"></script>
   No hace falta agregar el <link> de footer.css ni el HTML de
   las ventanas: este archivo los carga solo.
   ===================================================== */
(function () {

    // Carga footer.css automáticamente (tiene que estar en la misma carpeta)
    if (!document.querySelector('link[href$="footer.css"]')) {
        const hoja = document.createElement("link");
        hoja.rel = "stylesheet";
        hoja.href = document.currentScript.src.replace(/\.js(\?.*)?$/, ".css");
        document.head.appendChild(hoja);
    }

    // ---------- DATOS: MISMA LISTA DE AUTOS QUE EL INDEX ----------
    // catalogo = página del sitio donde está el auto
    const MODELOS = [
        { marca: "Audi", nombre: "A3 Sedán",           cantidad: 5, precio: 49900000,  versiones: ["35 TFSI", "35 TFSI Advanced", "35 TFSI S line"] },
        { marca: "Audi", nombre: "A3 Sportback",       cantidad: 5, precio: 48500000,  versiones: ["35 TFSI", "35 TFSI Advanced", "35 TFSI S line"] },
        { marca: "Audi", nombre: "A5 Sportback",       cantidad: 2, precio: 72400000,  versiones: ["40 TFSI", "45 TFSI quattro S line"] },
        { marca: "Audi", nombre: "e-tron GT",          cantidad: 1, precio: 189000000, versiones: ["quattro"], catalogo: "electricos.html" },
        { marca: "Audi", nombre: "Q3",                 cantidad: 5, precio: 62300000,  versiones: ["35 TFSI", "40 TFSI quattro", "Sportback 35 TFSI"] },
        { marca: "Audi", nombre: "Q5",                 cantidad: 3, precio: 89700000,  versiones: ["45 TFSI quattro", "45 TFSI quattro S line", "Sportback 45 TFSI"] },
        { marca: "Audi", nombre: "Q6 e-tron",          cantidad: 2, precio: 134000000, versiones: ["quattro", "Sportback quattro"], catalogo: "electricos.html" },
        { marca: "Audi", nombre: "Q8",                 cantidad: 2, precio: 158000000, versiones: ["55 TFSI quattro", "55 TFSI quattro S line"] },
        { marca: "Audi", nombre: "RS 3",               cantidad: 2, precio: 112000000, versiones: ["Sportback", "Sedán"] },
        { marca: "Audi", nombre: "RS 5",               cantidad: 1, precio: 145000000, versiones: ["Sportback"] },
        { marca: "Audi", nombre: "RS 6 Avant",         cantidad: 1, precio: 215000000, versiones: ["performance"] },
        { marca: "Audi", nombre: "S3 Sportback",       cantidad: 2, precio: 78900000,  versiones: ["2.0 TFSI quattro"] },

        { marca: "BMW", nombre: "330i",                cantidad: 4, precio: 79500000,  versiones: ["Sport Line", "M Sport"] },
        { marca: "BMW", nombre: "i4",                  cantidad: 2, precio: 118000000, versiones: ["eDrive40", "M50"], catalogo: "electricos.html" },
        { marca: "BMW", nombre: "iX",                  cantidad: 2, precio: 176000000, versiones: ["xDrive50"], catalogo: "electricos.html" },
        { marca: "BMW", nombre: "M2",                  cantidad: 1, precio: 128000000, versiones: ["Coupé"] },
        { marca: "BMW", nombre: "M3 Competition",      cantidad: 1, precio: 162000000, versiones: ["xDrive"] },
        { marca: "BMW", nombre: "M4 Competition",      cantidad: 2, precio: 168000000, versiones: ["Coupé", "Cabrio xDrive"] },
        { marca: "BMW", nombre: "X4",                  cantidad: 2, precio: 98000000,  versiones: ["xDrive30i M Sport"] },
        { marca: "BMW", nombre: "X5",                  cantidad: 3, precio: 139000000, versiones: ["xDrive40i", "xDrive50e"] },
        { marca: "BMW", nombre: "X6",                  cantidad: 2, precio: 152000000, versiones: ["xDrive40i M Sport"] },

        { marca: "Land Rover", nombre: "Defender",           cantidad: 4, precio: 126000000, versiones: ["110 SE", "110 X-Dynamic", "90 HSE"] },
        { marca: "Land Rover", nombre: "Range Rover",        cantidad: 2, precio: 265000000, versiones: ["Autobiography"] },
        { marca: "Land Rover", nombre: "Range Rover Evoque", cantidad: 3, precio: 84000000,  versiones: ["S", "R-Dynamic SE"] },
        { marca: "Land Rover", nombre: "Range Rover Sport",  cantidad: 2, precio: 178000000, versiones: ["Dynamic SE", "Autobiography"] },
        { marca: "Land Rover", nombre: "Range Rover Velar",  cantidad: 2, precio: 118000000, versiones: ["Dynamic SE"] },


        { marca: "Mercedes-Benz", nombre: "AMG A 45",  cantidad: 2, precio: 108000000, versiones: ["S 4MATIC+"] },
        { marca: "Mercedes-Benz", nombre: "AMG C 63",  cantidad: 1, precio: 172000000, versiones: ["S E Performance"] },
        { marca: "Mercedes-Benz", nombre: "AMG GT",    cantidad: 1, precio: 235000000, versiones: ["63 4MATIC+ Coupé"] },
        { marca: "Mercedes-Benz", nombre: "C 300",     cantidad: 5, precio: 82000000,  versiones: ["Avantgarde", "AMG Line"] },
        { marca: "Mercedes-Benz", nombre: "Clase G",   cantidad: 1, precio: 310000000, versiones: ["G 500"] },
        { marca: "Mercedes-Benz", nombre: "EQE",       cantidad: 2, precio: 142000000, versiones: ["350+"], catalogo: "electricos.html" },
        { marca: "Mercedes-Benz", nombre: "EQS SUV",   cantidad: 1, precio: 198000000, versiones: ["450 4MATIC"], catalogo: "electricos.html" },
        { marca: "Mercedes-Benz", nombre: "GLC",       cantidad: 4, precio: 96000000,  versiones: ["300 4MATIC", "300 Coupé"] },
        { marca: "Mercedes-Benz", nombre: "GLE",       cantidad: 3, precio: 138000000, versiones: ["450 4MATIC", "53 AMG Coupé"] },

        { marca: "Porsche", nombre: "911 Carrera",     cantidad: 2, precio: 245000000, versiones: ["Carrera", "Carrera GTS"] },
        { marca: "Porsche", nombre: "911 Turbo S",     cantidad: 1, precio: 420000000, versiones: ["Coupé"] },
        { marca: "Porsche", nombre: "Cayenne",         cantidad: 3, precio: 165000000, versiones: ["Cayenne", "Cayenne Coupé", "E-Hybrid"] },
        { marca: "Porsche", nombre: "Cayman",          cantidad: 2, precio: 128000000, versiones: ["718", "718 GTS 4.0"] },
        { marca: "Porsche", nombre: "Macan",           cantidad: 3, precio: 112000000, versiones: ["Macan", "Macan T"] },
        { marca: "Porsche", nombre: "Macan Electric",  cantidad: 2, precio: 139000000, versiones: ["4", "Turbo"], catalogo: "electricos.html" },
        { marca: "Porsche", nombre: "Taycan",          cantidad: 2, precio: 185000000, versiones: ["4S", "Turbo"], catalogo: "electricos.html" },

        { marca: "Volvo", nombre: "EX30",              cantidad: 4, precio: 58000000,  versiones: ["Plus", "Ultra Twin Motor"], catalogo: "electricos.html" },
        { marca: "Volvo", nombre: "XC60",              cantidad: 6, precio: 89000000,  versiones: ["B5 Plus", "T8 Ultra"] },
        { marca: "Volvo", nombre: "XC90",              cantidad: 3, precio: 128000000, versiones: ["B6 Plus", "T8 Ultra"] }
    ];

    const COLORES = ["Blanco Glaciar", "Negro Mito", "Gris Daytona", "Azul Navarra", "Plata Florete", "Rojo Tango"];

    const ACCESORIOS = [
        { nombre: "Barras de techo",            detalle: "Aluminio, carga máxima 75 kg",  precio: 980000 },
        { nombre: "Juego de alfombras premium", detalle: "Goma con borde elevado",        precio: 185000 },
        { nombre: "Portabicicletas",            detalle: "Para barras de techo",          precio: 420000 },
        { nombre: "Llantas 18\" 5 rayos",       detalle: "Juego de 4 unidades",           precio: 2350000 },
        { nombre: "Cargador inalámbrico",       detalle: "Compatible con Qi",             precio: 150000 },
        { nombre: "Cofre de techo 360 L",       detalle: "Negro brillante con cerradura", precio: 1290000 }
    ];

    const PUESTOS = [
        { nombre: "Asesor/a comercial",        detalle: "Showroom Av. Colón · Full time" },
        { nombre: "Técnico/a mecánico/a",      detalle: "Taller · Full time" },
        { nombre: "Recepcionista de servicio", detalle: "Posventa · Part time" }
    ];

    const formatoPrecio = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
    const MARCAS = MODELOS.map(m => m.marca).filter((marca, i, todas) => todas.indexOf(marca) === i);
    const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

    // Una unidad por cada auto en stock (119 en total)
    const STOCK = MODELOS.flatMap((modelo, m) =>
        Array.from({ length: modelo.cantidad }, (_, i) => ({
            marca: modelo.marca,
            modelo: modelo.nombre,
            version: modelo.versiones[i % modelo.versiones.length],
            color: COLORES[(i + m) % COLORES.length],
            anio: i % 4 === 0 ? 2025 : 2026,
            precio: modelo.precio + (i % modelo.versiones.length) * 3200000
        }))
    );

    // ---------- VENTANAS ----------
    const opcionesModelos = MARCAS.map(marca =>
        `<optgroup label="${marca}">` +
        MODELOS.filter(m => m.marca === marca).map(m => `<option>${m.nombre}</option>`).join("") +
        "</optgroup>"
    ).join("");

    const VENTANAS = {
        "modal-stock": `
            <h3 id="stock-titulo">Vehículos en stock</h3>
            <ul class="lista" id="stock-lista"></ul>`,
        "modal-modelos": `
            <h3>Todos los modelos</h3>
            <div id="modelos-lista"></div>`,
        "modal-service": `
            <h3>Service a domicilio</h3>
            <p>Nuestros técnicos van a tu casa u oficina. Completá el formulario y te confirmamos el turno.</p>
            <form class="formulario" id="form-service">
                <label for="service-nombre">Nombre y apellido</label>
                <input id="service-nombre" required>
                <label for="service-telefono">Teléfono</label>
                <input id="service-telefono" type="tel" required>
                <label for="service-direccion">Dirección</label>
                <input id="service-direccion" required>
                <label for="service-modelo">Modelo</label>
                <select id="service-modelo" required>${opcionesModelos}</select>
                <label for="service-fecha">Fecha preferida</label>
                <input id="service-fecha" type="date" required>
                <button class="boton" type="submit">Solicitar turno</button>
            </form>`,
        "modal-accesorios": `
            <h3>Accesorios</h3>
            <ul class="lista" id="accesorios-lista"></ul>`,
        "modal-telefono": `
            <h3>Cotizaciones por teléfono</h3>
            <p class="dato-contacto">(0351) 555-0123</p>
            <p>Lunes a viernes de 9 a 19 h · Sábados de 9 a 13 h</p>
            <a class="boton" href="tel:+543515550123">Llamar ahora</a>`,
        "modal-contacto": `
            <h3>Contacto</h3>
            <p>Av. Colón 1250, Córdoba · info@carpoint.com.ar · <a href="concesionarias.html" style="color:#fff">Ver concesionarias</a></p>
            <form class="formulario" id="form-contacto">
                <label for="contacto-nombre">Nombre y apellido</label>
                <input id="contacto-nombre" required>
                <label for="contacto-email">Email</label>
                <input id="contacto-email" type="email" required>
                <label for="contacto-mensaje">Mensaje</label>
                <textarea id="contacto-mensaje" required></textarea>
                <button class="boton" type="submit">Enviar consulta</button>
            </form>`,
        "modal-empleo": `
            <h3>Trabajá con nosotros</h3>
            <ul class="lista" id="empleo-lista"></ul>
            <form class="formulario" id="form-empleo">
                <label for="empleo-nombre">Nombre y apellido</label>
                <input id="empleo-nombre" required>
                <label for="empleo-email">Email</label>
                <input id="empleo-email" type="email" required>
                <label for="empleo-puesto">Puesto</label>
                <select id="empleo-puesto" required></select>
                <label for="empleo-cv">CV (PDF)</label>
                <input id="empleo-cv" type="file" accept=".pdf" required>
                <button class="boton" type="submit">Postularme</button>
            </form>`
    };

    // Si la página ya trae alguna ventana con el mismo id (ej. index.html), se reemplaza
    Object.keys(VENTANAS).forEach(id => {
        const vieja = document.getElementById(id);
        if (vieja) vieja.remove();
        const modal = document.createElement("dialog");
        modal.id = id;
        modal.className = "modal-footer";
        modal.innerHTML = '<button class="cerrar" type="button" aria-label="Cerrar">&times;</button>' + VENTANAS[id];
        document.body.appendChild(modal);
    });

    // ---------- LISTAS ----------
    document.getElementById("modelos-lista").innerHTML = MARCAS.map(marca =>
        `<h4>${marca}</h4><ul class="lista">` +
        MODELOS.filter(m => m.marca === marca).map(m =>
            `<li><div>${m.nombre}<small>${m.versiones.length} ${m.versiones.length === 1 ? "versión" : "versiones"} · ${m.cantidad} en stock</small></div>` +
            `<span class="precio">Desde ${formatoPrecio.format(m.precio)}</span>` +
            `<span class="acciones">` +
            `<button class="boton" type="button" data-ver-modelo="${esc(m.nombre)}">Ver stock</button>` +
            `<a class="boton" href="${m.catalogo || "0km.html"}">Ver catálogo</a>` +
            `</span></li>`
        ).join("") +
        "</ul>"
    ).join("");

    document.getElementById("accesorios-lista").innerHTML = ACCESORIOS.map(a =>
        `<li><div>${a.nombre}<small>${a.detalle}</small></div>` +
        `<span class="precio">${formatoPrecio.format(a.precio)}</span>` +
        `<button class="boton" type="button" data-consultar="${esc(a.nombre)}">Consultar</button></li>`
    ).join("");

    document.getElementById("empleo-lista").innerHTML = PUESTOS.map(p =>
        `<li><div>${p.nombre}<small>${p.detalle}</small></div></li>`
    ).join("");

    document.getElementById("empleo-puesto").innerHTML = PUESTOS.map(p => `<option>${p.nombre}</option>`).join("");

    document.getElementById("service-fecha").min = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

    // ---------- STOCK ----------
    // El bloque "Vehículos nuevos en stock" es opcional: si la página no lo tiene, se muestra todo el stock
    const selectVehiculo = document.getElementById("vehiculo");
    const botonStock = document.getElementById("boton-stock");
    let modeloElegido = "";

    function filtrarStock() {
        return modeloElegido ? STOCK.filter(v => v.modelo === modeloElegido) : STOCK;
    }

    function elegirModelo(nombre) {
        modeloElegido = nombre;
        if (selectVehiculo) selectVehiculo.value = nombre;
        if (botonStock) {
            const cantidad = filtrarStock().length;
            botonStock.textContent = cantidad + (cantidad === 1 ? " vehículo disponible" : " vehículos disponibles");
        }
    }

    function renderStock() {
        const lista = filtrarStock();
        document.getElementById("stock-titulo").textContent =
            (modeloElegido || "Vehículos en stock") + " · " + lista.length + (lista.length === 1 ? " disponible" : " disponibles");
        document.getElementById("stock-lista").innerHTML = lista.map(v =>
            `<li><div>${v.marca} ${v.modelo} ${v.version}<small>${v.color} · ${v.anio} · 0 km</small></div>` +
            `<span class="precio">${formatoPrecio.format(v.precio)}</span>` +
            `<button class="boton" type="button" data-consultar="${esc(v.marca + " " + v.modelo + " " + v.version + " " + v.color)}">Consultar</button></li>`
        ).join("");
    }

    // ---------- ABRIR / CERRAR ----------
    function cerrarTodas() {
        document.querySelectorAll("dialog.modal-footer[open]").forEach(d => d.close());
    }

    function abrir(id) {
        cerrarTodas();
        const form = document.querySelector("#" + id + " form");
        if (form) reiniciarFormulario(form);
        if (id === "modal-stock") renderStock();
        document.getElementById(id).showModal();
    }

    function consultar(texto) {
        abrir("modal-contacto");
        document.getElementById("contacto-mensaje").value = "Hola, quiero consultar por: " + texto + ".";
    }

    function mostrarOk(form, texto) {
        const aviso = document.createElement("div");
        aviso.className = "mensaje-ok";
        aviso.textContent = texto;
        form.hidden = true;
        form.parentNode.insertBefore(aviso, form);
    }

    function reiniciarFormulario(form) {
        const aviso = form.parentNode.querySelector(".mensaje-ok");
        if (aviso) aviso.remove();
        form.reset();
        form.hidden = false;
    }

    if (selectVehiculo) {
        selectVehiculo.addEventListener("change", () => elegirModelo(selectVehiculo.value));
    }
    if (botonStock) {
        botonStock.addEventListener("click", () => abrir("modal-stock"));
    }

    // Botones del footer con data-abrir: abren su ventana.
    // Los que no tienen data-abrir (Nosotros, Whatsapp) navegan con su href.
    document.querySelectorAll("footer [data-abrir]").forEach(enlace => {
        enlace.addEventListener("click", e => {
            e.preventDefault();
            const id = enlace.dataset.abrir;
            if (id === "modal-stock") elegirModelo("");
            abrir(id);
        });
    });

    document.querySelectorAll("dialog.modal-footer").forEach(modal => {
        modal.addEventListener("click", e => {
            if (e.target === modal || e.target.classList.contains("cerrar")) {
                modal.close();
                return;
            }
            const consulta = e.target.dataset.consultar;
            if (consulta) consultar(consulta);
            const verModelo = e.target.dataset.verModelo;
            if (verModelo) {
                elegirModelo(verModelo);
                abrir("modal-stock");
            }
        });
    });

    // ---------- FORMULARIOS ----------
    document.getElementById("form-service").addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("service-nombre").value.split(" ")[0];
        const fecha = new Date(document.getElementById("service-fecha").value + "T00:00").toLocaleDateString("es-AR");
        const turno = "SV-" + Math.floor(10000 + Math.random() * 90000);
        mostrarOk(this, "¡Gracias " + nombre + "! Tu turno " + turno + " quedó reservado para el " + fecha + ". Te vamos a llamar para confirmar el horario.");
    });

    document.getElementById("form-contacto").addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("contacto-nombre").value.split(" ")[0];
        const email = document.getElementById("contacto-email").value;
        mostrarOk(this, "¡Gracias " + nombre + "! Recibimos tu consulta y te vamos a responder a " + email + " dentro de las próximas 24 horas.");
    });

    document.getElementById("form-empleo").addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("empleo-nombre").value.split(" ")[0];
        const puesto = document.getElementById("empleo-puesto").value;
        mostrarOk(this, "¡Gracias " + nombre + "! Recibimos tu postulación para " + puesto + ". Si tu perfil coincide te vamos a contactar.");
    });

    elegirModelo(selectVehiculo ? selectVehiculo.value : "");

})();
