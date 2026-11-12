/**
 * Calcula la cuota mensual de un préstamo con sistema francés (todas las cuotas iguales).
 * Fórmula: cuota = monto × i / (1 − (1 + i)^−cuotas), donde i es la tasa mensual (TNA / 12).
 * @method calcularCuota
 * @param {number} monto - Monto a financiar en pesos (precio menos anticipo)
 * @param {number} cuotas - Cantidad de cuotas mensuales
 * @param {number} tna - Tasa nominal anual en porcentaje (ej: 45)
 * @return {number} Valor de cada cuota en pesos
 */
export const calcularCuota = (monto, cuotas, tna) => {
  const i = tna / 100 / 12;
  if (i === 0) return monto / cuotas;
  return (monto * i) / (1 - Math.pow(1 + i, -cuotas));
};

/**
 * Arma la simulación completa de un préstamo: anticipo, monto a financiar, cuota y total.
 * @method simularPrestamo
 * @param {number} precio - Precio del vehículo en pesos
 * @param {number} porcentajeAnticipo - Anticipo en porcentaje del precio (ej: 30)
 * @param {number} cuotas - Cantidad de cuotas mensuales
 * @param {number} tna - Tasa nominal anual en porcentaje
 * @return {{anticipo: number, monto: number, cuota: number, total: number}} Valores de la simulación en pesos
 */
export const simularPrestamo = (precio, porcentajeAnticipo, cuotas, tna) => {
  const anticipo = (precio * porcentajeAnticipo) / 100;
  const monto = precio - anticipo;
  const cuota = calcularCuota(monto, cuotas, tna);
  return { anticipo, monto, cuota, total: cuota * cuotas };
};
