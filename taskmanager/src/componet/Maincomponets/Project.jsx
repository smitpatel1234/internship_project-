import React from "react";
import ProjectHolder from "../Projectcomponet/ProjectHolder";
import Searchbar from "../commancomponet/Searchbar";
import Listview from "../commancomponet/Listview";
import ButtonBox from "../commancomponet/ButtonBox";
import CrateProjectDialog from "../dialogbox/CrateProjectDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  addProject,
  setChangeInProject,
} from "../../features/Todolist/projectSlice";

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
            Project
            <CrateProjectDialog
              title="Create Project"
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
          <ProjectHolder search={search} />
        </div>
      </div>
    </div>
  );
}

export default Project;
