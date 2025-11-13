import { createSlice } from "@reduxjs/toolkit";

const roleAndPermissionSlice = createSlice({
  name: "roleAndPermissionStore",
  initialState: {
    roleAndPermissionList: [], 
    savedRoleAndPermissionList: [ {
        id: 13986749.83315178,
        roleId: 12212,
        permissionId: 2
      },
      {
        id: 26651703.283791695,
        roleId: 12212,
        permissionId: 14
      },
      {
        id: 85162696.14631572,
        roleId: 12212,
        permissionId: 3
      },
      {
        id: 71757616.54745103,
        roleId: 12212,
        permissionId: 4
      },
      {
        id: 63089737.86460702,
        roleId: 12212,
        permissionId: 7
      },
      {
        id: 4706026.345457415,
        roleId: 12212,
        permissionId: 8
      },
      {
        id: 11244877.487386895,
        roleId: 12212,
        permissionId: 9
      },
      {
        id: 56615453.96630756,
        roleId: 12212,
        permissionId: 10
      },
      {
        id: 11469180.205818541,
        roleId: 12212,
        permissionId: 15
      },
      {
        id: 77432039.91747862,
        roleId: 12212,
        permissionId: 12
      },
      {
        id: 33811349.32485223,
        roleId: 12212,
        permissionId: 16
      },
      {
        id: 24825080.44819455,
        roleId: 12212,
        permissionId: 17
      },
      {
        id: 46425069.86180092,
        roleId: 12212,
        permissionId: 18
      },
      {
        id: 49452259.75485792,
        roleId: 12212,
        permissionId: 32
      },
      {
        id: 92331074.36998127,
        roleId: 12212,
        permissionId: 34
      },
      {
        id: 49116908.73452068,
        roleId: 12212,
        permissionId: 33
      },
      {
        id: 71167602.00942217,
        roleId: 12212,
        permissionId: 35
      }
    ] 
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
