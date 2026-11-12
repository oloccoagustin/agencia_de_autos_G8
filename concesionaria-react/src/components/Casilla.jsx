/**
 * Casilla de verificación (checkbox) con su label y mensaje de error accesible.
 * La usan los formularios de Financiación y Test Drive (términos, licencia).
 * @method Casilla
 * @param {Object} props
 * @param {string} props.id - id y name del checkbox
 * @param {string} props.texto - Texto del label
 * @param {string} props.error - Mensaje que se muestra si no está marcada
 * @param {boolean} props.checked - Si está marcada
 * @param {boolean} props.invalido - true si hay que mostrar el error
 * @param {function} props.onChange - Función que se ejecuta al marcar o desmarcar
 * @return {JSX.Element}
 */
const Casilla = ({ id, texto, error, checked, invalido, onChange }) => {
  const idError = `${id}-error`;

  return (
    <div className={'campo campo--terminos' + (invalido ? ' invalido' : '')}>
      <label htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={onChange}
          aria-invalid={invalido}
          aria-describedby={invalido ? idError : undefined}
        />
        {texto}
      </label>
      <span className="error" id={idError} aria-live="polite">
        {invalido ? error : ''}
      </span>
    </div>
  );
};

export default Casilla;
