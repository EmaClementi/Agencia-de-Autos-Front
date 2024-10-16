import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaDeAutosTarjetas.css';
import FiltroAutos from './FiltroAutos';
import Boton from './Boton';

function ListaDeAutosTarjetas() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [tipo, setTipo] = useState('');
  const [sort, setSort] = useState('');

  const navigate = useNavigate();

  const fetchAutos = async (params) => {
    try {
      const response = await fetch(`http://localhost:3000/api/autos?${params}`);
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

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (tipo) params.append('tipo', tipo);
    if (sort) params.append('sort', sort);

    fetchAutos(params.toString());
  };

  const handleRedirect = (autoId, tipoTransaccion) => {
    navigate('/formulariocliente', { state: { autoId, tipoTransaccion } });
  };

  useEffect(() => {
    fetchAutos('');
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="autos-container">
      <FiltroAutos
        search={search}
        setSearch={setSearch}
        tipo={tipo}
        setTipo={setTipo}
        sort={sort}
        setSort={setSort}
        onFilter={handleFilter}
      />

      <div className="card-list">
        {autos.map((auto) => {
          // Log para verificar qué valor tiene el status
          console.log('Estado del auto:', auto.status);

          const noDisponible = auto.status === 'vendido' || auto.status === 'alquilado';

          return (
            <div
              key={auto._id}
              className={`card ${noDisponible ? 'no-disponible' : ''}`}
            >
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

              {noDisponible ? (
                <p className="no-disponible-texto">No disponible</p>
              ) : (
                <Boton
                  texto={auto.tipo === 'compra' ? 'Comprar' : 'Alquilar'}
                  estilo="botonAccion"
                  onClick={() => handleRedirect(auto._id, auto.tipo)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListaDeAutosTarjetas;
