import React from "react";
import CreateTaskDialog from "../dialogbox/CreateTaskDialog";
import { useDispatch } from "react-redux";
import {
  editTask,
  setChange,
  removeTask,
} from "../../features/Todolist/taskSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ButtonBox from '../commancomponet/ButtonBox'
export default function Taskcard({ task, id }) {
  const [EditDialog, setEditDialog] = React.useState(false);
  const dispatch = useDispatch();

  // Make individual task sortable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 1000 : "auto",
  };

  const openDialogbox = () => {
    setEditDialog(true);
    dispatch(setChange({ ...task, id: task.id }));
  };

  return (
    <div className="taskcard" ref={setNodeRef} style={style} >
      {/* Only the title div is draggable */}
      <div className="tasktitlediv" {...attributes} {...listeners}>
        <p style={{ overflow: "hidden" }}>{task.title}</p>
        <div className="taskstateindicator">
          <div className={`${task.state} titlespoint`}></div>
        </div>
      </div>
      <div className="taskDisDiv">{task.description}</div>

      <div className="task-footer">
        <ButtonBox
          editIcon={true}
          onClickFunction={openDialogbox}
          stylename="cardbutton"
        />

        <ButtonBox
          stylename="cardbutton"
          deleteIcon={true}
          onClickFunction={() => dispatch(removeTask(task.id))}
        />
        <span style={{ flexGrow: "1" }} />
        
        <div className="task-date">
          <i className="fa-regular fa-clock"></i>
          {task.date}
        </div>
      </div>

      <CreateTaskDialog
        title={"Edit Task"}
        open={EditDialog}
        onClose={() => {
          setEditDialog(false);
        }}
        onSave={() => {
          dispatch(editTask());
          setEditDialog(false);
        }}
      />
    </div>
  );
}
