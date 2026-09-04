# CarPoint 

---

## Descripción
Este proyecto consiste en el desarrollo de una página web para una concesionaria de vehículos.

El objetivo es facilitar la búsqueda de vehículos nuevos o usados y permitir que los clientes puedan realizar consultas de manera online.

También contará con información de la concesionaria y medios de contacto.

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

No trabajar directamente sobre main.

Cada tarea deberá realizarse en una rama diferente:

bash
git checkout -b nombre-de-la-rama


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


---

### 6. Pull Requests

Crear una Pull Request hacia main.

La PR deberá:

* Incluir una breve descripción de los cambios.
* Ser revisada por otro integrante.
* No tener errores antes de realizar el merge.

Una vez aprobada, se realiza el merge a main y se elimina la rama utilizada.

---


## Flujo de trabajo con Git

```text
Nueva rama
   ↓
Commit
   ↓
Push
   ↓
Pull Request → Revisión → Merge
```

---


---

## Funcionalidades principales

La página permitirá:

* Visualizar vehículos disponibles.
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
