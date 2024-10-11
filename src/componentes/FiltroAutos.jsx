import React from 'react';
import Boton from './Boton';
import './FiltroAutos.css'; 

const FiltroAutos = ({ search, setSearch, tipo, setTipo, sort, setSort, onFilter }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onFilter(); 
    }
  };

  return (
    <form className="search-filter" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Buscar por marca o modelo...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
        className="buscador"
      />
      <select name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className="selectTipo">
        <option value="">Todos</option>
        <option value="alquiler">Alquiler</option>
        <option value="compra">Compra</option>
      </select>
      <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="selectOrdenar">
        <option value="">Ordenar por precio</option>
        <option value="precio_asc">Menor precio</option>
        <option value="precio_desc">Mayor precio</option>
      </select>
      <Boton texto="Buscar" estilo="buttonBuscar" onClick={onFilter} />
    </form>
  );
};

export default FiltroAutos;
