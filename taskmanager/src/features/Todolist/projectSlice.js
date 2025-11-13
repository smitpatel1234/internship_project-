import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const projectList = (state) => state.projectStore.projectList;
const userList = (state) => state.userStore.userList;
const currentUser = (state)=>(state.currentUserStore.currentUser)

const GET_PROJECTS = createSelector(
  [projectList, userList ,currentUser],
  (projectList, userList,currentUser) => {
    return projectList.map((project) => {
      const user = userList.find((user) => user.id == project?.manageBy);
      return {
        ...project,
        managebyName: user.username,
      };
    }).filter((project)=>(project.manageBy == currentUser.id || currentUser.roleId == 12212));
  }
);

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
      if (editproject) {
        editproject.title = title;
        editproject.description = description;
        editproject.manageBy = manageBy;
      }
    },
  },
});
export const { setChangeInProject, addProject, removeProject, editProject } =
  projectSlice.actions;
export default projectSlice.reducer;
export { GET_PROJECTS };
