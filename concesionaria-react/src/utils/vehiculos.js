import { formatearNumero } from '@/utils/formato';

/**
 * Arma el texto de detalle que se muestra en la tarjeta de un vehículo, según su categoría.
 * @method detalleVehiculo
 * @param {Object} vehiculo - Vehículo del catálogo
 * @param {string} vehiculo.categoria - "0km", "usados" o "electricos"
 * @return {string} Texto de detalle (ej: "2023 · 28.500 km")
 */
export const detalleVehiculo = (vehiculo) => {
  if (vehiculo.categoria === 'usados') return `${vehiculo.anio} · ${formatearNumero(vehiculo.km)} km`;
  if (vehiculo.categoria === 'electricos') return `100% Eléctrico · Autonomía ${vehiculo.autonomia} km`;
  return `0 Km · ${vehiculo.anio}`;
};

/**
 * Devuelve una copia de la lista ordenada por precio (no modifica la original).
 * @method ordenarPorPrecio
 * @param {Array<Object>} lista - Vehículos a ordenar
 * @param {""|"menor"|"mayor"} orden - "menor" (ascendente), "mayor" (descendente) o "" (sin ordenar)
 * @return {Array<Object>} Lista ordenada
 */
export const ordenarPorPrecio = (lista, orden) => {
  if (orden === 'menor') return [...lista].sort((a, b) => a.precio - b.precio);
  if (orden === 'mayor') return [...lista].sort((a, b) => b.precio - a.precio);
  return lista;
};

/**
 * Devuelve los valores distintos de un campo, ordenados (ej: todas las marcas sin repetir).
 * @method valoresUnicos
 * @param {Array<Object>} lista - Vehículos
 * @param {string} campo - Nombre del campo (ej: "marca")
 * @param {boolean} [descendente=false] - true para ordenar de mayor a menor (ej: años)
 * @return {Array<string|number>} Valores sin repetir
 */
export const valoresUnicos = (lista, campo, descendente = false) => {
  const valores = lista.map((v) => v[campo]).filter((valor, i, todos) => todos.indexOf(valor) === i);
  valores.sort((a, b) => (typeof a === 'number' ? a - b : String(a).localeCompare(String(b), 'es')));
  return descendente ? valores.reverse() : valores;
};

/**
 * Convierte una lista de valores en opciones para el componente Filtro.
 * @method aOpciones
 * @param {Array<string|number>} valores - Valores a mostrar
 * @return {Array<{valor: string, texto: string}>} Opciones del select
 */
export const aOpciones = (valores) => valores.map((v) => ({ valor: String(v), texto: String(v) }));
