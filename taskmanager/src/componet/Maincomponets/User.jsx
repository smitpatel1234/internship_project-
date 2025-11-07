import React from "react";
import Searchbar from "../commancomponet/Searchbar";
import Listview from "../commancomponet/Listview";
import ButtonBox from "../commancomponet/ButtonBox";
import CreateUserDialogBox from "../dialogbox/CreateUserDialogBox";
import { useSelector, useDispatch } from "react-redux";
import { addUser,setChangeInUser } from "../../features/Todolist/userSlice";
import UserHolder from "../usercomponent/UserHolder";
function User() {
  
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
    const handelsearch = (e) => {
    setSearch(e.target.value);
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
    setOpenDialog(false);
  };

  return (
    <div className="main">
      <div className="taskslide">
        <ButtonBox
          onClickFunction={handelOpenDialog}
          value="+"
          stylename="addbuttonofproject"
        />
        <div className="overview">
          <h2>
            Work load
            <CreateUserDialogBox
              title={"Create User"}
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
          <UserHolder search={search} />
        </div>
      </div>
    </div>
  );
}

export default User;
