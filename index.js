/* =====================================================
   CARPOINT - index.js
   Parte 1: buscador global (lupa del header)
   Parte 2: footer (stock, modelos, accesorios, empleo, formularios) + header

   LOS AUTOS SE EDITAN UNA SOLA VEZ, en la lista AUTOS de abajo:
   la usan el buscador y el footer. Para agregar o sacar un auto,
   agregá o borrá una línea.
   catalogo = página donde está el auto (0km.html, usados.html o electricos.html)
   foto = ruta de la foto del auto (la misma que usás en 0km.html, usados.html
                     y electricos.html). Es la que se ve al elegir el modelo en el footer.
   ===================================================== */
(function () {

    const AUTOS = [
        // 0 Km
        { marca: "Porsche",       modelo: "911 Carrera",       dato: "0 Km · 2026",   catalogo: "0km.html", foto: "img/img/porsche-911.jpg" },
        { marca: "Audi",          modelo: "RS 3",               dato: "0 Km · 2026",   catalogo: "0km.html", foto: "img/img/audi-rs3.jpg" },
        { marca: "BMW",           modelo: "M4 Competition",     dato: "0 Km · 2026",   catalogo: "0km.html", foto: "img/img/bmw-m4.jpg" },
        { marca: "Mercedes-Benz", modelo: "AMG GT",             dato: "0 Km · 2026",   catalogo: "0km.html", foto: "img/img/mercedes-amg-gt.jpg" },
        { marca: "Land Rover",    modelo: "Range Rover Sport",  dato: "0 Km · 2026",   catalogo: "0km.html", foto: "img/img/range-rover-sport.jpg" },
        { marca: "Porsche",       modelo: "Cayenne",            dato: "0 Km · 2026",   catalogo: "0km.html", foto: "img/img/porsche-cayenne.jpg" },
        { marca: "Audi",          modelo: "RS 6 Avant",         dato: "0 Km · 2026",   catalogo: "0km.html", foto: "img/img/audi-rs6.jpg" },
        { marca: "BMW",           modelo: "X6",                 dato: "0 Km · 2026",   catalogo: "0km.html", foto: "img/img/bmw-x6.jpg" },
        { marca: "Mercedes-Benz", modelo: "Clase G",            dato: "0 Km · 2026",   catalogo: "0km.html", foto: "img/img/mercedes-clase-g.png" },
        { marca: "Audi", modelo: "Q5", dato: "0 Km · 2026", catalogo: "0km.html", foto: "img/img/audi-q5.jpg" },
        { marca: "BMW", modelo: "X5", dato: "0 Km · 2026", catalogo: "0km.html", foto: "img/img/bmw-x5.jpg" },
        { marca: "Mercedes-Benz", modelo: "GLC", dato: "0 Km · 2026", catalogo: "0km.html", foto: "img/img/mercedes-glc.jpg" },
        { marca: "Porsche", modelo: "Macan", dato: "0 Km · 2026", catalogo: "0km.html", foto: "img/img/porsche-macan.jpg" },
        { marca: "Land Rover", modelo: "Defender", dato: "0 Km · 2026", catalogo: "0km.html", foto: "img/img/land-rover-defender.webp" },
        { marca: "Volvo", modelo: "XC60", dato: "0 Km · 2026", catalogo: "0km.html", foto: "img/img/volvo-xc60.jpg" },
        { marca: "Volvo", modelo: "XC90", dato: "0 Km · 2026", catalogo: "0km.html", foto: "img/img/volvo-xc90.jpg" },
        { marca: "Land Rover", modelo: "Range Rover Velar", dato: "0 Km · 2026", catalogo: "0km.html", foto: "img/img/range-rover-velar.jpg" },
        { marca: "Audi", modelo: "A3 Sedán", dato: "0 Km · 2026", catalogo: "0km.html", foto: "img/img/audi-a3-sedan.jpg" },
        // Usados
        { marca: "Porsche",       modelo: "Macan",              dato: "2023 · 28.500 km", catalogo: "usados.html", foto: "img/img/porsche-macan-usado.jpg" },
        { marca: "Audi",          modelo: "A5 Sportback",       dato: "2022 · 34.200 km", catalogo: "usados.html", foto: "img/img/audi-a5-usado.jpg" },
        { marca: "BMW",           modelo: "330i",                dato: "2024 · 12.300 km", catalogo: "usados.html", foto: "img/img/bmw-330i-usado.jpg" },
        { marca: "Mercedes-Benz", modelo: "GLC",                dato: "2023 · 21.700 km", catalogo: "usados.html", foto: "img/img/mercedes-glc-usado.jpg" },
        { marca: "Land Rover",    modelo: "Range Rover Evoque", dato: "2022 · 39.500 km", catalogo: "usados.html", foto: "img/img/range-rover-evoque-usado.jpg" },
        { marca: "Porsche",       modelo: "Cayenne",            dato: "2021 · 47.800 km", catalogo: "usados.html", foto: "img/img/porsche-cayenne-usado.jpg" },
        { marca: "Audi",          modelo: "Q5",                 dato: "2023 · 25.100 km", catalogo: "usados.html", foto: "img/img/audi-q5-usado.jpg" },
        { marca: "BMW",           modelo: "X4",                 dato: "2022 · 32.600 km", catalogo: "usados.html", foto: "img/img/bmw-x4-usado.jpg" },
        { marca: "Mercedes-Benz", modelo: "C 300",              dato: "2024 · 9.800 km",  catalogo: "usados.html", foto: "img/img/mercedes-c300-usado.jpg" },
        { marca: "Land Rover", modelo: "Defender", dato: "2023 · 31.400 km", catalogo: "usados.html", foto: "img/img/defender-usado.jpg" },
        { marca: "Mercedes-Benz", modelo: "AMG A 45", dato: "2022 · 27.600 km", catalogo: "usados.html", foto: "img/img/mercedes-a45-usado.jpg" },
        { marca: "BMW", modelo: "X5", dato: "2021 · 52.300 km", catalogo: "usados.html", foto: "img/img/bmw-x5-usado.jpg" },
        // Eléctricos
        { marca: "Porsche",       modelo: "Taycan",             dato: "100% Eléctrico · 503 km", catalogo: "electricos.html", foto: "img/img/porsche-taycan.jpg" },
        { marca: "Audi",          modelo: "e-tron GT",          dato: "100% Eléctrico · 488 km", catalogo: "electricos.html", foto: "img/img/audi-etron-gt.jpg" },
        { marca: "BMW",           modelo: "i4",                  dato: "100% Eléctrico · 590 km", catalogo: "electricos.html", foto: "img/img/bmw-i4.jpg" },
        { marca: "BMW",           modelo: "iX",                  dato: "100% Eléctrico · 633 km", catalogo: "electricos.html", foto: "img/img/bmw-ix.jpg" },
        { marca: "Mercedes-Benz", modelo: "EQE",                dato: "100% Eléctrico · 614 km", catalogo: "electricos.html", foto: "img/img/mercedes-eqe.jpg" },
        { marca: "Mercedes-Benz", modelo: "EQS SUV",            dato: "100% Eléctrico · 600 km", catalogo: "electricos.html", foto: "img/img/mercedes-eqs-suv.jpg" },
        { marca: "Volvo",         modelo: "EX30",               dato: "100% Eléctrico · 476 km", catalogo: "electricos.html", foto: "img/img/volvo-ex30.jpg" },
        { marca: "Porsche",       modelo: "Macan Electric",     dato: "100% Eléctrico · 641 km", catalogo: "electricos.html", foto: "img/img/porsche-macan-electric.jpg" },
        { marca: "Audi",          modelo: "Q6 e-tron",          dato: "100% Eléctrico · 625 km", catalogo: "electricos.html", foto: "img/img/audi-q6-etron.jpg" },
    ];


/* =====================================================
   PARTE 1 - BUSCADOR GLOBAL
   Abre un overlay al tocar la lupa del header y busca entre
   los modelos de auto y las páginas del sitio.
   ===================================================== */
(function () {

    // Carga buscador.css automáticamente (tiene que estar en la misma carpeta que este archivo)
    const hoja = document.createElement("link");
    hoja.rel = "stylesheet";
    hoja.href = document.currentScript.src.replace(/[^\/]*$/, "buscador.css");
    document.head.appendChild(hoja);

    // ---------- DATOS: PÁGINAS DEL SITIO ----------
    const PAGINAS = [
        { titulo: "Inicio",                 detalle: "Página principal de CarPoint", href: "index.html" },
        { titulo: "Vehículos 0 Km",          detalle: "Catálogo de autos 0 Km",       href: "0km.html" },
        { titulo: "Vehículos Usados",        detalle: "Catálogo de autos usados",     href: "usados.html" },
        { titulo: "Vehículos Eléctricos",    detalle: "Catálogo de autos eléctricos", href: "electricos.html" },
        { titulo: "Financiación",            detalle: "Armá tu plan de financiación", href: "financiacion.html" },
        { titulo: "Test Drive",              detalle: "Reservá una prueba de manejo", href: "testdrive.html" },
        { titulo: "Acerca de Nosotros",       detalle: "Quiénes somos",                href: "nosotros.html" },
        { titulo: "Red de Concesionarias",   detalle: "Encontrá tu sucursal",         href: "concesionarias.html" },
    ];

    const MAX_RESULTADOS = 6; // por grupo (autos / páginas)

    // ---------- ARMADO DEL OVERLAY ----------
    const overlay = document.createElement("div");
    overlay.className = "buscador-overlay";
    overlay.innerHTML = `
        <div class="buscador-caja" role="dialog" aria-modal="true" aria-label="Buscar en CarPoint">
            <button type="button" class="buscador-cerrar" aria-label="Cerrar búsqueda">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <label class="buscador-campo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="search" placeholder="Buscar un auto o una página…" autocomplete="off" aria-label="Buscar en CarPoint">
            </label>
            <div class="buscador-resultados"></div>
        </div>`;
    document.body.appendChild(overlay);

    const caja        = overlay.querySelector(".buscador-caja");
    const input       = overlay.querySelector("input");
    const resultados   = overlay.querySelector(".buscador-resultados");

    const normalizar = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    // ---------- BÚSQUEDA ----------
    function buscarAutos(q) {
        return AUTOS
            .filter(a => normalizar(`${a.marca} ${a.modelo}`).includes(q))
            .slice(0, MAX_RESULTADOS);
    }
    function buscarPaginas(q) {
        return PAGINAS
            .filter(p => normalizar(`${p.titulo} ${p.detalle}`).includes(q))
            .slice(0, MAX_RESULTADOS);
    }

    function fila(titulo, detalle, href) {
        const a = document.createElement("a");
        a.className = "buscador-item";
        a.href = href;
        a.innerHTML = `<strong>${titulo}</strong><span>${detalle}</span>`;
        return a;
    }

    // ---------- localStorage: historial de búsquedas ----------
    // Se guardan las últimas 5 búsquedas (las que terminaron en un resultado)
    // y se muestran al abrir la lupa con el campo vacío.
    const CLAVE_BUSQUEDAS = "carpoint_busquedas";
    const MAX_HISTORIAL = 5;

    function leerHistorial() {
        try {
            const lista = JSON.parse(localStorage.getItem(CLAVE_BUSQUEDAS));
            return Array.isArray(lista) ? lista.filter(t => typeof t === "string") : [];
        } catch (e) { return []; }
    }
    function guardarBusqueda(texto) {
        texto = String(texto || "").trim().slice(0, 40);
        if (texto.length < 2) return;
        const clave = normalizar(texto);
        const lista = leerHistorial().filter(t => normalizar(t) !== clave); // sin repetidos
        lista.unshift(texto);                                               // la última, primera
        try { localStorage.setItem(CLAVE_BUSQUEDAS, JSON.stringify(lista.slice(0, MAX_HISTORIAL))); } catch (e) {}
    }
    function borrarHistorial() {
        try { localStorage.removeItem(CLAVE_BUSQUEDAS); } catch (e) {}
    }

    function pintarRecientes() {
        const lista = leerHistorial();
        if (!lista.length) {
            resultados.innerHTML = '<p class="buscador-ayuda">Escribí una marca, un modelo o una sección del sitio.</p>';
            return;
        }
        const grupo = document.createElement("div");
        grupo.className = "buscador-grupo buscador-historial";

        const titulo = document.createElement("h3");
        titulo.textContent = "Búsquedas recientes";
        const borrar = document.createElement("button");
        borrar.type = "button";
        borrar.className = "buscador-borrar";
        borrar.textContent = "Borrar historial";
        borrar.addEventListener("click", () => { borrarHistorial(); pintarRecientes(); });
        titulo.appendChild(borrar);
        grupo.appendChild(titulo);

        lista.forEach(t => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "buscador-reciente";
            b.textContent = t;   // textContent: lo guardado nunca se interpreta como HTML
            b.addEventListener("click", () => { input.value = t; input.focus(); pintar(normalizar(t)); });
            grupo.appendChild(b);
        });
        resultados.innerHTML = "";
        resultados.appendChild(grupo);
    }

    function pintar(q) {
        resultados.innerHTML = "";
        if (!q) {
            pintarRecientes();
            return;
        }

        const autos = buscarAutos(q);
        const paginas = buscarPaginas(q);

        if (!autos.length && !paginas.length) {
            resultados.innerHTML = `<p class="buscador-vacio">No encontramos resultados para “${input.value}”.</p>`;
            return;
        }

        if (autos.length) {
            const grupo = document.createElement("div");
            grupo.className = "buscador-grupo";
            grupo.innerHTML = "<h3>Vehículos</h3>";
            autos.forEach(a => grupo.appendChild(fila(`${a.marca} ${a.modelo}`, a.dato, a.catalogo)));
            resultados.appendChild(grupo);
        }

        if (paginas.length) {
            const grupo = document.createElement("div");
            grupo.className = "buscador-grupo";
            grupo.innerHTML = "<h3>Páginas</h3>";
            paginas.forEach(p => grupo.appendChild(fila(p.titulo, p.detalle, p.href)));
            resultados.appendChild(grupo);
        }
    }

    input.addEventListener("input", () => pintar(normalizar(input.value)));

    // Al tocar un resultado, esa búsqueda queda en el historial
    resultados.addEventListener("click", e => {
        if (e.target.closest(".buscador-item")) guardarBusqueda(input.value);
    });

    // Enter va directo al primer resultado
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            const primero = resultados.querySelector(".buscador-item");
            if (primero) {
                guardarBusqueda(input.value);
                window.location.href = primero.getAttribute("href");
            }
        }
    });

    // ---------- ABRIR / CERRAR ----------
    function abrir() {
        overlay.classList.add("abierto");
        document.body.classList.add("buscador-bloqueado");
        pintar("");
        setTimeout(() => input.focus(), 10);
    }
    function cerrar() {
        overlay.classList.remove("abierto");
        document.body.classList.remove("buscador-bloqueado");
        input.value = "";
    }

    overlay.querySelector(".buscador-cerrar").addEventListener("click", cerrar);
    overlay.addEventListener("click", e => { if (e.target === overlay) cerrar(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });

    // Conecta la lupa que ya está en el header de cada página
    document.querySelectorAll(".search-icon").forEach(icono => {
        icono.style.cursor = "pointer";
        icono.addEventListener("click", abrir);
    });

})();


/* =====================================================
   PARTE 2 - FOOTER (lógica de tu amigo, con tus autos) + HEADER
   Trabaja con los <dialog> que ya están en tu index.html.
   ===================================================== */
(function () {

    // ---------- DATOS ----------
    const TIPOS = { "0km.html": "0 Km", "usados.html": "Usado", "electricos.html": "Eléctrico" };
    const comparar = (a, b) => a.localeCompare(b, "es", { numeric: true });
    const ordenar = (a, b) => comparar(a.marca, b.marca) || comparar(a.modelo, b.modelo) || comparar(a.catalogo, b.catalogo);
    const esNuevo = a => a.catalogo !== "usados.html";

    // "Vehículos nuevos en stock" = 0 Km + eléctricos. Los usados se ven en "Todos los modelos".
    const STOCK = AUTOS.filter(esNuevo).sort(ordenar);
    // Modelos que se pueden pedir pero NO están en stock: aparecen solo en "Todos los modelos"
    // (no están en el stock ni en el buscador). Agregá o borrá líneas a gusto.
    const BAJO_PEDIDO = [
        { marca: "Audi",          modelo: "A3 Sportback" },
        { marca: "Audi",          modelo: "Q3" },
        { marca: "Audi",          modelo: "Q8" },
        { marca: "BMW",           modelo: "M2" },
        { marca: "BMW",           modelo: "M3 Competition" },
        { marca: "Ferrari",       modelo: "296 GTB" },
        { marca: "Lamborghini",   modelo: "Urus" },
        { marca: "Maserati",      modelo: "GranTurismo" },
        { marca: "Mercedes-Benz", modelo: "GLE" },
        { marca: "Porsche",       modelo: "911 Turbo S" },
        { marca: "Porsche",       modelo: "Cayman" }
    ].map(a => ({ ...a, dato: "Bajo pedido", catalogo: "0km.html", pedido: true }));

    const TODOS = [...AUTOS, ...BAJO_PEDIDO].sort(ordenar);

    // Datos de ejemplo (accesorios, puestos): editalos con los reales
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
    const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const poner = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

    // ---------- localStorage: recordar el modelo elegido y los datos del usuario ----------
    const CLAVE_MODELO = "carpoint_modelo";
    const CLAVE_DATOS = "carpoint_datos";
    const guardarLocal = (clave, valor) => { try { localStorage.setItem(clave, valor); } catch (e) {} };
    const leerLocal = clave => { try { return localStorage.getItem(clave); } catch (e) { return null; } };

    // Qué campos de los formularios guardan cada dato
    const CAMPOS = {
        nombre:   ["service-nombre", "contacto-nombre", "empleo-nombre"],
        email:    ["contacto-email", "empleo-email"],
        telefono: ["service-telefono"]
    };

    const leerDatos = () => { try { return JSON.parse(leerLocal(CLAVE_DATOS)) || {}; } catch (e) { return {}; } };

    // Guarda lo que el usuario escribió en el formulario que acaba de enviar
    const guardarDatos = () => {
        const datos = leerDatos();
        Object.entries(CAMPOS).forEach(([dato, ids]) => {
            const lleno = ids.map(id => document.getElementById(id)).find(el => el && el.value.trim());
            if (lleno) datos[dato] = lleno.value.trim();
        });
        guardarLocal(CLAVE_DATOS, JSON.stringify(datos));
    };

    // Completa los formularios con los datos guardados
    const rellenarDatos = () => {
        const datos = leerDatos();
        Object.entries(CAMPOS).forEach(([dato, ids]) => ids.forEach(id => {
            const el = document.getElementById(id);
            if (el && datos[dato]) el.value = datos[dato];
        }));
    };

    // ---------- SELECT DEL STOCK (se arma con los autos nuevos) ----------
    const selectVehiculo = document.getElementById("vehiculo");
    if (selectVehiculo) {
        const marcas = [...new Set(STOCK.map(v => v.marca))].sort(comparar);
        selectVehiculo.innerHTML = '<option value="">Todos los vehículos</option>' + marcas.map(marca =>
            `<optgroup label="${marca}">` +
            [...new Set(STOCK.filter(v => v.marca === marca).map(v => v.modelo))].sort(comparar)
                .map(modelo => `<option>${modelo}</option>`).join("") +
            "</optgroup>"
        ).join("");
    }

    // ---------- LISTAS ----------
    poner("modelos-lista", TODOS.map(a => {
        // Bajo pedido: no hay stock, se consulta. Nuevos: Ver stock. Usados: solo catálogo.
        const acciones = a.pedido
            ? `<button class="boton" type="button" data-consultar="${esc(a.marca + " " + a.modelo + " (bajo pedido)")}">Consultar</button>`
            : (esNuevo(a) ? `<button class="boton" type="button" data-ver-modelo="${esc(a.modelo)}">Ver stock</button>` : "") +
              `<a class="boton" href="${a.catalogo}">Ver catálogo</a>`;
        return `<li><div>${a.modelo}<small>${a.marca} · ${TIPOS[a.catalogo]}</small></div>` +
               `<span class="precio">${a.dato}</span>` +
               `<span class="acciones">${acciones}</span></li>`;
    }).join(""));

    poner("accesorios-lista", ACCESORIOS.map(a =>
        `<li><div>${a.nombre}<small>${a.detalle}</small></div>` +
        `<span class="precio">${formatoPrecio.format(a.precio)}</span>` +
        `<button class="boton" type="button" data-consultar="${esc(a.nombre)}">Consultar</button></li>`
    ).join(""));

    poner("empleo-lista", PUESTOS.map(p =>
        `<li><div>${p.nombre}<small>${p.detalle}</small></div></li>`
    ).join(""));

    poner("empleo-puesto", PUESTOS.map(p => `<option>${p.nombre}</option>`).join(""));

    // La fecha del service no puede ser anterior a mañana
    const fechaService = document.getElementById("service-fecha");
    if (fechaService) fechaService.min = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

    // ---------- STOCK ----------
    // ---------- FOTO DEL AUTO (cambia al elegir un modelo, como en la página de Audi) ----------
    // Cada auto de la lista AUTOS tiene su foto en el campo "foto": son las mismas
    // que ya usás en 0km.html, usados.html y electricos.html.
    //  - .png / .webp (auto RECORTADO, sin fondo): flota sobre tu fondo oscuro, como en Audi.
    //  - .jpg (foto con fondo): se muestra recortada con bordes redondeados, como tu foto original.
    // Si falta el archivo, se queda la foto de siempre y la consola (F12) avisa cuál falta.
    const TRANSICION_FOTO = "opacity .3s ease, transform .6s cubic-bezier(.2,.8,.2,1)";
    const fotoStock = document.querySelector(".stock-foto");
    const FOTO_INICIAL = fotoStock ? { src: fotoStock.getAttribute("src"), alt: fotoStock.alt } : null;
    let turnoFoto = 0;

    if (fotoStock) fotoStock.style.transition = TRANSICION_FOTO;

    function cambiarFoto(auto) {
        if (!fotoStock) return;
        const turno = ++turnoFoto;

        // Muestra la foto con un fundido (si ya es esa, no hace nada)
        const mostrar = (ruta, alt) => {
            if (turno !== turnoFoto) return;
            if (fotoStock.getAttribute("src") === ruta) {
                fotoStock.style.opacity = "1";
                fotoStock.style.transform = "none";
                return;
            }
            const recorte = ruta !== FOTO_INICIAL.src && /\.(webp|png|avif)$/i.test(ruta);

            fotoStock.style.opacity = "0";
            fotoStock.style.transform = "scale(1.03)";
            setTimeout(() => {
                if (turno !== turnoFoto) return;
                fotoStock.src = ruta;
                fotoStock.alt = alt;

                // Recortado: flota sobre el fondo. Con fondo: queda como tu foto original.
                fotoStock.style.objectFit    = recorte ? "contain" : "";
                fotoStock.style.borderRadius = recorte ? "0" : "";
                fotoStock.style.filter       = recorte ? "drop-shadow(0 18px 24px rgba(0,0,0,.35))" : "";

                // La foto entra con un pequeño desplazamiento
                fotoStock.style.transition = "none";
                fotoStock.style.transform = recorte ? "translateX(48px)" : "scale(1.03)";
                void fotoStock.offsetWidth;
                fotoStock.style.transition = TRANSICION_FOTO;
                fotoStock.style.opacity = "1";
                fotoStock.style.transform = "none";
            }, 280);
        };

        // "Todos los vehículos" (o un auto sin foto): vuelve a la foto original
        if (!auto || !auto.foto) { mostrar(FOTO_INICIAL.src, FOTO_INICIAL.alt); return; }

        const prueba = new Image();
        prueba.onload = () => mostrar(auto.foto, auto.marca + " " + auto.modelo);
        prueba.onerror = () => {
            console.warn("Falta la foto de " + auto.marca + " " + auto.modelo + ": " + auto.foto);
            mostrar(FOTO_INICIAL.src, FOTO_INICIAL.alt);
        };
        prueba.src = auto.foto;
    }

    const botonStock = document.getElementById("boton-stock");
    let modeloElegido = "";

    function filtrarStock() {
        return modeloElegido ? STOCK.filter(v => v.modelo === modeloElegido) : STOCK;
    }

    function elegirModelo(nombre) {
        modeloElegido = nombre;
        if (selectVehiculo) selectVehiculo.value = nombre;
        cambiarFoto(nombre ? STOCK.find(v => v.modelo === nombre) : null);
        if (botonStock) {
            const cantidad = filtrarStock().length;
            botonStock.textContent = cantidad + (cantidad === 1 ? " vehículo disponible" : " vehículos disponibles");
        }
    }

    function renderStock() {
        const lista = filtrarStock();
        const titulo = document.getElementById("stock-titulo");
        if (titulo) {
            titulo.textContent =
                (modeloElegido || "Vehículos en stock") + " · " + lista.length + (lista.length === 1 ? " disponible" : " disponibles");
        }
        poner("stock-lista", lista.map(v =>
            `<li><div>${v.marca} ${v.modelo}</div>` +
            `<span class="precio">${v.dato}</span>` +
            `<button class="boton" type="button" data-consultar="${esc(v.marca + " " + v.modelo + " (" + v.dato + ")")}">Consultar</button></li>`
        ).join(""));
    }

    // ---------- ABRIR / CERRAR VENTANAS ----------
    function cerrarTodas() {
        document.querySelectorAll("dialog[open]").forEach(d => d.close());
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

    function abrir(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        cerrarTodas();
        const form = modal.querySelector("form");
        if (form) { reiniciarFormulario(form); rellenarDatos(); }
        if (id === "modal-stock") renderStock();
        modal.showModal();
    }

    function consultar(texto) {
        abrir("modal-contacto");
        const mensaje = document.getElementById("contacto-mensaje");
        if (mensaje) mensaje.value = "Hola, quiero consultar por: " + texto + ".";
    }

    if (selectVehiculo) {
        selectVehiculo.addEventListener("change", () => {
            elegirModelo(selectVehiculo.value);
            guardarLocal(CLAVE_MODELO, selectVehiculo.value);
        });
    }
    if (botonStock) {
        botonStock.addEventListener("click", () => abrir("modal-stock"));
    }

    // Links del footer con data-abrir: abren su ventana
    document.querySelectorAll("footer [data-abrir]").forEach(enlace => {
        enlace.addEventListener("click", e => {
            e.preventDefault();
            const id = enlace.dataset.abrir;
            if (id === "modal-stock") elegirModelo("");
            abrir(id);
        });
    });

    document.querySelectorAll("dialog").forEach(modal => {
        modal.addEventListener("click", e => {
            // Click en la × o fuera de la ventana (en el fondo oscuro) = cerrar
            const r = modal.getBoundingClientRect();
            const fuera = e.clientX < r.left || e.clientX > r.right ||
                          e.clientY < r.top  || e.clientY > r.bottom;
            if (fuera || e.target.classList.contains("cerrar")) {
                modal.close();
                return;
            }
            const consulta = e.target.dataset.consultar;
            if (consulta) consultar(consulta);
            const verModelo = e.target.dataset.verModelo;
            if (verModelo) {
                elegirModelo(verModelo);
                guardarLocal(CLAVE_MODELO, verModelo);
                abrir("modal-stock");
            }
        });
    });

    // ---------- FORMULARIOS ----------
    const formService = document.getElementById("form-service");
    if (formService) formService.addEventListener("submit", function (e) {
        e.preventDefault();
        guardarDatos();
        const nombre = document.getElementById("service-nombre").value.split(" ")[0];
        const fecha = new Date(document.getElementById("service-fecha").value + "T00:00").toLocaleDateString("es-AR");
        const turno = "SV-" + Math.floor(10000 + Math.random() * 90000);
        mostrarOk(this, "¡Gracias " + nombre + "! Tu turno " + turno + " quedó reservado para el " + fecha + ". Te vamos a llamar para confirmar el horario.");
    });

    const formContacto = document.getElementById("form-contacto");
    if (formContacto) formContacto.addEventListener("submit", function (e) {
        e.preventDefault();
        guardarDatos();
        const nombre = document.getElementById("contacto-nombre").value.split(" ")[0];
        const email = document.getElementById("contacto-email").value;
        mostrarOk(this, "¡Gracias " + nombre + "! Recibimos tu consulta y te vamos a responder a " + email + " dentro de las próximas 24 horas.");
    });

    const formEmpleo = document.getElementById("form-empleo");
    if (formEmpleo) formEmpleo.addEventListener("submit", function (e) {
        e.preventDefault();
        guardarDatos();
        const nombre = document.getElementById("empleo-nombre").value.split(" ")[0];
        const puesto = document.getElementById("empleo-puesto").value;
        mostrarOk(this, "¡Gracias " + nombre + "! Recibimos tu postulación para " + puesto + ". Si tu perfil coincide te vamos a contactar.");
    });

    // Al cargar: vuelve al último modelo que elegiste (si todavía está en el stock)
    const modeloGuardado = leerLocal(CLAVE_MODELO);
    elegirModelo(modeloGuardado && STOCK.some(v => v.modelo === modeloGuardado)
        ? modeloGuardado
        : (selectVehiculo ? selectVehiculo.value : ""));

    // ---------- HEADER: sólido al bajar, se oculta al bajar y reaparece al subir ----------
    const header = document.querySelector(".hero-wrapper header");
    if (header) {
        let ultimoY = window.scrollY;
        let esperando = false;

        const actualizarHeader = () => {
            const y = window.scrollY;
            header.classList.toggle("header--solido", y > 40);
            if (y > 120 && y > ultimoY + 4) {
                header.classList.add("header--oculto");
            } else if (y < ultimoY - 4 || y <= 120) {
                header.classList.remove("header--oculto");
            }
            ultimoY = y;
            esperando = false;
        };

        window.addEventListener("scroll", () => {
            if (!esperando) {
                esperando = true;
                requestAnimationFrame(actualizarHeader);
            }
        }, { passive: true });

        actualizarHeader();
    }

})();

})();