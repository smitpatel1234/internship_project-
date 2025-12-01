import React from 'react'
import { useDispatch } from 'react-redux'
import RoleHolder from '../rolecomponent/RoleHolder'
import ButtonBox from '../commancomponet/ButtonBox'
import Searchbar from '../commancomponet/Searchbar'
import ComponentHider from '../Middelware/ComponentHider'
import { saveRoleAndPermissionChanges } from '../../features/Todolist/roleAndPermissionSlice'
import { showSnackbar } from "../../features/Todolist/snackbarSlice";
import Divider from '@mui/material/Divider';
function Role() {
  const dispatch = useDispatch()

  const handleSave = () => {

    dispatch(saveRoleAndPermissionChanges())
        dispatch(
          showSnackbar({
            message: "Role and Permission Save successfully!",
            severity: "success",
          })
        );
  }

  return (
    <ComponentHider ComponentId={42} >
    <div className='main'>
      <div className="taskslide">
        <div className="overview">
          <h2>Role</h2>
          <p>Edit and modify the Role as you want</p>
          <div style={{height: '20px'}}></div>

          <Divider />
          
        </div>
    
        <ButtonBox value={'Save'} onClickFunction={handleSave} />
        <div className='roles'>
          <RoleHolder />
        </div>
      </div>
    </div>
    </ComponentHider>
  )
}

export default Role
