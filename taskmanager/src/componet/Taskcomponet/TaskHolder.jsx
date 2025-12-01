import React ,{useEffect} from "react";
import Taskcard from "./Taskcard";
import { useSelector } from "react-redux";
import CreateTaskDialog from "../dialogbox/CreateTaskDialog";
import { addTask, setChange } from "../../features/Todolist/taskSlice";
import { useDispatch } from "react-redux";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { changeBoard, removeBoard } from "../../features/Todolist/boardSlice";
import ButtonBox from "../commancomponet/ButtonBox";
import EditTask from "../dialogbox/EditTask";
import MenuItemBox from "../commancomponet/MenuItemBox";
import DeleteBox from "../dialogbox/DeleteBox";
import ComponentHider, { usePermissionChecker } from "../Middelware/ComponentHider";
import { GET_TASK } from "../../features/Todolist/taskSlice";
import { showSnackbar} from '../../features/Todolist/snackbarSlice'
import { MenuItem } from "@mui/material";
import { current } from "@reduxjs/toolkit";
export function todaysdate() {
  let now = new Date(Date.now());
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();

  return `${year}-${month}-${day}`;
}

function TaskHolder({ barname, listeners, attributes, barId ,filterByUser}) {
  const [openDelete, setopenDelet] = React.useState(false);
  const currentUser = useSelector((state) => state.currentUserStore.currentUser);
  const handleCloseDelete = () => {
    setopenDelet(false);
  };
  const handleDeleteDailog = () => {
    setopenDelet(true);
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  
  const tasks = useSelector(state =>GET_TASK(state,filterByUser));
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(changeBoard({ id: barId }));
    
    setOpen(true);

  };
 
  const handleDel = () => {
    dispatch(removeBoard({ id: barId }));
         dispatch(
          showSnackbar({
            message: "Board deleted successfully!",
            severity: "success",
          })
        );

  };

  function onSaveCall() {
    
    dispatch(addTask());
         dispatch(
          showSnackbar({
            message: "task created successfully!",
            severity: "success",
          })
        );
    setOpenDialog(false);

  }

  const handleOpenDialog = () => {
    dispatch(
      setChange({
        id: null,
        title: null,
        state: barId,
        assigTo:currentUser.id,
        description: null,
        date: null,
        files:[], 
      })
    );

    setOpenDialog(true);
  };

  const columnTasks = tasks.filter((task) => task.state === barId  );
  const columnTaskIds = columnTasks.map((t) => `task-${t.id}`);

  const { setNodeRef } = useDroppable({
    id: barId,
  });

  return (
    <div className="taskHolder">
      <div className="titelBar">
        <span {...attributes} {...listeners} style={{ cursor: "grab" ,overflow:"hidden"}}>
          {barname}
        </span>

       {(usePermissionChecker(18) || usePermissionChecker(17)) &&
        <MenuItemBox>
        <MenuItem>
        <ComponentHider ComponentId={18}>
          <ButtonBox
            stylename="menubutton"
            editIcon
            value={"Edit"}
            variant={"outlined"}
            
            onClickFunction={handleEdit}
          />
          </ComponentHider>
          </MenuItem>
          <MenuItem>
          <ComponentHider ComponentId={17}>
          <ButtonBox
            stylename="menubutton"
            deleteIcon
            value={"Delete"}
            variant={"outlined"}
            onClickFunction={handleDeleteDailog}
          />
          </ComponentHider>
           
          </MenuItem>
        </MenuItemBox>}
      </div>
      <ComponentHider ComponentId={7}>
      <button className="addTask" onClick={handleOpenDialog}>
        +
      </button>
      </ComponentHider>
      <div className="taskListSholder" ref={setNodeRef}>
        <SortableContext items={columnTaskIds} id="sortableContextOfTask">
          {columnTasks.map((task, idx) => (
            <Taskcard
              key={`task-${task.id}-${idx}`}
              id={`task-${task.id}`}
              task={task}
            />
          ))}
        </SortableContext>
      </div>
      <CreateTaskDialog
        titleName={"Create Task"}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={onSaveCall}
      />
      <EditTask open={open} onClose={handleClose} title={"Edit"} id={barId} />
      <DeleteBox
        open={openDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handleDel}
      />
    </div>
  );
}

export default TaskHolder;
