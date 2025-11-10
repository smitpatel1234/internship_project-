import React, { useState } from "react";
import TableBox from "../commancomponet/TableBox";
import CrateProjectDialog from "../dialogbox/CrateProjectDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  addProject,
  setChangeInProject,
  removeProject,
} from "../../features/Todolist/projectSlice";
import { GET_PROJECTS } from "../../features/Todolist/projectSlice";
const column = [
  {
    title: "id",
    key: "id",
  },
  {
    title: "title",
    key: "title",
  },
  {
    title: "description",
    key: "description",
  },
  {
    title: "manageby",
    key: "managebyName",
  },
  {
    title: "action",
    key: "action",
  },
];

function ProjectHolder({ search }) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const dispatch = useDispatch("");

  const temporary_pro = useSelector(GET_PROJECTS);
   const projectList = temporary_pro.filter(
      (project) =>
        project.title.toLowerCase().includes(search.toLowerCase()) || project.description.toLowerCase().includes(search.toLowerCase()) || project.id.toString().toLowerCase().includes(search.toLowerCase()) || project.managebyName.toLowerCase().includes(search.toLowerCase())
    );

  const handelOpenDialog = (data) => {
    dispatch(setChangeInProject(data));
    setOpenDialog(true);
  };
  const handelCloseDialog = () => {
    setOpenDialog(false);
  };
  const handelsave = () => {
    dispatch(addProject());
    setOpenDialog(false);
  };
  const handelDelete = (id) => {
    dispatch(removeProject(id));
  };
  return (
    <>
      <TableBox
        styleName={"tableofproject"}
        headingdata={column}
        rowdata={projectList}
        editIcon={true}
        deleteIcon={true}
        onEdit={handelOpenDialog}
        onDelete={handelDelete}
      />
      <CrateProjectDialog
        title={'Edit Project'}
        onClose={handelCloseDialog}
        onSave={handelsave}
        open={openDialog}
      />
    </>
  );
}

export default ProjectHolder;
