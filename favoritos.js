document.addEventListener("DOMContentLoaded", function () {

    const CLAVE_FAVORITOS = "carpoint_favoritos";

    // Recuperar favoritos guardados
    function obtenerFavoritos() {

        const guardados = localStorage.getItem(CLAVE_FAVORITOS);

        if (guardados) {
            return JSON.parse(guardados);
        }

        return [];
    }


    // Guardar favoritos
    function guardarFavoritos(favoritos) {

        localStorage.setItem(
            CLAVE_FAVORITOS,
            JSON.stringify(favoritos)
        );

    }


    // Favoritos existentes
    let favoritos = obtenerFavoritos();


    // Buscar todas las tarjetas
    const tarjetas = document.querySelectorAll(".auto-card");


    tarjetas.forEach(function (tarjeta) {

        const boton = tarjeta.querySelector(".btn-favorito");

        if (!boton) return;


        const marca = tarjeta.dataset.marca;
        const modelo = tarjeta.dataset.modelo;
        const precio = tarjeta.dataset.precio;


        // Ver si ya estaba guardado
        const yaEsFavorito = favoritos.some(function (auto) {
            return auto.marca === marca &&
                   auto.modelo === modelo;
        });


        if (yaEsFavorito) {
            boton.classList.add("activo");
            boton.textContent = "♥";
        }


        // Cuando hacemos clic en el corazón
        boton.addEventListener("click", function () {

            const indice = favoritos.findIndex(function (auto) {
                return auto.marca === marca &&
                       auto.modelo === modelo;
            });


            // Si NO está guardado, agregarlo
            if (indice === -1) {

                favoritos.push({
                    marca: marca,
                    modelo: modelo,
                    precio: precio
                });

                boton.classList.add("activo");
                boton.textContent = "♥";

            }

            // Si YA está guardado, eliminarlo
            else {

                favoritos.splice(indice, 1);

                boton.classList.remove("activo");
                boton.textContent = "♡";

            }


            guardarFavoritos(favoritos);

        });

    });

});