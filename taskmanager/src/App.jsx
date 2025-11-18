import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import './mainscss/scss/main.scss';
import Project from './componet/Maincomponets/Project'
import User from './componet/Maincomponets/User';
import Dashboard from './componet/Maincomponets/Dashboard';
import Login from './componet/Maincomponets/Login';
import DashboardLayout from './componet/Maincomponets/Dashboardlayout';
import Role from './componet/Maincomponets/Role';
import PrivateRoutes from './componet/Middelware/PrivateRoutes'
import { useSelector, useDispatch } from "react-redux";
import AppSnackbar from "./componet/Maincomponets/AppSnackbar";
import { hideSnackbar, selectSnackbar } from "./features/Todolist/snackbarSlice";
export default function App() {
    const dispatch = useDispatch();
    const snackbar = useSelector(selectSnackbar);

  
  return (
    <div className="appclass">
        <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => dispatch(hideSnackbar())}
      />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route  element={<PrivateRoutes />}>
          <Route path="/dashboardlayout" element={<DashboardLayout />}>
          <Route path='role' element={<Role/>}/>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User/>}/>
          <Route path="project" element={<Project/>}/>
        </Route>
          </Route>
        </Routes>
     
    </div>
  );
}
