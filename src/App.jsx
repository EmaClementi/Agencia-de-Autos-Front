import './App.css';
import ListaDeAutos from './componentes/ListaDeAutos';
import ListaDeAutosTarjetas from './componentes/ListaDeAutosTarjetas';
import Navbar from './componentes/Navbar';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <ListaDeAutos />
    </div>
  );
};

export default App;
