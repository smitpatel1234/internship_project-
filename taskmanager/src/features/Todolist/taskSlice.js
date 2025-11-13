import { createSlice,createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const tasks = (state)=>(state.taskStore.tasks) 
const currentUser = (state)=>(state.currentUserStore.currentUser)
const GET_TASK = createSelector([tasks,currentUser],(tasks,currentUser)=>(
   tasks.filter((task)=>(task.createdBy==currentUser.id || task.assigTo==currentUser.id || 
 task.assigBY==currentUser.id
  ))
))
const GET_PROJECTS = createSelector([GET_TASK],(GET_TASK)=>(
   new Set(GET_TASK.map((task)=>task.projectId)))
)



const taskSlice = createSlice({
  name: "taskStore",
  initialState: {
   
    tasks: [],
    
    task:{
        id:null,
        title:null,
        state:null,
        description:null,
        date:null,
        createdBy:null,
        assigTo:null,
        assignBy:null,
        projectId:null,
    },
  },

  reducers: {

  
  setChange:(state,actions) =>{    
    state.task = {...state.task, ...actions.payload}
  },
    addTask: (state,actions) => {
      state.task.id =  uuidv4();
      const newTask = { ...state.task };
      state.tasks.push(newTask);
    },
    removeTask: (state, actions) => {
      state.tasks = state.tasks.filter((task) => task.id != actions.payload);
    },
    moveTask: (state, actions) => {
      const { fromIndex, toIndex } = actions.payload;
      if (fromIndex == undefined || toIndex == undefined)
         return;
      const tasks = state.tasks;
      if (fromIndex < 0 || fromIndex >= tasks.length)
         return;
      if (toIndex < 0)
         return;
      const [moved] = tasks.splice(fromIndex, 1);
      const dest = toIndex > tasks.length ? tasks.length : toIndex;
      tasks.splice(dest, 0, moved);
    },
    changeStatus: (state, actions) => {
      const task = state.tasks.find((task) => task.id == actions.payload.id);
      if (task) {
        task.state = actions.payload.state;
      }
    },
    editTask: (state, actions) => {

      const { id, title, description, state: newState,date, assigTo, assignBy, projectId } = state.task;
      const task = state.tasks.find((task) => task.id == id);
      if (task) {
        task.title = title;
        task.description = description;
        task.state = newState;
        task.date = date;
        task.assigTo = assigTo;
        task.assignBy = assignBy;
        task.projectId = projectId;
      }
    },
},});

export const { addTask, removeTask, changeStatus, editTask,setChange,moveTask} = taskSlice.actions;
export default taskSlice.reducer;
export {GET_TASK,GET_PROJECTS};
