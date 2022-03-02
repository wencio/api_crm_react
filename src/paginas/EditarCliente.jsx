
import Formulario from '../components/Formulario'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


const EditarCliente = () => {
  const  [cliente, setCliente] = useState({})
  const {id} = useParams()

  // Vamos a dar un poco de tiempo para que cargen los datos
  const [cargando,setCargando] = useState(true)
      
  useEffect(()=> {
  
    const obtenerClienteAPI = async () =>{

    try{

      const url = `http://localhost:4000/clientes/${id}`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      setCliente(resultado)

    }catch(error){
      console.log(error)

    }
    // 
    setTimeout( () => {
      setCargando(!cargando)

    },500);

  }   
    obtenerClienteAPI()
  },[])


  return (
    <>
    
    <h1 className='font-black text-4xl text-blue-900'> Editar Cliente </h1>
    <p> Utilize este formulario para editar datos de un cliente</p>

    {cliente?.nombre ? (
        <Formulario 
        cliente ={cliente}
        cargando ={cargando}/>


    ): <p>Cliente ID no valido</p>}
    
    </>
  )
}

export default EditarCliente