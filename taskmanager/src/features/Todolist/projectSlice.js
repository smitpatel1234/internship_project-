import { createSlice,createSelector } from "@reduxjs/toolkit";
const projectList  = (state) => state.projectStore.projectList;
const userList = (state) => state.userStore.userList;
export const GET_PROJECTS = createSelector(
 [projectList, userList],(projectList,userList)=>{
 return projectList.map((project) => {
      const user = userList.find((user) => user.id == project.manageBy);
      return {
        ...project,
        managebyName: user.username,
      };
    });}
)

const projectSlice = createSlice({
    name:'projectStore',
    initialState:{
         project:{
            id:null,
            title:null, 
            description:null,    
            manageBy:null    
         },
         projectList:[],
    },
    reducers:{
        setChangeInProject:(state,actions)=>{
              const { id,title,description,manageBy} = {...state.project,...actions.payload}   
              state.project={
                  id,title,description,manageBy
              }
         },
         addProject:(state,actions)=>{
              state.project.id = Math.random()*100000000;
              const  newProject = {...state.project}
              state.projectList.push(newProject);
         },
         removeProject:(state,actions)=>{
                state.projectList = state.projectList.filter((oneuser) => oneuser.id !== +actions.payload);
         },
         editProject:(state,actions)=>{
              const { id,title,description,manageBy}  =  {...state.project}
              const editproject = state.userList.find((user)=>user.id === id) 
              if(editproject)
              {
                editproject.title =  title;
                editproject.description =  description;
                editproject.manageBy =  manageBy;
              }
         }
        
    }
})
export const { setChangeInProject,addProject,removeProject,editProject } = projectSlice.actions
export default projectSlice.reducer