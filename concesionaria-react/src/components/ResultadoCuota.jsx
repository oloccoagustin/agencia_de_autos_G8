import { formatPrice } from '@/utils/formato';

/**
 * Tarjeta con el resultado de la simulación: precio, anticipo, monto a financiar, cuota y total.
 * @method ResultadoCuota
 * @param {Object} props
 * @param {Object} props.vehiculo - Vehículo elegido (marca, modelo, precio)
 * @param {number} props.porcentajeAnticipo - Anticipo en porcentaje
 * @param {number} props.cuotas - Cantidad de cuotas
 * @param {number} props.tna - Tasa nominal anual usada en el cálculo
 * @param {{anticipo: number, monto: number, cuota: number, total: number}} props.simulacion - Valores calculados
 * @return {JSX.Element}
 */
const ResultadoCuota = ({ vehiculo, porcentajeAnticipo, cuotas, tna, simulacion }) => (
  <section className="simulador-resultado" aria-live="polite">
    <h2>
      {vehiculo.marca} {vehiculo.modelo}
    </h2>
    <dl>
      <div>
        <dt>Precio del vehículo</dt>
        <dd>{formatPrice(vehiculo.precio)}</dd>
      </div>
      <div>
        <dt>Anticipo ({porcentajeAnticipo}%)</dt>
        <dd>{formatPrice(simulacion.anticipo)}</dd>
      </div>
      <div>
        <dt>Monto a financiar</dt>
        <dd>{formatPrice(simulacion.monto)}</dd>
      </div>
      <div className="simulador-cuota">
        <dt>{cuotas} cuotas de</dt>
        <dd>{formatPrice(Math.round(simulacion.cuota))}</dd>
      </div>
      <div>
        <dt>Total a pagar en cuotas</dt>
        <dd>{formatPrice(Math.round(simulacion.total))}</dd>
      </div>
    </dl>
    <p className="simulador-aclaracion">
      Valores estimados con una tasa nominal anual del {tna}%. Sujetos a aprobación crediticia.
    </p>
  </section>
);

export default ResultadoCuota;
