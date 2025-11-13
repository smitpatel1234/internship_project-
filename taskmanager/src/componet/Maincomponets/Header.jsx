import { Component } from "react";
import logo from "../../resource/logonav.png";
import profile from "../../resource/prnav.png";
import { useSelector ,useDispatch} from "react-redux";
import  ButtonBox from "../commancomponet/ButtonBox"
import {removeCurrentUser} from "../../features/currentUser/currentUserSlice"
export default function Header() {
   const dispatch = useDispatch()
  const currentUser= useSelector((state)=>(state.currentUserStore.currentUser))
  const onChangeHandel = ()=>{
      dispatch(removeCurrentUser())
  }
  return (
    <header className="header">
      <img src={logo} alt="profile picture" />
      <b>
        <span className="brand-title">AprojectO</span>
      </b>
      <span className="space"> </span>

     
      <div className="profiler">
        <p>
          {currentUser.username}
          <small>{currentUser.email}</small>
        </p>
      </div>
      <img src={profile} alt="profile picture" />
      <ButtonBox onClickFunction={onChangeHandel} value={"logout"} size={"small"} variant={"outlined"} stylename={"logout"}/>
      
    </header>
  );
}
