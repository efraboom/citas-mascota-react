import { useState, useEffect } from "react"
//Importando componentes
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerLS = () =>{
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify( paciente ));
  }, [pacientes])

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header /> 
      <div className=" mt-12 md:flex">
      <Formulario 
        pacientes = {pacientes}
        paciente = {paciente}
        setPacientes = {setPacientes}
        setPaciente = {setPaciente}
      />
      <ListadoPacientes
        pacientes = {pacientes}
        setPaciente = {setPaciente}
        eliminarPaciente = {eliminarPaciente}
      />     
      </div>
    </div>
  )
}

export default App

