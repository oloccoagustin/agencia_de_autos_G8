import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Campo from '@/components/Campo';
import Aviso from '@/components/Aviso';
import ResultadoCuota from '@/components/ResultadoCuota';
import TablaCuotas from '@/components/TablaCuotas';
import { getTodosLosVehiculos } from '@/api/vehiculos';
import { getTasa } from '@/api/tasa';
import { simularPrestamo } from '@/utils/financiacion';
import { eligio, esAnticipo } from '@/utils/validaciones';
import { CATEGORIAS, PLAZOS } from '@/data/formularios';

// REGLAS: para cada campo, una función que dice si lo ingresado es válido
const REGLAS = {
  vehiculo: eligio,
  anticipo: esAnticipo,
  cuotas: eligio,
};

const DATOS_INICIALES = { vehiculo: '', anticipo: '', cuotas: '' };

/**
 * Página del simulador de cuotas: el usuario elige un vehículo, el anticipo y la cantidad
 * de cuotas, y ve la cuota mensual calculada con la tasa vigente (que viene del servicio).
 * @method Simulador
 * @return {JSX.Element}
 */
const Simulador = () => {
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([]);
  const [tna, setTna] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [tocados, setTocados] = useState({});

  // useEffect: al abrir la página cambia el título y pide al servicio los vehículos y la tasa
  useEffect(() => {
    document.title = 'Simulador de cuotas | CarPoint';

    /**
     * Pide los vehículos y la tasa vigente al servicio y los guarda en el estado.
     * @method cargarDatos
     * @return {Promise<void>}
     */
    const cargarDatos = async () => {
      try {
        const listaVehiculos = await getTodosLosVehiculos();
        const tasa = await getTasa();
        setVehiculos(listaVehiculos);
        setTna(tasa.tna);
      } catch {
        setError(
          'No pudimos cargar los datos del simulador. Verificá que el servicio esté funcionando (npm run services).'
        );
      }
      setCargando(false);
    };

    cargarDatos();
  }, []);

  /**
   * Guarda el nuevo valor del campo que cambió (usa su name) y lo marca como tocado,
   * así su error se muestra mientras el usuario escribe.
   * @method cambiar
   * @param {Event} e - Evento onChange del input o select
   * @return {void}
   */
  const cambiar = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
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
   * Vuelve el simulador a su estado inicial.
   * @method limpiar
   * @return {void}
   */
  const limpiar = () => {
    setDatos(DATOS_INICIALES);
    setTocados({});
  };

  const vehiculo = vehiculos.find((v) => v.id === datos.vehiculo);
  const todoValido = Object.keys(REGLAS).every((campo) => REGLAS[campo](datos[campo]));
  const porcentajeAnticipo = Number(datos.anticipo);
  const cuotas = Number(datos.cuotas);

  return (
    <main className="formulario-pagina simulador">
      <div className="formulario-cabecera">
        <h1>Simulador de cuotas</h1>
        <p>Elegí un vehículo, el anticipo y la cantidad de cuotas para saber cuánto pagarías por mes.</p>
      </div>

      {cargando && <Aviso titulo="Cargando el simulador…" texto="Estamos buscando los vehículos y la tasa vigente." />}
      {error && <Aviso titulo="No pudimos cargar el simulador" texto={error} />}

      {!cargando && !error && (
        <>
          <form className="form-carpoint" noValidate onSubmit={(e) => e.preventDefault()}>
            <div className="form-grid">
              <Campo
                id="vehiculo"
                label="Vehículo"
                error="Seleccioná un vehículo."
                invalido={tieneError('vehiculo')}
                flecha={true}
              >
                <select
                  id="vehiculo"
                  name="vehiculo"
                  aria-invalid={tieneError('vehiculo')}
                  aria-describedby="vehiculo-error"
                  value={datos.vehiculo}
                  onChange={cambiar}
                >
                  <option value="">Seleccionar</option>
                  {CATEGORIAS.map((categoria) => (
                    <optgroup key={categoria.valor} label={categoria.texto}>
                      {vehiculos
                        .filter((v) => v.categoria === categoria.valor)
                        .map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.marca} {v.modelo}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </Campo>

              <Campo
                id="anticipo"
                label="Anticipo (%)"
                error="Ingresá un número entero entre 10 y 80."
                invalido={tieneError('anticipo')}
              >
                <input
                  type="text"
                  id="anticipo"
                  name="anticipo"
                  aria-invalid={tieneError('anticipo')}
                  aria-describedby="anticipo-error"
                  placeholder=" "
                  size={4}
                  maxLength={2}
                  value={datos.anticipo}
                  onChange={cambiar}
                />
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
                  {PLAZOS.map((plazo) => (
                    <option key={plazo} value={plazo}>
                      {plazo} cuotas
                    </option>
                  ))}
                </select>
              </Campo>
            </div>

            <div className="form-acciones">
              <button type="button" className="btn-secundario" onClick={limpiar}>
                Limpiar
              </button>
            </div>
          </form>

          {todoValido ? (
            <div className="simulador-resultados">
              <ResultadoCuota
                vehiculo={vehiculo}
                porcentajeAnticipo={porcentajeAnticipo}
                cuotas={cuotas}
                tna={tna}
                simulacion={simularPrestamo(vehiculo.precio, porcentajeAnticipo, cuotas, tna)}
              />
              <TablaCuotas
                precio={vehiculo.precio}
                porcentajeAnticipo={porcentajeAnticipo}
                cuotasElegidas={cuotas}
                tna={tna}
              />
              <div className="form-acciones">
                <button type="button" className="btn-enviar" onClick={() => navigate('/financiacion')}>
                  Pedir esta financiación
                </button>
              </div>
            </div>
          ) : (
            <p className="simulador-ayuda">Completá los tres campos para ver la simulación.</p>
          )}
        </>
      )}
    </main>
  );
};

export default Simulador;
