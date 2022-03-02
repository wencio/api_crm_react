import React from 'react'
import {Formik, Form, Field } from 'formik'
import { useNavigate }  from 'react-router-dom'
import * as yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {
    const navigate =  useNavigate()

    const  nuevoClienteSchema = yup.object().shape({
        nombre: yup.string()
                    .required('El nombre del cliente es obligatorio')
                    .min(3,'El nombre es muy corto')
                    .max (20, 'El nombre es muy largo'),
        empresa: yup.string()
                            .required('El nombre de la empresa es obligatorio'),
        email: yup.string()
                         .required('El email es obligatorio')
                         .email ('Email no valido'),
         telefono: yup.number()
                        .positive('Numero no es valido')
                        .integer('Numero no es valido')
                        .typeError ('El numero no es valido')                               
       
        })
    


    const handleSubmit = async (values) => {
        try {
            let respuesta 
          if (cliente.id){
              // Editando un registro 
              console.log ('editando')
              const url = `http://localhost:4000/clientes/${cliente.id}`
               respuesta = await fetch(url, {method: 'PUT',
                                          body: JSON.stringify(values),
                                          headers:{ 
                                          'Content-Type': 'application/json'
                                          }})                             
              

          }else{
              console.log ('entrando a anadir clientes ')
            const url = 'http://localhost:4000/clientes'
            respuesta = await fetch(url, {method: 'POST',
                                        body: JSON.stringify(values),
                                        headers:{ 
                                        'Content-Type': 'application/json'
                                        }})  
                                    }                                                       
            const resultado = await respuesta.json()
            console.log ('anadiendo cliente ')
            navigate('/clientes')
                                      
        }catch (error){
            console.log(error)
    }

    }
        

  return (

    cargando? <Spinner />:
    (
    < div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w 3/4 mx-auto">
        <h1 className ="text-gray-600 font-bold text-xl uppercase text-center"> 
        {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} </h1> 
        
        <Formik initialValues ={{
                nombre: cliente?.nombre ?? "",
                empresa: cliente?.empresa ?? "",
                email: cliente?.email ?? "" ,
                telefono: cliente?.telefono ?? "",
                notas: cliente?.notas ?? "",

        }}
        enableReinitialize={true}

         onSubmit  = {async (values, {resetForm})=> {
             await handleSubmit(values)
             resetForm() }}
         validationSchema = {nuevoClienteSchema}
        >
            { ({errors, touched}) => {
                console.log(touched)
                return (
            <Form className = "mt-10" >
                <div className="mb-4" >
                    <label className ="text-gray-800" htmlFor = "nombre">Nombre:</label>
                    <Field id="nombre" type ="texto" className ="mt-2 block w-full p-3 bg-gray-200"
                    placeholder = "Nombre del Cliente" name="nombre"/>
                    {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre} </Alerta>
                    ) : null }
                </div>
                <div className="mb-4" >
                    <label className ="text-gray-800" htmlFor = "empresa">Empresa:</label>
                    <Field id="empresa" type ="texto" className ="mt-2 block w-full p-3 bg-gray-200"
                    placeholder = "Empresa del cliente" name="empresa"/>
                    {errors.empresa && touched.empresa ? (
                        <Alerta>{errors.empresa} </Alerta>
                    ) : null }
                </div>
                <div className="mb-4" >
                    <label className ="text-gray-800" htmlFor = "email">E-mail:</label>
                    <Field id="email" type ="email" className ="mt-2 block w-full p-3 bg-gray-200"
                    placeholder = "Email del Cliente" name="email"/>
                     {errors.email && touched.email ? (
                        <Alerta>{errors.email} </Alerta>
                    ) : null }
                </div>
                <div className="mb-4">
                    <label className ="text-gray-800" htmlFor = "telefono">Telefono:</label>
                    <Field id="telefono" type ="telefono" className ="mt-2 block w-full p-3 bg-gray-200"
                    placeholder = "Telefono del Cliente" name="telefono"/>
                      {errors.telefono && touched.telefono ? (
                        <Alerta>{errors.telefono} </Alerta>
                    ) : null }
                </div>
                <div className="mb-4" >
                    <label className ="text-gray-800" htmlFor = "notas">Notas:</label>
                    <Field as="textarea" id="notas" type ="text" className ="mt-2 block w-full p-3 bg-gray-200 h-40"
                    placeholder = "Notas del Cliente" name="notas"/>
                </div>

                <input type = "submit" value ={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className = "mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"/>
            </Form>

            )}}
        </Formik>
        
    </div>
  ))

// funcionan como parametros por default si los props no estan presenten toma estos por defecto

  Formulario.defaultProps = {
      cliente: {},
      cargando : false 
  }
}

export default Formulario