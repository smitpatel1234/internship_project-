import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const boardSlice = createSlice({
  name: "boardStore",
  initialState: {
    board: {
      id: null,
      name: null,
      projectId: null,
    },
    boardList: [],
  },
  reducers: {
    addBoard: (state, action) => {
      state.board.id = uuidv4();
      const newBoard = { ...state.board };
      state.boardList.push(newBoard);
    },
    changeBoard: (state, action) => {
      state.board = { ...state.board, ...action.payload };
    },
    removeBoard: (state, action) => {
      state.boardList = state.boardList.filter(
        (board) => board.id !== action.payload.id
      );
    },
    editBoard: (state, action) => {
      const index = state.boardList.findIndex(
        (board) => board.id === state.board.id
      );
      if (index !== -1) {
        state.boardList[index] = { ...state.boardList[index], ...state.board };
      }
    },
    moveBoard: (state, actions) => {
      const { fromIndex, toIndex } = actions.payload;
      if (fromIndex == undefined || toIndex == undefined) return;
      const boardList = state.boardList;
      if (fromIndex < 0 || fromIndex >= boardList.length) return;
      if (toIndex < 0) return;
      const [moved] = boardList.splice(fromIndex, 1);
      const dest = toIndex > boardList.length ? boardList.length : toIndex;
      boardList.splice(dest, 0, moved);
    },
  },
});
export const { addBoard, changeBoard, removeBoard, editBoard ,moveBoard} =
  boardSlice.actions;
export default boardSlice.reducer;
