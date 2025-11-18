import React, { useEffect } from "react";
import TableBox from "../commancomponet/TableBox";
import CreateUserDialogBox from "../dialogbox/CreateUserDialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  editUser,
  removeUser,
  setChangeInUser,
} from "../../features/Todolist/userSlice";
import DeleteBox from "../dialogbox/DeleteBox";
import { GET_USER } from "../../features/Todolist/userSlice";
import { usePermissionChecker } from "../Middelware/ComponentHider";
import { showSnackbar } from "../../features/Todolist/snackbarSlice";

function UserHolder({ search }) {
  const [column, setColumn] = React.useState([
    {
      title: "id",
      key: "id",
      width: "20%",
    },
    {
      title: "username",
      key: "username",
      width: "20%",
    },
    {
      title: "email",
      key: "email",
      width: "20%",
    },

    {
      title: "role",
      key: "role",
      width: "20%",
    },
    {
      title: "action",
      key: "action",
      width: "20%",
    },
  ]);
  const canEdit = usePermissionChecker(33);
  const canDelete = usePermissionChecker(35);
  useEffect(() => {
    if (canEdit || canDelete) {
      if (!column.some((pre) => pre.title == "action"))
        setColumn((pre) => [
          ...pre,
          {
            title: "action",
            key: "action",
          },
        ]);
    } else setColumn((pre) => pre.filter((s) => s.title !== "action"));
  }, [canEdit, canDelete]);
  const [openDelete, setopenDelet] = React.useState(false);

  const handleCloseDelete = () => {
    setopenDelet(false);
  };
  const handleDeleteDailog = (data) => {
    dispatch(setChangeInUser({ id: data }));
    setopenDelet(true);
  };
  const temporary_user = useSelector(GET_USER);

  const userList = temporary_user.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toString().toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();

  const handelOpenDialog = (data) => {
    dispatch(setChangeInUser(data));
    setOpenDialog(true);
  };
  const handelCloseDialog = () => {
    setOpenDialog(false);
  };
  const handelsave = () => {
    dispatch(editUser());
    dispatch(
      showSnackbar({
        message: "User edited successfully!",
        severity: "success",
      })
    );

    setOpenDialog(false);
  };
  const handelDelete = () => {
    dispatch(removeUser());
      dispatch(
      showSnackbar({
        message: "User deleted successfully!",
        severity: "success",
      })
    );
    handleCloseDelete();
  };
  return (
    <>
      <TableBox
        styleName={"tableofproject"}
        headingdata={column}
        rowdata={userList}
        editIcon={canEdit}
        deleteIcon={canDelete}
        onEdit={handelOpenDialog}
        onDelete={handleDeleteDailog}
      />
      <CreateUserDialogBox
        onClose={handelCloseDialog}
        onSave={handelsave}
        open={openDialog}
        titleName={"Edit User"}
      />
      <DeleteBox
        open={openDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handelDelete}
      />
    </>
  );
}

export default UserHolder;
