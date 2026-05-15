// app.jsx — wiring para index
function App() {
  const products = window.PORTFOLIO;
  const thoughts = window.THOUGHTS;
  const categories = window.PORTFOLIO_CATEGORIES;

  return (
    <>
      <Navbar activePage="inicio" />
      <Hero />

      <section className="section" id="portafolio">
        <div className="section__label">Lo que hacemos</div>
        <h2 className="section__title">
          Un portafolio de IA aplicada, curado por categoría.
        </h2>
        <p className="section__lede">
          Explora nuestros productos — desde pruebas de medición y agentes de WhatsApp hasta apps de bienestar y dashboards de datos. Cada uno resuelve un problema concreto.
        </p>

        <ProductWall products={products} categories={categories} />
      </section>

      <Thoughts items={thoughts} />

      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
