import React from "react";
import CreateTaskDialog from "../dialogbox/CreateTaskDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  editTask,
  setChange,
  removeTask,
} from "../../features/Todolist/taskSlice";
import { GET_ASSIGNEES_FOR_PROJECT } from "../../features/Todolist/userAndProjectSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ButtonBox from "../commancomponet/ButtonBox";
import ComponentHider from "../Middelware/ComponentHider";
import DeleteBox from "../dialogbox/DeleteBox";
import { showSnackbar } from "../../features/Todolist/snackbarSlice";

export default function Taskcard({ task, id }) {
  const [EditDialog, setEditDialog] = React.useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.currentUserStore?.currentUser || s.currentUser);
  const project = useSelector((s) =>
    (s.projectStore?.projectList || []).find((p) => p.id === task?.projectId)
  );
  const isProjectManager = !!(currentUser && (project?.manageBy === currentUser.id || project?.createdBy === currentUser.id || currentUser.roleId === 12212));
  const isTaskAssignee = !!(currentUser && task?.assigTo === currentUser.id);
  const canEdit = isProjectManager || isTaskAssignee || (currentUser && currentUser.roleId === 12212);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 1000 : "auto",
  };

  const openDialogbox = async () => {
    await dispatch(setChange({ ...task, id: task.id }));
    setEditDialog(true);
  };
  const [openDelete, setopenDelet] = React.useState(false);

  const handleCloseDelete = () => {
    setopenDelet(false);
  };
  const handleDeleteDailog = (id) => {
    setChange({ id: id });

    setopenDelet(true);
  };
  const handelDelete = () => {

    dispatch(removeTask(task.id));
        dispatch(
      showSnackbar({
        message: "task deleted successfully!",
        severity: "success",
      })
    );
  };
  const  handelTaskEdit = () => {
          dispatch(editTask());
          dispatch(showSnackbar({
        message: "task edited successfully!",
        severity: "success",
      }))
          
          setEditDialog(false);

        }
 const  handelTaskDialog = ()=>{
  setEditDialog(false);

  }
  return (
    <div className="taskcard" ref={setNodeRef} style={style}>
      <div className="tasktitlediv" {...attributes} {...listeners}>
        <p style={{ overflow: "hidden" }}>{task.title}</p>
        <div className="taskstateindicator">
          <div className={`${task.state} titlespoint`}></div>
        </div>
      </div>
      <div className="taskDisDiv">{task.description}</div>

      <div className="task-footer">
        <ComponentHider ComponentId={9}>
          <ButtonBox
            editIcon={true}
            onClickFunction={openDialogbox}
            stylename="cardbutton"
          />
        </ComponentHider>
        <ComponentHider c ComponentId={8}>
          <ButtonBox
            stylename="cardbutton"
            deleteIcon={true}
            onClickFunction={handleDeleteDailog}
            disabled={!canEdit}
          />
        </ComponentHider>
        <span style={{ flexGrow: "1" }} />

        <div className="task-date">
          <i className="fa-regular fa-clock"></i>
          {task.date}
        </div>
      </div>
      <DeleteBox
        open={openDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handelDelete}
      />

      <CreateTaskDialog
        titleName={"Edit Task"}
        open={EditDialog}
        onClose={handelTaskDialog}
        onSave={handelTaskEdit}
        canEdit={canEdit}
      />
    </div>
  );
}
