import React from "react";
import "./Footer.css"; // Archivo CSS para estilos

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about">Sobre Nosotros</a>
          <a href="/shop">Tienda</a>
          <a href="/contact">Contacto</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
        <p className="footer-copy">© 2025 Moon store. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;