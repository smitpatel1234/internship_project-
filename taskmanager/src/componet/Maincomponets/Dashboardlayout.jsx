import React from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
export default function Dashboardlayout() {
  return (
    
    <>
        <Header/>
        <SideBar/>
        <Outlet/>
    </>
  )
}
