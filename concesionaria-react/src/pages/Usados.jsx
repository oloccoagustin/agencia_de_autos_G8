import { useEffect, useState } from 'react';
import Filtro from '@/components/Filtro';
import ListaAutos from '@/components/ListaAutos';
import { getVehiculos } from '@/api/vehiculos';
import { aOpciones, ordenarPorPrecio, valoresUnicos } from '@/utils/vehiculos';
import { ORDEN_PRECIO, RANGOS_KM } from '@/data/catalogos';

/**
 * Indica si un auto usado cumple con el filtro de kilometraje.
 * @method cumpleKm
 * @param {number} km - Kilómetros del auto
 * @param {string} filtro - Valor elegido en el filtro ("" = cualquiera)
 * @return {boolean} true si el auto entra en el rango
 */
const cumpleKm = (km, filtro) => {
  if (!filtro) return true;
  if (filtro === 'mas50000') return km > 50000;
  return km <= Number(filtro);
};

/**
 * Página del catálogo de vehículos usados, con filtros por marca, año y kilometraje.
 * @method Usados
 * @return {JSX.Element}
 */
const Usados = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // useEffect: al abrir la página cambia el título de la pestaña y pide los vehículos al servicio
  useEffect(() => {
    document.title = 'Usados | CarPoint';

    /**
     * Pide los vehículos de la categoría al servicio y los guarda en el estado.
     * @method cargarVehiculos
     * @return {Promise<void>}
     */
    const cargarVehiculos = async () => {
      try {
        const data = await getVehiculos('usados');
        setVehiculos(data);
      } catch {
        setError('No pudimos cargar los vehículos. Verificá que el servicio esté funcionando (npm run services).');
      }
      setCargando(false);
    };

    cargarVehiculos();
  }, []);

  const [marca, setMarca] = useState('');
  const [anio, setAnio] = useState('');
  const [km, setKm] = useState('');
  const [precio, setPrecio] = useState('');

  /**
   * Vuelve todos los filtros a su valor inicial.
   * @method limpiarFiltros
   * @return {void}
   */
  const limpiarFiltros = () => {
    setMarca('');
    setAnio('');
    setKm('');
    setPrecio('');
  };

  const filtrados = vehiculos.filter(
    (auto) => (!marca || auto.marca === marca) && (!anio || auto.anio === Number(anio)) && cumpleKm(auto.km, km)
  );
  const autos = ordenarPorPrecio(filtrados, precio);

  return (
    <main className="catalogo">
      <div className="catalogo-titulo">
        <h1>Vehículos Usados</h1>
        <p>Seleccionados y verificados por CarPoint.</p>
      </div>

      <div className="filtros">
        <Filtro
          id="filtro-marca"
          label="Marca"
          value={marca}
          onChange={setMarca}
          todos="Todas las marcas"
          opciones={aOpciones(valoresUnicos(vehiculos, 'marca'))}
        />
        <Filtro
          id="filtro-anio"
          label="Año"
          value={anio}
          onChange={setAnio}
          todos="Todos los años"
          opciones={aOpciones(valoresUnicos(vehiculos, 'anio', true))}
        />
        <Filtro
          id="filtro-km"
          label="Kilometraje"
          value={km}
          onChange={setKm}
          todos="Cualquier kilometraje"
          opciones={RANGOS_KM}
        />
        <Filtro
          id="filtro-precio"
          label="Ordenar por precio"
          value={precio}
          onChange={setPrecio}
          todos="Ordenar por precio"
          opciones={ORDEN_PRECIO}
        />

        <button type="button" id="limpiar-filtros" onClick={limpiarFiltros}>
          Limpiar filtros
        </button>
      </div>

      <ListaAutos autos={autos} cargando={cargando} error={error} />
    </main>
  );
};

export default Usados;
