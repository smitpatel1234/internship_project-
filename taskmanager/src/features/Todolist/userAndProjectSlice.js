import { createSlice ,createSelector} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const userAndProjectSlice = createSlice({
  name: "userAndProjectSliceStore",
  initialState: {
    userAndProjectList: [], 
    savedUserAndProjectList: [ ] 
  },
  reducers: {
    addUserAndProjectList: (state, action) => {
      const { projectId, userId } = action.payload;
      const exists = state.userAndProjectList.some(
        (r) => r.userId === userId && r.projectId === projectId
      );
      if (!exists) {
        state.userAndProjectList.push({
          id: uuidv4(),
          userId,
          projectId
        });
      }
    },

    removeUserAndProjectList: (state, action) => {
      const { projectId, userId } = action.payload;
      state.userAndProjectList = state.userAndProjectList.filter(
        (r) => !(r.projectId === projectId && r.userId === userId)
      );
    },

    saveUserAndProjectListChanges: (state) => {
      
      state.savedUserAndProjectList = [...state.userAndProjectList];
    },

    clearUserAndProjectList: (state) => {
      state.userAndProjectList = [];
    },

    restoreSavedUser: (state) => {
      state.userAndProjectList = [...state.savedUserAndProjectList];
    }
  },
});

export const {
  addUserAndProjectList,
  removeUserAndProjectList,
  saveUserAndProjectListChanges,
  clearUserAndProjectList,
  restoreSavedUser
} = userAndProjectSlice.actions;

const projectList = (state) => state.projectStore.projectList;
const mappingList = (state) => state.userAndProjectSliceStore.userAndProjectList;
const currentUser = (state) => state.currentUserStore.currentUser;

export const GET_USER_PROJECTS = createSelector(
  [projectList, mappingList, currentUser],
  (projectList, mappingList, currentUser) => {
    if (!currentUser) return [];

    return projectList
      .filter((project) => {
        const isAssigned = mappingList.some(
          (m) => m.projectId === project.id && m.userId === currentUser.id
        );

        return (
          project.manageBy === currentUser.id ||
          project.createdBy === currentUser.id ||
          isAssigned
        );
      })
      .map((project) => ({
        id: project.id,
        title: project.title,
      }));
  }
);

export default userAndProjectSlice.reducer;
