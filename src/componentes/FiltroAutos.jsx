import React from 'react';
import './FiltroAutos.css'
function FiltroAutos({ search, setSearch, tipo, setTipo, sort, setSort }) {
  return (
    <div className="search-filter">
      {/* Buscador */}
      <input
        className="buscador"
        type="text"
        placeholder="Buscar por modelo o marca"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filtro por tipo (alquilar o comprar) */}
      <select
        className="selectTipo"
        onChange={(e) => setTipo(e.target.value)}
        value={tipo}
      >
        <option value="">Todos</option>
        <option value="alquiler">Alquiler</option>
        <option value="compra">Compra</option>
      </select>

      {/* Filtro de ordenación por precio */}
      <select
        className="selectOrdenar"
        onChange={(e) => setSort(e.target.value)}
        value={sort}
      >
        <option value="">Ordenar por</option>
        <option value="precio_asc">Precio: Menor precio</option>
        <option value="precio_desc">Precio: Mayor precio</option>
      </select>
    </div>
  );
}

export default FiltroAutos;
