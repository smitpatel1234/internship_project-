import { createSlice } from "@reduxjs/toolkit";

const roleAndPermissionSlice = createSlice({
  name: "roleAndPermissionStore",
  initialState: {
    roleAndPermissionList: [], 
    savedRoleAndPermissionList: [] 
  },
  reducers: {
    addRoleAndPermission: (state, action) => {
      const { roleId, permissionId } = action.payload;
      const exists = state.roleAndPermissionList.some(
        (r) => r.roleId === roleId && r.permissionId === permissionId
      );
      if (!exists) {
        state.roleAndPermissionList.push({
          id: Math.random() * 100000000,
          roleId,
          permissionId
        });
      }
    },

    removeRoleAndPermission: (state, action) => {
      const { roleId, permissionId } = action.payload;
      state.roleAndPermissionList = state.roleAndPermissionList.filter(
        (r) => !(r.roleId === roleId && r.permissionId === permissionId)
      );
    },

    saveRoleAndPermissionChanges: (state) => {
      state.savedRoleAndPermissionList = [...state.roleAndPermissionList];
    },

    clearRoleAndPermissionList: (state) => {
      state.roleAndPermissionList = [];
    },

    restoreSavedPermissions: (state) => {
      state.roleAndPermissionList = [...state.savedRoleAndPermissionList];
    }
  },
});

export const {
  addRoleAndPermission,
  removeRoleAndPermission,
  saveRoleAndPermissionChanges,
  clearRoleAndPermissionList,
  restoreSavedPermissions
} = roleAndPermissionSlice.actions;

export default roleAndPermissionSlice.reducer;
