const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Guarda una solicitud de financiación en el servicio (POST /financiaciones).
 * @method addFinanciacion
 * @param {Object} solicitud - Datos del formulario de financiación
 * @return {Promise<Object>} La solicitud guardada, con su id
 */
export const addFinanciacion = async (solicitud) => {
  const response = await fetch(`${BASE_URL}financiaciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...solicitud, fechaSolicitud: new Date().toISOString() }),
  });
  if (!response.ok) {
    throw new Error('Error al enviar la solicitud');
  }
  return response.json();
};

/**
 * Guarda una reserva de test drive en el servicio (POST /testDrives).
 * @method addTestDrive
 * @param {Object} reserva - Datos del formulario de test drive
 * @return {Promise<Object>} La reserva guardada, con su id
 */
export const addTestDrive = async (reserva) => {
  const response = await fetch(`${BASE_URL}testDrives`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...reserva, fechaSolicitud: new Date().toISOString() }),
  });
  if (!response.ok) {
    throw new Error('Error al guardar la reserva');
  }
  return response.json();
};
