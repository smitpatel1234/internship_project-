import { createSlice, createSelector } from "@reduxjs/toolkit";
const userList = (state) => state.userStore.userList;
const roleList = (state) => state.roleStore.roleList;
import { v4 as uuidv4 } from "uuid";
const GET_USER = createSelector([userList, roleList], (userList, roleList) => {
  return userList.map((user) => {
    const role = roleList.find((role) => role.id == user.roleId);
    return {
      ...user,
      role: role.name,
    };
  });
});
const FilterUserList = createSelector(
  [
    GET_USER,
    (state) => state.userStore.sortconf,
    (state) => state.userStore.searchconf,
  ],
  (GET_USER, sortconf, searchconf) => {
    let filteredList = [...GET_USER];
    if (searchconf) {
      const searchLower = searchconf.toLowerCase();
      filteredList = filteredList.filter(
        (user) =>
          user.username.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower) ||
          user.id.toString().toLowerCase().includes(searchLower)
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
);
const ROLE_MAP = {
  ADMIN: 12212,
  PROJECT_MANAGER: 12213,
  DEVELOPER: 12214,
  QA: 12215,
};

const getUsersByRoles = (userList, roleIds) => {
  return userList.filter((user) => roleIds.includes(user.roleId));
};

const GET_USER_ADMIN_PROJECT_MANAGER = createSelector(
  [userList],
  (userList) => {
    return getUsersByRoles(userList, [
      ROLE_MAP.ADMIN,
      ROLE_MAP.PROJECT_MANAGER,
    ]);
  }
);

const GET_USER_DEVELOPER_QA = createSelector([userList], (userList) => {
  return getUsersByRoles(userList, [ROLE_MAP.DEVELOPER, ROLE_MAP.QA]);
});
const generateUsers = () => {
  const users = [
    {
      id: 1,
      username: "admin",
      email: "admin@gmail.com",
      password: null,
      roleId: ROLE_MAP.ADMIN,
    },
    {
      id: 9174163.555584313,
      username: "Smitkumar.Patel",
      email: "smitpatel53751@gmail.com",
      password: "kollpo",
      roleId: ROLE_MAP.PROJECT_MANAGER,
    },
    {
      id: 4177707.744800685,
      username: "dhwani.shah",
      email: "john.doe@example.com",
      password: "kollpo",
      roleId: ROLE_MAP.PROJECT_MANAGER,
    },
    {
      id: 44219785.043679886,
      username: "dhwani.shah",
      email: "smitpatel@gmail.com",
      password: "kollpo",
      roleId: ROLE_MAP.DEVELOPER,
    },
    {
      id: 3993075.4215425467,
      username: "guest2",
      email: "guest2@gmail.com",
      password: "sdfsd",
      roleId: ROLE_MAP.QA,
    },
  ];

  for (let i = 2; i <= 10; i++) {
    const roleIds = [
      ROLE_MAP.ADMIN,
      ROLE_MAP.PROJECT_MANAGER,
      ROLE_MAP.DEVELOPER,
      ROLE_MAP.QA,
    ];
    users.push({
      id: i,
      username: `user${i}`,
      email: `user${i}@gmail.com`,
      password: null,
      roleId: roleIds[i % 4],
    });
  }
  return users;
};

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
    sortconf: [],
    searchconf: null,
    userList: generateUsers(),
  },
  reducers: {
    setChangeInUser: (state, actions) => {
      state.user = { ...state.user, ...actions.payload };
    },
    addUser: (state, actions) => {
      state.user.id = uuidv4();

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
    setSortConf: (state, actions) => {
      const sortconf = state.sortconf;
      if (actions.payload.type == "NONE") {
        state.sortconf = state.sortconf.filter(
          (sortconf) => sortconf.key != actions.payload.key
        );
      } else if (
        sortconf.some((sortconf) => sortconf.key == actions.payload.key)
      ) {
        state.sortconf = state.sortconf.map((sortconf) => {
          if (sortconf.key == actions.payload.key) {
            sortconf.type = actions.payload.type;
          }
          return sortconf;
        });
      } else {
        state.sortconf.push(actions.payload);
      }
    },
    setsearchConf: (state, actions) => {
      state.searchconf = actions.payload;
    },
  },
});
export const {
  setChangeInUser,
  addUser,
  removeUser,
  editUser,
  setSortConf,
  setsearchConf,
} = userSlice.actions;
export default userSlice.reducer;
export {
  GET_USER,
  GET_USER_ADMIN_PROJECT_MANAGER,
  GET_USER_DEVELOPER_QA,
  FilterUserList,
};
