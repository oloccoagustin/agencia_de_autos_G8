/* =====================================================
   RED DE CONCESIONARIAS: distancia a cada sucursal
   Usa la ubicación del navegador para calcular a cuántos km
   está cada CarPoint y ordena la lista de más cerca a más lejos.
   Se usa agregando UNA línea antes de </body>, en esta página:
       <script src="concesionarias.js"></script>
   ===================================================== */
(function () {

    // Mismas coordenadas que usa cada "Ver en el mapa" del HTML
    const SUCURSALES = {
        "CarPoint Córdoba":     { lat: -31.4201, lng: -64.1888 },
        "CarPoint Villa María": { lat: -32.4075, lng: -63.2402 },
        "CarPoint Bell Ville":  { lat: -32.6272, lng: -62.6881 },
        "CarPoint Río Cuarto":  { lat: -33.1232, lng: -64.3493 },
    };

    const boton = document.querySelector(".red-ubicacion");
    const lista = document.querySelector(".red-lista");
    const iframeMapa = document.querySelector('iframe[name="mapa"]');
    if (!boton || !lista) return;

    // Ahora sí está disponible: se saca el "disabled" por si quedó en el HTML
    boton.disabled = false;
    boton.removeAttribute("title");

    // Mensaje de estado (buscando… / error), se crea una sola vez
    const estado = document.createElement("p");
    estado.className = "red-estado";
    boton.insertAdjacentElement("afterend", estado);
    function mensaje(t) { estado.textContent = t; }

    // Distancia en línea recta entre dos puntos, en km (fórmula de Haversine)
    function km(a, b) {
        const r = Math.PI / 180, R = 6371;
        const dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
        const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
        return 2 * R * Math.asin(Math.sqrt(x));
    }

    boton.addEventListener("click", () => {
        if (!navigator.geolocation) { mensaje("Tu navegador no permite obtener la ubicación."); return; }

        mensaje("Buscando tu ubicación…");

        navigator.geolocation.getCurrentPosition(
            pos => {
                const usuario = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                const items = [...lista.querySelectorAll(".red-item")];

                // Calcula la distancia de cada sucursal y la muestra
                items.forEach(item => {
                    const nombre = item.querySelector("h3").textContent.trim();
                    const c = SUCURSALES[nombre];
                    if (!c) return;
                    const d = km(usuario, c);
                    item.dataset.distancia = d;

                    let etiqueta = item.querySelector(".red-distancia");
                    if (!etiqueta) {
                        etiqueta = document.createElement("p");
                        etiqueta.className = "red-distancia";
                        item.querySelector(".red-servicios").insertAdjacentElement("afterend", etiqueta);
                    }
                    etiqueta.textContent = `A ${Math.round(d)} km de tu ubicación`;
                });

                // Reordena la lista de la más cerca a la más lejos
                items
                    .sort((a, b) => parseFloat(a.dataset.distancia) - parseFloat(b.dataset.distancia))
                    .forEach(item => lista.insertBefore(item, lista.querySelector(".red-todas")));

                // Centra el mapa en la sucursal más cercana
                const primerLink = items[0] && items[0].querySelector(".red-ver");
                if (primerLink && iframeMapa) iframeMapa.src = primerLink.href;

                mensaje(`Listo. La sucursal más cercana es ${items[0].querySelector("h3").textContent.trim()}.`);
            },
            () => mensaje("No pudimos obtener tu ubicación. Revisá los permisos del navegador."),
            { timeout: 8000 }
        );
    });

})();

/* =====================================================
   BUSCADOR: filtra las tarjetas por nombre, ciudad o CP
   ===================================================== */
(function () {

    const form  = document.querySelector(".red-buscar");
    const input = form && form.querySelector("input");
    const lista = document.querySelector(".red-lista");
    if (!input || !lista) return;

    // Sin tildes, en minúsculas
    const limpiar = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // Mensaje cuando no hay resultados
    const vacio = document.createElement("p");
    vacio.className = "red-vacio";
    vacio.textContent = "No encontramos sucursales con esa búsqueda.";
    vacio.hidden = true;
    lista.insertBefore(vacio, lista.querySelector(".red-todas"));

    function filtrar() {
        // Divide lo escrito en palabras: "Córdoba Capital (CP 5000)" -> cordoba, capital, cp, 5000
        const palabras = limpiar(input.value).split(/[^a-z0-9]+/).filter(Boolean);
        const items = lista.querySelectorAll(".red-item");
        let visibles = 0;

        items.forEach(item => {
            const texto = limpiar(item.textContent);
            const coincide = palabras.every(p => texto.includes(p));
            item.hidden = !coincide;
            if (coincide) visibles++;
        });

        vacio.hidden = visibles > 0;
    }

    input.addEventListener("input", filtrar);

    // Evita que Enter recargue la página
    form.addEventListener("submit", e => { e.preventDefault(); filtrar(); });

})();