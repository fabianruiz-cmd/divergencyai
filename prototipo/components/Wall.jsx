// components/Wall.jsx — portafolio "pared de ladrillos"
// - Escucha eventos dvg:setCategory (desde navbar / filter bar)
// - Inicializa desde URL ?cat= o hash
// - Layout sin huecos: 12 columnas, anchos variables por bloque
// - Cada brick: categoría · título corto · descripción corta (peso ligero)

const { useState: useStateW, useEffect: useEffectW, useRef: useRefW, useMemo: useMemoW } = React;

// 12-col layout per row of 3 cards: widths sum to 12. Heights uniform.
// Variants alternate to break monotony.
const ROW_PATTERNS = [
  [5, 4, 3],
  [3, 5, 4],
  [4, 3, 5],
  [4, 4, 4],
];

// Per-card vertical/horizontal layout, cycled.
const CARD_LAYOUTS = [
  { flip: false, layout: null },
  { flip: true,  layout: null },
  { flip: false, layout: "vtop" },
  { flip: true,  layout: null },
  { flip: false, layout: null },
  { flip: false, layout: "vbot" },
];

function ProductWall({ products, categories }) {
  const initialCat = (() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get("cat")) return sp.get("cat");
      const h = window.location.hash || "";
      const m = h.match(/cat=([^&]+)/);
      if (m) return decodeURIComponent(m[1]);
    } catch (e) {}
    return "todos";
  })();

  const [cat, setCat] = useStateW(initialCat);
  const [menuOpen, setMenuOpen] = useStateW(false);
  const [visible, setVisible] = useStateW(true);
  const menuRef = useRefW(null);

  // Listen for category changes coming from Navbar / filter bar
  useEffectW(() => {
    const onSet = (e) => {
      const newCat = e.detail || "todos";
      handleCatChange(newCat);
    };
    window.addEventListener('dvg:setCategory', onSet);
    return () => window.removeEventListener('dvg:setCategory', onSet);
  }, [cat]);

  useEffectW(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleCatChange = (newCat) => {
    if (newCat === cat) { setMenuOpen(false); return; }
    setVisible(false);
    setMenuOpen(false);
    setTimeout(() => {
      setCat(newCat);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, 220);
  };

  const filtered = useMemoW(() => {
    return cat === "todos"
      ? products
      : products.filter(p => p.categoria === cat);
  }, [cat, products]);

  // Split into rows of 3
  const rows = [];
  for (let i = 0; i < filtered.length; i += 3) {
    rows.push(filtered.slice(i, i + 3));
  }

  const activeCat = categories.find(c => c.id === cat) || categories[0];

  // Short title generator: take the most distinctive part of the name
  // (Excel description = blurb; subtítulo en card = blurb completo en peso ligero)
  const shortTitle = (p) => {
    let n = p.nombre;
    n = n.replace(/^Prueba de\s+/i, '');
    n = n.replace(/^Asistente\s+/i, '');
    n = n.replace(/^Diseño de\s+/i, '');
    n = n.replace(/^Sistema de Innovación\s+/i, '');
    n = n.replace(/^Creación de\s+/i, '');
    n = n.replace(/^Consultoría Empresarial\s+/i, 'Consultoría ');
    return n;
  };

  return (
    <>
      <div className="wall-header">
        <div className="wall-dropdown" ref={menuRef}>
          <button
            className="wall-dropdown__btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
          >
            <span className="wall-dropdown__label">Categoría:</span>
            <span className="wall-dropdown__value">{activeCat.nombre}</span>
            <span className="wall-dropdown__count">{activeCat.count}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" style={{
              transform: menuOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform .3s cubic-bezier(.4,0,.2,1)'
            }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="wall-dropdown__panel" data-open={menuOpen}>
            <div className="wall-dropdown__grid">
              {categories.map(c => {
                const sample = c.id === "todos"
                  ? products.slice(0, 3)
                  : products.filter(p => p.categoria === c.id).slice(0, 3);
                return (
                  <button
                    key={c.id}
                    className="wall-dropdown__item"
                    aria-pressed={cat === c.id}
                    onClick={() => handleCatChange(c.id)}
                  >
                    <div className="wall-dropdown__item-head">
                      <span className="wall-dropdown__item-name">{c.nombre}</span>
                      <span className="wall-dropdown__item-count">{c.count}</span>
                    </div>
                    <div className="wall-dropdown__item-samples">
                      {sample.map(p => (
                        <span key={p.id} className="wall-dropdown__sample-dot" style={{ background: p.color }} />
                      ))}
                      <span className="wall-dropdown__item-sample-text">
                        {sample.map(p => p.nombre).join(" · ")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <a href={cat === "todos" ? "lista.html" : `lista.html?cat=${encodeURIComponent(cat)}`} className="wall-header__all">
          Ver todo en lista
          <svg width="12" height="10" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>
        </a>
      </div>

      <div className={`wall ${visible ? 'wall--visible' : 'wall--transitioning'}`}>
        {filtered.map((p, idx) => {
          const num = String(idx).padStart(3, '0');
          return (
            <a
              key={p.id}
              className="tile"
              href={`producto.html?id=${p.id}`}
              style={{ '--hue': p.color }}
            >
              <div className="tile__media">
                {p.image ? (
                  <img src={p.image} alt="" className="tile__img" loading="lazy" />
                ) : (
                  <div className="tile__placeholder">
                    <span className="tile__glyph">{p.nombre.charAt(0)}</span>
                  </div>
                )}
                <div className="tile__scrim" />
              </div>

              <div className="tile__top">
                <span className="tile__num">{num}</span>
                <span className="tile__name">{shortTitle(p)}</span>
              </div>

              {p.tipo && (
                <span className={`tipo-badge tipo-badge--${p.tipo} tile__tipo`}>{p.tipo}</span>
              )}

              <div className="tile__hover">
                <span className="tile__cat">{p.categoria}</span>
                <p className="tile__blurb">{p.blurb}</p>
                <span className="tile__arrow" aria-hidden="true">
                  <svg width="14" height="11" viewBox="0 0 14 10">
                    <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </a>
          );
        })}

        {filtered.length === 0 && (
          <div className="wall__empty">
            Sin productos en esta categoría
          </div>
        )}
      </div>

      <div className="wall__foot">
        <a href={cat === "todos" ? "lista.html" : `lista.html?cat=${encodeURIComponent(cat)}`} className="btn-ghost">
          Ver todo el portafolio ({filtered.length})
          <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        </a>
      </div>
    </>
  );
}

window.ProductWall = ProductWall;
