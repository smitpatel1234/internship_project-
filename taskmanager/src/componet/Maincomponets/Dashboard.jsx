import { useEffect, useLayoutEffect, useMemo, useState } from "react";
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
import { addBoard, changeBoard } from "../../features/Todolist/boardSlice";
import SelectBox from "../commancomponet/SelectBox";
import MenuItem from "@mui/material/MenuItem";
import ComponentHider from "../Middelware/ComponentHider";
import {  GET_TASK } from "../../features/Todolist/taskSlice";
import { usePermissionChecker } from "../Middelware/ComponentHider";
import {GET_ASSIGNABLE_USERS_FOR_TASK} from '../../features/Todolist/userAndProjectSlice'
import { GET_USER_PROJECTS } from "../../features/Todolist/userAndProjectSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "@mui/material/Divider";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";
import { moveBoard } from "../../features/Todolist/boardSlice";
import {Checkbox , ListItemText} from '@mui/material'
function Dashboard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskStore.tasks);
  const task = useSelector((state) => state.taskStore.task);
  const currentProject = task?.projectId;
  const boardList = useSelector((state) => state.boardStore.boardList);
  const boards = useMemo(
    () => boardList.filter((board) => board.projectId === currentProject),
    [boardList, currentProject]
  );
  const luserList = useSelector(GET_ASSIGNABLE_USERS_FOR_TASK);
  const currentUser = useSelector(state => state.currentUserStore.currentUser)
  const projectList = useSelector(GET_USER_PROJECTS);
  const [selectedUsernames, setSelectedUsernames] = useState([currentUser.id]);
  const [taskStateColumn, setTaskStateColumn] = useState(boards);
  const onChange =(e)=>{
      setSelectedUsernames(e.target.value);
  }
  const MIN_BOARD_NAME = 2;
  const boardFormik = useFormik({
    initialValues: { name: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(MIN_BOARD_NAME, `Minimum ${MIN_BOARD_NAME} characters required`)
        .required("Board name is required")
        .test(
          "unique-Board name",
          "This Board name is already allocated",
          (value) => {
            return !boardList.some(
              (board) =>
                board.name === value && board.projectId === currentProject
            );
          }
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      const boardName = values.name.trim();
      dispatch(changeBoard({ name: boardName, projectId: currentProject }));
      dispatch(addBoard());
      resetForm();
    },
  });

  const [activeId, setActiveId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);

  const handleChangeInBoard = (e) => {
    const { name, value } = e.target;
    dispatch(changeBoard({ [name]: value }));
    boardFormik.handleChange(e);
  };

  const handleAddBoard = () => {
    boardFormik.handleSubmit();
  };

  const handleChange = (e) => {
    dispatch(setChange({ [e.target.name]: e.target.value }));
    dispatch(changeBoard({ [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (projectList.length > 0) {
      const defaultProject = projectList[0];
      dispatch(setChange({ projectId: defaultProject.id }));
    }
  }, [projectList]);
  useEffect(() => {
    setTaskStateColumn(boards);
  }, [boards]);
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
      const column = taskStateColumn.find(
        (col) => String(col.id) === activeIdStr
      );
      setActiveColumn(column);
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over?.id) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    if (activeIdStr.startsWith("task-") && !overIdStr.startsWith("task-")) {
      const taskId = activeIdStr.replace("task-", "");
      const destCol = taskStateColumn.find(
        (col) => String(col.id) === overIdStr
      );
      if (destCol) {
        dispatch(changeStatus({ id: taskId, state: destCol.id }));
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over?.id) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    setActiveId(null);
    setActiveTask(null);
    setActiveColumn(null);

    const activeIndex = taskStateColumn.findIndex(
      (col) => String(col.id) === activeIdStr
    );
    const overIndex = taskStateColumn.findIndex(
      (col) => String(col.id) === overIdStr
    );

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      setTaskStateColumn((cols) => arrayMove(cols, activeIndex, overIndex));
      dispatch(
        moveBoard({
          fromIndex: activeIndex,
          toIndex: overIndex,
        })
      );
      return;
    }

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
    } else if (activeIdStr.startsWith("task-")) {
      const destCol = taskStateColumn.find(
        (col) => String(col.id) === overIdStr
      );
      if (destCol) {
        const taskId = activeIdStr.replace("task-", "");
        dispatch(changeStatus({ id: taskId, state: destCol.id }));
      }
    }
  };

  return (
    <main className="main">
      <div className="taskslide">
        <div className="overview">
          <h2>Overview</h2>
          <p>Edit and modify the card as you want</p>
          <div style={{ height: "20px" }}></div>

          <Divider />
        </div>

        <ComponentHider ComponentId={15}>
          <div className="filterproject">
            <SelectBox
              label={"Project"}
              value={currentProject}
              name={"projectId"}
              required={true}
              handleChange={handleChange}
            >
              {projectList.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.title}
                </MenuItem>
              ))}
            </SelectBox>
          </div>
          <div className="filteruser">
      <MultipleSelectCheckmarks
          value={selectedUsernames}
          name="Assign To Users"
          
          onHandelChangeOnView={onChange}
          userList={luserList}
        
          
        >
          {luserList?.map((s) => (
            <MenuItem key={s.id} value={s.id}>
               
              <Checkbox checked={selectedUsernames.includes(s.id)} />
              <ListItemText primary={s.username} />
            </MenuItem>
          ))}
        </MultipleSelectCheckmarks>
          </div>
          {projectList.length !== 0 ?

          <div className="task-columns">
            <DndContext
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
              <SortableContext
                items={taskStateColumn.map((col) => String(col.id))}
              >
                {taskStateColumn.map((col) => (
                  <SortableTaskHolder id={String(col.id)} key={col.id}>
                    <TaskHolder
                      barname={col.name || col.id}
                      barId={col.id}
                      setTaskStateColumn={setTaskStateColumn}
                      taskStateColumn={boards}
                      filterByUser={selectedUsernames}
                    />
                  </SortableTaskHolder>
                ))}
              </SortableContext>

              <DragOverlay>
                {activeTask ? (
                  <div
                    style={{
                      opacity: 0.9,
                      transform: "rotate(5deg)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
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
                    }}
                  >
                    <TaskHolder
                      barname={activeColumn.name || activeColumn.id}
                      barId={activeColumn.id}
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>

            <ComponentHider ComponentId={16}>
              <div
                style={{
                  zIndex: 12,
                  position: "relative",
                  cursor: "grab",
                  width: "100%",
                }}
              >
                <div className="taskHolder">
                  <input
                    type="text"
                    placeholder="Add new column"
                    name="name"
                    className="inputforaddboard"
                    value={boardFormik.values.name}
                    onChange={handleChangeInBoard}
                    onBlur={(e) => {
                      boardFormik.handleBlur(e);
                      e.target.placeholder = "Add new column";
                    }}
                    onFocus={(e) => (e.target.placeholder = "")}
                    style={
                      (boardFormik.touched.name ||
                        boardFormik.submitCount > 0) &&
                      boardFormik.errors.name
                        ? { borderColor: "#d32f2f" }
                        : undefined
                    }
                  />

                
                      <p
                        style={{
                          color: "#d32f2f",
                          fontSize: 12,
                          width: "100%",
                          height:'5px',
                          margin: "4px 12px",
                        }}
                      >  {(boardFormik.touched.name || boardFormik.submitCount > 0) &&
                    boardFormik.errors.name && 
                        boardFormik.errors.name   }
                      </p>
                
                  <div style={{ width: "100%", height: "45px" }}></div>
                  <div className="taskListSholder">
                    <div className="endspace" onClick={handleAddBoard}>
                      +
                    </div>
                  </div>
                </div>
              </div>
            </ComponentHider>
           
          </div>: <div className="noProject"> there is no project assigned to you</div>}
        </ComponentHider>
      </div>
    </main>
  );
}

export default Dashboard;
