import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTodosLosVehiculos } from '@/api/vehiculos';
import { PAGINAS, RUTA_CATEGORIA } from '@/data/buscador';
import { normalizar } from '@/utils/formato';
import { detalleVehiculo } from '@/utils/vehiculos';
import { borrarLocal, CLAVE_BUSQUEDAS, guardarLocal, leerLocal } from '@/utils/almacenamiento';

const MAX_RESULTADOS = 6; // por grupo (vehículos / páginas)
const MAX_HISTORIAL = 5;

/**
 * Lee el historial de búsquedas del localStorage (solo textos).
 * @method leerHistorial
 * @return {Array<string>} Últimas búsquedas, de la más nueva a la más vieja
 */
const leerHistorial = () => {
  const lista = leerLocal(CLAVE_BUSQUEDAS, []);
  return Array.isArray(lista) ? lista.filter((t) => typeof t === 'string') : [];
};

/**
 * Buscador global que se abre al tocar la lupa del header. Busca vehículos (del servicio)
 * y páginas del sitio, y recuerda las últimas búsquedas en el localStorage.
 * @method Buscador
 * @param {Object} props
 * @param {function} props.onCerrar - Función que cierra el buscador
 * @return {JSX.Element}
 */
const Buscador = ({ onCerrar }) => {
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([]);
  const [texto, setTexto] = useState('');
  const [historial, setHistorial] = useState(leerHistorial());

  // useEffect: al abrir el buscador pide al servicio todos los vehículos
  useEffect(() => {
    /**
     * Pide todos los vehículos al servicio y los guarda en el estado.
     * Si el servicio no responde, el buscador sigue funcionando solo con las páginas.
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

  const q = normalizar(texto);
  const autos = q
    ? vehiculos.filter((a) => normalizar(`${a.marca} ${a.modelo}`).includes(q)).slice(0, MAX_RESULTADOS)
    : [];
  const paginas = q
    ? PAGINAS.filter((p) => normalizar(`${p.titulo} ${p.detalle}`).includes(q)).slice(0, MAX_RESULTADOS)
    : [];

  /**
   * Guarda lo buscado al principio del historial (sin repetidos) y cierra el buscador.
   * @method elegirResultado
   * @return {void}
   */
  const elegirResultado = () => {
    const busqueda = texto.trim().slice(0, 40);
    if (busqueda.length >= 2) {
      const nuevo = [busqueda, ...historial.filter((t) => normalizar(t) !== normalizar(busqueda))].slice(
        0,
        MAX_HISTORIAL
      );
      guardarLocal(CLAVE_BUSQUEDAS, nuevo);
    }
    onCerrar();
  };

  /**
   * Borra el historial de búsquedas.
   * @method borrarHistorial
   * @return {void}
   */
  const borrarHistorial = () => {
    borrarLocal(CLAVE_BUSQUEDAS);
    setHistorial([]);
  };

  /**
   * Escape cierra el buscador; Enter va directo al primer resultado.
   * @method alTocarTecla
   * @param {KeyboardEvent} e - Evento del teclado
   * @return {void}
   */
  const alTocarTecla = (e) => {
    if (e.key === 'Escape') onCerrar();
    if (e.key === 'Enter') {
      let primero = '';
      if (autos.length > 0) primero = RUTA_CATEGORIA[autos[0].categoria];
      else if (paginas.length > 0) primero = paginas[0].ruta;
      if (primero) {
        navigate(primero);
        elegirResultado();
      }
    }
  };

  return (
    <div className="buscador-overlay abierto" onClick={onCerrar} onKeyDown={alTocarTecla}>
      <div
        className="buscador-caja"
        role="dialog"
        aria-modal="true"
        aria-label="Buscar en CarPoint"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="buscador-cerrar" aria-label="Cerrar búsqueda" onClick={onCerrar}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <label className="buscador-campo" htmlFor="buscador-texto">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span className="visualmente-oculto">Buscar un auto o una página</span>
          <input
            id="buscador-texto"
            type="search"
            placeholder="Buscar un auto o una página…"
            autoComplete="off"
            size={30}
            maxLength={40}
            autoFocus
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </label>

        <div className="buscador-resultados" aria-live="polite">
          {q === '' && historial.length === 0 && (
            <p className="buscador-ayuda">Escribí una marca, un modelo o una sección del sitio.</p>
          )}

          {q === '' && historial.length > 0 && (
            <div className="buscador-grupo buscador-historial">
              <h3>
                Búsquedas recientes
                <button type="button" className="buscador-borrar" onClick={borrarHistorial}>
                  Borrar historial
                </button>
              </h3>
              {historial.map((t) => (
                <button key={t} type="button" className="buscador-reciente" onClick={() => setTexto(t)}>
                  {t}
                </button>
              ))}
            </div>
          )}

          {q !== '' && autos.length === 0 && paginas.length === 0 && (
            <p className="buscador-vacio">No encontramos resultados para “{texto}”.</p>
          )}

          {autos.length > 0 && (
            <div className="buscador-grupo">
              <h3>Vehículos</h3>
              {autos.map((a) => (
                <Link key={a.id} className="buscador-item" to={RUTA_CATEGORIA[a.categoria]} onClick={elegirResultado}>
                  <strong>
                    {a.marca} {a.modelo}
                  </strong>
                  <span>{detalleVehiculo(a)}</span>
                </Link>
              ))}
            </div>
          )}

          {paginas.length > 0 && (
            <div className="buscador-grupo">
              <h3>Páginas</h3>
              {paginas.map((p) => (
                <Link key={p.ruta} className="buscador-item" to={p.ruta} onClick={elegirResultado}>
                  <strong>{p.titulo}</strong>
                  <span>{p.detalle}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buscador;
