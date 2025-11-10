import { createSlice} from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "currentUserStore",
  initialState: {
    currentUser: {
      id: null,
      username: null,
      email: null,
      password: null,
      roleId: null,
    },
    isvalidUser: false,
    error: { },
  },

  reducers: {
    setChangeInCurrentUser: (state, actions) => {
      console.log("payload in current user slice", actions.payload);
      state.currentUser ={...state.currentUser ,...actions.payload};
      state.error = actions.payload.error || {};
    },

    removeCurrentUser: (state, actions) => {
      state.currentUser = {
        id: null,
        username: null,
        email: null,
        password: null,
        roleId: null,
      };
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
export const { setChangeInCurrentUser, removeCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;