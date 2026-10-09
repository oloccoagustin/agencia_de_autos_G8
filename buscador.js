/* =====================================================
   BUSCADOR GLOBAL DE CARPOINT
   Abre un overlay al tocar la lupa del header y busca entre
   los modelos de auto y las páginas del sitio.
   ES EL ÚNICO BUSCADOR del sitio (también el del index) y tiene la ÚNICA
   lista de autos. Se usa agregando UNA línea antes de </body> en cada página:
       <script src="buscador.js"></script>
   No hace falta agregar el <link> de buscador.css: este archivo
   lo carga solo.
   ===================================================== */
(function () {

    // Carga buscador.css automáticamente (tiene que estar en la misma carpeta)
    const hoja = document.createElement("link");
    hoja.rel = "stylesheet";
    hoja.href = document.currentScript.src.replace(/\.js(\?.*)?$/, ".css");
    document.head.appendChild(hoja);

    // ---------- DATOS: PÁGINAS DEL SITIO ----------
    const PAGINAS = [
        { titulo: "Inicio",                 detalle: "Página principal de CarPoint", href: "index.html" },
        { titulo: "Vehículos 0 Km",          detalle: "Catálogo de autos 0 Km",       href: "0km.html" },
        { titulo: "Vehículos Usados",        detalle: "Catálogo de autos usados",     href: "usados.html" },
        { titulo: "Vehículos Eléctricos",    detalle: "Catálogo de autos eléctricos", href: "electricos.html" },
        { titulo: "Financiación",            detalle: "Armá tu plan de financiación", href: "financiacion.html" },
        { titulo: "Test Drive",              detalle: "Reservá una prueba de manejo", href: "test_drive.html" },
        { titulo: "Acerca de Nosotros",       detalle: "Quiénes somos",                href: "nosotros.html" },
        { titulo: "Red de Concesionarias",   detalle: "Encontrá tu sucursal",         href: "concesionarias.html" },
    ];

    // ---------- DATOS: MODELOS DE AUTO ----------
    // catalogo = a qué página del sitio manda (no hay página individual por auto)
    // foto = la foto del auto (la usa el footer del inicio al elegir un modelo)
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

    // La lista queda disponible para index.js (el footer del inicio usa las mismas fotos y modelos)
    window.CARPOINT_AUTOS = AUTOS;

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