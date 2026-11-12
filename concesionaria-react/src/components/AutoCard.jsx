import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/formato';
import { detalleVehiculo } from '@/utils/vehiculos';

/**
 * Tarjeta de un vehículo del catálogo. La usan las páginas 0 Km, Usados y Eléctricos.
 * @method AutoCard
 * @param {Object} props
 * @param {Object} props.auto - Vehículo a mostrar (marca, modelo, precio, imagen, categoria...)
 * @return {JSX.Element}
 */
const AutoCard = ({ auto }) => (
  <article className="auto-card">
    <div className="auto-imagen">
      <img src={auto.imagen} alt={`${auto.marca} ${auto.modelo}`} loading="lazy" />
    </div>
    <div className="auto-info">
      <span>{auto.marca}</span>
      <h2>{auto.modelo}</h2>
      <p>{detalleVehiculo(auto)}</p>
      <h3>{formatPrice(auto.precio)}</h3>
      <Link to="/financiacion" className="btn-auto">
        Ver financiación
      </Link>
    </div>
  </article>
);

export default AutoCard;
