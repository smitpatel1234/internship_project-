import React from 'react'
import { useDispatch } from 'react-redux'
import RoleHolder from '../rolecomponent/RoleHolder'
import ButtonBox from '../commancomponet/ButtonBox'
import Searchbar from '../commancomponet/Searchbar'
import ComponentHider from '../Middelware/ComponentHider'
import { saveRoleAndPermissionChanges } from '../../features/Todolist/roleAndPermissionSlice'

function Role() {
  const dispatch = useDispatch()

  const handleSave = () => {
    dispatch(saveRoleAndPermissionChanges())
  }

  return (
    <ComponentHider ComponentId={42} >
    <div className='main'>
      <div className="taskslide">
        <div className="overview">
          <h2>Role</h2>
          <p>Edit and modify the Role as you want</p>
          <div style={{ flexGrow: 1 }}></div>
          <hr className="lineofhr" />
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
