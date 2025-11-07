import { createSlice } from "@reduxjs/toolkit";
const permissionSlice = createSlice({
     name:"permissionStore",
     initialState:{
        permissionList:[
            {
             id:1,
             permission:"PROJECT",
             parentId:null
            },
             {
             id:2,
             permission:"ADD_PROJECT",
             parentId:1
            },
             {
             id:14,
             permission:"VIEW_PROJECT",
             parentId:1
            },
            
             {
             id:3,
             permission:"EDIT_PROJECT",
             parentId:1
            },
             {
             id:4,
             permission:"REMOVE_PROJECT",
             parentId:1
            },
            {
             id:5,
             permission:"ASSIGN_PROJECT",
             parentId:1
            }, {
             id:6,
             permission:"TASK",
             parentId:null
            }, {
             id:7,
             permission:"ADD_TASK",
             parentId:6
            }, {
             id:8,
             permission:"REMOVE_TASK",
             parentId:6
            }, {
             id:9,
             permission:"EDIT_TASK",
             parentId:6
            }, {
             id:10,
             permission:"ASSIGN_TASK",
             parentId:6
            },
             {
             id:15,
             permission:"VIEW_TASK",
             parentId:6
            },
             {
             id:11,
             permission:"OTHER",
             parentId:null
            }, {
             id:12,
             permission:"TASK_VERIFICATION",
             parentId:11
            },
             {
             id:13,
             permission:"BOARD",
             parentId:null
            },
                 {
             id:16,
             permission:"ADD_BOARD",
             parentId:13
            }, {
             id:17,
             permission:"REMOVE_BOARD",
             parentId:13
            }, {
             id:18,
             permission:"EDIT_BOARD",
             parentId:13
            }, {
             id:19,
             permission:"ASSIGN_BOARD",
             parentId:13
            },
             {
             id:20,
             permission:"VIEW_BOARD",
             parentId:13
            },

        ]
     }

})
export const {}  = permissionSlice.actions;
export default permissionSlice.reducer;