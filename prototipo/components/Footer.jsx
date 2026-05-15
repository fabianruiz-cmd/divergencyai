// components/Footer.jsx — solo redes sociales con íconos
function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer__grid">
        <div className="footer__brand">
          <a href="index.html" className="footer__logo" aria-label="Inicio Divergency AI">
            <img
              src="assets/logo-white.png"
              alt="Divergency AI"
              className="footer__logo-img"
            />
          </a>
          <p className="footer__tagline">
            IA que actúa, no promete. Soluciones aplicadas para PYMEs, equipos y organizaciones que quieren resultados reales.
          </p>
        </div>

        <div className="footer__social">
          <span className="footer__social-label">Síguenos</span>
          <div className="footer__social-icons">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube" className="footer__social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram" className="footer__social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn" className="footer__social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3v9ZM6.5 8.7A1.7 1.7 0 1 1 8.2 7a1.7 1.7 0 0 1-1.7 1.7ZM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6S12.6 13 12.6 14.2V19h-3v-9h2.9v1.2h0a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.6 2 3.6 4.7V19Z"/></svg>
            </a>
            <a href="https://wa.me/573000000000" target="_blank" rel="noopener" aria-label="WhatsApp" className="footer__social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.1 4.9A10 10 0 0 0 3.5 17l-1.4 5.1 5.3-1.4a10 10 0 0 0 4.6 1.2A10 10 0 0 0 19.1 4.9Zm-7.1 15.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.3 8.3 0 1 1 7 3.9Zm4.6-6.2c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3 .4.4 0 0 1 .1-.5l.4-.4.2-.4a.5.5 0 0 0 0-.4l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.5 4 5.6 5.6 0 0 0 1.6.5 4 4 0 0 0 1.7 0 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.4Z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div>© 2026 Divergency AI</div>
        <div>Términos · Privacidad</div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
