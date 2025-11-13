import { configureStore,combineReducers } from "@reduxjs/toolkit";
import taskStoreReducer from "../features/Todolist/taskSlice";
import userStoreReducer from '../features/Todolist/userSlice';
import projectStoreReducer from '../features/Todolist/projectSlice'
import roleStoreReducer from '../features/Todolist/roleSlice'
import roleAndPermissionStore from '../features/Todolist/roleAndPermissionSlice'
import permissionReducer from  '../features/Todolist/permissionSlice'
import  boardStoreReducer from '../features/Todolist/boardSlice'
import currentUserStoreReducer from '../features/currentUser/currentUserSlice'
import userAndProjectSliceStoreReducer from '../features/Todolist/userAndProjectSlice'
import {persistStore , persistReducer , FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer =combineReducers({
     taskStore:taskStoreReducer,
    userStore: userStoreReducer,
     projectStore : projectStoreReducer,
     roleStore : roleStoreReducer,
     roleAndPermissionStore:roleAndPermissionStore,
     permissionStore:permissionReducer,
     boardStore:boardStoreReducer,
     currentUserStore:currentUserStoreReducer,
     userAndProjectSliceStore:userAndProjectSliceStoreReducer
})
const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }}
),
});
export const persistor = persistStore(store);


