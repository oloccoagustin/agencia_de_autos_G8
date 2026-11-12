import { Link } from 'react-router-dom';
import Ventanas from '@/components/Ventanas';

const WHATSAPP = 'https://wa.me/5493515550123?text=Hola%20CarPoint%2C%20quiero%20solicitar%20una%20cotizaci%C3%B3n';

/**
 * Pie de página: columnas de links y, debajo, las ventanas emergentes que abren algunos de ellos.
 * @method Footer
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas (vienen de App)
 * @param {Array<Object>} [props.stockInicio] - Solo en el Inicio: los autos del bloque de stock
 * @return {JSX.Element}
 */
const Footer = ({ modales, stockInicio }) => {
  /**
   * Evita que el link navegue y abre la ventana correspondiente.
   * @method abrirVentana
   * @param {Event} e - Evento click del link
   * @param {string} nombre - Ventana a abrir
   * @return {void}
   */
  const abrirVentana = (e, nombre) => {
    e.preventDefault();
    if (nombre === 'stock') modales.elegirModelo('');
    modales.abrir(nombre);
  };

  return (
    <>
      <footer>
        <div className="columna">
          <h4>Modelos</h4>
          <a href="#modal-modelos" onClick={(e) => abrirVentana(e, 'modelos')}>
            Todos los modelos
          </a>
          <a href="#modal-stock" onClick={(e) => abrirVentana(e, 'stock')}>
            Vehículos en stock
          </a>
        </div>
        <div className="columna">
          <h4>Servicios y Accesorios</h4>
          <a href="#modal-service" onClick={(e) => abrirVentana(e, 'service')}>
            Service a domicilio
          </a>
          <a href="#modal-accesorios" onClick={(e) => abrirVentana(e, 'accesorios')}>
            Accesorios
          </a>
        </div>
        <div className="columna">
          <h4>Cotizaciones</h4>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            Whatsapp
          </a>
          <a href="#modal-telefono" onClick={(e) => abrirVentana(e, 'telefono')}>
            Teléfono
          </a>
        </div>
        <div className="columna">
          <h4>Necesitás ayuda</h4>
          <a href="#modal-contacto" onClick={(e) => abrirVentana(e, 'contacto')}>
            Contacto
          </a>
        </div>
        <div className="columna">
          <h4>Compañía</h4>
          <Link to="/nosotros">Nosotros</Link>
          <a href="#modal-empleo" onClick={(e) => abrirVentana(e, 'empleo')}>
            Trabajá con nosotros
          </a>
        </div>
      </footer>

      <Ventanas modales={modales} stockInicio={stockInicio} />
    </>
  );
};

export default Footer;
