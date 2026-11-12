import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ACCESORIOS, MARCAS, MODELOS, PUESTOS, STOCK } from '@/data/modelos';
import { armarTodosInicio, sinRepetir } from '@/data/inicio';
import { formatPrice } from '@/utils/formato';
import { fechaDeManana, mostrarFecha } from '@/utils/fechas';
import { guardarDatosUsuario, leerDatosUsuario } from '@/utils/almacenamiento';

/**
 * Arma el "Nombre y apellido" con los datos guardados del usuario, para completar los formularios.
 * @method nombreGuardado
 * @param {Object} guardados - Datos del localStorage
 * @return {string} Nombre completo o "" si no hay nada guardado
 */
const nombreGuardado = (guardados) => [guardados.nombre, guardados.apellido].filter(Boolean).join(' ');

/**
 * Guarda en el localStorage los datos de contacto escritos en una ventana.
 * El "Nombre y apellido" se separa en nombre (primera palabra) y apellido (el resto).
 * @method recordarContacto
 * @param {{nombre: string, email?: string, celular?: string}} datos - Datos del formulario
 * @return {void}
 */
const recordarContacto = (datos) => {
  const palabras = datos.nombre.trim().split(' ');
  guardarDatosUsuario({
    nombre: palabras[0],
    apellido: palabras.slice(1).join(' '),
    email: datos.email || '',
    celular: datos.celular || '',
  });
};

/**
 * Primera palabra de un nombre completo (para el mensaje de gracias).
 * @method primerNombre
 * @param {string} nombre - Nombre y apellido
 * @return {string} Primer nombre
 */
const primerNombre = (nombre) => nombre.trim().split(' ')[0];

/**
 * Ventana base: fondo oscuro con un <dialog> adentro. El contenido llega como children.
 * Hacer clic en el fondo o en la X la cierra.
 * @method Ventana
 * @param {Object} props
 * @param {string} props.nombre - Nombre de la ventana (forma el id "modal-nombre" que usan los estilos)
 * @param {function} props.onCerrar - Función que cierra la ventana
 * @param {JSX.Element} props.children - Contenido de la ventana
 * @return {JSX.Element}
 */
const Ventana = ({ nombre, onCerrar, children }) => (
  <div className="modal-fondo" onClick={onCerrar}>
    <dialog open id={`modal-${nombre}`} className="modal-footer" aria-modal="true" onClick={(e) => e.stopPropagation()}>
      <button className="cerrar" type="button" aria-label="Cerrar" onClick={onCerrar}>
        &times;
      </button>
      {children}
    </dialog>
  </div>
);

/**
 * Ventana con los vehículos en stock (de un modelo o de todos).
 * En el Inicio (cuando llega stockInicio) muestra los autos del bloque de stock; en el resto, las unidades del footer.
 * @method VentanaStock
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas
 * @param {Array<Object>} [props.stockInicio] - Autos del bloque de stock del Inicio
 * @return {JSX.Element}
 */
const VentanaStock = ({ modales, stockInicio }) => {
  const modelo = modales.modeloElegido;
  const origen = stockInicio || STOCK;
  const lista = modelo ? origen.filter((v) => v.modelo === modelo) : origen;

  return (
    <Ventana nombre="stock" onCerrar={modales.cerrar}>
      <h3>
        {modelo || 'Vehículos en stock'} · {lista.length} {lista.length === 1 ? 'disponible' : 'disponibles'}
      </h3>
      <ul className="lista">
        {lista.map((v, i) => (
          <li key={`${v.modelo}-${i}`}>
            <div>
              {v.marca} {v.modelo} {v.version}
              <small>{stockInicio ? v.dato : `${v.color} · ${v.anio} · 0 km`}</small>
            </div>
            <span className="precio">{formatPrice(v.precio)}</span>
            <button
              className="boton"
              type="button"
              onClick={() =>
                modales.consultar(
                  stockInicio ? `${v.marca} ${v.modelo} (${v.dato})` : `${v.marca} ${v.modelo} ${v.version} ${v.color}`
                )
              }
            >
              Consultar
            </button>
          </li>
        ))}
      </ul>
    </Ventana>
  );
};

/**
 * Ventana con todos los modelos agrupados por marca.
 * En el Inicio (cuando llega stockInicio) lista los autos de stock y los que se traen bajo pedido.
 * @method VentanaModelos
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas
 * @param {Array<Object>} [props.stockInicio] - Autos del bloque de stock del Inicio
 * @return {JSX.Element}
 */
const VentanaModelos = ({ modales, stockInicio }) => {
  const todosInicio = stockInicio ? armarTodosInicio(stockInicio) : [];
  const marcas = stockInicio ? sinRepetir(todosInicio) : MARCAS;

  /**
   * Elige el modelo y abre la ventana de stock.
   * @method verStock
   * @param {string} nombre - Modelo elegido
   * @return {void}
   */
  const verStock = (nombre) => {
    modales.elegirModelo(nombre);
    modales.abrir('stock');
  };

  return (
    <Ventana nombre="modelos" onCerrar={modales.cerrar}>
      <h3>Todos los modelos</h3>
      {marcas.map((marca) => (
        <div key={marca}>
          <h4>{marca}</h4>
          <ul className="lista">
            {stockInicio
              ? todosInicio
                  .filter((v) => v.marca === marca)
                  .map((v) => (
                    <li key={v.modelo}>
                      <div>
                        {v.modelo}
                        <small>{v.dato}</small>
                      </div>
                      {v.pedido ? (
                        <button
                          className="boton"
                          type="button"
                          onClick={() => modales.consultar(`${v.marca} ${v.modelo} (bajo pedido)`)}
                        >
                          Consultar
                        </button>
                      ) : (
                        <span className="acciones">
                          <button className="boton" type="button" onClick={() => verStock(v.modelo)}>
                            Ver stock
                          </button>
                          <Link className="boton" to={v.ruta} onClick={modales.cerrar}>
                            Ver catálogo
                          </Link>
                        </span>
                      )}
                    </li>
                  ))
              : MODELOS.filter((m) => m.marca === marca).map((m) => (
                  <li key={m.nombre}>
                    <div>
                      {m.nombre}
                      <small>
                        {m.versiones.length} {m.versiones.length === 1 ? 'versión' : 'versiones'} · {m.cantidad} en
                        stock
                      </small>
                    </div>
                    <span className="precio">Desde {formatPrice(m.precio)}</span>
                    <span className="acciones">
                      <button className="boton" type="button" onClick={() => verStock(m.nombre)}>
                        Ver stock
                      </button>
                      <Link className="boton" to={m.catalogo || '/0km'} onClick={modales.cerrar}>
                        Ver catálogo
                      </Link>
                    </span>
                  </li>
                ))}
          </ul>
        </div>
      ))}
    </Ventana>
  );
};

/**
 * Ventana con los accesorios y su precio.
 * @method VentanaAccesorios
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas
 * @return {JSX.Element}
 */
const VentanaAccesorios = ({ modales }) => (
  <Ventana nombre="accesorios" onCerrar={modales.cerrar}>
    <h3>Accesorios</h3>
    <ul className="lista">
      {ACCESORIOS.map((a) => (
        <li key={a.nombre}>
          <div>
            {a.nombre}
            <small>{a.detalle}</small>
          </div>
          <span className="precio">{formatPrice(a.precio)}</span>
          <button className="boton" type="button" onClick={() => modales.consultar(a.nombre)}>
            Consultar
          </button>
        </li>
      ))}
    </ul>
  </Ventana>
);

/**
 * Ventana con el teléfono para pedir cotizaciones.
 * @method VentanaTelefono
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas
 * @return {JSX.Element}
 */
const VentanaTelefono = ({ modales }) => (
  <Ventana nombre="telefono" onCerrar={modales.cerrar}>
    <h3>Cotizaciones por teléfono</h3>
    <p className="dato-contacto">(0351) 555-0123</p>
    <p>Lunes a viernes de 9 a 19 h · Sábados de 9 a 13 h</p>
    <a className="boton" href="tel:+543515550123">
      Llamar ahora
    </a>
  </Ventana>
);

/**
 * Ventana con el formulario para pedir un service a domicilio.
 * @method VentanaService
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas
 * @return {JSX.Element}
 */
const VentanaService = ({ modales }) => {
  const guardados = leerDatosUsuario();
  const [datos, setDatos] = useState({
    nombre: nombreGuardado(guardados),
    celular: guardados.celular || '',
    direccion: '',
    modelo: MODELOS[0].nombre,
    fecha: '',
  });
  const [mensaje, setMensaje] = useState('');
  const manana = fechaDeManana();

  /**
   * Guarda el valor del campo que cambió (usa el name del campo).
   * @method cambiar
   * @param {Event} e - Evento onChange
   * @return {void}
   */
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  /**
   * Confirma el turno con un número de reserva y recuerda los datos de contacto.
   * @method enviarTurno
   * @param {Event} e - Evento submit
   * @return {void}
   */
  const enviarTurno = (e) => {
    e.preventDefault();
    recordarContacto(datos);
    const turno = 'SV-' + Math.floor(10000 + Math.random() * 90000);
    setMensaje(
      `¡Gracias ${primerNombre(datos.nombre)}! Tu turno ${turno} quedó reservado para el ${mostrarFecha(datos.fecha)}. Te vamos a llamar para confirmar el horario.`
    );
  };

  return (
    <Ventana nombre="service" onCerrar={modales.cerrar}>
      <h3>Service a domicilio</h3>
      <p>Nuestros técnicos van a tu casa u oficina. Completá el formulario y te confirmamos el turno.</p>
      {mensaje ? (
        <div className="mensaje-ok" role="status">
          {mensaje}
        </div>
      ) : (
        <form className="formulario" onSubmit={enviarTurno}>
          <label htmlFor="service-nombre">Nombre y apellido</label>
          <input
            id="service-nombre"
            name="nombre"
            size={30}
            maxLength={60}
            value={datos.nombre}
            onChange={cambiar}
            required
          />
          <label htmlFor="service-celular">Celular</label>
          <input
            id="service-celular"
            name="celular"
            type="tel"
            size={15}
            maxLength={13}
            value={datos.celular}
            onChange={cambiar}
            required
          />
          <label htmlFor="service-direccion">Dirección</label>
          <input
            id="service-direccion"
            name="direccion"
            size={30}
            maxLength={80}
            value={datos.direccion}
            onChange={cambiar}
            required
          />
          <label htmlFor="service-modelo">Modelo</label>
          <select id="service-modelo" name="modelo" value={datos.modelo} onChange={cambiar} required>
            {MARCAS.map((marca) => (
              <optgroup key={marca} label={marca}>
                {MODELOS.filter((m) => m.marca === marca).map((m) => (
                  <option key={m.nombre}>{m.nombre}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <label htmlFor="service-fecha">Fecha preferida</label>
          <input
            id="service-fecha"
            name="fecha"
            type="date"
            min={manana}
            value={datos.fecha}
            onChange={cambiar}
            required
          />
          <button className="boton" type="submit">
            Solicitar turno
          </button>
        </form>
      )}
    </Ventana>
  );
};

/**
 * Ventana con el formulario de contacto. Si se abrió desde "Consultar", el mensaje ya viene escrito.
 * @method VentanaContacto
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas
 * @return {JSX.Element}
 */
const VentanaContacto = ({ modales }) => {
  const guardados = leerDatosUsuario();
  const [datos, setDatos] = useState({
    nombre: nombreGuardado(guardados),
    email: guardados.email || '',
    mensaje: modales.mensaje,
  });
  const [respuesta, setRespuesta] = useState('');

  /**
   * Guarda el valor del campo que cambió (usa el name del campo).
   * @method cambiar
   * @param {Event} e - Evento onChange
   * @return {void}
   */
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  /**
   * Muestra la confirmación de la consulta y recuerda los datos de contacto.
   * @method enviarConsulta
   * @param {Event} e - Evento submit
   * @return {void}
   */
  const enviarConsulta = (e) => {
    e.preventDefault();
    recordarContacto(datos);
    setRespuesta(
      `¡Gracias ${primerNombre(datos.nombre)}! Recibimos tu consulta y te vamos a responder a ${datos.email} dentro de las próximas 24 horas.`
    );
  };

  return (
    <Ventana nombre="contacto" onCerrar={modales.cerrar}>
      <h3>Contacto</h3>
      <p>
        Av. Colón 1250, Córdoba · info@carpoint.com.ar ·{' '}
        <Link to="/concesionarias" className="enlace-claro" onClick={modales.cerrar}>
          Ver concesionarias
        </Link>
      </p>
      {respuesta ? (
        <div className="mensaje-ok" role="status">
          {respuesta}
        </div>
      ) : (
        <form className="formulario" onSubmit={enviarConsulta}>
          <label htmlFor="contacto-nombre">Nombre y apellido</label>
          <input
            id="contacto-nombre"
            name="nombre"
            size={30}
            maxLength={60}
            value={datos.nombre}
            onChange={cambiar}
            required
          />
          <label htmlFor="contacto-email">Email</label>
          <input
            id="contacto-email"
            name="email"
            type="email"
            size={30}
            maxLength={60}
            value={datos.email}
            onChange={cambiar}
            required
          />
          <label htmlFor="contacto-mensaje">Mensaje</label>
          <textarea
            id="contacto-mensaje"
            name="mensaje"
            maxLength={500}
            value={datos.mensaje}
            onChange={cambiar}
            required
          ></textarea>
          <button className="boton" type="submit">
            Enviar consulta
          </button>
        </form>
      )}
    </Ventana>
  );
};

/**
 * Ventana con los puestos disponibles y el formulario para postularse.
 * @method VentanaEmpleo
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas
 * @return {JSX.Element}
 */
const VentanaEmpleo = ({ modales }) => {
  const guardados = leerDatosUsuario();
  const [datos, setDatos] = useState({
    nombre: nombreGuardado(guardados),
    email: guardados.email || '',
    puesto: PUESTOS[0].nombre,
  });
  const [mensaje, setMensaje] = useState('');

  /**
   * Guarda el valor del campo que cambió (usa el name del campo).
   * @method cambiar
   * @param {Event} e - Evento onChange
   * @return {void}
   */
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  /**
   * Muestra la confirmación de la postulación y recuerda los datos de contacto.
   * @method postularse
   * @param {Event} e - Evento submit
   * @return {void}
   */
  const postularse = (e) => {
    e.preventDefault();
    recordarContacto(datos);
    setMensaje(
      `¡Gracias ${primerNombre(datos.nombre)}! Recibimos tu postulación para ${datos.puesto}. Si tu perfil coincide te vamos a contactar.`
    );
  };

  return (
    <Ventana nombre="empleo" onCerrar={modales.cerrar}>
      <h3>Trabajá con nosotros</h3>
      <ul className="lista">
        {PUESTOS.map((p) => (
          <li key={p.nombre}>
            <div>
              {p.nombre}
              <small>{p.detalle}</small>
            </div>
          </li>
        ))}
      </ul>
      {mensaje ? (
        <div className="mensaje-ok" role="status">
          {mensaje}
        </div>
      ) : (
        <form className="formulario" onSubmit={postularse}>
          <label htmlFor="empleo-nombre">Nombre y apellido</label>
          <input
            id="empleo-nombre"
            name="nombre"
            size={30}
            maxLength={60}
            value={datos.nombre}
            onChange={cambiar}
            required
          />
          <label htmlFor="empleo-email">Email</label>
          <input
            id="empleo-email"
            name="email"
            type="email"
            size={30}
            maxLength={60}
            value={datos.email}
            onChange={cambiar}
            required
          />
          <label htmlFor="empleo-puesto">Puesto</label>
          <select id="empleo-puesto" name="puesto" value={datos.puesto} onChange={cambiar} required>
            {PUESTOS.map((p) => (
              <option key={p.nombre}>{p.nombre}</option>
            ))}
          </select>
          <label htmlFor="empleo-cv">CV (PDF)</label>
          <input id="empleo-cv" type="file" accept=".pdf" required />
          <button className="boton" type="submit">
            Postularme
          </button>
        </form>
      )}
    </Ventana>
  );
};

/**
 * Muestra la ventana que esté abierta según modales.ventana. Si no hay ninguna, no dibuja nada.
 * @method Ventanas
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas (vienen de App)
 * @param {Array<Object>} [props.stockInicio] - Solo en el Inicio: los autos del bloque de stock
 * @return {JSX.Element}
 */
const Ventanas = ({ modales, stockInicio }) => (
  <>
    {modales.ventana === 'stock' && <VentanaStock modales={modales} stockInicio={stockInicio} />}
    {modales.ventana === 'modelos' && <VentanaModelos modales={modales} stockInicio={stockInicio} />}
    {modales.ventana === 'service' && <VentanaService modales={modales} />}
    {modales.ventana === 'accesorios' && <VentanaAccesorios modales={modales} />}
    {modales.ventana === 'telefono' && <VentanaTelefono modales={modales} />}
    {modales.ventana === 'contacto' && <VentanaContacto modales={modales} />}
    {modales.ventana === 'empleo' && <VentanaEmpleo modales={modales} />}
  </>
);

export default Ventanas;
