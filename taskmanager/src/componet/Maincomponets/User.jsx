import React, { Component } from "react";
import Searchbar from "../commancomponet/Searchbar";
import ButtonBox from "../commancomponet/ButtonBox";
import CreateUserDialogBox from "../dialogbox/CreateUserDialogBox";
import {  useDispatch, useSelector } from "react-redux";
import { addUser,setChangeInUser, setsearchConf} from "../../features/Todolist/userSlice";
import UserHolder from "../usercomponent/UserHolder";
import { showSnackbar} from '../../features/Todolist/snackbarSlice'
import Divider from '@mui/material/Divider';
import ComponentHider from "../Middelware/ComponentHider"
function User() {
  
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();
  
    const handelsearch = (value) => {
    dispatch(setsearchConf(value));
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
          
           <div style={{height: '20px'}}></div>

          <Divider />
        </div>
        <Searchbar handleChange={handelsearch} search={useSelector(state=>state.userStore.searchconf)} />        
        <div className="project">
           <ComponentHider ComponentId={34}>
          <UserHolder  />
          </ComponentHider>
        </div>
      </div>
    </div>
  );
}

export default User;
