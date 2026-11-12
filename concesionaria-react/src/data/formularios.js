// Opciones de los formularios de Financiación y Test Drive.

// Modelos agrupados por marca (para el select de modelos)
export const MODELOS_POR_MARCA = [
  { marca: 'Alfa Romeo', modelos: ['Giulia', 'Stelvio'] },
  {
    marca: 'Audi',
    modelos: [
      'A3 Sedán',
      'A3 Sportback',
      'A5 Sportback',
      'e-tron GT',
      'Q3',
      'Q5',
      'Q6 e-tron',
      'Q8',
      'RS 3',
      'RS 5',
      'RS 6 Avant',
      'S3 Sportback',
    ],
  },
  { marca: 'BMW', modelos: ['330i', 'i4', 'iX', 'M2', 'M3 Competition', 'M4 Competition', 'X4', 'X5', 'X6'] },
  { marca: 'Ferrari', modelos: ['296 GTB', 'Purosangue', 'Roma'] },
  { marca: 'Lamborghini', modelos: ['Revuelto', 'Urus'] },
  {
    marca: 'Land Rover',
    modelos: ['Defender', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'],
  },
  { marca: 'Maserati', modelos: ['Grecale', 'GranTurismo'] },
  {
    marca: 'Mercedes-Benz',
    modelos: ['AMG A 45', 'AMG C 63', 'AMG GT', 'C 300', 'Clase G', 'EQE', 'EQS SUV', 'GLC', 'GLE'],
  },
  {
    marca: 'Porsche',
    modelos: ['911 Carrera', '911 Turbo S', 'Cayenne', 'Cayman', 'Macan', 'Macan Electric', 'Taycan'],
  },
  { marca: 'Volvo', modelos: ['EX30', 'XC60', 'XC90'] },
];

export const PROVINCIAS = [
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Ciudad Autónoma de Buenos Aires',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
];

export const CONCESIONARIOS = [
  'CarPoint Córdoba',
  'CarPoint Villa María',
  'CarPoint Bell Ville',
  'CarPoint Río Cuarto',
];

// Opciones del formulario de Financiación
export const FECHAS_COMPRA = ['Este mes', 'En 1 a 3 meses', 'En 3 a 6 meses', 'En más de 6 meses'];
export const CUOTAS = ['12 cuotas', '24 cuotas', '36 cuotas', '48 cuotas', '60 cuotas'];
export const ANTICIPOS = ['10%', '20%', '30%', '40%', '50% o más'];

// Opciones del formulario de Test Drive
export const CONTACTOS = ['Whatsapp', 'Teléfono', 'E-mail'];

// Opciones del simulador de cuotas (en meses)
export const PLAZOS = [12, 24, 36, 48, 60];

// Nombre de cada categoría de vehículo, para agrupar el select del simulador
export const CATEGORIAS = [
  { valor: '0km', texto: '0 Km' },
  { valor: 'electricos', texto: 'Eléctricos' },
  { valor: 'usados', texto: 'Usados' },
];
