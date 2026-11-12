import Campo from '@/components/Campo';
import { CONCESIONARIOS, MODELOS_POR_MARCA, PROVINCIAS } from '@/data/formularios';

/**
 * Campos que comparten los formularios de Financiación y Test Drive: modelo, datos personales,
 * ubicación y concesionario.
 * @method DatosPersonales
 * @param {Object} props
 * @param {Object} props.datos - Valores actuales del formulario
 * @param {function} props.cambiar - Función onChange del formulario
 * @param {function} props.tieneError - Indica si un campo tiene que mostrar su error
 * @param {string} props.labelModelo - Texto del label del select de modelos
 * @return {JSX.Element}
 */
const DatosPersonales = ({ datos, cambiar, tieneError, labelModelo }) => (
  <>
    <Campo id="modelo" label={labelModelo} error="Seleccioná un modelo." invalido={tieneError('modelo')} flecha={true}>
      <select
        id="modelo"
        name="modelo"
        aria-invalid={tieneError('modelo')}
        aria-describedby="modelo-error"
        value={datos.modelo}
        onChange={cambiar}
      >
        <option value="">Seleccionar</option>
        {MODELOS_POR_MARCA.map((grupo) => (
          <optgroup key={grupo.marca} label={grupo.marca}>
            {grupo.modelos.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </Campo>

    <Campo id="nombre" label="Nombre" error="Ingresá tu nombre (solo letras)." invalido={tieneError('nombre')}>
      <input
        type="text"
        id="nombre"
        name="nombre"
        aria-invalid={tieneError('nombre')}
        aria-describedby="nombre-error"
        placeholder=" "
        size={30}
        maxLength={40}
        value={datos.nombre}
        onChange={cambiar}
      />
    </Campo>

    <Campo id="apellido" label="Apellido" error="Ingresá tu apellido (solo letras)." invalido={tieneError('apellido')}>
      <input
        type="text"
        id="apellido"
        name="apellido"
        aria-invalid={tieneError('apellido')}
        aria-describedby="apellido-error"
        placeholder=" "
        size={30}
        maxLength={40}
        value={datos.apellido}
        onChange={cambiar}
      />
    </Campo>

    <Campo id="dni" label="DNI" error="Ingresá tu DNI sin puntos (7 u 8 números)." invalido={tieneError('dni')}>
      <input
        type="text"
        id="dni"
        name="dni"
        aria-invalid={tieneError('dni')}
        aria-describedby="dni-error"
        placeholder=" "
        size={10}
        maxLength={8}
        value={datos.dni}
        onChange={cambiar}
      />
    </Campo>

    <Campo
      id="celular"
      label="Celular"
      error="Ingresá de 10 a 13 números, sin espacios."
      invalido={tieneError('celular')}
    >
      <input
        type="tel"
        id="celular"
        name="celular"
        aria-invalid={tieneError('celular')}
        aria-describedby="celular-error"
        placeholder=" "
        size={15}
        maxLength={13}
        value={datos.celular}
        onChange={cambiar}
      />
    </Campo>

    <Campo
      id="email"
      label="E-mail"
      error="Ingresá un e-mail válido (ej: nombre@mail.com)."
      invalido={tieneError('email')}
    >
      <input
        type="email"
        id="email"
        name="email"
        aria-invalid={tieneError('email')}
        aria-describedby="email-error"
        placeholder=" "
        size={30}
        maxLength={60}
        value={datos.email}
        onChange={cambiar}
      />
    </Campo>

    <Campo
      id="provincia"
      label="Provincia"
      error="Seleccioná tu provincia."
      invalido={tieneError('provincia')}
      flecha={true}
    >
      <select
        id="provincia"
        name="provincia"
        aria-invalid={tieneError('provincia')}
        aria-describedby="provincia-error"
        value={datos.provincia}
        onChange={cambiar}
      >
        <option value="">Seleccionar</option>
        {PROVINCIAS.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
    </Campo>

    <Campo id="ciudad" label="Ciudad" error="Ingresá tu ciudad (solo letras)." invalido={tieneError('ciudad')}>
      <input
        type="text"
        id="ciudad"
        name="ciudad"
        aria-invalid={tieneError('ciudad')}
        aria-describedby="ciudad-error"
        placeholder=" "
        size={30}
        maxLength={60}
        value={datos.ciudad}
        onChange={cambiar}
      />
    </Campo>

    <Campo
      id="concesionario"
      label="Concesionario"
      error="Seleccioná un concesionario."
      invalido={tieneError('concesionario')}
      flecha={true}
    >
      <select
        id="concesionario"
        name="concesionario"
        aria-invalid={tieneError('concesionario')}
        aria-describedby="concesionario-error"
        value={datos.concesionario}
        onChange={cambiar}
      >
        <option value="">Seleccionar</option>
        {CONCESIONARIOS.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </Campo>
  </>
);

export default DatosPersonales;
