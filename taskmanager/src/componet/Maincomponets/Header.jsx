import { Component } from "react";
import logo from "../../resource/logonav.png";
import profile from "../../resource/prnav.png";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="profile picture" />
      <b>
        <span className="brand-title">AprojectO</span>
      </b>
      <span className="space"> </span>

     
      <div className="profiler">
        <p>
          Amit Aatel
          <small>Location: India</small>
        </p>
      </div>
      <img src={profile} alt="profile picture" />
    </header>
  );
}
