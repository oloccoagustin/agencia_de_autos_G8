/**
 * Recuadro para avisar algo al usuario: que está cargando, que hubo un error o que no hay resultados.
 * Usa role="status" para que los lectores de pantalla lo anuncien.
 * @method Aviso
 * @param {Object} props
 * @param {string} props.titulo - Título del aviso
 * @param {string} props.texto - Explicación
 * @return {JSX.Element}
 */
const Aviso = ({ titulo, texto }) => (
  <div className="sin-resultados" role="status">
    <h2>{titulo}</h2>
    <p>{texto}</p>
  </div>
);

export default Aviso;
