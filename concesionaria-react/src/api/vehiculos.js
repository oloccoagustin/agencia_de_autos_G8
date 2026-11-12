const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Obtiene los vehículos de una categoría del catálogo (GET /vehiculos?categoria=...).
 * @method getVehiculos
 * @param {string} categoria - Categoría del catálogo: "0km", "usados" o "electricos"
 * @return {Promise<Array<Object>>} Lista de vehículos de esa categoría
 */
export const getVehiculos = async (categoria) => {
  const response = await fetch(`${BASE_URL}vehiculos?categoria=${categoria}`);
  if (!response.ok) {
    throw new Error('Error al obtener los vehículos');
  }
  return response.json();
};

/**
 * Obtiene todos los vehículos del catálogo, de todas las categorías (GET /vehiculos).
 * @method getTodosLosVehiculos
 * @return {Promise<Array<Object>>} Lista completa de vehículos
 */
export const getTodosLosVehiculos = async () => {
  const response = await fetch(`${BASE_URL}vehiculos`);
  if (!response.ok) {
    throw new Error('Error al obtener los vehículos');
  }
  return response.json();
};
