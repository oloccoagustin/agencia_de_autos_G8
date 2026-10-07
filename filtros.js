document.addEventListener("DOMContentLoaded", () => {

    const filtroMarca = document.getElementById("filtro-marca");
    const filtroAnio = document.getElementById("filtro-anio");
    const filtroKm = document.getElementById("filtro-km");
    const filtroModelo = document.getElementById("filtro-modelo");
    const filtroAutonomia = document.getElementById("filtro-autonomia");
    const filtroTipo = document.getElementById("filtro-tipo");
    const filtroPrecio = document.getElementById("filtro-precio");
    const limpiarFiltros = document.getElementById("limpiar-filtros");

    const contenedor = document.querySelector(".autos-grid");
    const sinResultados = document.getElementById("sinResultados");

    if (!contenedor) return;

    const autos = Array.from(contenedor.querySelectorAll(".auto-card"));
    const ordenOriginal = [...autos];

    const valor = (elemento) => (elemento ? elemento.value : "");

    // =========================
    // ACTUALIZAR MODELOS
    // =========================

    function actualizarModelos() {
        if (!filtroModelo) return;

        const marcaSeleccionada = valor(filtroMarca);
        const modeloActual = filtroModelo.value;

        filtroModelo.innerHTML =
            '<option value="">Todos los modelos</option>';

        const modelos = [];

        autos.forEach((auto) => {
            const marcaAuto = auto.dataset.marca;
            const modeloAuto = auto.dataset.modelo;

            if (
                (!marcaSeleccionada || marcaAuto === marcaSeleccionada) &&
                modeloAuto &&
                !modelos.includes(modeloAuto)
            ) {
                modelos.push(modeloAuto);
            }
        });

        modelos.forEach((modelo) => {
            const auto = autos.find(
                (a) =>
                    a.dataset.modelo === modelo &&
                    (!marcaSeleccionada ||
                        a.dataset.marca === marcaSeleccionada)
            );

            const option = document.createElement("option");

            option.value = modelo;

            option.textContent = auto
                ? `${auto.dataset.marca} ${modelo}`
                : modelo;

            filtroModelo.appendChild(option);
        });

        // Si el modelo seleccionado sigue existiendo, lo conserva.
        // Si no corresponde a la nueva marca, lo limpia.
        if (modelos.includes(modeloActual)) {
            filtroModelo.value = modeloActual;
        } else {
            filtroModelo.value = "";
        }
    }


    // =========================
    // FILTRAR AUTOS
    // =========================

    function filtrarAutos() {

        const marca = valor(filtroMarca);
        const anio = valor(filtroAnio);
        const km = valor(filtroKm);
        const modelo = valor(filtroModelo);
        const autonomia = valor(filtroAutonomia);
        const tipo = valor(filtroTipo);
        const precio = valor(filtroPrecio);

        let visibles = 0;

        autos.forEach((auto) => {

            const kmAuto = Number(auto.dataset.km || 0);
            const autonomiaAuto = Number(auto.dataset.autonomia || 0);

            const cumpleMarca =
                !marca || auto.dataset.marca === marca;

            const cumpleAnio =
                !anio || auto.dataset.anio === anio;

            const cumpleModelo =
                !modelo || auto.dataset.modelo === modelo;

            const cumpleTipo =
                !tipo || auto.dataset.tipo === tipo;


            // =========================
            // KILOMETRAJE
            // =========================

            let cumpleKm = true;

            if (km === "10000")
                cumpleKm = kmAuto <= 10000;

            if (km === "30000")
                cumpleKm = kmAuto <= 30000;

            if (km === "50000")
                cumpleKm = kmAuto <= 50000;

            if (km === "mas50000")
                cumpleKm = kmAuto > 50000;


            // =========================
            // AUTONOMÍA
            // =========================

            let cumpleAutonomia = true;

            if (autonomia === "hasta400")
                cumpleAutonomia = autonomiaAuto <= 400;

            if (autonomia === "400-500")
                cumpleAutonomia =
                    autonomiaAuto > 400 &&
                    autonomiaAuto <= 500;

            if (autonomia === "500-600")
                cumpleAutonomia =
                    autonomiaAuto > 500 &&
                    autonomiaAuto <= 600;

            if (autonomia === "mas600")
                cumpleAutonomia = autonomiaAuto > 600;


            // =========================
            // MOSTRAR / OCULTAR
            // =========================

            const mostrar =
                cumpleMarca &&
                cumpleAnio &&
                cumpleModelo &&
                cumpleTipo &&
                cumpleKm &&
                cumpleAutonomia;

            auto.style.display = mostrar ? "" : "none";

            if (mostrar) visibles++;
        });


        // =========================
        // ORDENAR POR PRECIO
        // =========================

        if (precio === "menor" || precio === "mayor") {

            [...autos]
                .sort((a, b) => {

                    const precioA =
                        Number(a.dataset.precio || 0);

                    const precioB =
                        Number(b.dataset.precio || 0);

                    return precio === "menor"
                        ? precioA - precioB
                        : precioB - precioA;
                })
                .forEach((auto) =>
                    contenedor.appendChild(auto)
                );

        } else {

            ordenOriginal.forEach((auto) =>
                contenedor.appendChild(auto)
            );
        }


        // =========================
        // BOTÓN LIMPIAR
        // =========================

        const hayFiltros = [
            marca,
            anio,
            km,
            modelo,
            autonomia,
            tipo,
            precio
        ].some(Boolean);

        if (limpiarFiltros) {
            limpiarFiltros.classList.toggle(
                "visible",
                hayFiltros
            );
        }


        // =========================
        // SIN RESULTADOS
        // =========================

        if (sinResultados) {
            sinResultados.style.display =
                visibles === 0 ? "block" : "none";
        }
    }


    // =========================
    // EVENTOS
    // =========================

    // Marca necesita actualizar también los modelos.
    if (filtroMarca) {
        filtroMarca.addEventListener("change", () => {
            actualizarModelos();
            filtrarAutos();
        });
    }

    // Los demás filtros solamente vuelven a filtrar.
    [
        filtroAnio,
        filtroKm,
        filtroModelo,
        filtroAutonomia,
        filtroTipo,
        filtroPrecio
    ]
        .filter(Boolean)
        .forEach((filtro) => {
            filtro.addEventListener(
                "change",
                filtrarAutos
            );
        });


    // =========================
    // LIMPIAR FILTROS
    // =========================

    if (limpiarFiltros) {

        limpiarFiltros.addEventListener("click", () => {

            [
                filtroMarca,
                filtroAnio,
                filtroKm,
                filtroAutonomia,
                filtroTipo,
                filtroPrecio
            ]
                .filter(Boolean)
                .forEach((filtro) => {
                    filtro.value = "";
                });

            // Primero reconstruye todos los modelos
            actualizarModelos();

            if (filtroModelo) {
                filtroModelo.value = "";
            }

            filtrarAutos();
        });
    }


    // =========================
    // INICIO
    // =========================

    actualizarModelos();
    filtrarAutos();

});