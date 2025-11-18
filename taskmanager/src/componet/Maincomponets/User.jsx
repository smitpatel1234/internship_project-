import React, { Component } from "react";
import Searchbar from "../commancomponet/Searchbar";
import ButtonBox from "../commancomponet/ButtonBox";
import CreateUserDialogBox from "../dialogbox/CreateUserDialogBox";
import {  useDispatch } from "react-redux";
import { addUser,setChangeInUser } from "../../features/Todolist/userSlice";
import UserHolder from "../usercomponent/UserHolder";
import { showSnackbar} from '../../features/Todolist/snackbarSlice'

import ComponentHider from "../Middelware/ComponentHider"
function User() {
  
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
    const handelsearch = (value) => {
    setSearch(value);
  };
  const handelOpenDialog = () => {
        dispatch(setChangeInUser({
        username:'',
        email:'',
        password:'',
        roleId:null
        }))
    setOpenDialog(true);
  };
  const handelCloseDialog = () => {
    setOpenDialog(false);
  };
  const handelsave = () => {
    dispatch(addUser());
        dispatch(
      showSnackbar({
        message: "User created successfully!",
        severity: "success",
      }))
    
    setOpenDialog(false);
  };

  return (
    <div className="main">
      <div className="taskslide">
        <ComponentHider ComponentId={32}>
        <ButtonBox
          onClickFunction={handelOpenDialog}
          value="+"
          stylename="addbuttonofproject"
        />
        </ComponentHider>

        <div className="overview">
          <h2>
            User
            <CreateUserDialogBox
              titleName={"Create User"}
              onClose={handelCloseDialog}
              onSave={handelsave}
              open={openDialog}
            />
          </h2>
          <p>Edit and modify the User as you want</p>
          <div style={{ flexGrow: 1 }}></div>
          <hr className="lineofhr" />
        </div>
        <Searchbar handleChange={handelsearch} search={search} />        
        <div className="project">
           <ComponentHider ComponentId={34}>
          <UserHolder search={search} />
          </ComponentHider>
        </div>
      </div>
    </div>
  );
}

export default User;
