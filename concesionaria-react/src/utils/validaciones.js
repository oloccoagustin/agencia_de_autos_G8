// Reglas de validación que comparten los formularios.
// Cada función recibe lo que escribió el usuario y devuelve true si es válido.

/**
 * Comprueba que se haya elegido una opción de un select.
 * @method eligio
 * @param {string} valor - Valor seleccionado
 * @return {boolean} true si no está vacío
 */
export const eligio = (valor) => valor !== '';

/**
 * Comprueba un nombre o apellido: solo letras, espacios, apóstrofes y guiones (2 a 40).
 * @method esNombre
 * @param {string} valor - Texto ingresado
 * @return {boolean} true si es un nombre válido
 */
export const esNombre = (valor) => /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,40}$/.test(valor.trim());

/**
 * Comprueba un DNI: 7 u 8 números, sin puntos.
 * @method esDni
 * @param {string} valor - DNI ingresado
 * @return {boolean} true si es un DNI válido
 */
export const esDni = (valor) => /^[0-9]{7,8}$/.test(valor);

/**
 * Comprueba un celular: de 10 a 13 números, sin espacios ni guiones.
 * @method esCelular
 * @param {string} valor - Celular ingresado
 * @return {boolean} true si es un celular válido
 */
export const esCelular = (valor) => /^[0-9]{10,13}$/.test(valor);

/**
 * Comprueba que el texto tenga forma de e-mail (algo@algo.algo).
 * @method esEmail
 * @param {string} valor - E-mail ingresado
 * @return {boolean} true si es un e-mail válido
 */
export const esEmail = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

/**
 * Comprueba el nombre de una ciudad: al menos 2 letras y sin números.
 * @method esCiudad
 * @param {string} valor - Ciudad ingresada
 * @return {boolean} true si es una ciudad válida
 */
export const esCiudad = (valor) => /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]{2,60}$/.test(valor.trim());

/**
 * Comprueba que una casilla de verificación esté marcada.
 * @method estaMarcado
 * @param {boolean} valor - Estado de la casilla
 * @return {boolean} true si está marcada
 */
export const estaMarcado = (valor) => valor === true;

/**
 * Comprueba un horario entre las 9:00 y las 19:00, en intervalos de media hora.
 * @method esHorario
 * @param {string} valor - Horario con formato HH:MM
 * @return {boolean} true si es un horario válido
 */
export const esHorario = (valor) => {
  const partes = valor.split(':');
  if (partes.length !== 2) return false;
  const minutos = Number(partes[0]) * 60 + Number(partes[1]);
  return minutos >= 9 * 60 && minutos <= 19 * 60 && minutos % 30 === 0;
};

// Reglas de los campos que comparten Financiación y Test Drive (componente DatosPersonales)
export const REGLAS_DATOS_PERSONALES = {
  modelo: eligio,
  nombre: esNombre,
  apellido: esNombre,
  dni: esDni,
  celular: esCelular,
  email: esEmail,
  provincia: eligio,
  ciudad: esCiudad,
  concesionario: eligio,
};

/**
 * Comprueba el anticipo del simulador: un número entero entre 10 y 80 (porcentaje del precio).
 * Rechaza campos vacíos, letras, decimales, números negativos y valores fuera de rango.
 * @method esAnticipo
 * @param {string} valor - Anticipo ingresado
 * @return {boolean} true si es un porcentaje válido
 */
export const esAnticipo = (valor) => /^[0-9]{1,2}$/.test(valor) && Number(valor) >= 10 && Number(valor) <= 80;
