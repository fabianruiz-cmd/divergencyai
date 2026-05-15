// mobile-quienes-app.jsx — página móvil "Quiénes somos"
// Reusa MobileNav y MobileFooter del mobile-app.jsx

const { useState: useStateQ, useEffect: useEffectQ } = React;

function MobileQuienesPage() {
  const photos = ["assets/team-1.png", "assets/team-2.png", "assets/team-3.png", "assets/team-4.png"];
  const [active, setActive] = useStateQ(0);

  useEffectQ(() => {
    const t = setInterval(() => setActive(i => (i + 1) % photos.length), 4500);
    return () => clearInterval(t);
  }, []);

  const pillars = [
    { num: "01", t: "Diseño aplicado", d: "Cada producto resuelve un problema real, validado con usuarios y datos." },
    { num: "02", t: "IA con propósito", d: "Modelos entrenados para contextos específicos, no soluciones genéricas." },
    { num: "03", t: "Operación continua", d: "No entregamos pilotos: lo que construimos se queda funcionando." },
  ];

  const numbers = [
    { v: "20+", l: "productos activos" },
    { v: "7", l: "pruebas de medición" },
    { v: "24/7", l: "agentes operando" },
    { v: "+5 países", l: "usuarios activos" },
  ];

  return (
    <div className="m-frame">
      <MobileNav activePage="quienes" />

      <section className="m-quienes-hero" id="top">
        <div className="m-section__label">Quiénes somos</div>
        <h1 className="m-quienes-hero__title">
          IA aplicada, hecha por <em>personas</em>.
        </h1>
        <p className="m-quienes-hero__lede">
          Un equipo pequeño que diseña inteligencia artificial que se queda funcionando.
        </p>
      </section>

      <section className="m-team-hero">
        <div className="m-team-hero__stage">
          {photos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              data-active={i === active}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ))}
        </div>
        <div className="m-team-hero__thumbs">
          {photos.map((src, i) => (
            <button
              key={src}
              className="m-team-hero__thumb"
              data-active={i === active}
              onClick={() => setActive(i)}
              aria-label={`Foto ${i + 1}`}
            >
              <img src={src} alt="" onError={(e) => { e.target.style.display = 'none'; }}/>
            </button>
          ))}
        </div>
      </section>

      <section className="m-section">
        <div className="m-section__label">Cómo trabajamos</div>
        <h2 className="m-section__title">Tres principios. Cero promesas vacías.</h2>
        <div className="m-pillars">
          {pillars.map(p => (
            <div key={p.num} className="m-pillar">
              <span className="m-pillar__num">{p.num}</span>
              <h3 className="m-pillar__t">{p.t}</h3>
              <p className="m-pillar__d">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="m-section m-section--num">
        <div className="m-section__label">En números</div>
        <h2 className="m-section__title">Lo que llevamos hecho.</h2>
        <div className="m-numbers">
          {numbers.map(n => (
            <div key={n.l} className="m-number">
              <span className="m-number__v">{n.v}</span>
              <span className="m-number__l">{n.l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="m-cta" id="contacto">
        <h2 className="m-cta__title">Trabajemos juntos.</h2>
        <p className="m-cta__sub">¿Una idea? Conversemos en 30 minutos.</p>
        <a href="#" className="m-cta__btn">
          Te contactamos
          <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </section>

      <MobileFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MobileQuienesPage />);
