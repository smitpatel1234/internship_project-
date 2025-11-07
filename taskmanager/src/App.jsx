import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import './mainscss/scss/main.scss';
import Project from './componet/Maincomponets/Project'
import User from './componet/Maincomponets/User';
import Dashboard from './componet/Maincomponets/Dashboard';
import Login from './componet/Maincomponets/Login';
import DashboardLayout from './componet/Maincomponets/Dashboardlayout';
import Role from './componet/Maincomponets/Role';
export default function App() {
  return (
    <div className="appclass">
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboardlayout" element={<DashboardLayout />}>
          <Route path='role' element={<Role/>}/>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User/>}/>
          <Route path="project" element={<Project/>}/>
         
          </Route>
            
        </Routes>
     
    </div>
  );
}
