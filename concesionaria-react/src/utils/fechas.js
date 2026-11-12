// Fechas con el formato AAAA-MM-DD, que es el que entiende <input type="date">.

/**
 * Convierte una fecha al formato AAAA-MM-DD usando la hora local.
 * @method aTextoFecha
 * @param {Date} fecha - Fecha a convertir
 * @return {string} Fecha con formato AAAA-MM-DD
 */
const aTextoFecha = (fecha) => {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
};

/**
 * Devuelve la fecha de hoy.
 * @method fechaDeHoy
 * @return {string} Fecha de hoy con formato AAAA-MM-DD
 */
export const fechaDeHoy = () => aTextoFecha(new Date());

/**
 * Devuelve la fecha de mañana (el turno de service no puede ser hoy).
 * @method fechaDeManana
 * @return {string} Fecha de mañana con formato AAAA-MM-DD
 */
export const fechaDeManana = () => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + 1);
  return aTextoFecha(fecha);
};

/**
 * Muestra una fecha AAAA-MM-DD como DD/MM/AAAA.
 * @method mostrarFecha
 * @param {string} texto - Fecha con formato AAAA-MM-DD
 * @return {string} Fecha con formato DD/MM/AAAA
 */
export const mostrarFecha = (texto) => new Date(`${texto}T00:00`).toLocaleDateString('es-AR');
