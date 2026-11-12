// Datos del footer y de la página de inicio.
// catalogo = a qué página del sitio va el botón "Ver catálogo" (si no tiene, va a /0km).

export const MODELOS = [
  {
    marca: 'Audi',
    nombre: 'A3 Sedán',
    cantidad: 5,
    precio: 49900000,
    versiones: ['35 TFSI', '35 TFSI Advanced', '35 TFSI S line'],
  },
  {
    marca: 'Audi',
    nombre: 'A3 Sportback',
    cantidad: 5,
    precio: 48500000,
    versiones: ['35 TFSI', '35 TFSI Advanced', '35 TFSI S line'],
  },
  {
    marca: 'Audi',
    nombre: 'A5 Sportback',
    cantidad: 2,
    precio: 72400000,
    versiones: ['40 TFSI', '45 TFSI quattro S line'],
  },
  {
    marca: 'Audi',
    nombre: 'e-tron GT',
    cantidad: 1,
    precio: 189000000,
    versiones: ['quattro'],
    catalogo: '/electricos',
  },
  {
    marca: 'Audi',
    nombre: 'Q3',
    cantidad: 5,
    precio: 62300000,
    versiones: ['35 TFSI', '40 TFSI quattro', 'Sportback 35 TFSI'],
  },
  {
    marca: 'Audi',
    nombre: 'Q5',
    cantidad: 3,
    precio: 89700000,
    versiones: ['45 TFSI quattro', '45 TFSI quattro S line', 'Sportback 45 TFSI'],
  },
  {
    marca: 'Audi',
    nombre: 'Q6 e-tron',
    cantidad: 2,
    precio: 134000000,
    versiones: ['quattro', 'Sportback quattro'],
    catalogo: '/electricos',
  },
  {
    marca: 'Audi',
    nombre: 'Q8',
    cantidad: 2,
    precio: 158000000,
    versiones: ['55 TFSI quattro', '55 TFSI quattro S line'],
  },
  { marca: 'Audi', nombre: 'RS 3', cantidad: 2, precio: 112000000, versiones: ['Sportback', 'Sedán'] },
  { marca: 'Audi', nombre: 'RS 5', cantidad: 1, precio: 145000000, versiones: ['Sportback'] },
  { marca: 'Audi', nombre: 'RS 6 Avant', cantidad: 1, precio: 215000000, versiones: ['performance'] },
  { marca: 'Audi', nombre: 'S3 Sportback', cantidad: 2, precio: 78900000, versiones: ['2.0 TFSI quattro'] },

  { marca: 'BMW', nombre: '330i', cantidad: 4, precio: 79500000, versiones: ['Sport Line', 'M Sport'] },
  {
    marca: 'BMW',
    nombre: 'i4',
    cantidad: 2,
    precio: 118000000,
    versiones: ['eDrive40', 'M50'],
    catalogo: '/electricos',
  },
  { marca: 'BMW', nombre: 'iX', cantidad: 2, precio: 176000000, versiones: ['xDrive50'], catalogo: '/electricos' },
  { marca: 'BMW', nombre: 'M2', cantidad: 1, precio: 128000000, versiones: ['Coupé'] },
  { marca: 'BMW', nombre: 'M3 Competition', cantidad: 1, precio: 162000000, versiones: ['xDrive'] },
  { marca: 'BMW', nombre: 'M4 Competition', cantidad: 2, precio: 168000000, versiones: ['Coupé', 'Cabrio xDrive'] },
  { marca: 'BMW', nombre: 'X4', cantidad: 2, precio: 98000000, versiones: ['xDrive30i M Sport'] },
  { marca: 'BMW', nombre: 'X5', cantidad: 3, precio: 139000000, versiones: ['xDrive40i', 'xDrive50e'] },
  { marca: 'BMW', nombre: 'X6', cantidad: 2, precio: 152000000, versiones: ['xDrive40i M Sport'] },

  {
    marca: 'Land Rover',
    nombre: 'Defender',
    cantidad: 4,
    precio: 126000000,
    versiones: ['110 SE', '110 X-Dynamic', '90 HSE'],
  },
  { marca: 'Land Rover', nombre: 'Range Rover', cantidad: 2, precio: 265000000, versiones: ['Autobiography'] },
  {
    marca: 'Land Rover',
    nombre: 'Range Rover Evoque',
    cantidad: 3,
    precio: 84000000,
    versiones: ['S', 'R-Dynamic SE'],
  },
  {
    marca: 'Land Rover',
    nombre: 'Range Rover Sport',
    cantidad: 2,
    precio: 178000000,
    versiones: ['Dynamic SE', 'Autobiography'],
  },
  { marca: 'Land Rover', nombre: 'Range Rover Velar', cantidad: 2, precio: 118000000, versiones: ['Dynamic SE'] },

  { marca: 'Mercedes-Benz', nombre: 'AMG A 45', cantidad: 2, precio: 108000000, versiones: ['S 4MATIC+'] },
  { marca: 'Mercedes-Benz', nombre: 'AMG C 63', cantidad: 1, precio: 172000000, versiones: ['S E Performance'] },
  { marca: 'Mercedes-Benz', nombre: 'AMG GT', cantidad: 1, precio: 235000000, versiones: ['63 4MATIC+ Coupé'] },
  { marca: 'Mercedes-Benz', nombre: 'C 300', cantidad: 5, precio: 82000000, versiones: ['Avantgarde', 'AMG Line'] },
  { marca: 'Mercedes-Benz', nombre: 'Clase G', cantidad: 1, precio: 310000000, versiones: ['G 500'] },
  {
    marca: 'Mercedes-Benz',
    nombre: 'EQE',
    cantidad: 2,
    precio: 142000000,
    versiones: ['350+'],
    catalogo: '/electricos',
  },
  {
    marca: 'Mercedes-Benz',
    nombre: 'EQS SUV',
    cantidad: 1,
    precio: 198000000,
    versiones: ['450 4MATIC'],
    catalogo: '/electricos',
  },
  { marca: 'Mercedes-Benz', nombre: 'GLC', cantidad: 4, precio: 96000000, versiones: ['300 4MATIC', '300 Coupé'] },
  { marca: 'Mercedes-Benz', nombre: 'GLE', cantidad: 3, precio: 138000000, versiones: ['450 4MATIC', '53 AMG Coupé'] },

  { marca: 'Porsche', nombre: '911 Carrera', cantidad: 2, precio: 245000000, versiones: ['Carrera', 'Carrera GTS'] },
  { marca: 'Porsche', nombre: '911 Turbo S', cantidad: 1, precio: 420000000, versiones: ['Coupé'] },
  {
    marca: 'Porsche',
    nombre: 'Cayenne',
    cantidad: 3,
    precio: 165000000,
    versiones: ['Cayenne', 'Cayenne Coupé', 'E-Hybrid'],
  },
  { marca: 'Porsche', nombre: 'Cayman', cantidad: 2, precio: 128000000, versiones: ['718', '718 GTS 4.0'] },
  { marca: 'Porsche', nombre: 'Macan', cantidad: 3, precio: 112000000, versiones: ['Macan', 'Macan T'] },
  {
    marca: 'Porsche',
    nombre: 'Macan Electric',
    cantidad: 2,
    precio: 139000000,
    versiones: ['4', 'Turbo'],
    catalogo: '/electricos',
  },
  {
    marca: 'Porsche',
    nombre: 'Taycan',
    cantidad: 2,
    precio: 185000000,
    versiones: ['4S', 'Turbo'],
    catalogo: '/electricos',
  },

  {
    marca: 'Volvo',
    nombre: 'EX30',
    cantidad: 4,
    precio: 58000000,
    versiones: ['Plus', 'Ultra Twin Motor'],
    catalogo: '/electricos',
  },
  { marca: 'Volvo', nombre: 'XC60', cantidad: 6, precio: 89000000, versiones: ['B5 Plus', 'T8 Ultra'] },
  { marca: 'Volvo', nombre: 'XC90', cantidad: 3, precio: 128000000, versiones: ['B6 Plus', 'T8 Ultra'] },
];

const COLORES = ['Blanco Glaciar', 'Negro Mito', 'Gris Daytona', 'Azul Navarra', 'Plata Florete', 'Rojo Tango'];

export const ACCESORIOS = [
  { nombre: 'Barras de techo', detalle: 'Aluminio, carga máxima 75 kg', precio: 980000 },
  { nombre: 'Juego de alfombras premium', detalle: 'Goma con borde elevado', precio: 185000 },
  { nombre: 'Portabicicletas', detalle: 'Para barras de techo', precio: 420000 },
  { nombre: 'Llantas 18" 5 rayos', detalle: 'Juego de 4 unidades', precio: 2350000 },
  { nombre: 'Cargador inalámbrico', detalle: 'Compatible con Qi', precio: 150000 },
  { nombre: 'Cofre de techo 360 L', detalle: 'Negro brillante con cerradura', precio: 1290000 },
];

export const PUESTOS = [
  { nombre: 'Asesor/a comercial', detalle: 'Showroom Av. Colón · Full time' },
  { nombre: 'Técnico/a mecánico/a', detalle: 'Taller · Full time' },
  { nombre: 'Recepcionista de servicio', detalle: 'Posventa · Part time' },
];

export const MARCAS = MODELOS.map((m) => m.marca).filter((marca, i, todas) => todas.indexOf(marca) === i);

// Una unidad por cada auto en stock (119 en total)
export const STOCK = MODELOS.flatMap((modelo, m) =>
  Array.from({ length: modelo.cantidad }, (_, i) => ({
    marca: modelo.marca,
    modelo: modelo.nombre,
    version: modelo.versiones[i % modelo.versiones.length],
    color: COLORES[(i + m) % COLORES.length],
    anio: i % 4 === 0 ? 2025 : 2026,
    precio: modelo.precio + (i % modelo.versiones.length) * 3200000,
  }))
);
