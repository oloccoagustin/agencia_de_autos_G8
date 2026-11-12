import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { STOCK } from '@/data/modelos';
import { SUCURSALES } from '@/data/sucursales';

const CIFRAS = [
  { numero: '+15', texto: 'años en el camino' },
  { numero: String(SUCURSALES.length), texto: 'sucursales en la provincia' },
  { numero: '10', texto: 'marcas para elegir' },
  { numero: String(STOCK.length), texto: 'vehículos nuevos en stock' },
];

const VALORES = [
  {
    titulo: 'Misión',
    texto: 'Ofrecer vehículos de calidad y un asesoramiento honesto, para que cada cliente elija con confianza.',
  },
  {
    titulo: 'Visión',
    texto: 'Ser la concesionaria de referencia del centro del país, reconocida por su atención y su innovación.',
  },
  {
    titulo: 'Valores',
    texto: 'Transparencia, compromiso, pasión por los autos y respeto por el tiempo de cada cliente.',
  },
];

/**
 * Página institucional: quiénes somos, cifras, misión, visión, valores y sucursales.
 * @method Nosotros
 * @return {JSX.Element}
 */
const Nosotros = () => {
  useEffect(() => {
    document.title = 'Acerca de Nosotros | CarPoint';
  }, []);

  return (
    <main className="nosotros">
      {/* PORTADA */}
      <section className="nos-hero">
        <div className="nos-contenedor">
          <span className="nos-etiqueta">CarPoint</span>
          <h1>Acerca de Nosotros</h1>
          <p>
            Somos una concesionaria cordobesa que cree que comprar un auto tiene que ser tan emocionante como manejarlo.
          </p>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="nos-seccion">
        <div className="nos-contenedor nos-dos-columnas">
          <div className="nos-texto">
            <h2>Quiénes somos</h2>
            <p>
              CarPoint nació en Córdoba con una idea simple: que elegir un auto sea una experiencia clara, cercana y sin
              vueltas. Reunimos en un mismo lugar marcas premium, con vehículos 0 Km, usados seleccionados y eléctricos,
              para que cada persona encuentre el que va con su forma de vivir.
            </p>
            <p>
              Hoy acompañamos a nuestros clientes en todo el camino: desde la primera consulta y la prueba de manejo,
              hasta la financiación y el servicio posterior a la entrega.
            </p>
          </div>
          <img className="nos-imagen" src="/ferrari_nosotros.jpg" alt="Ferrari" loading="lazy" />
        </div>
      </section>

      {/* CIFRAS: .map() dibuja una por cada elemento del array */}
      <section className="nos-seccion nos-seccion--oscura">
        <div className="nos-contenedor nos-cifras">
          {CIFRAS.map((c) => (
            <div className="nos-cifra" key={c.texto}>
              <strong>{c.numero}</strong>
              <span>{c.texto}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MISIÓN, VISIÓN Y VALORES */}
      <section className="nos-seccion">
        <div className="nos-contenedor">
          <h2>Lo que nos mueve</h2>
          <div className="nos-tarjetas nos-tarjetas--3">
            {VALORES.map((v) => (
              <article className="nos-tarjeta" key={v.titulo}>
                <h3>{v.titulo}</h3>
                <p>{v.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUCURSALES */}
      <section className="nos-seccion nos-seccion--oscura">
        <div className="nos-contenedor">
          <h2>Nuestras sucursales</h2>
          <p className="nos-subtitulo">Estamos en el corazón de la provincia de Córdoba.</p>
          <div className="nos-tarjetas nos-tarjetas--4">
            {SUCURSALES.map((s) => (
              <article className="nos-tarjeta" key={s.nombre}>
                <h3>{s.nombre}</h3>
                <p>{s.ciudad}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LLAMADO A LA ACCIÓN */}
      <section className="nos-seccion">
        <div className="nos-contenedor nos-cta">
          <h2>¿Listo para encontrar tu próximo auto?</h2>
          <p>Recorré nuestro catálogo, pedí un plan de financiación o reservá una prueba de manejo.</p>
          <div className="nos-botones">
            <Link to="/0km" className="nos-boton">
              Ver vehículos 0 Km
            </Link>
            <Link to="/financiacion" className="nos-boton nos-boton--borde">
              Financiación
            </Link>
            <Link to="/test-drive" className="nos-boton nos-boton--borde">
              Test Drive
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Nosotros;
