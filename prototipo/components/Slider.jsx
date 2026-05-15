// components/Slider.jsx — CÍRCULOS infinitos, hover crece (1.3x)
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS } = React;

const STEP_X = 150;  // horizontal spacing between column centers
const ROW_Y  = 200;  // vertical spacing between the 2 rows
const SIZE_PATTERN = ["lg", "sm", "md", "lg", "md", "sm"];
const sizeFor = (i) => SIZE_PATTERN[i % SIZE_PATTERN.length];

function positionFor(i) {
  const col = Math.floor(i / 2);
  const rowInCol = i % 2;
  // Alternate vertical offset per column for staggered rhythm
  const yOffset = col % 2 === 0 ? 0 : ROW_Y / 2;
  return {
    left: col * STEP_X + STEP_X,
    top:  rowInCol * ROW_Y + yOffset + 100,
  };
}

const computeLoopWidth = (count) => Math.ceil(count / 2) * STEP_X;

function ProductSlider({ products }) {
  const list = products;
  const doubled = useMemoS(() => [...list, ...list], [list]);

  const trackRef = useRefS(null);
  const railRef = useRefS(null);
  const offsetRef = useRefS(0);
  const loopWidthRef = useRefS(0);
  const pausedRef = useRefS(false);
  const rafRef = useRefS(null);
  const lastTsRef = useRefS(0);
  const dragRef = useRefS({ active: false, startX: 0, startOffset: 0 });

  useEffectS(() => { loopWidthRef.current = computeLoopWidth(list.length); }, [list.length]);

  useEffectS(() => {
    const SPEED = 32;
    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      if (!pausedRef.current && loopWidthRef.current > 0) {
        offsetRef.current -= SPEED * dt;
        if (offsetRef.current <= -loopWidthRef.current) {
          offsetRef.current += loopWidthRef.current;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = 0;
    };
  }, []);

  const handleEnter = () => { pausedRef.current = true; };
  const handleLeave = () => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      if (railRef.current) railRef.current.classList.remove('dragging');
    }
    pausedRef.current = false;
  };
  const handleDown = (e) => {
    dragRef.current.active = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startOffset = offsetRef.current;
    pausedRef.current = true;
    if (railRef.current) railRef.current.classList.add('dragging');
    e.preventDefault();
  };
  const handleMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    let next = dragRef.current.startOffset + dx;
    const w = loopWidthRef.current;
    if (w > 0) {
      while (next <= -w) next += w;
      while (next > 0) next -= w;
    }
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${next}px, 0, 0)`;
    }
  };
  const handleUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    if (railRef.current) railRef.current.classList.remove('dragging');
  };

  useEffectS(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  if (!list.length) return null;
  const loopWidth = computeLoopWidth(list.length);

  return (
    <div className="slider" id="productos" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div className="slider__rail" ref={railRef} onMouseDown={handleDown}>
        <div className="slider__track" ref={trackRef} style={{ width: loopWidth * 2 }}>
          {doubled.map((p, i) => {
            const idx = i < list.length ? i : i - list.length;
            const pos = positionFor(idx);
            const left = i < list.length ? pos.left : pos.left + loopWidth;
            const size = sizeFor(idx);
            return (
              <OrbCell key={`${p.id}-${i}`} product={p} left={left} top={pos.top} size={size} />
            );
          })}
        </div>
      </div>

      <div className="slider__foot">
        <span className="slider__hint">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Arrastra para mover · hover para ver el producto
        </span>
        <span className="slider__hint">{list.length} en el portafolio</span>
      </div>
    </div>
  );
}

function OrbCell({ product, left, top, size }) {
  const initial = product.nombre.charAt(0);
  return (
    <div className="orb-cell" data-size={size} style={{ left, top }}>
      <a
        className="orb"
        href={`producto.html?id=${product.id}`}
        style={{ '--hue': product.color }}
        aria-label={`${product.nombre} — ${product.blurb}`}
      >
        <div className="orb__media" />
        <div className="orb__glyph"><span>{initial}</span></div>
        <div className="orb__reveal">
          <div className="orb__cat">{product.categoria}</div>
          <p className="orb__desc">{product.blurb}</p>
          <div className="orb__name">
            <span className="orb__name-dot" />
            {product.nombre}
          </div>
        </div>
      </a>
    </div>
  );
}

window.ProductSlider = ProductSlider;
