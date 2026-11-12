import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Estructura que comparten las páginas internas: Header, la página de la ruta y Footer.
 * <Outlet /> es el lugar donde React Router dibuja la página que corresponde a la URL.
 * @method Layout
 * @param {Object} props
 * @param {Object} props.modales - Estado y funciones de las ventanas del footer
 * @param {{sucursal: string, elegirSucursal: function}} props.concesionaria - Concesionaria elegida
 * @return {JSX.Element}
 */
const Layout = ({ modales, concesionaria }) => (
  <>
    <Header concesionaria={concesionaria} />
    <Outlet />
    <Footer modales={modales} />
  </>
);

export default Layout;
