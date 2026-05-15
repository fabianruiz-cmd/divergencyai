// mobile-app.jsx — versión móvil completa (home) — Quiénes va en mobile-quienes.html

const { useState, useEffect, useRef, useMemo } = React;

/* ═══════════════════════════════════════════════════════════════════════
   DRAWER SEARCH — resultados en tiempo real, agrupados, con highlight
   ═══════════════════════════════════════════════════════════════════════ */
function DrawerSearch({ onNavigate }) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const products = window.PORTFOLIO || [];
  const thoughts = window.THOUGHTS || [];

  const SECTIONS = [
    { label: "Portafolio", href: "lista.html?m=1", keywords: "portafolio productos lista todo" },
    { label: "Lo que hacemos", href: "mobile.html#portafolio", keywords: "lo que hacemos productos servicios portafolio" },
    { label: "Lo que pensamos", href: "mobile.html#pensamos", keywords: "lo que pensamos blog podcast" },
    { label: "Quiénes somos", href: "mobile-quienes.html", keywords: "quienes somos equipo nosotros" },
    { label: "Contáctanos", href: "mobile.html#contacto", keywords: "contacto contactar hablar" },
  ];

  const norm = q.toLowerCase().trim();
  const hasQuery = norm.length > 0;

  const productHits = hasQuery
    ? products.filter(p =>
        p.nombre.toLowerCase().includes(norm) ||
        (p.blurb || "").toLowerCase().includes(norm) ||
        (p.categoria || "").toLowerCase().includes(norm) ||
        (p.tipo || "").toLowerCase().includes(norm)
      ).slice(0, 4)
    : [];

  const sectionHits = hasQuery
    ? SECTIONS.filter(s =>
        s.label.toLowerCase().includes(norm) ||
        s.keywords.toLowerCase().includes(norm)
      )
    : [];

  const blogHits = hasQuery
    ? thoughts.filter(t =>
        t.titulo.toLowerCase().includes(norm) ||
        (t.resumen || "").toLowerCase().includes(norm) ||
        (t.etiqueta || "").toLowerCase().includes(norm)
      ).slice(0, 3)
    : [];

  const totalHits = productHits.length + sectionHits.length + blogHits.length;

  const RECOMMENDED = [
    { kind: "Producto", label: "Prueba PAO", href: "producto.html?id=ajuste-organizacional&m=1", color: "#22D3EE" },
    { kind: "Producto", label: "CheckSeller", href: "producto.html?id=ventas-b2b&m=1", color: "#22D3EE" },
    { kind: "Sección", label: "Portafolio", href: "lista.html?m=1" },
    { kind: "Sección", label: "Lo que hacemos", href: "mobile.html#portafolio" },
    { kind: "Sección", label: "Lo que pensamos", href: "mobile.html#pensamos" },
  ];

  const highlight = (text) => {
    if (!hasQuery || !text) return text;
    const idx = text.toLowerCase().indexOf(norm);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="m-drawer-search__mark">{text.slice(idx, idx + norm.length)}</mark>
        {text.slice(idx + norm.length)}
      </>
    );
  };

  return (
    <div className="m-drawer-search">
      <form
        className="m-drawer__search m-drawer-search__form"
        onSubmit={(e) => {
          e.preventDefault();
          if (norm) window.location.href = `lista.html?m=1`;
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar productos, secciones, blogs…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 180)}
        />
        {q && (
          <button
            type="button"
            className="m-drawer-search__clear"
            onClick={() => { setQ(""); inputRef.current?.focus(); }}
            aria-label="Limpiar"
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="m1 1 12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </form>

      {/* Resultados — sólo visibles si el input está activo o hay query */}
      {(focused || hasQuery) && (
      <div className="m-drawer-search__results">
        {!hasQuery ? (
          <>
            <div className="m-drawer-search__group-label">Sugerencias</div>
            {RECOMMENDED.map((r, i) => (
              <a key={i} href={r.href} className="m-drawer-search__item" onClick={onNavigate}>
                {r.color
                  ? <span className="m-drawer-search__dot" style={{ background: r.color }}/>
                  : <svg className="m-drawer-search__icon" width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/><path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                }
                <div className="m-drawer-search__body">
                  <div className="m-drawer-search__name">{r.label}</div>
                  <div className="m-drawer-search__meta">{r.kind}</div>
                </div>
                <svg className="m-drawer-search__arrow" width="11" height="9" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              </a>
            ))}
          </>
        ) : totalHits === 0 ? (
          <div className="m-drawer-search__empty">
            Sin resultados para <strong>"{q}"</strong>
          </div>
        ) : (
          <>
            {productHits.length > 0 && (
              <>
                <div className="m-drawer-search__group-label">Productos <span>{productHits.length}</span></div>
                {productHits.map(p => (
                  <a key={p.id} href={`producto.html?id=${p.id}&m=1`} className="m-drawer-search__item" onClick={onNavigate}>
                    <span className="m-drawer-search__dot" style={{ background: p.color }}/>
                    <div className="m-drawer-search__body">
                      <div className="m-drawer-search__name">{highlight(p.nombre)}</div>
                      <div className="m-drawer-search__meta">{p.categoria} · {p.tipo}</div>
                    </div>
                    <svg className="m-drawer-search__arrow" width="11" height="9" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  </a>
                ))}
              </>
            )}
            {sectionHits.length > 0 && (
              <>
                <div className="m-drawer-search__group-label">Secciones <span>{sectionHits.length}</span></div>
                {sectionHits.map((s, i) => (
                  <a key={i} href={s.href} className="m-drawer-search__item" onClick={onNavigate}>
                    <svg className="m-drawer-search__icon" width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 3h10M2 7h10M2 11h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    <div className="m-drawer-search__body">
                      <div className="m-drawer-search__name">{highlight(s.label)}</div>
                      <div className="m-drawer-search__meta">Navegación</div>
                    </div>
                    <svg className="m-drawer-search__arrow" width="11" height="9" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  </a>
                ))}
              </>
            )}
            {blogHits.length > 0 && (
              <>
                <div className="m-drawer-search__group-label">Blogs <span>{blogHits.length}</span></div>
                {blogHits.map(b => (
                  <a key={b.id} href={`blog.html?id=${b.id}&m=1`} className="m-drawer-search__item" onClick={onNavigate}>
                    {b.thumbnail
                      ? <span className="m-drawer-search__thumb"><img src={b.thumbnail} alt=""/></span>
                      : <svg className="m-drawer-search__icon" width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 2h6l3 3v7H3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none"/></svg>
                    }
                    <div className="m-drawer-search__body">
                      <div className="m-drawer-search__name">{highlight(b.titulo)}</div>
                      <div className="m-drawer-search__meta">{b.etiqueta}</div>
                    </div>
                    <svg className="m-drawer-search__arrow" width="11" height="9" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  </a>
                ))}
              </>
            )}
            {totalHits >= 4 && (
              <a href={`lista.html?m=1`} className="m-drawer-search__see-all" onClick={onNavigate}>
                Ver todos los resultados
                <svg width="13" height="10" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
              </a>
            )}
          </>
        )}
      </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   NAVBAR + DRAWER
   ═══════════════════════════════════════════════════════════════════════ */
function MobileNav({ activePage = "home" }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hacemosOpen, setHacemosOpen] = useState(true);
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("dvg-theme", theme); } catch (e) {}
  }, [theme]);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") || "dark";
      if (t !== theme) setTheme(t);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const categories = window.PORTFOLIO_CATEGORIES || [];

  return (
    <>
      <header className="m-nav">
        <a href="mobile.html" className="m-nav__logo-link" aria-label="Inicio">
          <img src={theme === "light" ? window.__resources.logoDark : window.__resources.logoWhite} alt="Divergency AI" className="m-nav__logo" />
        </a>
        <button
          className="m-nav__hamburger-btn"
          onClick={() => setDrawerOpen(true)}
          aria-label="Menú"
        >
          <span/><span/><span/>
        </button>
      </header>

      {/* Floating hamburger trigger — siempre visible bottom-right */}
      <button
        className="m-fab-menu"
        data-open={drawerOpen}
        onClick={() => setDrawerOpen(o => !o)}
        aria-label={drawerOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={drawerOpen}
      >
        <span className="m-fab-menu__lines" aria-hidden="true">
          <span/><span/><span/>
        </span>
        <span className="m-fab-menu__close" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path d="m1 1 12 12M13 1 1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      <div className="m-drawer" data-open={drawerOpen}>
        <div className="m-drawer__head">
          <img src={theme === "light" ? window.__resources.logoDark : window.__resources.logoWhite} alt="Divergency AI" className="m-nav__logo"/>
          <button
            className="m-drawer__close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Cerrar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="m1 1 12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="m-drawer__body">
          <DrawerSearch onNavigate={() => setDrawerOpen(false)} />

          <a href="mobile.html#top" className="m-drawer__link" data-active={activePage === "home"} onClick={() => setDrawerOpen(false)}>
            Inicio
          </a>

          <button
            className="m-drawer__link m-drawer__link--btn"
            aria-expanded={hacemosOpen}
            onClick={() => setHacemosOpen(o => !o)}
          >
            Lo que hacemos
            <svg width="14" height="14" viewBox="0 0 14 14" style={{ transform: hacemosOpen ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}>
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="m-drawer__sub" data-open={hacemosOpen}>
            {categories.map(c => (
              <a
                key={c.id}
                href="mobile.html#portafolio"
                className="m-drawer__subitem"
                onClick={(e) => {
                  if (activePage === "home") {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('dvg:setCategory', { detail: c.id }));
                    const t = document.getElementById('portafolio');
                    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setDrawerOpen(false);
                  } else {
                    setDrawerOpen(false);
                  }
                }}
              >
                <span>{c.nombre}</span>
                <span className="m-drawer__subitem-count">{c.count}</span>
              </a>
            ))}
          </div>

          <a href="mobile.html#pensamos" className="m-drawer__link" onClick={() => setDrawerOpen(false)}>
            Lo que pensamos
            <svg width="12" height="12" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
          </a>
          <a href="mobile-quienes.html" className="m-drawer__link" data-active={activePage === "quienes"} onClick={() => setDrawerOpen(false)}>
            Quiénes somos
            <svg width="12" height="12" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
          </a>

          <a href="tel:+5713800000" className="m-drawer__cta" onClick={() => setDrawerOpen(false)}>
            <div className="m-drawer__cta-label">
              <small>Hablemos</small>
              <span>Contáctanos</span>
            </div>
            <span className="m-drawer__cta-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
          </a>

          <div className="m-drawer__theme">
            <span>Modo {theme === "dark" ? "oscuro" : "iluminado"}</span>
            <button
              className="m-drawer__theme-btn"
              onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.6 2.6l1.06 1.06M12.34 12.34l1.06 1.06M2.6 13.4l1.06-1.06M12.34 3.66l1.06-1.06" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════ */
function MobileHero() {
  const videoRef = useRef(null);
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") || "dark"
  );
  const searchWrapRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(()=>{}); };
    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    return () => v.removeEventListener("loadeddata", tryPlay);
  }, []);

  // Observa cambios de tema (toggle desde drawer)
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Cierra el dropdown si se toca fuera
  useEffect(() => {
    const onClick = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("touchstart", onClick, { passive: true });
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("touchstart", onClick);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const products = window.PORTFOLIO || [];

  // Resultados filtrados por query
  const results = (q.trim()
    ? products.filter(p =>
        p.nombre.toLowerCase().includes(q.toLowerCase().trim()) ||
        (p.blurb || "").toLowerCase().includes(q.toLowerCase().trim()) ||
        (p.categoria || "").toLowerCase().includes(q.toLowerCase().trim())
      )
    : []
  ).slice(0, 6);

  // Sugerencias recomendadas (cuando no hay query)
  const suggestions = [
    { label: "Prueba PAO", href: "producto.html?id=ajuste-organizacional&m=1", kind: "Producto" },
    { label: "CheckSeller", href: "producto.html?id=ventas-b2b&m=1", kind: "Producto" },
    { label: "Lo que hacemos", href: "lista.html?m=1", kind: "Sección" },
    { label: "Portafolio", href: "lista.html?m=1", kind: "Sección" },
    { label: "Lo que pensamos", href: "mobile.html#pensamos", kind: "Sección" },
  ];

  return (
    <section className="m-hero" id="top" data-theme-mode={theme}>
      <video
        ref={videoRef}
        className="m-hero__video"
        src={theme === "light" ? window.__resources.videoLight : window.__resources.videoDark}
        key={theme}
        autoPlay loop muted playsInline preload="auto"
      />
      <div className="m-hero__overlay"/>
      <div className="m-hero__content">
        <div className="m-hero__eyebrow">IA que actúa, no promete</div>
        <h1 className="m-hero__title">
          <em>IA</em> que automatiza tu negocio de extremo a extremo.
        </h1>
        <p className="m-hero__sub">
          Mediciones, agentes y plataformas con resultados desde el primer mes.
        </p>
        <div className="m-hero__search-wrap" ref={searchWrapRef}>
          <form
            className="m-hero__search"
            onSubmit={(e) => { e.preventDefault(); }}
          >
            <svg className="m-hero__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Busca un producto o caso…"
              value={q}
              onChange={e => { setQ(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
            />
            <button type="submit" className="m-hero__search-btn" aria-label="Buscar">
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                <path d="M1 5.5h11M8 1l4 4.5L8 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          {searchOpen && (
            <div className="m-hero__suggest" role="listbox">
              {q.trim() ? (
                results.length === 0 ? (
                  <div className="m-hero__suggest-empty">Sin resultados para "{q}"</div>
                ) : (
                  results.map(p => (
                    <a
                      key={p.id}
                      href={`producto.html?id=${p.id}&m=1`}
                      className="m-hero__suggest-item"
                    >
                      <span className="m-hero__suggest-dot" style={{ background: p.color }} />
                      <div className="m-hero__suggest-body">
                        <div className="m-hero__suggest-name">{p.nombre}</div>
                        <div className="m-hero__suggest-cat">{p.categoria}</div>
                      </div>
                      <svg className="m-hero__suggest-arrow" width="11" height="9" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                    </a>
                  ))
                )
              ) : (
                <>
                  <div className="m-hero__suggest-label">Sugerencias</div>
                  {suggestions.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      className="m-hero__suggest-item"
                    >
                      <svg className="m-hero__suggest-glyph" width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
                        <path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                      <div className="m-hero__suggest-body">
                        <div className="m-hero__suggest-name">{s.label}</div>
                        <div className="m-hero__suggest-cat">{s.kind}</div>
                      </div>
                      <svg className="m-hero__suggest-arrow" width="11" height="9" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                    </a>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PORTAFOLIO (filtros + carrusel horizontal)
   ═══════════════════════════════════════════════════════════════════════ */
function MobilePortfolio() {
  const products = window.PORTFOLIO || [];
  const categories = window.PORTFOLIO_CATEGORIES || [];
  const [active, setActive] = useState("todos");

  useEffect(() => {
    const onCat = (e) => setActive(e.detail);
    window.addEventListener('dvg:setCategory', onCat);
    return () => window.removeEventListener('dvg:setCategory', onCat);
  }, []);

  const filtered = active === "todos"
    ? products
    : products.filter(p => p.categoria === active);

  return (
    <>
      <div className="m-filters" id="portafolio">
        {categories.map(c => (
          <button
            key={c.id}
            className="m-chip"
            data-active={active === c.id}
            onClick={() => setActive(c.id)}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      <section className="m-section">
        <div className="m-section__label">Portafolio</div>
        <h2 className="m-section__title">IA aplicada, curada por categoría.</h2>
        <p className="m-section__lede">
          Cada producto resuelve un problema concreto. Desliza para explorar.
        </p>

        <div className="m-carousel-meta">
          <span>{filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}</span>
          <a href="lista.html?m=1" className="m-see-all">
            Ver todo
            <svg width="12" height="9" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
          </a>
        </div>

        <div className="m-carousel">
          {filtered.map((p, i) => {
            const num = String(i + 1).padStart(3, '0');
            return (
              <a
                key={p.id}
                href={`producto.html?id=${p.id}&m=1`}
                className="m-card"
                style={{ '--card-color': p.color }}
              >
                <div className="m-card__bg"/>
                {p.image && (
                  <div className="m-card__media">
                    <img src={p.image} alt="" loading="lazy"/>
                  </div>
                )}
                <div className="m-card__top">
                  <span className="m-card__num">{num}</span>
                  <span className="m-card__cat">{p.tipo}</span>
                </div>
                <h3 className="m-card__name">{p.nombre}</h3>
                <div className="m-card__bottom">
                  <p className="m-card__blurb">{p.tagline || p.blurb}</p>
                  <span className="m-card__arrow">
                    <svg width="13" height="10" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PENSAMOS (episodios podcast — card + blog expandible)
   ═══════════════════════════════════════════════════════════════════════ */
function MobileThoughts() {
  const items = window.THOUGHTS || [];

  return (
    <section className="m-section" id="pensamos">
      <div className="m-section__label">Lo que pensamos</div>
      <h2 className="m-section__title">Conversaciones sobre IA, diseño y futuro.</h2>

      <div className="m-pods">
        {items.map((ep, i) => (
          <MobilePod key={ep.id} ep={ep} num={i + 1} />
        ))}
      </div>
    </section>
  );
}

function MobilePod({ ep, num }) {
  return (
    <a
      href={`blog.html?id=${ep.id}&m=1`}
      className="m-pod"
      style={{ '--ep-color': ep.color }}
    >
      <div className="m-pod__thumb">
        <img src={ep.thumbnail} alt={ep.titulo} />
        <div className="m-pod__play">
          <svg width="18" height="18" viewBox="0 0 22 22"><path d="M7 5v12l10-6z" fill="currentColor"/></svg>
        </div>
      </div>
      <div className="m-pod__body">
        <div className="m-pod__meta">
          <span className="m-pod__num">EP·{String(num).padStart(2,'0')}</span>
          <span className="m-pod__tag">{ep.etiqueta}</span>
        </div>
        <h3 className="m-pod__title">{ep.titulo}</h3>
        <p className="m-pod__sum">{ep.resumen}</p>
        <span className="m-pod__expand">
          Leer artículo
          <svg width="11" height="9" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════════════════════ */
function MobileCTA() {
  return (
    <section className="m-cta" id="contacto">
      <h2 className="m-cta__title">¿Tienes un problema que la IA puede resolver?</h2>
      <p className="m-cta__sub">Conversemos. 30 minutos para entender qué tiene sentido construir.</p>
      <a href="#" className="m-cta__btn">
        Te contactamos
        <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FOOTER (solo redes — igual que desktop)
   ═══════════════════════════════════════════════════════════════════════ */
function MobileFooter() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") || "dark"
  );
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return (
    <footer className="m-footer">
      <div className="m-footer__brand">
        <img src={theme === "light" ? window.__resources.logoDark : window.__resources.logoWhite} alt="Divergency AI"/>
      </div>
      <p className="m-footer__tagline">
        IA que actúa, no promete. Soluciones aplicadas para PYMEs y equipos.
      </p>
      <div className="m-footer__social">
        <span className="m-footer__social-label">Síguenos</span>
        <div className="m-footer__social-icons">
          <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3v9ZM6.5 8.7A1.7 1.7 0 1 1 8.2 7a1.7 1.7 0 0 1-1.7 1.7ZM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6S12.6 13 12.6 14.2V19h-3v-9h2.9v1.2h0a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.6 2 3.6 4.7V19Z"/></svg>
          </a>
          <a href="https://wa.me/573000000000" target="_blank" rel="noopener" aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.1 4.9A10 10 0 0 0 3.5 17l-1.4 5.1 5.3-1.4a10 10 0 0 0 4.6 1.2A10 10 0 0 0 19.1 4.9Zm-7.1 15.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.3 8.3 0 1 1 7 3.9Zm4.6-6.2c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3 .4.4 0 0 1 .1-.5l.4-.4.2-.4a.5.5 0 0 0 0-.4l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.5 4 5.6 5.6 0 0 0 1.6.5 4 4 0 0 0 1.7 0 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.4Z"/></svg>
          </a>
        </div>
      </div>
      <div className="m-footer__bottom">
        <span>© Divergency 2025</span>
        <span>Bogotá · Madrid</span>
      </div>
    </footer>
  );
}

window.MobileNav = MobileNav;
window.MobileFooter = MobileFooter;
window.MobileHero = MobileHero;
window.MobilePortfolio = MobilePortfolio;
window.MobileThoughts = MobileThoughts;
window.MobileCTA = MobileCTA;

/* ═══════════════════════════════════════════════════════════════════════
   APP (HOME) — solo monta si no se pidió otra página
   ═══════════════════════════════════════════════════════════════════════ */
function MobileApp() {
  return (
    <div className="m-frame">
      <MobileNav activePage="home" />
      <MobileHero />
      <MobilePortfolio />
      <MobileThoughts />
      <MobileCTA />
      <MobileFooter />
    </div>
  );
}

if (!window.__MOBILE_PAGE__) {
  ReactDOM.createRoot(document.getElementById("root")).render(<MobileApp />);
}
