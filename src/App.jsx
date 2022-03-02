import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'

import NuevoCliente from './paginas/NuevoCLiente'
import EditarCliente from './paginas/EditarCliente'
import VerCliente from './paginas/VerCliente'



function App() {

  console.log(import.meta.env)
  console.log("prueba")


  return (
    <BrowserRouter>
        <Routes >

        
          <Route path ="/clientes" element={<Layout/>}>
                <Route index element={<Inicio/>}/>
                <Route path="nuevo" element={<NuevoCliente/>}/>
                <Route path="editar/:id" element={<EditarCliente/>}/>
                <Route path=":id" element={<VerCliente/>}/>
          </Route>

        </Routes>

    </BrowserRouter>
  )
}

export default App
