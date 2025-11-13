import React from "react";
import ProjectHolder from "../Projectcomponet/ProjectHolder";
import Searchbar from "../commancomponet/Searchbar";
import ButtonBox from "../commancomponet/ButtonBox";
import CrateProjectDialog from "../dialogbox/CrateProjectDialog";
import {  useDispatch } from "react-redux";
import {
  addProject,
  setChangeInProject,
} from "../../features/Todolist/projectSlice";
import ComponentHider from "../Middelware/ComponentHider";
import { v4 as uuidv4 } from 'uuid';

function Project() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const handelsearch = (e) => {
    setSearch(e.target.value);
  };
  const handelOpenDialog = () => {
    dispatch(
      setChangeInProject({
        id:'',
        title: "",
        description: "",
        manageBy: null,
      })
    );

    setOpenDialog(true);
  };
  const handelCloseDialog = () => {
    setOpenDialog(false);
  };
  const handelsave = () => {
    dispatch(addProject());

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
              title="Create Project"
              onClose={handelCloseDialog}
              onSave={handelsave}
              open={openDialog}
            />
            </ComponentHider>
          </h2>
          <p>Edit and modify the User as you want</p>
          <div style={{ flexGrow: 1 }}></div>

          <hr className="lineofhr" />
        </div>

        <Searchbar handleChange={handelsearch} search={search} />

        <div className="project">
          <ComponentHider ComponentId={14}>
          <ProjectHolder search={search} />
          </ComponentHider>
        </div>
      </div>
    </div>
  );
}

export default Project;
