import { useEffect, useState } from 'react';
import Filtro from '@/components/Filtro';
import ListaAutos from '@/components/ListaAutos';
import { getVehiculos } from '@/api/vehiculos';
import { aOpciones, ordenarPorPrecio, valoresUnicos } from '@/utils/vehiculos';
import { ORDEN_PRECIO } from '@/data/catalogos';

/**
 * Página del catálogo de vehículos 0 Km, con filtros por marca y modelo y orden por precio.
 * @method ZeroKm
 * @return {JSX.Element}
 */
const ZeroKm = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // useEffect: al abrir la página cambia el título de la pestaña y pide los vehículos al servicio
  useEffect(() => {
    document.title = '0 Km | CarPoint';

    /**
     * Pide los vehículos de la categoría al servicio y los guarda en el estado.
     * @method cargarVehiculos
     * @return {Promise<void>}
     */
    const cargarVehiculos = async () => {
      try {
        const data = await getVehiculos('0km');
        setVehiculos(data);
      } catch {
        setError('No pudimos cargar los vehículos. Verificá que el servicio esté funcionando (npm run services).');
      }
      setCargando(false);
    };

    cargarVehiculos();
  }, []);

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [precio, setPrecio] = useState('');

  // El select de modelos solo muestra los modelos de la marca elegida
  const modelosDisponibles = vehiculos.filter((auto) => !marca || auto.marca === marca);

  /**
   * Cambia la marca y, si el modelo elegido no es de esa marca, lo limpia.
   * @method cambiarMarca
   * @param {string} nuevaMarca - Marca elegida ("" = todas)
   * @return {void}
   */
  const cambiarMarca = (nuevaMarca) => {
    setMarca(nuevaMarca);
    const sigueValido = vehiculos.some((auto) => auto.modelo === modelo && (!nuevaMarca || auto.marca === nuevaMarca));
    if (!sigueValido) setModelo('');
  };

  /**
   * Vuelve todos los filtros a su valor inicial.
   * @method limpiarFiltros
   * @return {void}
   */
  const limpiarFiltros = () => {
    setMarca('');
    setModelo('');
    setPrecio('');
  };

  const filtrados = vehiculos.filter((auto) => (!marca || auto.marca === marca) && (!modelo || auto.modelo === modelo));
  const autos = ordenarPorPrecio(filtrados, precio);

  return (
    <main className="catalogo">
      <div className="catalogo-titulo">
        <h1>Vehículos 0 Km</h1>
        <p>Encontrá el auto que estás buscando.</p>
      </div>

      <div className="filtros">
        <Filtro
          id="filtro-marca"
          label="Marca"
          value={marca}
          onChange={cambiarMarca}
          todos="Todas las marcas"
          opciones={aOpciones(valoresUnicos(vehiculos, 'marca'))}
        />
        <Filtro
          id="filtro-modelo"
          label="Modelo"
          value={modelo}
          onChange={setModelo}
          todos="Todos los modelos"
          opciones={modelosDisponibles.map((a) => ({ valor: a.modelo, texto: `${a.marca} ${a.modelo}` }))}
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

export default ZeroKm;
