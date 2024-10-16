import React, { useState, useEffect } from 'react';
import Boton from './Boton'; // Asegúrate de que la ruta sea correcta
import './ListaDeAutos.css'; // Archivo CSS con estilos personalizados

const ListaDeAutos = () => {
  const [autos, setAutos] = useState([]);
  const [nuevoAuto, setNuevoAuto] = useState({
    marca: '',
    modelo: '',
    año: '',
    tipo: 'compra',
    precio: '',
    detalles: '',
    imagenes: [],
  });
  const [autoEnEdicion, setAutoEnEdicion] = useState(null);
  const [mostrarDisponibles, setMostrarDisponibles] = useState(false); // Estado para controlar la visibilidad de los autos disponibles

  // Función para obtener la lista de autos al montar el componente
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

  const handleImagenChange = (e) => {
    const { value } = e.target;
    setNuevoAuto((prevState) => ({
      ...prevState,
      imagenes: [...prevState.imagenes, value], // Agregar nueva URL al array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (autoEnEdicion) {
      try {
        const response = await fetch(`http://localhost:3000/api/autos/${autoEnEdicion._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoAuto),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar el auto');
        }

        const autoActualizado = await response.json();
        setAutos((prevAutos) =>
          prevAutos.map((auto) => (auto._id === autoActualizado._id ? autoActualizado : auto))
        );
        setAutoEnEdicion(null);
        setNuevoAuto({
          marca: '',
          modelo: '',
          año: '',
          tipo: 'compra',
          precio: '',
          detalles: '',
          imagenes: [],
        });
      } catch (error) {
        console.error('Error al actualizar el auto:', error);
      }
    } else {
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
          imagenes: [],
        });
      } catch (error) {
        console.error('Error al agregar el auto:', error);
      }
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

      setAutos((prevAutos) => prevAutos.filter((auto) => auto._id !== id));
    } catch (error) {
      console.error('Error al eliminar el auto:', error);
    }
  };

  const editarAuto = (auto) => {
    setNuevoAuto(auto);
    setAutoEnEdicion(auto);
  };
  const marcarComoDisponible = async (autoId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/autos/${autoId}/disponible`, {
        method: 'PUT',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al marcar el auto como disponible: ${errorData.message}`);
      }

      const autoActualizado = await response.json();
      setAutos((prevAutos) =>
        prevAutos.map((auto) => (auto._id === autoActualizado._id ? autoActualizado : auto))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Función para alternar la visibilidad de los vehículos disponibles
  const toggleMostrarDisponibles = () => {
    setMostrarDisponibles(!mostrarDisponibles);
  };

  return (
    <div className="listaDeAutos">
   

      {/* Formulario para agregar un nuevo auto */}
      <form className='formularioCargaAuto' onSubmit={handleSubmit}>
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
          required
        />
        <input
          type="text"
          placeholder="URL de la Imagen"
          onChange={handleImagenChange}
        />
        <Boton texto={autoEnEdicion ? 'Actualizar Auto' : 'Agregar Auto'} estilo="buttonAgregarAuto" />
      </form>

            {/* Botón para mostrar/ocultar vehículos disponibles */}
            <Boton
        texto={mostrarDisponibles ? 'Ocultar Vehículos' : 'Mostrar Vehículos'}
        estilo="botonMostrarDisponibles"
        onClick={toggleMostrarDisponibles}
      />

{mostrarDisponibles && (
        <table className="tablaAutos">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {autos.map((auto) => (
              <tr key={auto._id}>
                <td>{auto.marca}</td>
                <td>{auto.modelo}</td>
                <td>{auto.año}</td>
                <td>{auto.tipo}</td>
                <td>${auto.precio}</td>
                <td>
                  <Boton texto="Editar" estilo="botonEditar" onClick={() => editarAuto(auto)} />
                  <Boton texto="Eliminar" estilo="botonEliminar" onClick={() => eliminarAuto(auto._id)} />

                  {/* Botón para marcar como disponible solo si el auto está alquilado o vendido */}
                  {(auto.status === 'alquilado' || auto.status === 'vendido') && (
                    <Boton
                      texto="Marcar como Disponible"
                      estilo="botonMarcarDisponible"
                      onClick={() => marcarComoDisponible(auto._id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaDeAutos;
