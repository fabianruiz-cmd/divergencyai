/* eslint-disable */
/** Divergency AI — marketing site components (JSX, Babel‑transpiled). */

const { useState } = React;

// ──────────────────────────────────────────────────────────────────
//  Navigation
// ──────────────────────────────────────────────────────────────────
function Nav({ onCta }) {
  const links = [
    { label: "Lo que hacemos", dropdown: true },
    { label: "Lo que pensamos" },
    { label: "Quiénes somos" },
  ];
  return (
    <nav className="dv-nav">
      <img className="dv-nav__logo" src="../../assets/logos/divergency-logo-wordmark.png" alt="Divergency AI" />
      <div className="dv-nav__links">
        {links.map(l => (
          <a key={l.label} href="#" className="dv-nav__link">
            {l.label}
            {l.dropdown && (
              <svg className="dv-nav__chev" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </a>
        ))}
      </div>
      <button className="dv-btn dv-btn--primary" onClick={onCta}>Te apoyamos</button>
    </nav>
  );
}

// ──────────────────────────────────────────────────────────────────
//  Primitives
// ──────────────────────────────────────────────────────────────────
function Eyebrow({ children, align }) {
  return <div className="dv-eyebrow" style={{ textAlign: align }}>{children}</div>;
}

function IconTile({ src, size = 56 }) {
  return (
    <div className="dv-icon-tile" style={{ width: size, height: size }}>
      <img src={src} alt="" />
    </div>
  );
}

function Glow({ x = 0, y = 0, size = 800, opacity = 0.3 }) {
  return (
    <div className="dv-glow" style={{ left: x, top: y, width: size, height: size, opacity }} />
  );
}

function Button({ children, variant = "primary", size = "md", onClick, trailing }) {
  return (
    <button className={`dv-btn dv-btn--${variant} dv-btn--${size}`} onClick={onClick}>
      <span>{children}</span>
      {trailing && <span className="dv-btn__trailing">{trailing}</span>}
    </button>
  );
}

function LinkArrow({ children, onClick }) {
  return (
    <a className="dv-linkarrow" onClick={onClick}>
      {children}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12.175 9H0V7h12.175L6.575 1.4 8 0l8 8-8 8-1.425-1.4 5.6-5.6z" /></svg>
    </a>
  );
}

// ──────────────────────────────────────────────────────────────────
//  Hero
// ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="dv-hero">
      <Glow x={-300} y={-200} size={900} opacity={0.35} />
      <Glow x="55%" y={80} size={900} opacity={0.25} />
      <h1 className="dv-hero__title">IA que actúa, no promete.<br/>Rompe el patrón, crea el futuro.</h1>
      <p className="dv-hero__lead">
        Descubre soluciones de IA adaptativas diseñadas para evolucionar con tu<br/>
        negocio. No solo automatizamos; transformamos tu capacidad de ejecución.
      </p>
      <div className="dv-hero__ctas">
        <Button>Agendar demo</Button>
        <Button variant="ghost">Explorar soluciones</Button>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────
//  "Quiénes somos" — split with bullets and a pull‑quote
// ──────────────────────────────────────────────────────────────────
function SobreNosotros() {
  return (
    <section className="dv-section">
      <div className="dv-two-col">
        <div>
          <Eyebrow>QUIÉNES SOMOS</Eyebrow>
          <h2 className="dv-h2">Divergency IA:<br/>Donde la ciencia se<br/>convierte en acción.</h2>
          <ul className="dv-bullets">
            <BulletRow title="IA Empresarial" desc="Soluciones de inteligencia artificial diseñadas para escalar su operación comercial." />
            <BulletRow title="Equipos & Staff" desc="Capacitación empresarial para equipos que quieren liderar con IA." />
          </ul>
          <blockquote className="dv-pullquote">"IA que actúa, no promete."</blockquote>
        </div>
        <div className="dv-photo dv-photo--tall" style={{ backgroundImage: "url(../../assets/images/portfolio.jpg)" }} />
      </div>
    </section>
  );
}

function BulletRow({ title, desc }) {
  return (
    <li className="dv-bullet">
      <div className="dv-bullet__icon"><img src="../../assets/icons/check-badge.svg" alt=""/></div>
      <div>
        <div className="dv-bullet__title">{title}</div>
        <div className="dv-bullet__desc">{desc}</div>
      </div>
    </li>
  );
}

// ──────────────────────────────────────────────────────────────────
//  Trusted by band
// ──────────────────────────────────────────────────────────────────
function TrustedBy() {
  const logos = ["AuraCorp", "Mentio", "Nexia", "Primov", "Servicore", "Hyperlane"];
  return (
    <section className="dv-trusted">
      <Eyebrow>CONFÍAN EN NOSOTROS</Eyebrow>
      <div className="dv-trusted__row">
        {logos.map(l => <div key={l} className="dv-trusted__logo">{l}</div>)}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────
//  Product cards ecosystem
// ──────────────────────────────────────────────────────────────────
function Ecosistema() {
  return (
    <section className="dv-section">
      <div className="dv-section__head">
        <Eyebrow align="center">LAS UNIDADES DE POTENCIA</Eyebrow>
        <h2 className="dv-h2 dv-center">Un ecosistema completo para<br/>escalar su organización</h2>
      </div>
      <div className="dv-feature-wide">
        <div className="dv-feature-wide__left">
          <IconTile src="../../assets/icons/ar.svg" />
          <h3 className="dv-h3">Realidad Aumentada Pro</h3>
          <div className="dv-kicker">El futuro en tus manos</div>
          <p className="dv-body">Experiencias inmersivas y soluciones de RA para transformar la interacción con el mundo real.</p>
          <LinkArrow>Ver en Marketplace</LinkArrow>
        </div>
        <div className="dv-feature-wide__right">
          <figure>
            <figcaption>Conoce a Amornia.</figcaption>
            <img src="../../assets/images/amornia.jpg" alt="Amornia"/>
          </figure>
          <figure>
            <figcaption>Descubre nuestro portafolio.</figcaption>
            <img src="../../assets/images/portfolio.jpg" alt="Portafolio"/>
          </figure>
        </div>
      </div>
      <div className="dv-feature-grid">
        <ProductCard icon="../../assets/icons/book.svg"
          title="Formación Pro" kicker="El combustible del equipo"
          desc="Rutas de aprendizaje adaptativo y técnico. Cierre la brecha de conocimiento en IA de su organización."
          bullets={["Certificaciones en IA aplicada", "Workshops y mentorías"]}/>
        <ProductCard icon="../../assets/icons/brain.svg"
          title="SapioLab" kicker="El cerebro de su empresa"
          desc="Diagnóstico de talento con datos reales. Psicometría potenciada con IA para entender a fondo su capital humano."
          bullets={["Análisis de talento organizacional", "Formación adaptativa a medida"]}/>
      </div>
    </section>
  );
}

function ProductCard({ icon, title, kicker, desc, bullets }) {
  return (
    <article className="dv-product">
      <IconTile src={icon} />
      <h3 className="dv-h3">{title}</h3>
      <div className="dv-kicker">{kicker}</div>
      <p className="dv-body">{desc}</p>
      <ul className="dv-mini-bullets">
        {bullets.map(b => <li key={b}><span className="dv-dot"/>{b}</li>)}
      </ul>
      <LinkArrow>Ver en Marketplace</LinkArrow>
      <div className="dv-product__sheen"/>
    </article>
  );
}

// ──────────────────────────────────────────────────────────────────
//  Ética de datos — 60/40 brick grid
// ──────────────────────────────────────────────────────────────────
function EticaDatos() {
  return (
    <section className="dv-section">
      <Glow x={-260} y={60} size={700} opacity={0.28} />
      <div className="dv-section__head">
        <h2 className="dv-h2 dv-center">Garantizamos que su información es<br/>privada y no entrena modelos públicos</h2>
        <p className="dv-lead dv-center">Nuestra arquitectura de IA fue diseñada desde cero con soberanía de datos como principio fundacional, no como un añadido.</p>
      </div>
      <div className="dv-brick">
        <FeatureCard size="lg" icon="../../assets/icons/shield.svg" title="Datos 100% Privados"
          kicker="Su información nunca se comparte ni entrena modelos públicos."
          proof="Implementamos una arquitectura de datos aislada donde cada cliente tiene su propio entorno seguro."/>
        <FeatureCard size="sm" icon="../../assets/icons/lock.svg" title="Cifrado End‑to‑End"
          kicker="Protección de nivel bancario en cada transmisión."
          proof="AES‑256 para datos en reposo y TLS 1.3 para datos en tránsito, gestionados por HSM."/>
        <FeatureCard size="sm" icon="../../assets/icons/eye.svg" title="Auditoría Transparente"
          kicker="Registros completos de cada acceso."
          proof="Cada operación genera registros inmutables con timestamps y usuarios involucrados."/>
        <FeatureCard size="lg" icon="../../assets/icons/check-badge.svg" title="Cumplimiento Normativo"
          kicker="Certificado ISO 27001, SOC 2 y GDPR."
          proof="Auditorías periódicas y alineación con las regulaciones más estrictas del sector financiero."/>
      </div>
    </section>
  );
}

function FeatureCard({ size, icon, title, kicker, proof }) {
  return (
    <article className={`dv-feature dv-feature--${size}`}>
      <IconTile src={icon} />
      <h3 className="dv-h4">{title}</h3>
      <p className="dv-feature__kicker">{kicker}</p>
      <hr className="dv-feature__rule"/>
      <p className="dv-feature__proof">{proof}</p>
    </article>
  );
}

// ──────────────────────────────────────────────────────────────────
//  Pricing
// ──────────────────────────────────────────────────────────────────
function Planes() {
  const [active, setActive] = useState("sapio");
  return (
    <section className="dv-section">
      <div className="dv-section__head">
        <Eyebrow align="center">PLANES Y PRECIOS</Eyebrow>
        <h2 className="dv-h1 dv-center">Inversión que se paga sola</h2>
      </div>
      <div className="dv-pricing">
        <div className="dv-pricing__left">
          <h3 className="dv-h3">{active === "sapio" ? "SapioLab" : "Formación Pro"}</h3>
          <p className="dv-body">{active === "sapio"
            ? "es nuestra plataforma que nos permite tomar decisiones estratégicas basadas en datos, a través de diversas pruebas psicométricas: ventas, vocacional, estilo de liderazgo y potencial de innovación, entre otras."
            : "rutas de aprendizaje adaptativo y técnico. Certificaciones, workshops y mentorías diseñadas para cerrar la brecha de conocimiento en IA."}</p>
          <ul className="dv-mini-bullets">
            {(active === "sapio"
              ? ["Perfil vocacional", "Estilo de liderazgo", "Potencial de innovación", "Decisiones basadas en datos", "Diagnóstico organizacional"]
              : ["Certificación en IA aplicada", "Workshops en vivo", "Mentoría 1:1", "Proyectos finales", "Comunidad de práctica"]
            ).map(t => <li key={t}><span className="dv-dot"/>{t}</li>)}
          </ul>
        </div>
        <div className="dv-pricing__divider">
          <div className="dv-pricing__divider-line"/>
          <div className="dv-pricing__divider-dot">
            <svg width="8" height="12" viewBox="0 0 8 12" fill="#22D3EE"><path d="M4.6 6 0 1.4 1.4 0 7.4 6 1.4 12 0 10.6z"/></svg>
          </div>
        </div>
        <div className="dv-pricing__right">
          <Eyebrow align="center">PAGO POR USO</Eyebrow>
          <div className="dv-price">$11 USD<span>/prueba</span></div>
          <p className="dv-body dv-center">Acceso completo a nuestro motor de IA y reportes ejecutivos automatizados.</p>
          <Button size="lg">Comenzar ahora</Button>
          <div className="dv-pricing__top-line"/>
        </div>
      </div>
      <div className="dv-pricing__tabs">
        {[
          { id: "sapio", label: "SapioLab" },
          { id: "formacion", label: "Formación Pro" },
          { id: "ra", label: "Realidad Aumentada Pro" },
        ].map(t => (
          <button key={t.id}
            className={`dv-tab ${active === t.id ? "is-active" : ""}`}
            onClick={() => setActive(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────
//  Footer
// ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="dv-footer">
      <div className="dv-footer__row">
        <div className="dv-footer__brand">
          <img src="../../assets/logos/divergency-logo-wordmark.png" alt="Divergency AI"/>
          <p>Transformamos organizaciones mediante Inteligencia Artificial adaptativa.</p>
        </div>
        <FootCol title="SOLUCIONES" items={["Marketing IA", "Formación", "Automatización"]} />
        <FootCol title="EMPRESA"    items={["Sobre Nosotros", "Blog", "Carreras"]} />
        <FootCol title="REDES SOCIALES" items={["YouTube", "Instagram", "LinkedIn", "WhatsApp"]} />
      </div>
      <div className="dv-footer__copy">© 2025 Divergency AI. Todos los derechos reservados.</div>
    </footer>
  );
}

function FootCol({ title, items }) {
  return (
    <div>
      <div className="dv-footer__title">{title}</div>
      <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
//  App shell
// ──────────────────────────────────────────────────────────────────
function App() {
  return (
    <div className="dv-root dv">
      <Nav />
      <Hero />
      <SobreNosotros />
      <TrustedBy />
      <Ecosistema />
      <EticaDatos />
      <Planes />
      <Footer />
    </div>
  );
}

Object.assign(window, { App, Nav, Hero, SobreNosotros, Ecosistema, EticaDatos, Planes, Footer, ProductCard, FeatureCard, Button, IconTile, Eyebrow, Glow, LinkArrow });
