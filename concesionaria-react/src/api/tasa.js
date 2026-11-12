const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Obtiene la tasa de financiación vigente (GET /tasa).
 * La tasa se guarda en el servicio porque cambia con el tiempo: si cambia,
 * se actualiza db.json y la página la toma sin modificar el código.
 * @method getTasa
 * @return {Promise<{tna: number}>} Objeto con la tasa nominal anual (TNA) en porcentaje
 */
export const getTasa = async () => {
  const response = await fetch(`${BASE_URL}tasa`);
  if (!response.ok) {
    throw new Error('Error al obtener la tasa');
  }
  return response.json();
};
