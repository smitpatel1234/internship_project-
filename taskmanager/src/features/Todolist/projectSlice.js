import { createSlice, createSelector } from "@reduxjs/toolkit";
import { set } from "lodash";
import { v4 as uuidv4 } from 'uuid';

const projectList = (state) => state.projectStore.projectList;
const userList = (state) => state.userStore.userList;
const currentUser = (state)=>(state.currentUserStore.currentUser)

const GET_PROJECTS = createSelector(
  [projectList, userList ,currentUser],
  (projectList, userList,currentUser) => {
   return  projectList.map((project) => {
      const user = userList.find((user) => user.id == project?.manageBy);
      return {
        ...project,
        managebyName: user?.username,
      };
    }).filter((project)=>(project.manageBy == currentUser.id || currentUser.roleId == 12212));
  });
const FilteredProjectList = createSelector(
  [GET_PROJECTS, (state) => state.projectStore.sortconf, (state) => state.projectStore.searchconf],
  (get_projects, sortconf, searchconf) => {
    let filteredList = [...get_projects];
    if(searchconf){
      const searchLower = searchconf.toLowerCase();
      filteredList = filteredList.filter(
        (project) =>
          (project.title.toLowerCase().includes(searchLower)) ||
          (project.description.toLowerCase().includes(searchLower)) ||
          (project.id.toString().toLowerCase().includes(searchLower)) ||
          (project.managebyName.toLowerCase().includes(searchLower))
      );
    }
    if (sortconf.length > 0) {
  filteredList.sort((a, b) => {
    for (let i = 0; i < sortconf.length; i++) {
      const { key, type } = sortconf[i];

      const factor = type === "DESC" ? -1 : 1;

      const valA = a[key];
      const valB = b[key];

      const numA = parseFloat(valA);
      const numB = parseFloat(valB);
      const isNumber = !isNaN(numA) && !isNaN(numB);

      const dateA = new Date(valA);
      const dateB = new Date(valB);
      const isDate = !isNaN(dateA.getTime()) && !isNaN(dateB.getTime());

      let compareA = valA;
      let compareB = valB;

      if (isNumber) {
        compareA = numA;
        compareB = numB;
      } else if (isDate) {
        compareA = dateA.getTime();
        compareB = dateB.getTime();
      } else {
        compareA = valA.toString().toLowerCase();
        compareB = valB.toString().toLowerCase();
      }

      if (compareA < compareB) return -1 * factor;
      if (compareA > compareB) return 1 * factor;
    }
    return 0;
  });
}

    return filteredList;
  }
)
const projectSlice = createSlice({
  name: "projectStore",
  initialState: {
    project: {
      id: null,
      title: null,
      description: null,
      manageBy: null,
      createdBy: null,
      updateBy: null,
    },
    projectList: [],
 
    sortconf:[],
    searchconf:null
  },
  reducers: {
    setChangeInProject: (state, actions) => {
      const { id, title, description, manageBy } = {
        ...state.project,
        ...actions.payload,
      };
      state.project = {
        id,
        title,
        description,
        manageBy,
      };
    },
    addProject: (state, actions) => {
      state.project.id = uuidv4()
      state.project.createdBy=actions.payload.createdBy;
      state.project.updateBy=actions.payload.updateBy;
      const newProject = { ...state.project };
      state.projectList.push(newProject);
    },
    removeProject: (state, actions) => {
      state.projectList = state.projectList.filter(
        (oneuser) => oneuser.id != state.project.id
      );
    },
    editProject: (state, actions) => {
      
      const { id, title, description, manageBy } = { ...state.project };
      const editproject = state.projectList.find((project) => project.id == id);
       console.log(editproject)
      if (editproject) {
        editproject.title = title;
        editproject.description = description;
        editproject.manageBy = manageBy;
        editproject.updateBy = actions.payload.updateBy;
      }
    },
    
    setSortConf:(state, actions)=>{
      const sortconf = state.sortconf 
      if(actions.payload.type == 'NONE'){
        state.sortconf = state.sortconf.filter((sortconf) => sortconf.key != actions.payload.key);
      }
      else if(sortconf.some((sortconf) => sortconf.key == actions.payload.key))
      {
        state.sortconf = state.sortconf.map((sortconf) => {
          if (sortconf.key == actions.payload.key) {
            sortconf.type = actions.payload.type;
          }
          return sortconf;
        });
      }
      else
      {
        state.sortconf.push(actions.payload);
      }
     
    },
    setsearchConf:(state, actions)=>{
      state.searchconf=actions.payload;

  },
}}
);
export const { setChangeInProject, addProject, removeProject, editProject,setsearchConf,setSortConf } =
  projectSlice.actions;
export default projectSlice.reducer;
export { GET_PROJECTS ,FilteredProjectList};
