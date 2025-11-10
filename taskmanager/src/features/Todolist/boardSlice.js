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
        addBoard:(state,action)=>{
            state.board.id=new Date().getTime();
            const newBoard= { ...state.board};
            state.boardList.push(newBoard);
        },
        changeBoard:(state,action)=>{
            state.board={  ...state.board, ...action.payload};
        },
        removeBoard:(state,action)=>{
            state.boardList=state.boardList.filter(board=>board.id !== action.payload.id);
        },
        editBoard:(state,action)=>{
            const index = state.boardList.findIndex(board=>board.id === action.payload.id);
            if(index !== -1){
                state.boardList[index] = { ...state.boardList[index], ...action.payload};
            }
        }
          
    }
})
export const { addBoard, changeBoard, removeBoard, editBoard}  = boardSlice.actions;
export default boardSlice.reducer;