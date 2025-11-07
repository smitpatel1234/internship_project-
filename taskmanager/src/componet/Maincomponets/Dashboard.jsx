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
import { useState } from "react";
import Taskcard from "../Taskcomponet/Taskcard";
import InputTextInDialog from "../dialogbox/InputTextInDialog";
const classNameOflist = ["tasksubtask", "inprocess", "completed"];

function Dashboard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskStore.tasks);
  const task = useSelector((state) => state.taskStore.task);
  const projectList = useSelector((state) => {
    const projectList = state.projectStore.projectList;
    return projectList.map((project) => ({
      id: project.id,
      name: project.title,
    }));
  });
  console.log(projectList);

  // State for columns
  const [taskStateColumn, setTaskStateColumn] = useState([
    { id: "BackLog Subtasks" },
    { id: "In Process" },
    { id: "Completed" },
  ]);

  // State for drag overlay
  const [activeId, setActiveId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);

  // Handle drag start
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);

    // Check if dragging a task
    if (active.id.startsWith("task-")) {
      const taskId = active.id.replace("task-", "");
      const task = tasks.find((t) => String(t.id) === taskId);
      setActiveTask(task);
    }
    // Check if dragging a column
    else {
      const column = taskStateColumn.find((col) => col.id === active.id);
      setActiveColumn(column);
    }
  };

  // Handle drag over for visual feedback
  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    // If dragging a task over a column
    if (active.id.startsWith("task-") && !over.id.startsWith("task-")) {
      const taskId = active.id.replace("task-", "");
      const task = tasks.find((t) => String(t.id) === taskId);
      const destCol = taskStateColumn.find((col) => col.id === over.id);

      if (task && destCol && task.state !== destCol.id) {
        // Immediately update task state for smooth visual feedback
        dispatch(changeStatus({ id: taskId, state: destCol.id }));
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Clear active states
    setActiveId(null);
    setActiveTask(null);
    setActiveColumn(null);

    if (!over) return;

    const destId = String(over.id);

    // Handle column reordering
    const activeIndex = taskStateColumn.findIndex(
      (col) => col.id === active.id
    );
    const overIndex = taskStateColumn.findIndex((col) => col.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      setTaskStateColumn((cols) => arrayMove(cols, activeIndex, overIndex));
      return;
    }

    // Handle task to task dragging (reordering within or between columns)
    if (active.id.startsWith("task-") && over.id.startsWith("task-")) {
      const activeId = active.id.replace("task-", "");
      const overId = over.id.replace("task-", "");
      const fromIndex = tasks.findIndex((t) => String(t.id) === activeId);
      const toIndex = tasks.findIndex((t) => String(t.id) === overId);

      if (fromIndex !== -1 && toIndex !== -1) {
        // Change state if different columns
        if (tasks[fromIndex].state !== tasks[toIndex].state) {
          dispatch(
            changeStatus({
              id: tasks[fromIndex].id,
              state: tasks[toIndex].state,
            })
          );
        }
        // Move task position
        dispatch(moveTask({ fromIndex, toIndex }));
      }
    }
    // Handle task to column dragging
    else if (active.id.startsWith("task-")) {
      const destCol = taskStateColumn.find((col) => col.id === destId);
      if (destCol) {
        const taskId = active.id.replace("task-", "");
        dispatch(changeStatus({ id: taskId, state: destId }));
      }
    }
  };
  const handleChange = (e) => {
    dispatch(setChange({ [e.target.name]: e.target.value }));
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
            <SortableContext items={taskStateColumn.map((col) => col.id)}>
              {taskStateColumn.map((col) => (
                <SortableTaskHolder id={col.id}>
                  <TaskHolder barname={col.id} />
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
                  <TaskHolder barname={activeColumn.id} />
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: " 57vh",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                border: "2px dashed #ccc",
                margin: "10px",

              }}
            >
              <div className="endspace"> + </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
