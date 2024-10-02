import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Autos Tandil</a>
      </div>
      <div className="navbar-links">
        <a href="/">Inicio</a>
        <a href="/Alquilar">Alquilar</a>
        <a href="/Comprar">Comprar</a>
      </div>
    </nav>
  );
};

export default Navbar;
