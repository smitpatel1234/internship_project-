import { createSlice } from "@reduxjs/toolkit";
const boardSlice =  createSlice({
    name:"boardStore",
    initialState:{
        board:{
           id:null,
           name:null,
           projectId:null,
        },
        boardList:[]
    },
    reducers:{
        addboard:(state,action)=>{
            state.boardList.push(state.board);
        }

          
    }
})
export const {}  = boardSlice.actions;
export default boardSlice.reducer;