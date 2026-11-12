// Funciones para mostrar textos y números con el formato de Argentina.

const formatoPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

/**
 * Da formato de pesos argentinos a un número (ej: 49900000 → "$ 49.900.000").
 * @method formatPrice
 * @param {number} precio - Precio en pesos
 * @return {string} Precio con formato de moneda
 */
export const formatPrice = (precio) => formatoPesos.format(precio);

/**
 * Da formato con puntos de miles a un número (ej: 28500 → "28.500").
 * @method formatearNumero
 * @param {number} numero - Número a mostrar
 * @return {string} Número con separador de miles
 */
export const formatearNumero = (numero) => numero.toLocaleString('es-AR');

/**
 * Pasa un texto a minúsculas y le saca las tildes, para comparar búsquedas
 * (así "cordoba" encuentra "Córdoba").
 * @method normalizar
 * @param {string} texto - Texto original
 * @return {string} Texto sin tildes, en minúsculas y sin espacios en los extremos
 */
export const normalizar = (texto) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
