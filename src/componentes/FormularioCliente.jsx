import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Boton from './Boton';
import './FormularioCliente.css';

const FormularioCliente = () => {
    // Obtener autoId y tipoTransaccion desde la navegación previa (desde listadodeautostarjetas)
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
      console.log('Datos del cliente a enviar:', nuevoCliente);
  
      try {
          // Paso 1: Agregar cliente
          const clienteAgregado = await agregarCliente(nuevoCliente);
  
          // Paso 2: Crear transacción
          const transaccionCreada = await crearTransaccion(clienteAgregado._id, autoId, tipoTransaccion);
  
          // Paso 3: Actualizar estado del auto a "alquilado" o "vendido"
          await actualizarEstadoAuto(autoId, tipoTransaccion);
  
          // Mostrar mensaje de agradecimiento
          setFormSubmitted(true);
  
          // Redirigir después de 3 segundos a la lista de autos
          setTimeout(() => {
              navigate('/listadeautostarjetas');
          }, 3000);
  
          // Resetear el formulario
          resetFormulario();
  
      } catch (error) {
          console.error('Error en el proceso:', error.message);
      }
  };
  
  // Función para agregar cliente
  const agregarCliente = async (clienteData) => {
      const response = await fetch('http://localhost:3000/api/clientes', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(clienteData),
      });
  
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error al agregar el cliente: ${errorData.error || response.statusText}`);
      }
  
      const clienteAgregado = await response.json();
      console.log('Cliente agregado:', clienteAgregado);
      return clienteAgregado;
  };
  
  // Función para crear transacción
  const crearTransaccion = async (clienteId, autoId, tipoTransaccion) => {
      const transaccionResponse = await fetch('http://localhost:3000/api/transacciones', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              cliente: clienteId,
              auto: autoId,
              tipo: tipoTransaccion,
          }),
      });
  
      if (!transaccionResponse.ok) {
          const errorData = await transaccionResponse.json();
          throw new Error(`Error al crear la transacción: ${errorData.error || transaccionResponse.statusText}`);
      }
  
      const transaccionCreada = await transaccionResponse.json();
      console.log('Transacción creada:', transaccionCreada);
      return transaccionCreada;
  };
  
  // Función para actualizar estado del auto
  const actualizarEstadoAuto = async (autoId, tipoTransaccion) => {
    const url = `http://localhost:3000/api/autos/${autoId}/${tipoTransaccion}`;
    console.log('URL de actualización del auto:', url); // Imprime la URL
    const responseAuto = await fetch(url, {
        method: 'PUT',
    });

    if (!responseAuto.ok) {
        const errorData = await responseAuto.json();
        throw new Error(`Error al actualizar el estado del auto: ${errorData.message || responseAuto.statusText}`);
    }
};

  
  // Función para resetear el formulario
  const resetFormulario = () => {
      setNuevoCliente({
          nombre: '',
          apellido: '',
          email: '',
          dni: '',
          telefono: '',
      });
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
        <div className='contenedorCliente'>
            <h1 className='tituloCliente'>¡Completa tus datos para iniciar la compra o alquiler!</h1>
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
