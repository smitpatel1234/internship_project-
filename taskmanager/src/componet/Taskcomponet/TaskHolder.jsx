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
export function todaysdate() {
  let now = new Date(Date.now());
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();

  return `${year}-${month}-${day}`;
}

function TaskHolder({ barname, listeners, attributes, barId ,setTaskStateColumn ,taskStateColumn}) {
  const [openDelete, setopenDelet] = React.useState(false);


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
  const tasks = useSelector(GET_TASK);
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(changeBoard({ id: barId }));
    setOpen(true);

  };
 
  const handleDel = () => {
    dispatch(removeBoard({ id: barId }));

  };

  function onSaveCall() {
    
    dispatch(addTask());
    setOpenDialog(false);

  }

  const handleOpenDialog = () => {
    dispatch(
      setChange({
        id: null,
        title: null,
        state: barId,
        description: null,
        date: todaysdate(),
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
      {/* Column title bar - draggable for column reordering */}
      <div className="titelBar">
        <span {...attributes} {...listeners} style={{ cursor: "grab" ,overflow:"hidden"}}>
          {barname}
        </span>

       {(usePermissionChecker(18) || usePermissionChecker(17)) &&
        <MenuItemBox>
        <ComponentHider ComponentId={18}>
          <ButtonBox
            stylename="tablebutton"
            editIcon
            value={" Edit "}
            variant={"outlined"}
            onClickFunction={handleEdit}
          />
          </ComponentHider>
          <ComponentHider ComponentId={17}>
          <ButtonBox
            stylename="tablebutton"
            deleteIcon
            value={"Delete"}
            variant={"outlined"}
            onClickFunction={handleDeleteDailog}
          />
          </ComponentHider>
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
        title={"Create Task"}
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
