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
      error: { },
    },
    
  },

  reducers: {
    setChangeInCurrentUser: (state, actions) => {
      state.currentUser ={...state.currentUser ,...actions.payload};
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
        edituser.isvalidUser= false;
        edituser.error= { };
      }
    },
  },
});
export const { setChangeInCurrentUser, removeCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;