import React from 'react';
import './Navbar.css';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img className="logoNavbar" src={logo} alt="Logo" />
        <a className="textoLogo" href="/">TuAutoFacil</a>
      </div>
      <div className="navbar-links">
        <Link to="/agregarauto">Agregar un Auto</Link>
      </div>
    </nav>
  );
};

export default Navbar;
