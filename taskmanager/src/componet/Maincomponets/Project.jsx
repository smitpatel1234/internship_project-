import React from "react";
import ProjectHolder from "../Projectcomponet/ProjectHolder";
import Searchbar from "../commancomponet/Searchbar";
import ButtonBox from "../commancomponet/ButtonBox";
import CrateProjectDialog from "../dialogbox/CrateProjectDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  setChangeInProject,
  setsearchConf
} from "../../features/Todolist/projectSlice";
import ComponentHider from "../Middelware/ComponentHider";
import { showSnackbar} from '../../features/Todolist/snackbarSlice'
import { v4 as uuidv4 } from "uuid";
import Divider from '@mui/material/Divider';

function Project() {
  const currentUser = useSelector(
    (state) => state.currentUserStore.currentUser
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();
  const handelsearch = (value) => {
    dispatch(setsearchConf(value));
  };

  const handelOpenDialog = () => {
    dispatch(
      setChangeInProject({
        id: null,
        title: null,
        description: null,
      })
    );

    setOpenDialog(true);
  };
  const handelCloseDialog = () => {
    setOpenDialog(false);
  };
  const handelsave = () => {
    dispatch(
      addProject({ createdBy: currentUser.id, updateBy: currentUser.id })
    );
    dispatch(
      showSnackbar({
        message: "Project created successfully!",
        severity: "success",
      })
    );

    setOpenDialog(false);
  };
  return (
    <div className="main">
      <div className="taskslide">
        <ComponentHider ComponentId={2}>
          <ButtonBox
            onClickFunction={handelOpenDialog}
            value="+"
            stylename="addbuttonofproject"
          />
        </ComponentHider>
        <div className="overview">
          <h2>
            project
            <ComponentHider ComponentId={3}>
              <CrateProjectDialog
                titleName="Create Project"
                onClose={handelCloseDialog}
                onSave={handelsave}
                open={openDialog}
              />
            </ComponentHider>
          </h2>
          <p>Edit and modify the User as you want</p>
          <div style={{height: '20px'}}></div>

          <Divider />
        </div>

        <Searchbar handleChange={handelsearch}  search={useSelector(state=>state.projectStore.searchconf)}/>

        <div className="project">
          <ComponentHider ComponentId={14}>
            <ProjectHolder />
          </ComponentHider>
        </div>
      </div>
    </div>
  );
}

export default Project;
