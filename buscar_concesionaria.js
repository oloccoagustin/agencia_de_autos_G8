document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector(".dealer-menu");
    if (!menu) return;

    const resumen = menu.querySelector("summary");
    const opciones = menu.querySelectorAll(".dealer-options a");
    const textoInicial = resumen.textContent.trim();
    const CLAVE = "carpoint_sucursal";
    const iframe = document.querySelector('iframe[name="mapa"]');
    const enRed = !!iframe;   // true solo en concesionarias.html

    function leer() {
        try { return sessionStorage.getItem(CLAVE); } catch (e) { return null; }
    }
    function guardar(nombre) {
        try { sessionStorage.setItem(CLAVE, nombre); } catch (e) {}
    }
    function borrar() {
        try { sessionStorage.removeItem(CLAVE); } catch (e) {}
    }

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

    // Si NO estamos en la red de concesionarias, la elección se reinicia
    // (ya se usó para el viaje a concesionarias.html)
    if (!enRed) borrar();

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

    // Al salir de concesionarias.html hacia otra página, se reinicia
    if (enRed) {
        document.querySelectorAll("header a[href], footer a[href]").forEach(function (link) {
            const href = link.getAttribute("href");
            if (href && href !== "#" && !link.closest(".dealer-options")) {
                link.addEventListener("click", borrar);
            }
        });
    }

    // Cierra al hacer clic afuera
    document.addEventListener("click", function (e) {
        if (!menu.contains(e.target)) menu.removeAttribute("open");
    });

    // Cierra con Esc
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") menu.removeAttribute("open");
    });
});