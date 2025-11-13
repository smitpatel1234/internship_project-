import React, { Children } from "react";
import { useSelector } from "react-redux";

export default function ComponentHider({ ComponentId ,children}) {
  const roleAndPermissionList = useSelector(
    (state) => state.roleAndPermissionStore.savedRoleAndPermissionList
  );
  const roleId = useSelector(
    (state) => state.currentUserStore.currentUser.roleId
  );

   const permissionChecker = roleAndPermissionList.some(
    (roleAndPermission) =>(
      roleId == roleAndPermission.roleId &&
      ComponentId == roleAndPermission.permissionId)
  );

  return permissionChecker ?  children  : null;
}
export function usePermissionChecker(ComponentId){
    const roleAndPermissionList = useSelector(
    (state) => state.roleAndPermissionStore.savedRoleAndPermissionList
  );
  const roleId = useSelector(
    (state) => state.currentUserStore.currentUser.roleId
  );

   const permissionChecker = roleAndPermissionList.some(
    (roleAndPermission) =>(
      roleId == roleAndPermission.roleId &&
      ComponentId == roleAndPermission.permissionId)
  );
 return permissionChecker
}