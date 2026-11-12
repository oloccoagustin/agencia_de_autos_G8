import AutoCard from '@/components/AutoCard';
import Aviso from '@/components/Aviso';

/**
 * Muestra los vehículos de un catálogo, o un aviso si está cargando, si falló el servicio
 * o si ningún vehículo coincide con los filtros.
 * @method ListaAutos
 * @param {Object} props
 * @param {Array<Object>} props.autos - Vehículos ya filtrados
 * @param {boolean} props.cargando - true mientras se espera la respuesta del servicio
 * @param {string} props.error - Mensaje de error del servicio ("" si no hubo)
 * @return {JSX.Element}
 */
const ListaAutos = ({ autos, cargando, error }) => {
  if (cargando) return <Aviso titulo="Cargando vehículos…" texto="Estamos buscando el catálogo actualizado." />;
  if (error) return <Aviso titulo="No pudimos cargar el catálogo" texto={error} />;
  if (autos.length === 0) {
    return (
      <Aviso titulo="No encontramos vehículos" texto="No hay vehículos que coincidan con los filtros seleccionados." />
    );
  }

  return (
    <div className="autos-grid">
      {autos.map((auto) => (
        <AutoCard key={auto.id} auto={auto} />
      ))}
    </div>
  );
};

export default ListaAutos;
