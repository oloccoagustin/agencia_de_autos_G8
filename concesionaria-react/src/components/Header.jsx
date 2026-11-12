import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Buscador from '@/components/Buscador';
import logo from '@/assets/logo_carpoint_blanco_gris.png';
import { CONCESIONARIOS } from '@/data/formularios';

/**
 * Encabezado del sitio: navegación, logo, selector de concesionaria y lupa del buscador.
 * En la portada (inicio = true) va fijo sobre el video, se oscurece al bajar y se esconde al seguir bajando.
 * @method Header
 * @param {Object} props
 * @param {boolean} [props.inicio=false] - true si se muestra en la página de inicio
 * @param {{sucursal: string, elegirSucursal: function}} props.concesionaria - Concesionaria elegida
 * @return {JSX.Element}
 */
const Header = ({ inicio = false, concesionaria }) => {
  const [solido, setSolido] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { sucursal, elegirSucursal } = concesionaria;

  // En la portada: escucha el scroll y, al salir de la página, deja de escucharlo (return)
  useEffect(() => {
    if (!inicio) return undefined;
    let ultimoY = window.scrollY;

    /**
     * Cambia el aspecto del header según cuánto y hacia dónde se scrolleó.
     * @method alScrollear
     * @return {void}
     */
    const alScrollear = () => {
      const y = window.scrollY;
      setSolido(y > 40);
      if (y > 120 && y > ultimoY + 4) setOculto(true);
      else if (y < ultimoY - 4 || y <= 120) setOculto(false);
      ultimoY = y;
    };

    window.addEventListener('scroll', alScrollear);
    return () => window.removeEventListener('scroll', alScrollear);
  }, [inicio]);

  /**
   * Guarda la concesionaria elegida en el menú y cierra el menú.
   * @method elegir
   * @param {string} nombre - Nombre de la sucursal
   * @return {void}
   */
  const elegir = (nombre) => {
    elegirSucursal(nombre);
    setMenuAbierto(false);
  };

  let clases = '';
  if (solido) clases += ' header--solido';
  if (oculto) clases += ' header--oculto';

  return (
    <>
      <header className={clases.trim()}>
        <nav className="left" aria-label="Catálogos">
          <Link to="/0km">0 Km</Link>
          <Link to="/usados">Usados</Link>
          <Link to="/electricos">Eléctricos</Link>
          <Link to="/simulador">Simulador</Link>
        </nav>

        <div className="logo">
          {inicio ? (
            <h1 className="logo-titulo">
              <img src={logo} alt="CarPoint" className="logo-img" />
            </h1>
          ) : (
            <Link to="/" aria-label="Ir al inicio">
              <img src={logo} alt="CarPoint" className="logo-img" />
            </Link>
          )}
        </div>

        <div className="right">
          <div className="dealer">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>

            {inicio ? (
              <Link to="/concesionarias" title={sucursal ? 'Cambiar de concesionaria' : undefined}>
                {sucursal || 'Seleccionar un concesionario'}
              </Link>
            ) : (
              <div className={menuAbierto ? 'dealer-menu dealer-menu--abierto' : 'dealer-menu'}>
                <button
                  type="button"
                  className="dealer-boton"
                  aria-expanded={menuAbierto}
                  onClick={() => setMenuAbierto(!menuAbierto)}
                >
                  {sucursal || 'Seleccionar un concesionario'}
                </button>
                {menuAbierto && (
                  <div className="dealer-options">
                    {CONCESIONARIOS.map((nombre) => (
                      <Link
                        key={nombre}
                        to="/concesionarias"
                        className={nombre === sucursal ? 'activa' : undefined}
                        onClick={() => elegir(nombre)}
                      >
                        {nombre}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="search-icon"
            aria-label="Buscar en CarPoint"
            onClick={() => setBuscando(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </header>

      {buscando && <Buscador onCerrar={() => setBuscando(false)} />}
    </>
  );
};

export default Header;
