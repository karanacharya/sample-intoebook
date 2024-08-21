import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Alert from './Alert'
// import { useState } from 'react'

function Layout() {
  

  
  return (
    <div>
      <Navbar/>
      <Alert/>
      <Outlet/>
    </div>
  )
}

export default Layout;
