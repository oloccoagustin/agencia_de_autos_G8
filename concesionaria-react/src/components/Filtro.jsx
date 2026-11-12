/**
 * Select genérico para los filtros de los catálogos, con su label (visible solo para lectores de pantalla).
 * Lo usan las páginas 0 Km, Usados y Eléctricos.
 * @method Filtro
 * @param {Object} props
 * @param {string} props.id - id del select (lo usa el htmlFor del label)
 * @param {string} props.label - Texto del label
 * @param {string} props.value - Opción elegida
 * @param {function} props.onChange - Recibe el nuevo valor elegido
 * @param {string} props.todos - Texto de la primera opción (sin filtrar)
 * @param {Array<{valor: string, texto: string}>} props.opciones - Opciones del select
 * @return {JSX.Element}
 */
const Filtro = ({ id, label, value, onChange, todos, opciones }) => (
  <>
    <label htmlFor={id} className="visualmente-oculto">
      {label}
    </label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{todos}</option>
      {opciones.map((o) => (
        <option key={o.valor} value={o.valor}>
          {o.texto}
        </option>
      ))}
    </select>
  </>
);

export default Filtro;
