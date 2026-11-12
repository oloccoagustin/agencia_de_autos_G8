# CarPoint · Concesionaria de autos

Sitio web de **CarPoint**, una concesionaria cordobesa de vehículos 0 Km, usados y eléctricos. Permite recorrer el catálogo con filtros, pedir un plan de financiación, reservar un test drive y encontrar la sucursal más cercana.

Proyecto integrador de **Taller de Desarrollo Web** (UCC, 2026). La primera versión estaba hecha con HTML, CSS y JavaScript; esta versión está migrada a **React + Vite**.

## Índice

1. [Autores](#autores)
2. [Sitio publicado](#sitio-publicado)
3. [Contenido de la página](#contenido-de-la-página)
4. [Tecnologías usadas](#tecnologías-usadas)
5. [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
6. [Scripts disponibles](#scripts-disponibles)
7. [Servicio simulado (json-server)](#servicio-simulado-json-server)
8. [Estructura del proyecto](#estructura-del-proyecto)
9. [Datos guardados en el navegador](#datos-guardados-en-el-navegador)
10. [Vulnerabilidades de las dependencias](#vulnerabilidades-de-las-dependencias)

## Autores

- **Agustín Olocco** · [@oloccoagustin](https://github.com/oloccoagustin)
- **Sara Aguirre** · [@ssaraaguirre](https://github.com/ssaraaguirre)
- **Bautista Clara** · [@ssaraaguirre](https://github.com/bauticlara)

## Sitio publicado

[Ver CarPoint en GitHub Pages](https://oloccoagustin.github.io/agencia_de_autos_G8/)

## Contenido de la página

| Página | Ruta | Qué se puede hacer |
| --- | --- | --- |
| Inicio | `/` | Video de portada, accesos a las secciones y consulta del stock de 0 Km por modelo |
| 0 Km | `/0km` | Catálogo de autos nuevos con filtros por marca, modelo y orden por precio |
| Usados | `/usados` | Catálogo de usados con filtros por marca, año y kilometraje |
| Eléctricos | `/electricos` | Catálogo de eléctricos con filtros por marca, modelo, autonomía y tipo |
| Simulador | `/simulador` | Calcula la cuota mensual según el vehículo, el anticipo y la cantidad de cuotas, con la tasa vigente del servicio |
| Financiación | `/financiacion` | Formulario para pedir un plan de financiación (se guarda en el servicio) |
| Test Drive | `/test-drive` | Formulario para reservar una prueba de manejo (se guarda en el servicio) |
| Nosotros | `/nosotros` | Quiénes somos, cifras, misión, visión, valores y sucursales |
| Concesionarias | `/concesionarias` | Buscador de sucursales, ubicación del usuario y mapa |

Además, en todas las páginas:

- **Buscador global** (lupa del header) de vehículos y páginas, con historial de búsquedas.
- **Selector de concesionaria** en el header, que se recuerda entre visitas.
- **Ventanas del footer**: todos los modelos, stock, service a domicilio, accesorios, teléfono, contacto y empleo.

### Simulador de cuotas

Calcula la cuota con **sistema francés** (todas las cuotas iguales), con la función `calcularCuota` de `src/utils/financiacion.js`:

```
cuota = monto × i / (1 − (1 + i)^−cuotas)      i = TNA / 12
```

La tasa (TNA) no está escrita en el código: se guarda en `src/data/db.json` (`"tasa": { "tna": 45 }`) porque cambia con el tiempo. Para actualizarla alcanza con editar ese valor. Es un valor de ejemplo, no una tasa real.

El anticipo se valida en tiempo real: tiene que ser un número entero entre 10 y 80. Se rechazan campos vacíos, letras, negativos y valores fuera de rango.

### Validaciones

Los formularios de Financiación y Test Drive validan cada campo **mientras el usuario escribe** (`onChange`). Los mensajes de error son accesibles: el campo se marca con `aria-invalid`, el mensaje se asocia con `aria-describedby` y se anuncia con `aria-live`. Al enviar, el foco va al primer campo con error.

## Tecnologías usadas

- **React 19** con Hooks (`useState`, `useEffect`, `useNavigate`), props, `children`, renderizado de listas con `map()` y renderizado condicional
- **Vite 8** como entorno de desarrollo y empaquetador
- **React Router 7** (`react-router-dom`) para la navegación, con `Outlet` en el Layout
- **SASS** (`.scss`) con variables, anidación, archivos parciales y un mixin de colores
- **json-server** para simular el backend (API REST)
- **Fetch API** con `async/await`
- **localStorage** para recordar datos del usuario
- **ESLint** para analizar el código y **Prettier** para darle formato (configurados juntos en `eslint.config.js` y `.prettierrc`)
- **JSDoc** para documentar las funciones
- Git y GitHub

## Cómo ejecutar el proyecto

### Requisitos

- [Node.js](https://nodejs.org/) 22 o superior (se verifica con `node -v`)

### Pasos

1. Clonar el repositorio y entrar a la carpeta del proyecto.
2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. En una terminal, levantar el servicio simulado (queda escuchando en el puerto 4000):

   ```bash
   npm run services
   ```

4. En **otra** terminal, levantar la página:

   ```bash
   npm run dev
   ```

5. Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

> Si el servicio no está levantado, los catálogos muestran un aviso de error y los formularios no se pueden enviar.

## Scripts disponibles

| Script | Comando | Para qué sirve |
| --- | --- | --- |
| `dev` | `npm run dev` | Levanta la página en modo desarrollo |
| `services` | `npm run services` | Levanta json-server con `src/data/db.json` en el puerto 4000 |
| `build` | `npm run build` | Genera la versión para publicar en la carpeta `dist` |
| `preview` | `npm run preview` | Muestra la versión generada con `build` |
| `lint` | `npm run lint` | Revisa el código con ESLint |

## Servicio simulado (json-server)

La dirección del servicio se define en el archivo **`.env`** de la raíz:

```
VITE_BASE_URL="http://localhost:4000/"
```

Los datos están en `src/data/db.json`. Las funciones que lo usan están en `src/api`:

| Recurso | Método | Función | Uso |
| --- | --- | --- | --- |
| `/vehiculos?categoria=0km` | GET | `getVehiculos("0km")` | Catálogo de 0 Km |
| `/vehiculos?categoria=usados` | GET | `getVehiculos("usados")` | Catálogo de usados |
| `/vehiculos?categoria=electricos` | GET | `getVehiculos("electricos")` | Catálogo de eléctricos |
| `/vehiculos` | GET | `getTodosLosVehiculos()` | Buscador global y foto del stock en el Inicio |
| `/tasa` | GET | `getTasa()` | Tasa nominal anual que usa el Simulador |
| `/financiaciones` | POST | `addFinanciacion(datos)` | Formulario de Financiación |
| `/testDrives` | POST | `addTestDrive(datos)` | Formulario de Test Drive |

## Estructura del proyecto

```
public/            Imágenes, video y favicon que se usan con ruta directa (/archivo)
src/
├── api/           Funciones que consultan el servicio con fetch y async/await
├── assets/        Imágenes que se importan desde el código (logo y foto del stock)
├── components/    Componentes reutilizables (Header, Footer, Layout, AutoCard, Campo, Filtro...)
├── data/          Datos fijos del sitio y db.json del servicio simulado
├── pages/         Una página por cada ruta
├── styles/        Estilos SASS (main.scss importa todos los parciales)
├── utils/         Funciones de ayuda: formatPrice, validaciones, fechas, localStorage y filtros
├── App.jsx        Rutas de la aplicación
└── main.jsx       Punto de entrada
```

Los imports usan el alias **`@`**, que apunta a `src` (configurado en `vite.config.js`). Por ejemplo: `import Header from "@/components/Header"`.

## Datos guardados en el navegador

| Clave de localStorage | Qué guarda |
| --- | --- |
| `carpoint_sucursal` | La concesionaria elegida en el header o en la página de Concesionarias |
| `carpoint_busquedas` | Las últimas 5 búsquedas del buscador global |
| `carpoint_datos` | Nombre, apellido, DNI, celular, e-mail, provincia y ciudad del último formulario enviado, para completar los siguientes |

## Vulnerabilidades de las dependencias

`npm audit` no informa vulnerabilidades **críticas** ni **altas**. Informa **4 moderadas**, todas en herramientas de desarrollo (no llegan a la página publicada):

| Paquete | Severidad | Detalle |
| --- | --- | --- |
| `minimatch` (dependencia de `eslint`) | Moderada | Posible denegación de servicio con patrones de archivos muy complejos ([GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)) |
| `@eslint/config-array`, `eslint`, `@eslint/js` | Moderada | Dependen de la versión afectada de `minimatch` |

La única solución que ofrece npm (`npm audit fix --force`) baja ESLint a la versión 9, lo que rompe la configuración actual. Como ESLint solo se usa para revisar el código y no procesa archivos de terceros, se deja así hasta que salga una versión corregida.
