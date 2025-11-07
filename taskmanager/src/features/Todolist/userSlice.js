import { createSlice  } from "@reduxjs/toolkit";
const userSlice =createSlice({
    name:'userStore',
    initialState:{
       user:{  
        id:null,
        username:null,
        email:null,
        password:null,
        roleId:null
    },
     userList:[],
    },
    reducers:{
         setChangeInUser:(state,actions)=>{
             state.user = {...state.user,...actions.payload}   
         },
         addUser:(state,actions)=>{
              state.user.id = Math.random()*100000000;
              const newUser  = {...state.user};
              state.userList.push(newUser);
         },
         removeUser:(state,actions)=>{
                state.userList = state.userList.filter((oneuser) => oneuser.id !== +actions.payload);
         },
         editUser:(state,actions)=>{ 
              const { id,username,email,password,roleId }  =  {...state.user}
              const edituser = state.userList.find((user)=>user.id === id) 
              if(edituser)
              {
                edituser.username =  username;
                edituser.email =  email;
                edituser.password =  password;
                edituser.roleId =  roleId;
              }
               

         }
    }
    
})
export const {setChangeInUser,addUser,removeUser,editUser}  = userSlice.actions;
export default userSlice.reducer;