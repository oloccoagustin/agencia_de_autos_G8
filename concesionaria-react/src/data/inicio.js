// Datos del bloque "Vehículos nuevos en stock" del Inicio.
// El stock sale de los vehículos del servicio (0 Km y eléctricos): cada auto trae su propia foto.

/**
 * Autos que no están en stock y se traen bajo pedido.
 */
export const BAJO_PEDIDO = [
  { marca: 'Audi', modelo: 'A3 Sportback' },
  { marca: 'Audi', modelo: 'Q3' },
  { marca: 'Audi', modelo: 'Q8' },
  { marca: 'BMW', modelo: 'M2' },
  { marca: 'BMW', modelo: 'M3 Competition' },
  { marca: 'Ferrari', modelo: '296 GTB' },
  { marca: 'Lamborghini', modelo: 'Urus' },
  { marca: 'Maserati', modelo: 'GranTurismo' },
  { marca: 'Mercedes-Benz', modelo: 'GLE' },
  { marca: 'Porsche', modelo: '911 Turbo S' },
  { marca: 'Porsche', modelo: 'Cayman' },
].map((a) => ({ ...a, dato: 'Bajo pedido', pedido: true }));

/**
 * Ordena por marca y después por modelo.
 * @method ordenar
 * @param {Object} a - Auto
 * @param {Object} b - Auto
 * @return {number}
 */
const ordenar = (a, b) => (a.marca + a.modelo).localeCompare(b.marca + b.modelo);

/**
 * Arma el stock del Inicio: los 0 Km y los eléctricos (los usados no se cuentan).
 * @method armarStockInicio
 * @param {Array<Object>} vehiculos - Todos los vehículos que llegaron del servicio
 * @return {Array<Object>} Autos con marca, modelo, dato, precio, foto y ruta del catálogo
 */
export const armarStockInicio = (vehiculos) =>
  vehiculos
    .filter((v) => v.categoria !== 'usados')
    .map((v) => ({
      marca: v.marca,
      modelo: v.modelo,
      dato: v.categoria === 'electricos' ? `100% Eléctrico · ${v.autonomia} km` : `0 Km · ${v.anio}`,
      precio: v.precio,
      foto: v.imagen,
      ruta: v.categoria === 'electricos' ? '/electricos' : '/0km',
    }))
    .sort(ordenar);

/**
 * Junta el stock con los autos bajo pedido.
 * @method armarTodosInicio
 * @param {Array<Object>} stock - Stock del Inicio
 * @return {Array<Object>}
 */
export const armarTodosInicio = (stock) => stock.concat(BAJO_PEDIDO).sort(ordenar);

/**
 * Lista las marcas sin repetir.
 * @method sinRepetir
 * @param {Array<Object>} lista - Autos con marca
 * @return {Array<string>}
 */
export const sinRepetir = (lista) => lista.map((a) => a.marca).filter((marca, i, todas) => todas.indexOf(marca) === i);
