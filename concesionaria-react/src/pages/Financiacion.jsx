import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Campo from '@/components/Campo';
import Casilla from '@/components/Casilla';
import DatosPersonales from '@/components/DatosPersonales';
import { addFinanciacion } from '@/api/solicitudes';
import { eligio, estaMarcado, REGLAS_DATOS_PERSONALES } from '@/utils/validaciones';
import { datosPersonalesIniciales, guardarDatosPersonales } from '@/utils/almacenamiento';
import { ANTICIPOS, CUOTAS, FECHAS_COMPRA } from '@/data/formularios';

const REGLAS = {
  ...REGLAS_DATOS_PERSONALES,
  fecha: eligio,
  cuotas: eligio,
  anticipo: eligio,
  terminos: estaMarcado,
};

/**
 * Página con el formulario para pedir un plan de financiación.
 * Valida cada campo en tiempo real y guarda la solicitud en el servicio (POST /financiaciones).
 * @method Financiacion
 * @return {JSX.Element}
 */
const Financiacion = () => {
  useEffect(() => {
    document.title = 'Financiación | CarPoint';
  }, []);

  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    ...datosPersonalesIniciales(),
    modelo: '',
    concesionario: '',
    fecha: '',
    cuotas: '',
    anticipo: '',
    terminos: false,
  });
  const [tocados, setTocados] = useState({}); // campos que el usuario ya modificó
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');
  const [enviado, setEnviado] = useState(false);

  /**
   * Guarda el nuevo valor del campo que cambió (usa su name) y lo marca como tocado,
   * así su error se muestra mientras el usuario escribe.
   * @method cambiar
   * @param {Event} e - Evento onChange del input, select o textarea
   * @return {void}
   */
  const cambiar = (e) => {
    const { name, type, value, checked } = e.target;
    setDatos({ ...datos, [name]: type === 'checkbox' ? checked : value });
    setTocados({ ...tocados, [name]: true });
  };

  /**
   * Indica si hay que mostrar el error de un campo: ya se tocó y no cumple su regla.
   * @method tieneError
   * @param {string} campo - Nombre del campo
   * @return {boolean} true si el campo tiene que mostrar su error
   */
  const tieneError = (campo) => tocados[campo] === true && !REGLAS[campo](datos[campo]);

  /**
   * Valida todo el formulario y, si está bien, envía la solicitud al servicio.
   * Si hay errores, lleva el foco al primer campo con error.
   * @method enviarSolicitud
   * @param {Event} e - Evento submit del formulario
   * @return {Promise<void>}
   */
  const enviarSolicitud = async (e) => {
    e.preventDefault();
    // Al enviar se marcan todos los campos como tocados, para mostrar todos los errores
    const todos = {};
    Object.keys(REGLAS).forEach((campo) => {
      todos[campo] = true;
    });
    setTocados(todos);

    const primeroConError = Object.keys(REGLAS).find((campo) => !REGLAS[campo](datos[campo]));
    if (primeroConError) {
      document.getElementById(primeroConError).focus();
      return;
    }

    setEnviando(true);
    setErrorEnvio('');
    try {
      await addFinanciacion(datos);
      guardarDatosPersonales(datos);
      setEnviado(true);
    } catch {
      setErrorEnvio('No pudimos enviar tu solicitud. Probá de nuevo en unos minutos.');
    }
    setEnviando(false);
  };

  return (
    <main className="formulario-pagina">
      <div className="formulario-cabecera">
        <h1>Financiación</h1>
        <p>Completá tus datos y un asesor de CarPoint se comunica con vos para armar tu plan.</p>
        <p className="formulario-enlace">
          ¿Querés saber cuánto pagarías por mes? <Link to="/simulador">Simulá tu cuota</Link>
        </p>
      </div>

      {enviado ? (
        <div className="form-exito" role="status">
          <h2>¡Listo, {datos.nombre}! Recibimos tu solicitud</h2>
          <p>Un asesor de CarPoint te va a contactar a la brevedad.</p>
          <div className="form-acciones">
            <button type="button" className="btn-enviar" onClick={() => navigate('/')}>
              Volver al inicio
            </button>
          </div>
        </div>
      ) : (
        <form className="form-carpoint" noValidate onSubmit={enviarSolicitud}>
          <div className="form-grid">
            <DatosPersonales datos={datos} cambiar={cambiar} tieneError={tieneError} labelModelo="Modelos" />

            <Campo
              id="fecha"
              label="Fecha estimada de compra"
              error="Seleccioná una fecha estimada."
              invalido={tieneError('fecha')}
              flecha={true}
            >
              <select
                id="fecha"
                name="fecha"
                aria-invalid={tieneError('fecha')}
                aria-describedby="fecha-error"
                value={datos.fecha}
                onChange={cambiar}
              >
                <option value="">Seleccionar</option>
                {FECHAS_COMPRA.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </Campo>

            <Campo
              id="cuotas"
              label="Cantidad de cuotas"
              error="Seleccioná la cantidad de cuotas."
              invalido={tieneError('cuotas')}
              flecha={true}
            >
              <select
                id="cuotas"
                name="cuotas"
                aria-invalid={tieneError('cuotas')}
                aria-describedby="cuotas-error"
                value={datos.cuotas}
                onChange={cambiar}
              >
                <option value="">Seleccionar</option>
                {CUOTAS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Campo>

            <Campo
              id="anticipo"
              label="Anticipo estimado"
              error="Seleccioná el anticipo."
              invalido={tieneError('anticipo')}
              flecha={true}
            >
              <select
                id="anticipo"
                name="anticipo"
                aria-invalid={tieneError('anticipo')}
                aria-describedby="anticipo-error"
                value={datos.anticipo}
                onChange={cambiar}
              >
                <option value="">Seleccionar</option>
                {ANTICIPOS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </Campo>
          </div>

          <Casilla
            id="terminos"
            texto="Acepto los términos y condiciones de CarPoint"
            error="Aceptá los términos y condiciones para continuar."
            checked={datos.terminos}
            invalido={tieneError('terminos')}
            onChange={cambiar}
          />

          {errorEnvio && (
            <p className="form-error-envio" role="alert">
              {errorEnvio}
            </p>
          )}

          <div className="form-acciones">
            <button type="submit" className="btn-enviar" disabled={enviando}>
              {enviando ? 'Enviando…' : 'Enviar'}
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

export default Financiacion;
