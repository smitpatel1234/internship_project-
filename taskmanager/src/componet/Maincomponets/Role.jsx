import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RoleHolder from '../rolecomponent/RoleHolder'
import ButtonBox from '../commancomponet/ButtonBox'
import Searchbar from '../commancomponet/Searchbar'
import Listview from '../commancomponet/Listview'
import { saveRoleAndPermissionChanges } from '../../features/Todolist/roleAndPermissionSlice'

function Role() {
  const dispatch = useDispatch()
  const roleAndPermissionList = useSelector(
    (state) => state.roleAndPermissionStore.roleAndPermissionList
  )

  const handleSave = () => {
    dispatch(saveRoleAndPermissionChanges())
    
  }

  return (
    <div className='main'>
      <div className="taskslide">
        <div className="overview">
          <h2>Role</h2>
          <p>Edit and modify the Role as you want</p>
          <div style={{ flexGrow: 1 }}></div>
          <hr className="lineofhr" />
        </div>
     
        <ButtonBox value={'Save'} onClickfunction={handleSave} />
        <div className='roles'>
          <RoleHolder />
        </div>
      </div>
    </div>
  )
}

export default Role
