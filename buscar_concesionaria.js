document.addEventListener("DOMContentLoaded", function () {

    // Borrar la concesionaria guardada al recargar la página
    localStorage.removeItem("carpoint_sucursal");
    
    // La concesionaria elegida se guarda en localStorage: queda en el header
    // de TODAS las páginas y se recuerda aunque cierres el navegador.
    const CLAVE = "carpoint_sucursal";
    const SUCURSALES = ["CarPoint Córdoba", "CarPoint Villa María", "CarPoint Bell Ville", "CarPoint Río Cuarto"];

    function leer() {
        try {
            const v = localStorage.getItem(CLAVE);
            return SUCURSALES.includes(v) ? v : null;   // ignora valores raros o viejos
        } catch (e) { return null; }
    }
    function guardar(nombre) {
        try { localStorage.setItem(CLAVE, nombre); } catch (e) {}
    }

    const menu = document.querySelector(".dealer-menu");

    // index.html: el header tiene un link simple (sin desplegable).
    // Si ya hay una concesionaria elegida, el link la muestra.
    if (!menu) {
        const enlace = document.querySelector(".dealer > a");
        const elegida = leer();
        if (enlace && elegida) {
            enlace.textContent = elegida;
            enlace.title = "Cambiar de concesionaria";
        }
        return;
    }

    const resumen = menu.querySelector("summary");
    const opciones = menu.querySelectorAll(".dealer-options a");
    const textoInicial = resumen.textContent.trim();
    const iframe = document.querySelector('iframe[name="mapa"]');
    const enRed = !!iframe;   // true solo en concesionarias.html

    function marcar(nombre) {
        resumen.textContent = nombre || textoInicial;
        opciones.forEach(function (a) {
            a.classList.toggle("activa", a.textContent.trim() === nombre);
        });
    }

    // Centra el mapa y resalta la tarjeta (solo existe en concesionarias.html)
    function centrarMapa(nombre) {
        if (!iframe || !nombre) return;
        document.querySelectorAll(".red-item").forEach(function (item) {
            if (item.querySelector("h3").textContent.trim() === nombre) {
                const ver = item.querySelector(".red-ver");
                iframe.src = ver.href;
                ver.focus({ preventScroll: true });
                item.scrollIntoView({ block: "nearest" });
            }
        });
    }

    // Al cargar la página
    const guardada = leer();
    marcar(guardada);
    centrarMapa(guardada);

    // Al elegir una sucursal en el header
    opciones.forEach(function (a) {
        a.addEventListener("click", function (e) {
            e.preventDefault();
            const nombre = a.textContent.trim();
            guardar(nombre);
            marcar(nombre);
            menu.removeAttribute("open");

            if (enRed) {
                centrarMapa(nombre);
            } else {
                window.location.href = "concesionarias.html";
            }
        });
    });

    // Cierra al hacer clic afuera
    document.addEventListener("click", function (e) {
        if (!menu.contains(e.target)) menu.removeAttribute("open");
    });

    // Cierra con Esc
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") menu.removeAttribute("open");
    });
});
