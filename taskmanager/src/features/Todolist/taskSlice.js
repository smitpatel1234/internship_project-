import { createSlice } from "@reduxjs/toolkit";

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
        assigTo:null,
        assignBy:null,
        projectId:null,
    },
  },

  reducers: {

  
  setChange:(state,actions) =>{
    console.log(actions.payload);
    
    state.task = {...state.task, ...actions.payload}
  },
    addTask: (state,actions) => {
      state.task.id =  Math.random()*100000000;
      const newTask = { ...state.task };
      state.tasks.push(newTask);
    },
    removeTask: (state, actions) => {
      state.tasks = state.tasks.filter((task) => task.id !== +actions.payload);
    },
    moveTask: (state, actions) => {
      const { fromIndex, toIndex } = actions.payload;
      if (fromIndex === undefined || toIndex === undefined)
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
      const task = state.tasks.find((task) => task.id === +actions.payload.id);
      if (task) {
        task.state = actions.payload.state;
      }
    },
    editTask: (state, actions) => {

      const { id, title, description, state: newState,date, assigTo, assignBy, projectId } = state.task;
      const task = state.tasks.find((task) => +task.id === +id);
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
