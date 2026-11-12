import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getTodosLosVehiculos } from '@/api/vehiculos';
import { armarStockInicio, sinRepetir } from '@/data/inicio';
import audiA3 from '@/assets/audiA3.jpg';

/**
 * Página principal: video de portada, accesos a las secciones y el bloque de vehículos en stock.
 * @method Inicio
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas del footer (vienen de App)
 * @param {{sucursal: string, elegirSucursal: function}} props.concesionaria - Concesionaria elegida
 * @return {JSX.Element}
 */
const Inicio = ({ modales, concesionaria }) => {
  const [vehiculos, setVehiculos] = useState([]);

  // useEffect: al abrir la página cambia el título y pide los vehículos (para la foto del stock)
  useEffect(() => {
    document.title = 'CarPoint';

    /**
     * Pide todos los vehículos al servicio y los guarda en el estado.
     * Si el servicio no responde, se muestra la foto del Audi A3.
     * @method cargarVehiculos
     * @return {Promise<void>}
     */
    const cargarVehiculos = async () => {
      try {
        const data = await getTodosLosVehiculos();
        setVehiculos(data);
      } catch {
        setVehiculos([]);
      }
    };

    cargarVehiculos();
  }, []);

  // El stock se arma con los autos que llegaron del servicio (0 Km y eléctricos)
  const stockInicio = armarStockInicio(vehiculos);
  const marcas = sinRepetir(stockInicio);

  // El auto elegido (si no hay ninguno, o es de otra lista, queda undefined)
  const autoElegido = stockInicio.find((v) => v.modelo === modales.modeloElegido);
  const modeloActual = autoElegido ? autoElegido.modelo : '';

  // Cuántos autos hay del modelo elegido (o en total, si no se eligió ninguno)
  const cantidad = autoElegido ? 1 : stockInicio.length;

  // Cada auto del stock tiene su propia foto; si no hay ninguno elegido, la del Audi A3
  const foto = autoElegido ? autoElegido.foto : audiA3;
  const alt = autoElegido ? `${autoElegido.marca} ${autoElegido.modelo}` : 'Audi A3 en la calle';
  // Los .png y .webp son autos recortados (sin fondo) y se muestran distinto
  const recortada = /\.(png|webp|avif)$/i.test(foto);

  /**
   * Baja con un desplazamiento suave hasta el contenido de la página.
   * @method bajarAlContenido
   * @param {Event} e - Evento click del link
   * @return {void}
   */
  const bajarAlContenido = (e) => {
    e.preventDefault();
    document.getElementById('contenido').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="hero-wrapper">
        <Header inicio={true} concesionaria={concesionaria} />

        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Video de un Porsche 911 en movimiento"
        >
          <source src="/porsche-911.mp4" type="video/mp4" />
        </video>

        <a href="#contenido" className="scroll-hint" aria-label="Bajar al contenido" onClick={bajarAlContenido}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>

      <div className="page" id="contenido">
        <div className="tv-screen">
          <nav className="cards-row" aria-label="Secciones">
            <Link to="/nosotros" className="card card--about">
              <span className="card__label">Acerca de Nosotros</span>
            </Link>
            <Link to="/financiacion" className="card card--financing">
              <span className="card__label">Financiación</span>
            </Link>
            <Link to="/test-drive" className="card card--testdrive">
              <span className="card__label">Test Drive</span>
            </Link>
          </nav>

          <Link to="/concesionarias" className="search-bar">
            <div className="search-bar__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <span className="search-bar__label">Concesionarias Cercanas</span>
          </Link>
        </div>
      </div>

      <main className="footer-main">
        <section className="stock">
          <div className="stock-texto">
            <h2>Vehículos nuevos en stock</h2>

            <label htmlFor="vehiculo">Elegí el vehículo</label>
            <select id="vehiculo" value={modeloActual} onChange={(e) => modales.elegirModelo(e.target.value)}>
              <option value="">Todos los vehículos</option>
              {marcas.map((marca) => (
                <optgroup key={marca} label={marca}>
                  {stockInicio
                    .filter((v) => v.marca === marca)
                    .map((v) => (
                      <option key={v.modelo}>{v.modelo}</option>
                    ))}
                </optgroup>
              ))}
            </select>

            <button className="boton" type="button" onClick={() => modales.abrir('stock')}>
              {cantidad} {cantidad === 1 ? 'vehículo disponible' : 'vehículos disponibles'}
            </button>
          </div>

          <img
            key={foto}
            className={recortada ? 'stock-foto stock-foto--recorte' : 'stock-foto'}
            src={foto}
            alt={alt}
          />
        </section>
      </main>

      <Footer modales={modales} stockInicio={stockInicio} />
    </>
  );
};

export default Inicio;
