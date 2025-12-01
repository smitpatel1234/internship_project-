import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const userAndProjectSlice = createSlice({
  name: "userAndProjectSliceStore",
  initialState: {
    userAndProjectList: [],
    savedUserAndProjectList: [],
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
          projectId,
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
    },
  },
});

export const {
  addUserAndProjectList,
  removeUserAndProjectList,
  saveUserAndProjectListChanges,
  clearUserAndProjectList,
  restoreSavedUser,
} = userAndProjectSlice.actions;

const projectList = (state) => state.projectStore.projectList;
const mappingList = (state) => state.userAndProjectSliceStore.userAndProjectList;
const userList = (state) => state.userStore.userList;
const currentUser = (state) => state.currentUserStore.currentUser;
const taskStore = (state) => state.taskStore.task;

export const GET_USER_PROJECTS = createSelector(
  [projectList, mappingList, currentUser],
  (projectList, mappingList, currentUser) => { 
    if (!currentUser) return [];

    return projectList
      .filter((project) => {
        const isAssigned = mappingList.some(
          (m) => m.projectId == project.id && m.userId == currentUser.id
        );

        return (
          project.manageBy == currentUser.id ||
          project.createdBy == currentUser.id ||
          isAssigned
        );
      })
      .map((project) => ({
        id: project.id,
        title: project.title,
      }));
  }
);

export const GET_ASSIGNABLE_USERS_FOR_TASK = createSelector(
  [mappingList, userList, currentUser, taskStore],
  (mappingList, userList, currentUser, task) => {
    if (!task?.projectId || !currentUser) return [];

    const relatedUserIds = mappingList
      .filter((m) => m.projectId === task.projectId)
      .map((m) => m.userId);

    if (!relatedUserIds.includes(currentUser.id)) {
      relatedUserIds.push(currentUser.id);
    }

    const assignableUsers = userList
      .filter((user) => relatedUserIds.includes(user.id))
      .map((user) => ({
        id: user.id,
        username: user.username,
      }));

    return assignableUsers;
  }
);

// Return array of userIds assigned to a given projectId
export const GET_ASSIGNEES_FOR_PROJECT = (state, projectId) => {
  if (!projectId) return [];
  const mapping = state.userAndProjectSliceStore.userAndProjectList || [];
  return mapping.filter((m) => m.projectId === projectId).map((m) => m.userId);
};

export default userAndProjectSlice.reducer;
