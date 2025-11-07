import React from 'react'
import TableBox from'../commancomponet/TableBox'
import CreateUserDialogBox from '../dialogbox/CreateUserDialogBox'
import { useSelector,useDispatch } from 'react-redux'
import { editUser ,removeUser,setChangeInUser} from '../../features/Todolist/userSlice'

const column = [
   {
      title:"id",
      key:"id"
   },
   {
      title:"username",
      key:"username"
   },
   {
      title:"email",
      key:"email"
   },
   // {
   //    title:"password",
   //    key:"password"
   // },
   {
      title:"role",
      key:"role"
   },
   {
      title:"action",
      key:"action"
   },
   
]
function UserHolder({search}) {
       const temporary_user = useSelector(
         (state)=>{
             
             const userList = state.userStore.userList;
             const roleList = state.roleStore.roleList
             return userList.map(
               (user)=>{
               const role1 = roleList.find((role)=>role.id == user.roleId)
               return {
                  ...user,
                  role: role1.name
               }
             }
           )}
           )
           
        const userList = temporary_user.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.id.toString().toLowerCase().includes(search.toLowerCase()) || user.role.toLowerCase().includes(search.toLowerCase())
    );
     const [openDialog,setOpenDialog] = React.useState(false);
        const dispatch = useDispatch();
   
       const handelOpenDialog = (data)=>{
             dispatch(setChangeInUser(data))
           setOpenDialog(true);
       }
       const handelCloseDialog =()=>{
               setOpenDialog(false)
       }
       const handelsave=()=>{
            dispatch(editUser())
              setOpenDialog(false)
   
       }
       const handelDelete=(id)=>{
        dispatch(removeUser(id))
          
    }
  return (
    
    <>
      <TableBox styleName={'tableofproject'}  headingdata={column} rowdata={userList} editIcon={true} deleteIcon={true} onEdit={handelOpenDialog}  onDelete={handelDelete} />
    <CreateUserDialogBox
      onClose={handelCloseDialog}
      onSave={handelsave}
      open={openDialog}
      title={"Edit User"}
    />
    </>
  )
}

export default UserHolder