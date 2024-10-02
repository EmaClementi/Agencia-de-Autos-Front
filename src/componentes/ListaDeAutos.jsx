import React, { useState, useEffect } from 'react';
import Boton from './Boton'; // Asegúrate de que la ruta sea correcta
import './ListaDeAutos.css';

const ListaDeAutos = () => {
  const [autos, setAutos] = useState([]);
  const [nuevoAuto, setNuevoAuto] = useState({
    marca: '',
    modelo: '',
    año: '',
    tipo: 'compra',
    precio: '',
    detalles: '',
    imagenUrl: '',
  });

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/autos');
        const data = await response.json();
        setAutos(data);
      } catch (error) {
        console.error('Error al obtener los autos:', error);
      }
    };
    fetchAutos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoAuto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/autos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoAuto),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el auto');
      }

      const autoAgregado = await response.json();
      setAutos((prevAutos) => [...prevAutos, autoAgregado]);
      setNuevoAuto({
        marca: '',
        modelo: '',
        año: '',
        tipo: 'compra',
        precio: '',
        detalles: '',
        imagenUrl: '',
      });
    } catch (error) {
      console.error('Error al agregar el auto:', error);
    }
  };
  const eliminarAuto = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/autos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el auto');
      }

      // Eliminar el auto del estado
      setAutos((prevAutos) => prevAutos.filter((auto) => auto._id !== id));
    } catch (error) {
      console.error('Error al eliminar el auto:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Autos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={nuevoAuto.marca}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={nuevoAuto.modelo}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="año"
          placeholder="Año"
          value={nuevoAuto.año}
          onChange={handleChange}
          required
        />
        <select name="tipo" value={nuevoAuto.tipo} onChange={handleChange} required>
          <option value="compra">Compra</option>
          <option value="alquiler">Alquiler</option>
        </select>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoAuto.precio}
          onChange={handleChange}
          required
        />
        <textarea
          name="detalles"
          placeholder="Detalles"
          value={nuevoAuto.detalles}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imagenUrl"
          placeholder="URL de la Imagen"
          value={nuevoAuto.imagenUrl}
          onChange={handleChange}
        />
        <Boton texto="Agregar Auto" estilo="buttonAgregarAuto" onClick={handleSubmit} />
      </form>
      <ul>
        {autos.map((auto) => (
          <li className='listaAutos' key={auto._id}>
            {auto.marca} {auto.modelo} ({auto.año}) - ${auto.precio}
            {auto.imagenUrl && (
              <div>
                <img src={auto.imagenUrl} alt={`Imagen de ${auto.marca} ${auto.modelo}`} width="150" />
              </div>
            )}
            <Boton texto="Eliminar" estilo="buttonEliminar" onClick={() => eliminarAuto(auto._id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDeAutos;
