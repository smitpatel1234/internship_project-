import React from "react";
import Taskcard from "./Taskcard";
import { useSelector } from "react-redux";
import CreateTaskDialog from "../dialogbox/CreateTaskDialog";
import { addTask, setChange } from "../../features/Todolist/taskSlice";
import { useDispatch } from "react-redux";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { editBoard, removeBoard } from "../../features/Todolist/boardSlice";
export function todaysdate() {
  let now = new Date(Date.now());
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();

  return `${year}-${month}-${day}`;
}
function TaskHolder({ barname, listeners, attributes ,barId }) {
  const tasks = useSelector((state) => state.taskStore.tasks);
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    const newName = prompt("Enter new name:", barId);
    if (newName) {
      dispatch(editBoard({ id: barId, name: newName }));
    }
    setMenuOpen(false);
  };

  const handleDelete = () => {
    dispatch(removeBoard({ id: barId }));

    setMenuOpen(false);
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

  const columnTasks = tasks.filter((task) => task.state === barId);
  const columnTaskIds = columnTasks.map((t) => `task-${t.id}`);

  // Make column droppable for tasks
  const { setNodeRef } = useDroppable({
    id: barId,
  });

  return (
    <div className="taskHolder">
      {/* Column title bar - draggable for column reordering */}
      <div className="titelBar">
        <span {...attributes} {...listeners} style={{ cursor: "grab" }}>
          {barname}
        </span>
        <p className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)}>
          ...
        </p>

        {menuOpen && (
          <div className="popup-menu" ref={menuRef}>
            <button onClick={handleEdit}>✏️ Edit</button>
            <button onClick={handleDelete}>🗑️ Delete</button>
          </div>
        )}
      </div>

      <button className="addTask" onClick={handleOpenDialog}>
        +
      </button>
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
    </div>
  );
}

export default TaskHolder;
