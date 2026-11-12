// Opciones fijas de los filtros de los catálogos.

export const ORDEN_PRECIO = [
  { valor: 'menor', texto: 'Menor precio' },
  { valor: 'mayor', texto: 'Mayor precio' },
];

// Usados: kilometraje máximo (o "mas50000" para más de 50.000 km)
export const RANGOS_KM = [
  { valor: '10000', texto: 'Hasta 10.000 km' },
  { valor: '30000', texto: 'Hasta 30.000 km' },
  { valor: '50000', texto: 'Hasta 50.000 km' },
  { valor: 'mas50000', texto: 'Más de 50.000 km' },
];

// Eléctricos: rangos de autonomía
export const RANGOS_AUTONOMIA = [
  { valor: 'hasta400', texto: 'Hasta 400 km' },
  { valor: '400-500', texto: '400 - 500 km' },
  { valor: '500-600', texto: '500 - 600 km' },
  { valor: 'mas600', texto: 'Más de 600 km' },
];
