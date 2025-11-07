import { createSlice } from "@reduxjs/toolkit";
const roleSlice =  createSlice({
    name:"roleStore",
    initialState:{
       
  roleList:[
  {
    id: 12212,
    name: "ADMIN",
  },
  {
    id: 12213,
    name: "Project Manager",
  },
  {
    id: 12214,
    name: "Devloper",
  },
  {
    id: 12215,
    name: "QA",
  },
 
]
    },
    reducers:{
          
    }
})
export const {}  = roleSlice.actions;
export default roleSlice.reducer;