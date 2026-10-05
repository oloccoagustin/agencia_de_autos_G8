const dealer = document.querySelector(".dealer");
const dealerTrigger = document.getElementById("dealerTrigger");

const dealerMapButton = document.getElementById("dealerMapButton");
const dealerListButton = document.getElementById("dealerListButton");

const dealerMap = document.getElementById("dealerMap");
const dealerList = document.getElementById("dealerList");

const dealerSearch = document.getElementById("dealerSearch");
const dealerItems = document.querySelectorAll(".dealer-item");

const dealerEmpty = document.getElementById("dealerEmpty");

const dealerTriggerText =
    document.getElementById("dealerTriggerText");


/* =========================================
   ABRIR / CERRAR
   ========================================= */

dealerTrigger.addEventListener("click", () => {

    dealer.classList.toggle("open");

    if (dealer.classList.contains("open")) {

        setTimeout(() => {
            dealerSearch.focus();
        }, 200);

    }

});


/* =========================================
   CERRAR HACIENDO CLICK AFUERA
   ========================================= */

document.addEventListener("click", (event) => {

    if (!dealer.contains(event.target)) {

        dealer.classList.remove("open");

    }

});


/* =========================================
   MAPA
   ========================================= */

dealerMapButton.addEventListener("click", () => {

    dealerMap.classList.remove("hidden");
    dealerList.classList.remove("visible");

    dealerMapButton.classList.add("active");
    dealerListButton.classList.remove("active");

});


/* =========================================
   LISTADO
   ========================================= */

dealerListButton.addEventListener("click", () => {

    dealerMap.classList.add("hidden");
    dealerList.classList.add("visible");

    dealerMapButton.classList.remove("active");
    dealerListButton.classList.add("active");

});


/* =========================================
   BUSCAR CONCESIONARIOS
   ========================================= */

dealerSearch.addEventListener("input", () => {

    const texto =
        dealerSearch.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();


    /* Cuando escribe algo pasamos al listado */

    if (texto !== "") {

        dealerMap.classList.add("hidden");
        dealerList.classList.add("visible");

        dealerMapButton.classList.remove("active");
        dealerListButton.classList.add("active");

    }


    let encontrados = 0;


    dealerItems.forEach(item => {

        const contenido =
            item.dataset.search
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");


        if (contenido.includes(texto)) {

            item.style.display = "flex";
            encontrados++;

        } else {

            item.style.display = "none";

        }

    });


    if (encontrados === 0) {

        dealerEmpty.style.display = "block";

    } else {

        dealerEmpty.style.display = "none";

    }

});


/* =========================================
   SELECCIONAR CONCESIONARIO DESDE LISTADO
   ========================================= */

dealerItems.forEach(item => {

    item.addEventListener("click", () => {

        seleccionarDealer(item.dataset.dealer);

    });

});


/* =========================================
   SELECCIONAR DESDE MAPA
   ========================================= */

document.querySelectorAll(".map-marker").forEach(marker => {

    marker.addEventListener("click", () => {

        seleccionarDealer(marker.dataset.dealer);

    });

});


/* =========================================
   FUNCIÓN DE SELECCIÓN
   ========================================= */

function seleccionarDealer(nombre) {

    dealerTriggerText.textContent = nombre;

    dealer.classList.add("selected");
    dealer.classList.remove("open");

}


/* =========================================
   UBICACIÓN ACTUAL
   ========================================= */

const dealerLocation =
    document.getElementById("dealerLocation");


dealerLocation.addEventListener("click", () => {

    if (!navigator.geolocation) {

        alert("Tu navegador no permite utilizar la ubicación.");

        return;

    }


    dealerLocation.querySelector("span").textContent =
        "Buscando ubicación...";


    navigator.geolocation.getCurrentPosition(

        () => {

            /*
            Más adelante podemos calcular cuál de
            las cuatro sucursales es realmente
            la más cercana.
            */

            dealerLocation.querySelector("span").textContent =
                "Ubicación encontrada";

        },

        () => {

            dealerLocation.querySelector("span").textContent =
                "No pudimos acceder a tu ubicación";

        }

    );

});

const dealerClose = document.querySelector(".dealer-close");

dealerClose.addEventListener("click", (event) => {

    // Evita que también se ejecute el click del botón principal
    event.stopPropagation();

    // Si hay una concesionaria seleccionada
    if (dealerTriggerText.textContent.trim() !== "Seleccionar un concesionario") {

        dealerTriggerText.textContent =
            "Seleccionar un concesionario";
        dealer.classList.remove("selected");

        // Limpiar búsqueda
        dealerSearch.value = "";

        dealerItems.forEach(item => {
            item.style.display = "flex";
        });

        dealerEmpty.style.display = "none";

        // Volver al mapa
        dealerMap.classList.remove("hidden");
        dealerList.classList.remove("visible");

        dealerMapButton.classList.add("active");
        dealerListButton.classList.remove("active");

    }

    // Cerrar panel
    dealer.classList.remove("open");
});