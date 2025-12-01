import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setChangeInUser } from "../../features/Todolist/userSlice";
import InputTextInDialog from "./InputTextInDialog";
import SelectBox from "../commancomponet/SelectBox";
import { useFormik } from "formik";
import * as Yup from 'yup';

function CrateUserDialog({ open, onClose, onSave ,titleName}) {
  const user = useSelector((state) => state.userStore.user);
  const userList = useSelector((state) => state.userStore.userList)
  const rolelist = useSelector((state) => state.roleStore.roleList);
  const dispatch = useDispatch();


 const validationSchema = Yup.object().shape({
    username: Yup.string().trim().min(3, 'Username must have at least 3 characters')
    .required("Email is required")
    .max(30, 'Username cannot exceed 30 characters').test(
      'unique-username',
       'This username is already taken ',
      (value)=>{
          return   !userList.some((u)=>u.username === value && u.id !== user?.id)

      }
    ).matches(/^\S*$/, 'Whitespace is not allowed in the username'),
    email: Yup.string().email("Invalid email").required("Email is required").test(
      'unique-email',
       'This email is already taken',
      (value)=>{
          return   !userList.some((u)=>u.email === value  && u.id !== user?.id ) 

      }
    ),
    password: Yup.string().min(6, "Password at least 6 chars").required("Password is required").matches(/^\S*$/, 'Whitespace is not allowed in the password'),
    roleId: Yup.string().required("Role is required"),
    id: Yup.string().nullable(),

  });
  
  const formik = useFormik({
    initialValues:{
          username:user?.username ?? null,
          email:user?.email ?? null,
          password:user?.password ?? null,
          roleId:user?.roleId ?? "",
    },

    enableReinitialize:true,
    validationSchema,
    onSubmit:(values)=>{
      dispatch(setChangeInUser(values));
      onSave()
    }
   

  })
  const onCloseHandel = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onCloseHandel} className="dialogbox">
      <div className="dialogtitle">
        <DialogTitle className="dialogtitletext">{titleName}</DialogTitle>
        
      </div>

      <DialogContent className="dialogcontent">
        <InputTextInDialog
          formik={formik}
          name={"username"}
          required={true}
        />
        <InputTextInDialog
          formik={formik}
          name={"email"}
          required={true}
        />
        <InputTextInDialog
          formik={formik}
          name={"password"}
        />
        <SelectBox
          formik={formik}
          name={"roleId"}
          label={"roleId"}
        >
          {rolelist.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </SelectBox>
      </DialogContent>

      <DialogActions className="dialogtitle">
        <Button
          onClick={onCloseHandel}
          color="inherit"
          sx={{
            minHeight: "40px",
            minWidth: "80px",
            fontWeight: "600",
            textTransform: "none",
            border: "1px solid #ccc",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)"
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={formik.handleSubmit}
          color="primary"
          variant="contained"
          sx={{
            minHeight: "40px",
            minWidth: "100px",
            fontWeight: "600",
            textTransform: "none",
            borderRadius: "4px"
          }}
        >
          {titleName.includes("Create") ? "Create" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CrateUserDialog;
