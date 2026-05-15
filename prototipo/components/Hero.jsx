// components/Hero.jsx — centrado, video loop
const { useRef: useRefH, useEffect: useEffectH } = React;

function Hero() {
  const videoRef = useRefH(null);
  const [theme, setTheme] = React.useState(() =>
    document.documentElement.getAttribute("data-theme") || "dark"
  );
  useEffectH(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
    };
  }, [theme]);
  React.useEffect(() => {
    const obs = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  return (
    <section className="hero" data-theme-mode={theme}>
      <video
        ref={videoRef}
        className="hero__video"
        src={theme === "light" ? "assets/white-background.mp4" : "assets/banner-loop.mp4"}
        key={theme}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="hero__video-overlay" />

      <div className="hero__eyebrow">
        IA que actúa, no promete
      </div>
      <h1 className="hero__title">
        <em>IA</em> que automatiza tu negocio<br/>
        de extremo a extremo.
      </h1>
      <p className="hero__subtitle">
        Mediciones, agentes y plataformas que resuelven problemas reales.<br/>
        Para PYMEs y equipos con resultados medibles desde el primer mes.
      </p>

      <HeroSearch />
    </section>
  );
}

function HeroSearch() {
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const results = React.useMemo(() => {
    if (!q.trim()) return [];
    const norm = q.toLowerCase().trim();
    return (window.PORTFOLIO || []).filter(p =>
      p.nombre.toLowerCase().includes(norm) ||
      (p.blurb || "").toLowerCase().includes(norm) ||
      (p.categoria || "").toLowerCase().includes(norm) ||
      (p.tipo || "").toLowerCase().includes(norm)
    ).slice(0, 6);
  }, [q]);

  const suggestions = [
    { label: "Prueba PAO", href: "producto.html?id=ajuste-organizacional", kind: "Producto" },
    { label: "CheckSeller", href: "producto.html?id=ventas-b2b", kind: "Producto" },
    { label: "Lo que hacemos", href: "lista.html", kind: "Sección" },
    { label: "Portafolio", href: "lista.html", kind: "Sección" },
    { label: "Lo que pensamos", href: "index.html#pensamos", kind: "Sección" },
  ];

  return (
    <div className="hero-search" ref={wrapRef}>
      <div className="hero-search__field">
        <svg className="hero-search__icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="m12 12 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Busca un producto, servicio o caso de uso…"
          value={q}
          onChange={e => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        <button className="hero-search__btn" type="button" aria-label="Buscar">
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path d="M1 5.5h11M8 1l4 4.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {open && (
        <div className="hero-search__results">
          {q.trim() ? (
            results.length === 0 ? (
              <div className="hero-search__empty">Sin resultados para "{q}"</div>
            ) : results.map(p => (
              <a key={p.id} className="hero-search__result" href={`producto.html?id=${p.id}`}>
                <span className="hero-search__dot" style={{ background: p.color }} />
                <span className="hero-search__name">{p.nombre}</span>
                <span className="hero-search__cat">{p.categoria}</span>
              </a>
            ))
          ) : (
            <>
              <div className="hero-search__suggest-label">Sugerencias</div>
              {suggestions.map((s, i) => (
                <a key={i} className="hero-search__result" href={s.href}>
                  <svg className="hero-search__suggest-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  <span className="hero-search__name">{s.label}</span>
                  <span className="hero-search__cat">{s.kind}</span>
                </a>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
window.Hero = Hero;
