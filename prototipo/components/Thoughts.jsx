// components/Thoughts.jsx — Cards de podcast con thumbnail real + hover "Ver video" + link a blog
function Thoughts({ items }) {
  return (
    <section className="thoughts" id="pensamos">
      <div className="thoughts__head">
        <div className="thoughts__head-left">
          <div className="section__label">Lo que pensamos</div>
          <h2 className="section__title" style={{ marginBottom: 0 }}>
            Conversaciones sobre IA, diseño y futuro.
          </h2>
        </div>
        <a href="blog.html" className="thoughts__more">
          Ver todos los episodios
          <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      <div className="podgrid">
        {items.map((t, i) => (
          <PodCard key={t.id} ep={t} num={i + 1} />
        ))}
      </div>
    </section>
  );
}

function PodCard({ ep, num }) {
  return (
    <a
      href={`blog.html?id=${ep.id}`}
      className="podcard"
      style={{ '--ep-color': ep.color }}
    >
      <div className="podcard__thumb">
        <img src={ep.thumbnail} alt={ep.titulo} />
        <div className="podcard__overlay">
          <div className="podcard__play">
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M7 5v12l10-6z" fill="currentColor"/></svg>
          </div>
          <span className="podcard__overlay-label">Ver video</span>
        </div>
      </div>
      <div className="podcard__body">
        <div className="podcard__meta">
          <span className="podcard__num">EP·{String(num).padStart(2, '0')}</span>
          <span className="podcard__tag">{ep.etiqueta}</span>
        </div>
        <h3 className="podcard__title">{ep.titulo}</h3>
        <p className="podcard__synopsis">{truncate(ep.resumen, 130)}</p>
        <span className="podcard__cta">
          Leer artículo
          <svg width="11" height="9" viewBox="0 0 14 10"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </a>
  );
}

function truncate(s, n) {
  if (!s || s.length <= n) return s;
  return s.slice(0, n).trimEnd() + '…';
}

window.Thoughts = Thoughts;
