import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Definicion de vairables
  const [idLector, setIdLector] = useState("");
  const [nombreLector, setNombreLector] = useState("");
  const [libros, setLibros] = useState([]);
  const [idLibro, setIdLibro] = useState("");
  const [fechaPrestamo, setFechaPrestamo] = useState("");
  const [prestamos, setPrestamos] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
//-------------------------------------------------------------------
//Funciones 
  // Obtener lista de libros al cargar la página
  useEffect(() => {
    axios.get("http://localhost:3001/libros").then((response) => {
      setLibros(response.data);
    }).catch((error) => {
      console.error("Error al obtener la lista de libros:", error);
      setMensajeError("Error al obtener la lista de libros");
    });
  }, []);

  // Registrar un Prestamo
  const registrarPrestamo = () => {
    axios.post("http://localhost:3001/prestamo", {
      idLector: idLector,
      idLibro: idLibro,
      fechaPrestamo: fechaPrestamo,
      devuelto: false
    }).then(() => {
      setMensajeExito("Prestamo registrado con éxito");
      setMensajeError(""); 
      obtenerPrestamos(); 
    }).catch((error) => {
      console.error("Error al registrar el Prestamo:", error);
      setMensajeError(error.response?.data || "Error al registrar el Prestamo");
      setMensajeExito(""); 
    });
  };

  // buscar estudiante por id
  const buscarEstudiantePorNombre = () => {
    axios.get(`http://localhost:3001/estudiante/${nombreLector}`).then((response) => {
      if (response.data) {
        setIdLector(response.data.IdLector);
        setMensajeError("");
      } else {
        alert("Estudiante no encontrado");
        setMensajeError("Estudiante no encontrado");
      }
    }).catch((error) => {
      console.error("Error al buscar estudiante:", error);
      setMensajeError("Error al buscar estudiante");
    });
  };

  // lista de prestamos vigentes
  const obtenerPrestamos = () => {
    axios.get("http://localhost:3001/prestamos").then((response) => {
      setPrestamos(response.data);
    }).catch((error) => {
      console.error("Error al obtener la lista de Prestamos:", error);
      setMensajeError("Error al obtener la lista de Prestamos");
    });
  };
//---------------------------------------------------------------------------
  //returno de las vistas de la apgina
  return (
    <div className="container mt-4">
      <h1>Registro de Prestamos</h1>
      <div className="form-group">
        <label>Nombre del Estudiante:</label>
        <input 
          type="text" 
          className="form-control"
          value={nombreLector}
          onChange={(event) => setNombreLector(event.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={buscarEstudiantePorNombre}>
          Buscar Estudiante
        </button>
      </div>

      <div className="form-group mt-3">
        <label>ID del Estudiante:</label>
        <input 
          type="text" 
          className="form-control"
          value={idLector}
          readOnly
        />
      </div>

      <div className="form-group mt-3">
        <label>Seleccione un Libro:</label>
        <select 
          className="form-control"
          onChange={(event) => setIdLibro(event.target.value)}
        >
          <option value="">Selecciona un libro</option>
          {libros.map((libro) => (
            <option key={libro.IdLibro} value={libro.IdLibro}>
              {libro.Titulo}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mt-3">
        <label>Fecha de Prestamo:</label>
        <input 
          type="date" 
          className="form-control"
          onChange={(event) => setFechaPrestamo(event.target.value)}
        />
      </div>

      <button className="btn btn-success mt-4" onClick={registrarPrestamo}>
        Registrar Prestamo
      </button>

      {mensajeExito && <div className="alert alert-success mt-3">{mensajeExito}</div>}
      {mensajeError && <div className="alert alert-danger mt-3">{mensajeError}</div>}

      <h2 className="mt-5">Lista de Prestamos</h2>
      <button className="btn btn-info mb-3" onClick={obtenerPrestamos}>
        Cargar Prestamos
      </button>
      <ul className="list-group">
        {prestamos.map((prestamo) => (
          <li key={prestamo.IdPrestamo} className="list-group-item">
            {`Prestamo ID: ${prestamo.IdPrestamo}, Estudiante ID: ${prestamo.IdLector}, Libro ID: ${prestamo.IdLibro}, Fecha de Prestamo: ${prestamo.FechaPrestamo}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
