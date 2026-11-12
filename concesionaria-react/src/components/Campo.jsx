/**
 * Contenedor de un campo de formulario: el control (input, select o textarea) llega como
 * children, y debajo se muestran su label y el mensaje de error.
 * El mensaje tiene id "{id}-error", que el control referencia con aria-describedby
 * para que los lectores de pantalla lo anuncien.
 * @method Campo
 * @param {Object} props
 * @param {string} props.id - id del control (lo usa el htmlFor del label)
 * @param {string} props.label - Texto del label
 * @param {string} [props.error] - Mensaje que se muestra cuando el valor no es válido
 * @param {boolean} [props.invalido] - true si hay que mostrar el error
 * @param {boolean} [props.flecha] - true para los selects (agrega la flechita)
 * @param {boolean} [props.ancho] - true para que ocupe todo el ancho del formulario
 * @param {JSX.Element} props.children - El input, select o textarea
 * @return {JSX.Element}
 */
const Campo = ({ id, label, error, invalido = false, flecha = false, ancho = false, children }) => {
  let clases = 'campo flotante';
  if (flecha) clases += ' campo--select';
  if (ancho) clases += ' campo--ancho';
  if (invalido) clases += ' invalido';

  return (
    <div className={clases}>
      {children}
      <label htmlFor={id}>{label}</label>
      {error && (
        <span className="error" id={`${id}-error`} aria-live="polite">
          {invalido ? error : ''}
        </span>
      )}
    </div>
  );
};

export default Campo;
