import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from './Boton';
import './FormularioCliente.css'
import { useLocation } from 'react-router-dom';

const FormularioCliente = () => {
    const location = useLocation();
    const { autoId, tipoTransaccion } = location.state || {};

    const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    apellido: '',
    email: '',
    dni: '',
    telefono: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el cliente');
      }

      const clienteAgregado = await response.json();
      console.log('Cliente agregado:', clienteAgregado);


      // Mostrar mensaje de agradecimiento
      const transaccionResponse = await fetch('http://localhost:3000/api/transacciones', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cliente: clienteAgregado._id, 
          auto: autoId, 
          tipo: tipoTransaccion, 
        }),
      });
      console.log('Cliente:', clienteAgregado._id); // Asegúrate de que esto no sea undefined
        console.log('Auto ID:', autoId);
        console.log('Tipo de transacción:', tipoTransaccion);
      if (!transaccionResponse.ok) {
        throw new Error('Error al crear la transacción');
      }
  
      const transaccionCreada = await transaccionResponse.json();
      console.log('Transacción creada:', transaccionCreada);
  
      // Mostrar mensaje de agradecimiento
      setFormSubmitted(true);
      
      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate('/listadeautostarjetas');
      }, 3000);
  
      // Resetear el formulario
      setNuevoCliente({
        nombre: '',
        apellido: '',
        email: '',
        dni: '',
        telefono: '',
      });
    } catch (error) {
      console.error('Error al agregar el cliente o crear la transacción:', error);
    }
  };

  if (formSubmitted) {
    return (
      <div className="mensaje-gracias">
        <h2>Gracias por completar tus datos</h2>
        <p>Pronto nos pondremos en contacto contigo para iniciar los trámites de compra o alquiler del auto.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className='tituloCliente'>Completa tus datos para iniciar la compra o alquiler!</h1>
      <form className="formularioCliente" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoCliente.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={nuevoCliente.apellido}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={nuevoCliente.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="dni"
          placeholder="DNI"
          value={nuevoCliente.dni}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="telefono"
          placeholder="Teléfono"
          value={nuevoCliente.telefono}
          onChange={handleChange}
          required
        />
        <Boton texto="Enviar" estilo="buttonAgregarCliente" />
      </form>
    </div>
  );
};

export default FormularioCliente;
