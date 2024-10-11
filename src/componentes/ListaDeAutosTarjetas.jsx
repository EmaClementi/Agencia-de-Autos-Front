import React, { useState, useEffect } from 'react';
import './ListaDeAutosTarjetas.css';
import FiltroAutos from './FiltroAutos';

function ListaDeAutosTarjetas() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [tipo, setTipo] = useState(''); // Nuevo estado para el tipo de auto
  const [sort, setSort] = useState(''); // Estado para el orden de precio

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const params = new URLSearchParams();
        if (search) {
          params.append('search', search);
        }
        if (tipo) {
          params.append('tipo', tipo); // Enviar el tipo como parámetro a la URL
        }
        if (sort) {
          params.append('sort', sort); // Enviar el orden de precio como parámetro
        }

        const response = await fetch(`http://localhost:3000/api/autos?${params.toString()}`);
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
  }, [search, tipo, sort]); // Recargar cuando search, tipo o sort cambien

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="autos-container">
      {/* Filtro de autos */}
      <FiltroAutos
        search={search}
        setSearch={setSearch}
        tipo={tipo}
        setTipo={setTipo}
        sort={sort}
        setSort={setSort}
      />

      {/* Lista de autos */}
      <div className="card-list">
        {autos.map((auto) => (
          <div key={auto.id} className="card">
            <div className="image-container">
              <img
                src={auto.imagenes[0]}
                alt={`Imagen de ${auto.modelo}`}
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h2 className="card-title">{auto.modelo}</h2>
              <p className="card-marca">Marca: {auto.marca}</p>
              <p className="card-año">Año: {auto.año}</p>
              <p className="card-tipo">Tipo: {auto.tipo}</p>
              <p className="card-precio">Precio: ${auto.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaDeAutosTarjetas;
