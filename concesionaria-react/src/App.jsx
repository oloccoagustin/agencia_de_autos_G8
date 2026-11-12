import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Inicio from '@/pages/Inicio';
import ZeroKm from '@/pages/ZeroKm';
import Usados from '@/pages/Usados';
import Electricos from '@/pages/Electricos';
import Nosotros from '@/pages/Nosotros';
import Concesionarias from '@/pages/Concesionarias';
import Financiacion from '@/pages/Financiacion';
import TestDrive from '@/pages/TestDrive';
import Simulador from '@/pages/Simulador';
import { CLAVE_SUCURSAL, guardarLocal, leerLocal } from '@/utils/almacenamiento';
import { CONCESIONARIOS } from '@/data/formularios';

/**
 * Lee la concesionaria que el usuario eligió en otra visita (localStorage).
 * Si lo guardado no es una sucursal válida, la ignora.
 * @method sucursalGuardada
 * @return {string} Nombre de la sucursal o "" si no hay ninguna elegida
 */
const sucursalGuardada = () => {
  const guardada = leerLocal(CLAVE_SUCURSAL, '');
  return CONCESIONARIOS.includes(guardada) ? guardada : '';
};

/**
 * Componente principal: define las rutas y guarda el estado que comparten varias páginas
 * (la ventana del footer que está abierta y la concesionaria elegida).
 * @method App
 * @return {JSX.Element}
 */
const App = () => {
  const [ventana, setVentana] = useState(null); // "stock", "contacto", "modelos"... o null si no hay ninguna abierta
  const [modeloElegido, setModeloElegido] = useState('');
  const [mensaje, setMensaje] = useState(''); // texto inicial de la ventana de contacto
  const [sucursal, setSucursal] = useState(sucursalGuardada());

  /**
   * Abre una ventana del footer.
   * @method abrir
   * @param {string} nombre - Ventana a abrir ("stock", "modelos", "service", etc.)
   * @return {void}
   */
  const abrir = (nombre) => {
    setMensaje('');
    setVentana(nombre);
  };

  /**
   * Cierra la ventana del footer que esté abierta.
   * @method cerrar
   * @return {void}
   */
  const cerrar = () => setVentana(null);

  /**
   * Abre la ventana de contacto con el mensaje ya escrito.
   * @method consultar
   * @param {string} texto - Producto o vehículo por el que se consulta
   * @return {void}
   */
  const consultar = (texto) => {
    setMensaje(`Hola, quiero consultar por: ${texto}.`);
    setVentana('contacto');
  };

  /**
   * Cambia la concesionaria elegida y la guarda en el localStorage para la próxima visita.
   * @method elegirSucursal
   * @param {string} nombre - Nombre de la sucursal
   * @return {void}
   */
  const elegirSucursal = (nombre) => {
    setSucursal(nombre);
    guardarLocal(CLAVE_SUCURSAL, nombre);
  };

  const modales = { ventana, modeloElegido, mensaje, abrir, cerrar, consultar, elegirModelo: setModeloElegido };
  const concesionaria = { sucursal, elegirSucursal };

  return (
    <Routes>
      {/* El Inicio tiene su propio header (sobre el video), así que va fuera del Layout */}
      <Route path="/" element={<Inicio modales={modales} concesionaria={concesionaria} />} />

      {/* Las demás páginas comparten el Layout (Header + página + Footer) */}
      <Route element={<Layout modales={modales} concesionaria={concesionaria} />}>
        <Route path="/0km" element={<ZeroKm />} />
        <Route path="/usados" element={<Usados />} />
        <Route path="/electricos" element={<Electricos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/concesionarias" element={<Concesionarias concesionaria={concesionaria} />} />
        <Route path="/financiacion" element={<Financiacion />} />
        <Route path="/test-drive" element={<TestDrive />} />
        <Route path="/simulador" element={<Simulador />} />
      </Route>

      {/* Cualquier otra dirección vuelve al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
