const RADIO_TIERRA_KM = 6371;

/**
 * Calcula la distancia en línea recta entre dos puntos del mapa (fórmula de Haversine).
 * @method distanciaKm
 * @param {{lat: number, lng: number}} a - Primer punto (latitud y longitud)
 * @param {{lat: number, lng: number}} b - Segundo punto (latitud y longitud)
 * @return {number} Distancia en kilómetros
 */
export const distanciaKm = (a, b) => {
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r;
  const dLng = (b.lng - a.lng) * r;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
  return 2 * RADIO_TIERRA_KM * Math.asin(Math.sqrt(x));
};
