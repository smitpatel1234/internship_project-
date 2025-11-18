import { createSlice } from "@reduxjs/toolkit";

const roleAndPermissionSlice = createSlice({
  name: "roleAndPermissionStore",
  initialState: {
    roleAndPermissionList: [], 
    savedRoleAndPermissionList: [ 
      {
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
      },
      {
        id: 7560904.583284423,
        roleId: 12213,
        permissionId: 35
      },
      {
        id: 57711226.445216976,
        roleId: 12213,
        permissionId: 33
      },
      {
        id: 7920164.830366016,
        roleId: 12213,
        permissionId: 34
      },
      {
        id: 59612812.07286784,
        roleId: 12213,
        permissionId: 32
      },
      {
        id: 3160065.6358764414,
        roleId: 12213,
        permissionId: 18
      },
      {
        id: 21544964.968572512,
        roleId: 12213,
        permissionId: 17
      },
      {
        id: 76363611.04904819,
        roleId: 12213,
        permissionId: 16
      },
      {
        id: 56996326.413983226,
        roleId: 12213,
        permissionId: 12
      },
      {
        id: 17365866.84718775,
        roleId: 12213,
        permissionId: 15
      },
      {
        id: 52483394.545221895,
        roleId: 12213,
        permissionId: 10
      },
      {
        id: 66041934.6411883,
        roleId: 12213,
        permissionId: 9
      },
      {
        id: 45086841.10600233,
        roleId: 12213,
        permissionId: 8
      },
      {
        id: 15675842.126823958,
        roleId: 12213,
        permissionId: 7
      },
      {
        id: 67045747.53211507,
        roleId: 12213,
        permissionId: 4
      },
      {
        id: 76735840.76781341,
        roleId: 12213,
        permissionId: 14
      },
      {
        id: 74086845.82132477,
        roleId: 12214,
        permissionId: 7
      },
      {
        id: 63600641.02119423,
        roleId: 12214,
        permissionId: 8
      },
      {
        id: 46515040.49193813,
        roleId: 12214,
        permissionId: 9
      },
      {
        id: 91864517.2804579,
        roleId: 12214,
        permissionId: 10
      },
      {
        id: 49355445.91309572,
        roleId: 12214,
        permissionId: 15
      },
      {
        id: 20323367.4842667,
        roleId: 12215,
        permissionId: 12
      },
      {
        id: 41638411.617630236,
        roleId: 12215,
        permissionId: 10
      },
      {
        id: 11519806.98611299,
        roleId: 12215,
        permissionId: 7
      },
      {
        id: 52325518.24933972,
        roleId: 12215,
        permissionId: 15
      },
      {
        id: 4156025.098187499,
        roleId: 12213,
        permissionId: 3
      },
       {
        id: 21934250.42822642,
        roleId: 12212,
        permissionId: 42
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
