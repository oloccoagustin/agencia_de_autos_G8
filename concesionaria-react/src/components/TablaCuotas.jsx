import { formatPrice } from '@/utils/formato';
import { simularPrestamo } from '@/utils/financiacion';
import { PLAZOS } from '@/data/formularios';

/**
 * Tabla que compara la cuota y el total a pagar en todos los plazos disponibles.
 * Resalta la fila del plazo elegido por el usuario.
 * @method TablaCuotas
 * @param {Object} props
 * @param {number} props.precio - Precio del vehículo
 * @param {number} props.porcentajeAnticipo - Anticipo en porcentaje
 * @param {number} props.cuotasElegidas - Plazo elegido (para resaltar su fila)
 * @param {number} props.tna - Tasa nominal anual
 * @return {JSX.Element}
 */
const TablaCuotas = ({ precio, porcentajeAnticipo, cuotasElegidas, tna }) => (
  <table className="simulador-tabla">
    <caption>Comparación de plazos con un anticipo del {porcentajeAnticipo}%</caption>
    <thead>
      <tr>
        <th scope="col">Plazo</th>
        <th scope="col">Cuota mensual</th>
        <th scope="col">Total en cuotas</th>
      </tr>
    </thead>
    <tbody>
      {PLAZOS.map((plazo) => {
        const simulacion = simularPrestamo(precio, porcentajeAnticipo, plazo, tna);
        return (
          <tr key={plazo} className={plazo === cuotasElegidas ? 'simulador-tabla--elegida' : undefined}>
            <td>{plazo} cuotas</td>
            <td>{formatPrice(Math.round(simulacion.cuota))}</td>
            <td>{formatPrice(Math.round(simulacion.total))}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default TablaCuotas;
