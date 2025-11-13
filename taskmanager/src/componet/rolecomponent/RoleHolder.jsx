import React, { useEffect } from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  addRoleAndPermission,
  removeRoleAndPermission,
  restoreSavedPermissions
} from '../../features/Todolist/roleAndPermissionSlice'

function RoleHolder() {
  const dispatch = useDispatch()
  const roles = useSelector(state => state.roleStore.roleList)
  const permissionList = useSelector(state => state.permissionStore.permissionList)
  const roleAndPermissionList = useSelector(state => state.roleAndPermissionStore.roleAndPermissionList)
  const savedRoleAndPermissionList = useSelector(state => state.roleAndPermissionStore.savedRoleAndPermissionList)
  useEffect(() => {
    
         dispatch(restoreSavedPermissions())
    
  }, [savedRoleAndPermissionList])

  const handleToggle = (roleId, permissionId, checked) => {
       if (checked) {
      dispatch(addRoleAndPermission({ roleId, permissionId }))
       } else {
      dispatch(removeRoleAndPermission({ roleId, permissionId }))
    }
  }     

         const isChecked = (roleId, permissionId) => {
    return roleAndPermissionList.some(
      (r) => r.roleId === roleId && r.permissionId === permissionId
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: 'aliceblue', color: 'white' }}>
          <TableRow>
            <TableCell>Section</TableCell>
            <TableCell>Permission</TableCell>
               {roles.map(role => (
              <TableCell key={role.id}>{role.name}</TableCell> ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {permissionList.filter(p => p.parentId).map(permission => {
            const parent = permissionList.find(p => p.id === permission.parentId)
            return (
              <TableRow key={permission.id}>
                <TableCell>{parent ? parent.permission : '-'}</TableCell>
                <TableCell>{permission.permission}</TableCell>
                {roles.map(role => (
                  <TableCell key={`${role.id}-${permission.id}`}>
                    <Checkbox
                      checked={isChecked(role.id, permission.id)}
                       onChange={(e) =>
                        handleToggle(role.id, permission.id, e.target.checked)
                 }
                    />
                  </TableCell> 
                ))}
              </TableRow>
            )})}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RoleHolder
