// Páginas del sitio que encuentra el buscador de la lupa.
// Los vehículos no están acá: el buscador los pide al servicio (GET /vehiculos).
export const PAGINAS = [
  { titulo: 'Inicio', detalle: 'Página principal de CarPoint', ruta: '/' },
  { titulo: 'Vehículos 0 Km', detalle: 'Catálogo de autos 0 Km', ruta: '/0km' },
  { titulo: 'Vehículos Usados', detalle: 'Catálogo de autos usados', ruta: '/usados' },
  { titulo: 'Vehículos Eléctricos', detalle: 'Catálogo de autos eléctricos', ruta: '/electricos' },
  { titulo: 'Financiación', detalle: 'Armá tu plan de financiación', ruta: '/financiacion' },
  { titulo: 'Simulador de cuotas', detalle: 'Calculá cuánto pagarías por mes', ruta: '/simulador' },
  { titulo: 'Test Drive', detalle: 'Reservá una prueba de manejo', ruta: '/test-drive' },
  { titulo: 'Acerca de Nosotros', detalle: 'Quiénes somos', ruta: '/nosotros' },
  { titulo: 'Red de Concesionarias', detalle: 'Encontrá tu sucursal', ruta: '/concesionarias' },
];

// A qué página lleva cada categoría de vehículo
export const RUTA_CATEGORIA = {
  '0km': '/0km',
  usados: '/usados',
  electricos: '/electricos',
};
