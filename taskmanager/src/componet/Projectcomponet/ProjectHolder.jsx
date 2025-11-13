import React, { useEffect, useState } from "react";
import TableBox from "../commancomponet/TableBox";
import CrateProjectDialog from "../dialogbox/CrateProjectDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  editProject,
  setChangeInProject,
  removeProject,
} from "../../features/Todolist/projectSlice";
import { usePermissionChecker } from "../Middelware/ComponentHider";
import DeleteBox from "../dialogbox/DeleteBox";
import { GET_PROJECTS } from "../../features/Todolist/projectSlice";
import {saveUserAndProjectListChanges,restoreSavedUser } from '../../features/Todolist/userAndProjectSlice'

function ProjectHolder({ search }) {
  const [column, setColumn] = useState([
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
  ]);
  const canEdit = usePermissionChecker(3);
  const canDelete = usePermissionChecker(4);

  useEffect(() => {
    if (canEdit || canDelete) {
      if (!column.some((pre) => pre.title == "action"))
        setColumn((pre) => [
          ...pre,
          {
            title: "action",
            key: "action",
          },
        ]);
    } else setColumn((pre) => pre.filter((s) => s.title !== "action"));
  }, [canEdit, canDelete]);

  const [openDelete, setopenDelet] = React.useState(false);

  const handleCloseDelete = () => {
    setopenDelet(false);
  };
  const handleDeleteDailog = (data) => {
   
    dispatch(setChangeInProject({id:data}));
    setopenDelet(true);
  };
  const [openDialog, setOpenDialog] = React.useState(false);

  const dispatch = useDispatch();

  const temporary_pro = useSelector(GET_PROJECTS);
  const projectList = temporary_pro.filter(
    (project) =>
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.id.toString().toLowerCase().includes(search.toLowerCase()) ||
      project.managebyName.toLowerCase().includes(search.toLowerCase())
  );

  const handelOpenDialog = (data) => {
    dispatch(setChangeInProject(data));
     dispatch(restoreSavedUser())
    setOpenDialog(true);
  };
  const handelCloseDialog = () => {
    dispatch(restoreSavedUser())
    setOpenDialog(false);
  };
  const handelsave = () => {
    dispatch(editProject());
    
    setOpenDialog(false);
  };
  const handelDelete = () => {
    dispatch(removeProject());
    handleCloseDelete();
    
  };

  return (
    <>
      <TableBox
        styleName={"tableofproject"}
        headingdata={column}
        rowdata={projectList}
        editIcon={canEdit}
        deleteIcon={canDelete}
        onEdit={handelOpenDialog}
        onDelete={handleDeleteDailog}
      />

      <CrateProjectDialog
        title={"Edit Project"}
        onClose={handelCloseDialog}
        onSave={handelsave}
        open={openDialog}
      />
      <DeleteBox
        open={openDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handelDelete}
      />
    </>
  );
}

export default ProjectHolder;
