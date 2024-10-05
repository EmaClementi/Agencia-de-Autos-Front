import React, { useState, useEffect } from 'react';
import './ListaDeAutosTarjetas.css'; 


function ListaDeAutosTarjetas() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/autos');
        if (!response.ok) {
          throw new Error('Error al cargar los autos');
        }
        const data = await response.json();
        setAutos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAutos();
  }, []); // Se ejecuta una vez al montar el componente

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card-container">
      <div className="card-list">
        {autos.map((auto) => (
          <div key={auto.id} className="card">
            <div className="image-container">
              {/* Mostrar solo la primera imagen y permitir el scroll horizontal */}
              <img
                src={auto.imagenes[0]} // Solo la primera imagen
                alt={`Imagen de ${auto.modelo}`}
                className="card-image"
              />
              {/* Contenedor para las imágenes adicionales */}
              <div className="extra-images">
                {auto.imagenes.slice(1).map((imagenUrl, index) => (
                  <img
                    key={index}
                    src={imagenUrl}
                    alt={`Imagen adicional de ${auto.modelo}`}
                    className="extra-image"
                  />
                ))}
              </div>
            </div>
            <div className="card-content">
              <h2 className="card-title">{auto.modelo}</h2>
              <p className="card-marca">Marca: {auto.marca}</p>
              <p className="card-año">Año: {auto.año}</p>
              <p className="card-precio">Precio: ${auto.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaDeAutosTarjetas;
