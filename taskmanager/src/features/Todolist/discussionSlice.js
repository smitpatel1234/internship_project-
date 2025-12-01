import { createSlice ,createSelector} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
const task = (state) => state.taskStore.task;
const userList = (state) => state.userStore.userList;
const discussionList = (state) => state.discussionStore.discussionList;
export const GET_DISCUSSION = createSelector([discussionList,task,userList],(discussionList,task,userList)=>{
    return discussionList.filter(discussion=>discussion.taskId === task.id).map(discussion=>{
        const user = userList.find(user=>user.id === discussion.createdBy);
        return {...discussion,user:user.username};
    });
})
const discussionSlice = createSlice({
    name:"discussionStore",
    initialState:{
        discussion:{
           id:null,
           taskId:null,
           commentText:{},
           repliedTo:null,
           timeStamp:null,
           createdBy:null,
        },
        discussionList:[]
    },
    reducers:{
        addDiscussion:(state,action)=>{
            state.discussion.id=uuidv4();
            const newDiscussion= { ...state.discussion};
            
            state.discussionList.unshift(newDiscussion);
        },
        changeDiscussion:(state,action)=>{
            state.discussion={  ...state.discussion, ...action.payload};
        },
        removeDiscussion:(state,action)=>{
            state.discussionList=state.discussionList.filter(discussion=>discussion.id !== action.payload.id);
        },
        editDiscussion:(state,action)=>{
            const index = state.discussionList.findIndex(discussion=>discussion.id === action.payload.id);
            if(index !== -1){
                state.discussionList[index] = { ...state.discussionList[index], ...action.payload};
            }
        }
    },
})
export const { addDiscussion, changeDiscussion, removeDiscussion, editDiscussion }  = discussionSlice.actions;
export default discussionSlice.reducer;