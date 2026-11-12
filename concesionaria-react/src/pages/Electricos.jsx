import { useEffect, useState } from 'react';
import Filtro from '@/components/Filtro';
import ListaAutos from '@/components/ListaAutos';
import { getVehiculos } from '@/api/vehiculos';
import { aOpciones, ordenarPorPrecio, valoresUnicos } from '@/utils/vehiculos';
import { ORDEN_PRECIO, RANGOS_AUTONOMIA } from '@/data/catalogos';

/**
 * Indica si un auto eléctrico cumple con el filtro de autonomía.
 * @method cumpleAutonomia
 * @param {number} autonomia - Autonomía del auto en km
 * @param {string} filtro - Valor elegido en el filtro ("" = cualquiera)
 * @return {boolean} true si el auto entra en el rango
 */
const cumpleAutonomia = (autonomia, filtro) => {
  if (filtro === 'hasta400') return autonomia <= 400;
  if (filtro === '400-500') return autonomia > 400 && autonomia <= 500;
  if (filtro === '500-600') return autonomia > 500 && autonomia <= 600;
  if (filtro === 'mas600') return autonomia > 600;
  return true;
};

/**
 * Página del catálogo de vehículos eléctricos, con filtros por marca, modelo, autonomía y tipo.
 * @method Electricos
 * @return {JSX.Element}
 */
const Electricos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // useEffect: al abrir la página cambia el título de la pestaña y pide los vehículos al servicio
  useEffect(() => {
    document.title = 'Eléctricos | CarPoint';

    /**
     * Pide los vehículos de la categoría al servicio y los guarda en el estado.
     * @method cargarVehiculos
     * @return {Promise<void>}
     */
    const cargarVehiculos = async () => {
      try {
        const data = await getVehiculos('electricos');
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
  const [autonomia, setAutonomia] = useState('');
  const [tipo, setTipo] = useState('');
  const [precio, setPrecio] = useState('');

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
    setAutonomia('');
    setTipo('');
    setPrecio('');
  };

  const filtrados = vehiculos.filter(
    (auto) =>
      (!marca || auto.marca === marca) &&
      (!modelo || auto.modelo === modelo) &&
      (!tipo || auto.tipo === tipo) &&
      cumpleAutonomia(auto.autonomia, autonomia)
  );
  const autos = ordenarPorPrecio(filtrados, precio);

  return (
    <main className="catalogo">
      <div className="catalogo-titulo">
        <h1>Vehículos Eléctricos</h1>
        <p>Innovación, rendimiento y movilidad eléctrica.</p>
      </div>

      <div className="filtros filtros--electricos">
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
          id="filtro-autonomia"
          label="Autonomía"
          value={autonomia}
          onChange={setAutonomia}
          todos="Cualquier autonomía"
          opciones={RANGOS_AUTONOMIA}
        />
        <Filtro
          id="filtro-tipo"
          label="Tipo de vehículo"
          value={tipo}
          onChange={setTipo}
          todos="Todos los tipos"
          opciones={aOpciones(valoresUnicos(vehiculos, 'tipo'))}
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

export default Electricos;
