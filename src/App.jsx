import './App.css';
import ListaDeAutos from './componentes/ListaDeAutos';
import ListaDeAutosTarjetas from './componentes/ListaDeAutosTarjetas';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormularioCliente from './componentes/FormularioCliente';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/agregarauto" element={<ListaDeAutos />} />
          <Route path="/" element={<ListaDeAutosTarjetas />} />
          <Route path="/listadeautostarjetas" element={<ListaDeAutosTarjetas />} />
          <Route path="/formulariocliente" element={<FormularioCliente />} />
        </Routes>
        <Footer />
      </div>
    </Router>

  );
};

export default App;
