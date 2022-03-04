import {useState,useEffect} from 'react';
import Error from './Error';


const Formulario = ({ pacientes, setPacientes,paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);
  
//Añadiendo useEffect par actualizar
  useEffect(() => {
      if(Object.keys(paciente).length > 0){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
      }
  }, [paciente]);


  //Generando id para Pacientes
  const generarId = () =>{
      const random = Math.random().toString(36).substr(2);
      const fecha = Date.now().toString(36);
      
      return random + fecha
  }

  //Validacion de el formulario
  const handleSubmit = (e) =>{
    e.preventDefault();

    if ([nombre,propietario,email,fecha,sintomas].includes('')) {
      console.log('Hay almenos un campo vacio')
      setError(true)
      return;
    }

    setError(false)

    //objeto de paciente
    const objetoPacientes = {
      nombre,
      propietario,
      email,
      fecha, 
      sintomas,
    }

    if(paciente.id){
      //Editando el registro
      objetoPacientes.id = paciente.id;   
      console.log(objetoPacientes)   
      console.log(paciente)   
      const pacientes_actualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPacientes : pacienteState)

      setPacientes(pacientes_actualizados)
      setPaciente({})
      
    }else{
      //Nuevo registro
      objetoPacientes.id = generarId();      
      //console.log(objetoPacientes)
      setPacientes([...pacientes, objetoPacientes])
    }


    //reinicial el from
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className=" font-black text-3xl text-center" >Seguimiento Pacientes</h2>
      <p className=" text-lg mt-5 mb-5 text-center">
        Añade Pacientes y {' '}
        <span className=" text-indigo-600 font-bold text-lg">Administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}
      className=' bg-white shadow-md rounded-lg py-10 px-5 mb-10'
      >

        {error &&  <Error> 
                      <p>Todos los campos son obligatorios</p>
                </Error>}

        <div className=' mb-5'>
          <label htmlFor='mascota' className=' block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
          <input 
          id='mascota'
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder='Nombre de la mascota'
          className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>

        <div className=' mb-5'>
          <label htmlFor='propietario' className=' block text-gray-700 uppercase font-bold'>Nombre dueño</label>
          <input 
          value={propietario}
          onChange={(e) => setPropietario(e.target.value)}
          id='propietario'
          type="text"
          placeholder='Nombre del dueño'
          className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>

        <div className=' mb-5'>
          <label htmlFor='email' className=' block text-gray-700 uppercase font-bold'>Email del dueño</label>
          <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id='email'
          type="email"
          placeholder='Email contacto propietario'
          className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>

        <div className=' mb-5'>
          <label htmlFor='alta' className=' block text-gray-700 uppercase font-bold'>Fecha de alta</label>
          <input 
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          id='alta'
          type="date"
          className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>

        <div className=' mb-5'>
          <label htmlFor='alta' className=' block text-gray-700 uppercase font-bold'>Síntomas</label>
          <textarea 
          value={sintomas}
          onChange={(e) => setSintomas(e.target.value)}
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"          
          id="sintomas"
          placeholder='Describe los sintomas'
          ></textarea>
        </div>
        <input 
        type="submit"
        className=' bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-700 cursor-pointer transition-all' 
        value={ paciente.id ? 'Editar paciente' : 'Agregar paciente' }
        />
      </form>
    </div>
  )
};

export default Formulario;
