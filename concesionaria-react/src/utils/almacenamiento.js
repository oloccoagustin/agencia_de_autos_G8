// Funciones para guardar y leer datos en el localStorage del navegador.
// Van con try/catch porque el localStorage puede estar bloqueado (modo incógnito, permisos).

export const CLAVE_BUSQUEDAS = 'carpoint_busquedas';
export const CLAVE_SUCURSAL = 'carpoint_sucursal';
export const CLAVE_DATOS = 'carpoint_datos';

/**
 * Lee un valor guardado en el localStorage y lo convierte de JSON.
 * @method leerLocal
 * @param {string} clave - Nombre con el que se guardó el dato
 * @param {*} porDefecto - Valor que se devuelve si no hay nada guardado o hay un error
 * @return {*} El dato guardado o el valor por defecto
 */
export const leerLocal = (clave, porDefecto) => {
  try {
    const texto = localStorage.getItem(clave);
    return texto === null ? porDefecto : JSON.parse(texto);
  } catch {
    return porDefecto;
  }
};

/**
 * Guarda un valor en el localStorage (convertido a JSON).
 * @method guardarLocal
 * @param {string} clave - Nombre con el que se guarda el dato
 * @param {*} valor - Dato a guardar
 * @return {void}
 */
export const guardarLocal = (clave, valor) => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Si el navegador no deja guardar, la página sigue funcionando igual
  }
};

/**
 * Borra un valor del localStorage.
 * @method borrarLocal
 * @param {string} clave - Nombre del dato a borrar
 * @return {void}
 */
export const borrarLocal = (clave) => {
  try {
    localStorage.removeItem(clave);
  } catch {
    // Si el navegador no deja borrar, no pasa nada
  }
};

/**
 * Lee los datos de contacto que el usuario cargó en un formulario anterior.
 * @method leerDatosUsuario
 * @return {Object} Datos guardados (nombre, apellido, email, celular, etc.) o un objeto vacío
 */
export const leerDatosUsuario = () => {
  const datos = leerLocal(CLAVE_DATOS, {});
  return datos && typeof datos === 'object' ? datos : {};
};

/**
 * Guarda los datos de contacto del usuario para completar solos los próximos formularios.
 * Solo se guardan los campos que tienen algo escrito.
 * @method guardarDatosUsuario
 * @param {Object} nuevos - Datos del formulario recién enviado
 * @return {void}
 */
export const guardarDatosUsuario = (nuevos) => {
  const datos = leerDatosUsuario();
  Object.entries(nuevos).forEach(([campo, valor]) => {
    if (typeof valor === 'string' && valor.trim() !== '') datos[campo] = valor.trim();
  });
  guardarLocal(CLAVE_DATOS, datos);
};

const CAMPOS_PERSONALES = ['nombre', 'apellido', 'dni', 'celular', 'email', 'provincia', 'ciudad'];

/**
 * Arma los valores iniciales de los datos personales de un formulario, completando
 * con lo que el usuario cargó la última vez (si hay algo guardado).
 * @method datosPersonalesIniciales
 * @return {Object} Un campo por cada dato personal, con lo guardado o vacío
 */
export const datosPersonalesIniciales = () => {
  const guardados = leerDatosUsuario();
  const iniciales = {};
  CAMPOS_PERSONALES.forEach((campo) => {
    iniciales[campo] = typeof guardados[campo] === 'string' ? guardados[campo] : '';
  });
  return iniciales;
};

/**
 * Guarda solo los datos personales de un formulario enviado (no el modelo, fechas, etc.).
 * @method guardarDatosPersonales
 * @param {Object} datos - Todos los datos del formulario
 * @return {void}
 */
export const guardarDatosPersonales = (datos) => {
  const personales = {};
  CAMPOS_PERSONALES.forEach((campo) => {
    personales[campo] = datos[campo];
  });
  guardarDatosUsuario(personales);
};
