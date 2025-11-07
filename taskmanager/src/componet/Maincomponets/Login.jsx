import React from "react";
import Inputbox from "../commancomponet/Inputbox";
import Buttonbox from "../commancomponet/ButtonBox";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const onClickFunction = () => {
    navigate("/dashboardlayout/dashboard");
  };
  return (
    <div className="login">
      <Inputbox name={"username"} />
      <Inputbox name={"email"} />
      <Buttonbox onClickFunction={onClickFunction} value={"save"} />
    </div>
  );
}
