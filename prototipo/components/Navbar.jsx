// components/Navbar.jsx — fijo, search bar, scroll-spy, mega-menu con preview por producto
const { useState, useEffect, useRef, useMemo } = React;

function Navbar({ activePage = "inicio" }) {
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") || "dark"
  );
  const [filterHidden, setFilterHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoverProduct, setHoverProduct] = useState(null); // product object or null
  const [hoverCat, setHoverCat] = useState(null);
  const [activeSection, setActiveSection] = useState(activePage);
  const closeTimer = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("dvg-theme", theme); } catch (e) {}
  }, [theme]);

  // Scroll-spy: solo en home (activePage === 'inicio')
  useEffect(() => {
    const onScroll = () => {
      setFilterHidden(window.scrollY > 480);

      if (activePage !== 'inicio') return;
      const sections = [
        { id: 'top', key: 'inicio' },
        { id: 'portafolio', key: 'lista' },
        { id: 'pensamos', key: 'pensamos' },
        { id: 'contacto', key: 'contacto' }
      ];
      const y = window.scrollY + 200;
      let current = 'inicio';
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) current = s.key;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activePage]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setMegaOpen(false); setHoverCat(null); setHoverProduct(null);
    }, 220);
  };

  const categories = window.PORTFOLIO_CATEGORIES || [];
  const products = window.PORTFOLIO || [];

  // Active link helper — pinta el link activo en cyan + underline
  const isActive = (key) => {
    if (activePage !== 'inicio') return activePage === key;
    return activeSection === key;
  };

  // Preview activa
  const visibleCat = hoverCat || (products[0]?.categoria);
  const visibleProduct = hoverProduct ||
    products.find(p => p.categoria === visibleCat) ||
    products[0];
  const visibleCategory = categories.find(c => c.id === visibleCat);

  return (
    <nav className="nav">
      <div className="nav__top">
        <a href="index.html" className="nav__logo" aria-label="Inicio Divergency AI">
          <img src="assets/logo-white.png" alt="Divergency AI" className="nav__logo-img" />
        </a>

        <div className="nav__links">
          <a
            href="index.html"
            className="nav__link"
            data-active={isActive('inicio')}
          >
            Inicio
          </a>

          <div
            className="nav__mega-wrap"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <button
              className="nav__link nav__link--trigger"
              data-active={isActive('lista')}
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen(o => !o)}
            >
              Lo que hacemos
              <svg width="10" height="10" viewBox="0 0 12 12" style={{
                marginLeft: 6,
                transform: megaOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform .25s'
              }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </button>

            <div
              className="nav__mega nav__mega--wide"
              data-open={megaOpen}
              onMouseEnter={openMega}
              onMouseLeave={scheduleCloseMega}
            >
              <div className="nav__mega-grid nav__mega-grid--wide">
                <div className="nav__mega-col">
                  <div className="nav__mega-title">Categorías</div>
                  {categories.filter(c => c.id !== "todos").map(c => (
                    <a
                      key={c.id}
                      href={`index.html#portafolio?cat=${encodeURIComponent(c.id)}`}
                      className="nav__mega-item"
                      data-active={hoverCat === c.id}
                      onMouseEnter={() => {
                        setHoverCat(c.id);
                        setHoverProduct(null);
                      }}
                      onClick={(e) => {
                        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '') {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent('dvg:setCategory', { detail: c.id }));
                          const t = document.getElementById('portafolio');
                          if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          setMegaOpen(false);
                        }
                      }}
                    >
                      <span className="nav__mega-item-name">{c.nombre}</span>
                      <span className="nav__mega-item-count">{c.count}</span>
                    </a>
                  ))}
                </div>

                <div className="nav__mega-col">
                  <div className="nav__mega-title">
                    {visibleCategory ? visibleCategory.nombre : "Productos"}
                  </div>
                  {products
                    .filter(p => p.categoria === visibleCat)
                    .slice(0, 8)
                    .map(p => (
                      <a
                        key={p.id}
                        href={`producto.html?id=${p.id}`}
                        className="nav__mega-item"
                        data-active={hoverProduct?.id === p.id}
                        onMouseEnter={() => setHoverProduct(p)}
                      >
                        <span className="nav__mega-item-dot" style={{ background: p.color }}/>
                        <span className="nav__mega-item-name">{p.nombre}</span>
                      </a>
                    ))}
                </div>

                {/* Preview Adobe-style: por producto */}
                <div
                  className="nav__mega-preview"
                  style={{ '--preview-color': visibleProduct?.color || 'var(--cyan)' }}
                >
                  <div className="nav__mega-preview-media">
                    {visibleProduct?.image ? (
                      <img src={visibleProduct.image} alt="" />
                    ) : (
                      <div className="nav__mega-preview-placeholder">
                        <span className="nav__mega-preview-mono">
                          {visibleProduct?.nombre?.[0] || "·"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="nav__mega-preview-body">
                    <div className="nav__mega-preview-eyebrow">
                      {visibleCategory?.nombre || "Producto"}
                    </div>
                    <div className="nav__mega-preview-title">
                      {visibleProduct?.nombre || "Selecciona un producto"}
                    </div>
                    <p className="nav__mega-preview-blurb">
                      {visibleProduct?.tagline || visibleProduct?.blurb || ""}
                    </p>
                    <div className="nav__mega-preview-actions">
                      {visibleProduct && (
                        <a href={`producto.html?id=${visibleProduct.id}`} className="btn-ghost btn-ghost--sm">
                          Ver producto
                          <svg width="12" height="9" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
                        </a>
                      )}
                      <a href="lista.html" className="nav__mega-preview-link">Ver todo el portafolio →</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            href="index.html#pensamos"
            className="nav__link"
            data-active={isActive('pensamos')}
          >
            Lo que pensamos
          </a>
          <a
            href="quienes-somos.html"
            className="nav__link"
            data-active={isActive('quienes')}
          >
            Quiénes somos
          </a>
        </div>

        <div className="nav__right">
          <SearchBar />
          <button
            className="nav__theme"
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Modo iluminado" : "Modo oscuro"}
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.6 2.6l1.06 1.06M12.34 12.34l1.06 1.06M2.6 13.4l1.06-1.06M12.34 3.66l1.06-1.06" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
            )}
          </button>
          <a href="#contacto" className="nav__cta">
            Te contactamos
            <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>

      {activePage === 'inicio' && (
        <div className="navfilter" data-hidden={filterHidden}>
          <div className="navfilter__inner">
            <span className="navfilter__label">Filtrar por:</span>
            {categories.map(c => (
              <a
                key={c.id}
                href={`#portafolio?cat=${encodeURIComponent(c.id)}`}
                className="navfilter__chip"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('dvg:setCategory', { detail: c.id }));
                  const t = document.getElementById('portafolio');
                  if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {c.nombre} <span className="navfilter__count">{c.count}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function SearchBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const norm = q.toLowerCase().trim();
    return (window.PORTFOLIO || []).filter(p =>
      p.nombre.toLowerCase().includes(norm) ||
      (p.blurb || "").toLowerCase().includes(norm) ||
      (p.categoria || "").toLowerCase().includes(norm) ||
      (p.tipo || "").toLowerCase().includes(norm)
    ).slice(0, 8);
  }, [q]);

  return (
    <div ref={wrapRef} className="nav__search-wrap">
      <div className="nav__search">
        <svg className="nav__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar…"
          value={q}
          onChange={e => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
      </div>
      {open && q.trim() && (
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">Sin resultados para "{q}"</div>
          ) : results.map(p => (
            <a key={p.id} className="search-result" href={`producto.html?id=${p.id}`}>
              <span className="search-result__dot" style={{ background: p.color }} />
              <div>
                <div className="search-result__name">{p.nombre}</div>
              </div>
              <span className="search-result__cat">{p.categoria}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

window.Navbar = Navbar;
