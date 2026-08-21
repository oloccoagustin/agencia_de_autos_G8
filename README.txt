# CarPoint 

---

## Descripción
Este proyecto consiste en el desarrollo de una página web para una concesionaria de vehículos.

La página permitirá visualizar los autos disponibles y consultar información como:

* Marca y modelo.
* Año.
* Precio.
* Kilometraje.
* Combustible y transmisión.
* Fotografías.

También contará con información de la concesionaria y medios de contacto.

El objetivo es facilitar la búsqueda de vehículos nuevos o usados y permitir que los clientes puedan realizar consultas de manera online.

---

## Guía para un nuevo miembro del equipo

### 1. Clonar el repositorio

bash
git clone URL_DEL_REPOSITORIO
cd nombre-del-repositorio


---

### 2. Actualizar el repositorio

Antes de comenzar a trabajar:

bash
git checkout main
git pull origin main


---

### 3. Crear una rama

No se trabajará directamente sobre main.

Cada tarea deberá realizarse en una rama diferente:

bash
git checkout -b nombre-de-la-rama


Ejemplos:

bash
git checkout -b navbar
git checkout -b catalogo-autos
git checkout -b formulario-contacto


---

### 4. Realizar y verificar cambios

Después de modificar los archivos:

bash
git status


Para agregar los cambios:

bash
git add .


---

### 5. Crear un commit

Los commits deben ser claros y breves.

Formato:

tipo: descripción del cambio

Tipos principales:

| Tipo     | Uso                      |
| -------- | ------------------------ |
| feat     | Nueva funcionalidad      |
| fix      | Corrección de errores    |
| docs     | Documentación            |
| style    | Cambios visuales         |
| refactor | Reorganización de código |

Ejemplos:

bash
git commit -m "feat: agrega catalogo de vehiculos"
git commit -m "fix: corrige formulario"
git commit -m "style: modifica navbar"


---

### 6. Subir la rama

bash
git push origin nombre-de-la-rama


Ejemplo:

bash
git push origin catalogo-autos


---

### 7. Pull Requests

Cuando se termina una tarea se debe crear una Pull Request hacia main.

La PR deberá:

* Incluir una breve descripción de los cambios.
* Ser revisada por otro integrante.
* No tener errores antes de realizar el merge.

Una vez aprobada, se realiza el merge a main y se elimina la rama utilizada.

---

## Flujo de trabajo con Git

text
Actualizar main
      ↓
Crear rama
      ↓
Realizar cambios
      ↓
git add .
      ↓
git commit
      ↓
git push
      ↓
Pull Request
      ↓
Revisión
      ↓
Merge a main


---

## Funcionalidades principales

La página permitirá:

* Visualizar vehículos disponibles.
* Consultar datos e imágenes de cada auto.
* Diferenciar vehículos nuevos y usados.
* Consultar precios.
* Ver información de la concesionaria.
* Enviar consultas mediante un formulario.

---

## Tecnologías utilizadas

* HTML.
* CSS.
* JavaScript.
* Git.
* GitHub.