import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Campo from '@/components/Campo';
import Casilla from '@/components/Casilla';
import DatosPersonales from '@/components/DatosPersonales';
import { addTestDrive } from '@/api/solicitudes';
import { eligio, esHorario, estaMarcado, REGLAS_DATOS_PERSONALES } from '@/utils/validaciones';
import { datosPersonalesIniciales, guardarDatosPersonales } from '@/utils/almacenamiento';
import { fechaDeHoy, mostrarFecha } from '@/utils/fechas';
import { CONTACTOS } from '@/data/formularios';

/**
 * Página con el formulario para reservar una prueba de manejo.
 * Valida cada campo en tiempo real y guarda la reserva en el servicio (POST /testDrives).
 * @method TestDrive
 * @return {JSX.Element}
 */
const TestDrive = () => {
  useEffect(() => {
    document.title = 'Test Drive | CarPoint';
  }, []);

  const navigate = useNavigate();
  const hoy = fechaDeHoy();

  const REGLAS = {
    ...REGLAS_DATOS_PERSONALES,
    fecha: (valor) => valor !== '' && valor >= hoy,
    horario: esHorario,
    contacto: eligio,
    licencia: estaMarcado,
    terminos: estaMarcado,
  };

  const [datos, setDatos] = useState({
    ...datosPersonalesIniciales(),
    modelo: '',
    concesionario: '',
    fecha: '',
    horario: '',
    contacto: '',
    comentarios: '',
    licencia: false,
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
   * Valida todo el formulario y, si está bien, guarda la reserva en el servicio.
   * Si hay errores, lleva el foco al primer campo con error.
   * @method reservar
   * @param {Event} e - Evento submit del formulario
   * @return {Promise<void>}
   */
  const reservar = async (e) => {
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
      await addTestDrive(datos);
      guardarDatosPersonales(datos);
      setEnviado(true);
    } catch {
      setErrorEnvio('No pudimos guardar tu reserva. Probá de nuevo en unos minutos.');
    }
    setEnviando(false);
  };

  return (
    <main className="formulario-pagina formulario-pagina--testdrive">
      <div className="formulario-cabecera">
        <h1>Test Drive</h1>
        <p>Reservá tu prueba de manejo y viví la experiencia antes de decidir.</p>
      </div>

      {enviado ? (
        <div className="form-exito" role="status">
          <h2>¡Listo, {datos.nombre}! Reservamos tu test drive</h2>
          <p>
            {datos.modelo} el {mostrarFecha(datos.fecha)} a las {datos.horario} en {datos.concesionario}. Te vamos a
            contactar por {datos.contacto} para confirmar.
          </p>
          <div className="form-acciones">
            <button type="button" className="btn-enviar" onClick={() => navigate('/')}>
              Volver al inicio
            </button>
          </div>
        </div>
      ) : (
        <form className="form-carpoint" noValidate onSubmit={reservar}>
          <div className="form-grid">
            <DatosPersonales datos={datos} cambiar={cambiar} tieneError={tieneError} labelModelo="Modelo a probar" />

            <Campo
              id="fecha"
              label="Fecha del test drive"
              error="Elegí una fecha a partir de hoy."
              invalido={tieneError('fecha')}
              flecha={true}
            >
              <input
                type="date"
                id="fecha"
                name="fecha"
                aria-invalid={tieneError('fecha')}
                aria-describedby="fecha-error"
                placeholder=" "
                min={hoy}
                value={datos.fecha}
                onChange={cambiar}
              />
            </Campo>

            <Campo
              id="horario"
              label="Horario"
              error="Elegí un horario entre las 9:00 y las 19:00 (cada media hora)."
              invalido={tieneError('horario')}
              flecha={true}
            >
              <input
                type="time"
                id="horario"
                name="horario"
                aria-invalid={tieneError('horario')}
                aria-describedby="horario-error"
                placeholder=" "
                min="09:00"
                max="19:00"
                step="1800"
                value={datos.horario}
                onChange={cambiar}
              />
            </Campo>

            <Campo
              id="contacto"
              label="¿Cómo querés que te contactemos?"
              error="Seleccioná una opción."
              invalido={tieneError('contacto')}
              flecha={true}
            >
              <select
                id="contacto"
                name="contacto"
                aria-invalid={tieneError('contacto')}
                aria-describedby="contacto-error"
                value={datos.contacto}
                onChange={cambiar}
              >
                <option value="">Seleccionar</option>
                {CONTACTOS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Campo>

            <Campo id="comentarios" label="Comentarios (opcional)" ancho={true}>
              <textarea
                id="comentarios"
                name="comentarios"
                placeholder=" "
                maxLength={300}
                rows={3}
                value={datos.comentarios}
                onChange={cambiar}
              ></textarea>
            </Campo>
          </div>

          <Casilla
            id="licencia"
            texto="Declaro tener licencia de conducir vigente"
            error="Necesitás licencia de conducir vigente para el test drive."
            checked={datos.licencia}
            invalido={tieneError('licencia')}
            onChange={cambiar}
          />

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
              {enviando ? 'Reservando…' : 'Reservar'}
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

export default TestDrive;
