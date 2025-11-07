import { Component } from 'react'
import logo from '../../resource/logonav.png'
import profile from '../../resource/prnav.png'

export default function Header() {

    return (
     
        <header className="header">
          <img src={logo} alt="profile picture" />
          <b><span className="brand-title">AprojectO</span></b>
          <span className="space"> </span>

          <div className="search-container">
          <i className="fas fa-search"></i>   
          <input type="search" className="search-input" placeholder="Search..." />
          </div>
          <i className="fa-regular fa-bell" style={{ fontSize: '1.7rem'}}></i>
          <div className="profiler">
               <p>Amit Aatel
               <small>Location: India</small>
               </p>
          </div>
          <img src={profile} alt="profile picture" />
      </header>
      
    )
  
}
