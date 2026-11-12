import { useEffect, useState } from 'react';
import { MAPA_GENERAL, SUCURSALES } from '@/data/sucursales';
import { normalizar } from '@/utils/formato';
import { distanciaKm } from '@/utils/distancia';

/**
 * Página de la red de concesionarias: buscador de sucursales, ubicación del usuario y mapa.
 * La sucursal elegida es la misma del menú del header (llega por props desde App)
 * y queda guardada en el localStorage.
 * @method Concesionarias
 * @param {Object} props
 * @param {{sucursal: string, elegirSucursal: function}} props.concesionaria - Concesionaria elegida
 * @return {JSX.Element}
 */
const Concesionarias = ({ concesionaria }) => {
  useEffect(() => {
    document.title = 'Red de Concesionarias | CarPoint';
  }, []);

  const { sucursal, elegirSucursal } = concesionaria;
  const [busqueda, setBusqueda] = useState('');
  const [distancias, setDistancias] = useState({}); // { "CarPoint Córdoba": 12.3, ... }
  const [estado, setEstado] = useState('');

  const elegida = SUCURSALES.find((s) => s.nombre === sucursal);
  const mapa = elegida ? elegida.mapa : MAPA_GENERAL;

  // Cada palabra escrita tiene que aparecer en el nombre, la ciudad, el CP o los servicios
  const palabras = normalizar(busqueda)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  let visibles = SUCURSALES.filter((s) => {
    const texto = normalizar(`${s.nombre} ${s.ciudad} CP ${s.cp} ${s.servicios}`);
    return palabras.every((p) => texto.includes(p));
  });

  // Si ya tenemos la ubicación, se ordenan de la más cercana a la más lejana
  if (Object.keys(distancias).length > 0) {
    visibles = [...visibles].sort((a, b) => distancias[a.nombre] - distancias[b.nombre]);
  }

  /**
   * Pide la ubicación al navegador, calcula la distancia a cada sucursal y elige la más cercana.
   * @method usarUbicacion
   * @return {void}
   */
  const usarUbicacion = () => {
    if (!navigator.geolocation) {
      setEstado('Tu navegador no permite obtener la ubicación.');
      return;
    }
    setEstado('Buscando tu ubicación…');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const usuario = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const nuevas = {};
        SUCURSALES.forEach((s) => {
          nuevas[s.nombre] = distanciaKm(usuario, s);
        });
        setDistancias(nuevas);

        const masCerca = [...SUCURSALES].sort((a, b) => nuevas[a.nombre] - nuevas[b.nombre])[0];
        elegirSucursal(masCerca.nombre);
        setEstado(`Listo. La sucursal más cercana es ${masCerca.nombre}.`);
      },
      () => setEstado('No pudimos obtener tu ubicación. Revisá los permisos del navegador.'),
      { timeout: 8000 }
    );
  };

  return (
    <main className="red">
      <div className="red-banner"></div>

      <div className="red-titulo">
        <h1>Red de Concesionarias</h1>
        <p>
          Encontrá la sucursal CarPoint más cercana y visitanos. Te esperamos con toda la gama de 0 Km, usados y
          eléctricos.
        </p>
      </div>

      <div className="red-layout">
        <aside className="red-panel">
          <form className="red-buscar" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="buscar-sucursal">
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
              <span className="visualmente-oculto">Buscar concesionaria</span>
              <input
                id="buscar-sucursal"
                type="search"
                list="sucursales"
                placeholder="Buscar concesionaria"
                autoComplete="off"
                size={30}
                maxLength={40}
                aria-describedby="buscar-sucursal-ayuda"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </label>
            <datalist id="sucursales">
              {SUCURSALES.map((s) => (
                <option key={s.nombre} value={s.nombre}></option>
              ))}
              {SUCURSALES.map((s) => (
                <option key={s.ciudad} value={`${s.ciudad} (CP ${s.cp})`}></option>
              ))}
            </datalist>
            <small id="buscar-sucursal-ayuda">Nombre, ciudad o código postal</small>
          </form>

          <button type="button" className="red-ubicacion" onClick={usarUbicacion}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8"></circle>
              <circle cx="12" cy="12" r="2.5"></circle>
              <line x1="12" y1="1" x2="12" y2="5"></line>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="1" y1="12" x2="5" y2="12"></line>
              <line x1="19" y1="12" x2="23" y2="12"></line>
            </svg>
            Usar ubicación actual
          </button>
          {estado && (
            <p className="red-estado" role="status">
              {estado}
            </p>
          )}

          <div className="red-lista">
            {visibles.map((s) => (
              <article className={s.nombre === sucursal ? 'red-item red-item--activa' : 'red-item'} key={s.nombre}>
                <h3>{s.nombre}</h3>
                <p>
                  {s.ciudad} · CP {s.cp}
                </p>
                <p className="red-servicios">{s.servicios}</p>
                {distancias[s.nombre] !== undefined && (
                  <p className="red-distancia">A {Math.round(distancias[s.nombre])} km de tu ubicación</p>
                )}
                <button type="button" className="red-ver" onClick={() => elegirSucursal(s.nombre)}>
                  Ver en el mapa
                </button>
              </article>
            ))}
            {visibles.length === 0 && <p className="red-vacio">No encontramos sucursales con esa búsqueda.</p>}
          </div>
        </aside>

        <div className="red-mapa">
          <iframe title="Mapa de las sucursales de CarPoint" src={mapa} loading="lazy"></iframe>
        </div>
      </div>
    </main>
  );
};

export default Concesionarias;
