import { useEffect, useState  } from "react";
import TaskHolder from "../Taskcomponet/TaskHolder";
import {
  changeStatus,
  moveTask,
  setChange,
} from "../../features/Todolist/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableTaskHolder from "../Middelware/SortableTaskHolder";
import Taskcard from "../Taskcomponet/Taskcard";
import InputTextInDialog from "../dialogbox/InputTextInDialog";
import { addBoard, changeBoard } from "../../features/Todolist/boardSlice";

function Dashboard() {
  const dispatch = useDispatch();

  //  Redux states
  const tasks = useSelector((state) => state.taskStore.tasks);
  const task = useSelector((state) => state.taskStore.task);
  const boards = useSelector((state) => state.boardStore.boardList);
  const projectList = useSelector((state) =>
    state.projectStore.projectList.map((project) => ({
      id: project.id,
      name: project.title,
    }))
  );

  //  Local board state synced with Redux
  const [taskStateColumn, setTaskStateColumn] = useState(boards);
  useEffect(() => {
    setTaskStateColumn(boards);
  }, [boards]);

  //  DnD overlay states
  const [activeId, setActiveId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);

  //  Input Handlers
  const handleChangeInBoard = (e) => {
    dispatch(changeBoard({ [e.target.name]: e.target.value }));
  };
  const handleAddBoard = () => {
    dispatch(addBoard());
  };

  // Drag Start
  const handleDragStart = (event) => {
    const { active } = event;
    if (!active?.id) return;

    const activeIdStr = String(active.id);
    setActiveId(activeIdStr);

    if (activeIdStr.startsWith("task-")) {
      const taskId = activeIdStr.replace("task-", "");
      const taskData = tasks.find((t) => String(t.id) === taskId);
      setActiveTask(taskData);
    } else {
      const column = taskStateColumn.find((col) => String(col.id) === activeIdStr);
      setActiveColumn(column);
    }
  };

  //  Drag Over
  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over?.id) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    if (activeIdStr.startsWith("task-") && !overIdStr.startsWith("task-")) {
      const taskId = activeIdStr.replace("task-", "");
      const destCol = taskStateColumn.find((col) => String(col.id) === overIdStr);
      if (destCol) {
        dispatch(changeStatus({ id: taskId, state: destCol.id }));
      }
    }
  };

  // Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over?.id) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    setActiveId(null);
    setActiveTask(null);
    setActiveColumn(null);

    // Column reorder
    const activeIndex = taskStateColumn.findIndex((col) => String(col.id) === activeIdStr);
    const overIndex = taskStateColumn.findIndex((col) => String(col.id) === overIdStr);

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      setTaskStateColumn((cols) => arrayMove(cols, activeIndex, overIndex));
      return;
    }

    // Task → Task reorder
    if (activeIdStr.startsWith("task-") && overIdStr.startsWith("task-")) {
      const activeTaskId = activeIdStr.replace("task-", "");
      const overTaskId = overIdStr.replace("task-", "");
      const fromIndex = tasks.findIndex((t) => String(t.id) === activeTaskId);
      const toIndex = tasks.findIndex((t) => String(t.id) === overTaskId);

      if (fromIndex !== -1 && toIndex !== -1) {
        if (tasks[fromIndex].state !== tasks[toIndex].state) {
          dispatch(
            changeStatus({
              id: tasks[fromIndex].id,
              state: tasks[toIndex].state,
            })
          );
        }
        dispatch(moveTask({ fromIndex, toIndex }));
      }
    }
    // Task → Column move
    else if (activeIdStr.startsWith("task-")) {
      const destCol = taskStateColumn.find((col) => String(col.id) === overIdStr);
      if (destCol) {
        const taskId = activeIdStr.replace("task-", "");
        dispatch(changeStatus({ id: taskId, state: destCol.id }));
      }
    }
  };

  //  Change handler for project or task view
  const handleChange = (e) => {
    dispatch(setChange({ [e.target.name]: e.target.value }));
    dispatch(changeBoard({ [e.target.name]: e.target.value }));
  };


  return (
    <main className="main">
      <div className="taskslide">
        <div className="overview">
          <h2>Overview</h2>
          <p>Edit and modify the card as you want</p>
          <div style={{ flexGrow: 1 }}></div>
          <hr className="lineofhr" />
        </div>

        <div className="filterproject">
          <InputTextInDialog
            label={"Project"}
            value={task?.projectId ?? ""}
            name={"projectId"}
            states={projectList}
            required={true}
            handleChange={handleChange}
          />
        </div>

        <div className="filtertasklistview">
          <InputTextInDialog
            label={"View"}
            name={"View"}
            states={[
              { id: "List View", name: "List View" },
              { id: "Board View", name: "Board View" },
            ]}
            required={true}
          />
        </div>

        <div className="task-columns">
          <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <SortableContext items={taskStateColumn.map((col) => String(col.id))}>
              {taskStateColumn.map((col) => (
                <SortableTaskHolder id={String(col.id)} key={col.id}>
                  <TaskHolder barname={col.name || col.id} barId={col.id} />
                </SortableTaskHolder>
              ))}
            </SortableContext>

            <DragOverlay
              style={{
                cursor: "grabbing",
              }}
            >
              {activeTask ? (
                <div
                  style={{
                    opacity: 0.9,
                    transform: "rotate(5deg)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    zIndex: 9999,
                    overflow: "hidden",
                  }}
                >
                  <Taskcard task={activeTask} id={`task-${activeTask.id}`} />
                </div>
              ) : activeColumn ? (
                <div
                  style={{
                    opacity: 0.8,
                    transform: "rotate(2deg)",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
                    zIndex: -1,
                  }}
                >
                  <TaskHolder barname={activeColumn.name || activeColumn.id} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

          <div
            style={{
              zIndex: 12,
              position: "relative",
              cursor: "grab",
              width: "100%",
            }}
          >
           <div
              className="taskHolder"
              style={{
                   height: "27.9em",
                   display: "flex",
                   justifyContent: "start",
              }}
            >
              <input
                type="text"
                placeholder="Add new column"
                required
                name="name"
                className="inputforaddboard"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Add new column")}
                onChange={handleChangeInBoard}
              />
              <div className="endspace" onClick={handleAddBoard}>                {" "}
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
