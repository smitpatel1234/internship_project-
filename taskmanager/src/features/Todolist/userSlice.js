import { createSlice, createSelector } from "@reduxjs/toolkit";
const userList = (state) => state.userStore.userList;
const roleList = (state) => state.roleStore.roleList;
import { v4 as uuidv4 } from 'uuid';
const GET_USER = createSelector([userList, roleList], (userList, roleList) => {
  return userList.map((user) => {
    const role = roleList.find((role) => role.id == user.roleId);
    return {
      ...user,
      role: role.name,
    };
  });
});
const GET_USER_ADMIN_PROJECT_MANAGER = createSelector(
  [userList],
  (userList) => {
    
      return userList.filter(
        (user) => user.roleId === 12213 || user.roleId === 12212
      );
  }
);
const GET_USER_DEVELOPER_QA = createSelector(
  [userList],
  (userList) => {
    
      return userList.filter(
        (user) => user.roleId === 12214 || user.roleId === 12215
      );
  }
);


const userSlice = createSlice({
  name: "userStore",
  initialState: {
    user: {
      id: null,
      username: null,
      email: null,
      password: null,
      roleId: null,
    },
    userList: [
       {
        id: 1,
        username: 'admin',
        email: 'admin@gmail.com',
        password: null,
        roleId: 12212
      },
      {
        id: 9174163.555584313,
        username: 'Smitkumar.Patel',
        email: 'smitpatel53751@gmail.com',
        password: 'kollpo',
        roleId: 12213
      },
      {
        id: 4177707.744800685,
        username: 'dhwani.shah',
        email: 'john.doe@example.com',
        password: 'kollpo',
        roleId: 12213
      },
      {
        id: 44219785.043679886,
        username: 'dhwani.shah',
        email: 'smitpatel@gmail.com',
        password: 'kollpo',
        roleId: 12214,
        role: 'Project Manager'
      },
      {
        id: 3993075.4215425467,
        username: 'guest2',
        email: 'guest2@gmail.com',
        password: 'sdfsd',
        roleId: 12215,
        role: 'Project Manager'
      }
    ],
  },
  reducers: {
    setChangeInUser: (state, actions) => {
      state.user = { ...state.user, ...actions.payload };
    },
    addUser: (state, actions) => {
      state.user.id =uuidv4();
      const newUser = { ...state.user };
      state.userList.push(newUser);
    },
    removeUser: (state, actions) => {
      state.userList = state.userList.filter(
        (oneuser) => oneuser.id !== state.user.id
      );
    },
    editUser: (state, actions) => {
      const { id, username, email, password, roleId } = { ...state.user };
      const edituser = state.userList.find((user) => user.id === id);
      if (edituser) {
        edituser.username = username;
        edituser.email = email;
        edituser.password = password;
        edituser.roleId = roleId;
      }
    },
  },
});
export const { setChangeInUser, addUser, removeUser, editUser } =
  userSlice.actions;
export default userSlice.reducer;
export { GET_USER ,GET_USER_ADMIN_PROJECT_MANAGER ,GET_USER_DEVELOPER_QA};
