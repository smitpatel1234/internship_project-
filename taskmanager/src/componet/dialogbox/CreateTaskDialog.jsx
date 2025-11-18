import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import DatePicakerinDialog, { todaysdate } from "./DatePicakerinDialog";
import InputTextInDialog from "./InputTextInDialog";
import { setChange } from "../../features/Todolist/taskSlice";
import SelectBox from "../commancomponet/SelectBox";
import { GET_ASSIGNABLE_USERS_FOR_TASK } from "../../features/Todolist/userAndProjectSlice"; 
import * as Yup from 'yup';
import { useFormik } from "formik";

function CreateTaskDialog({ open, onClose, onSave, titleName }) {
  const task = useSelector((state) => state.taskStore.task);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskStore.tasks);
  const boards = useSelector((state) => state.boardStore.boardList).filter((board)=>(board.projectId == task.projectId));
  const userList = useSelector(GET_ASSIGNABLE_USERS_FOR_TASK);
  const validationSchema = Yup.object().shape({
  title: Yup.string().trim().min(2, "Title too short").required("Title is required").test(
       'unique-title',
       'This title is already allocated',
      (value)=>{
          return    !tasks.some((t)=>t.title === value && t.id !== task?.id)

      }
  ),
  description: Yup.string().trim().max(1000, "Description too long"),
  state: Yup.string().required("State/Board is required"),
  assigTo: Yup.string() .required("Assignee is required"),
  date: Yup.date().required("Date is required").typeError("Invalid date"),
  id: Yup.string().nullable(),
  });
   
   const formik = useFormik({
    initialValues: {
      title: task?.title ?? null,
      state: task?.state ?? null,
      assigTo: task?.assigTo ?? null,
      date: task?.date ?? todaysdate(),
      description: task?.description ?? null,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setChange(values));
      onSave();
    },
  });


  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="dialogbox">
      <div className="dialogtitle">
        <DialogTitle className="dialogtitletext">{titleName}</DialogTitle>
        <Button
          onClick={() => {
            handleClose();
          }}
          color="primary"
        >
          &#10060;
        </Button>
      </div>

      <DialogContent className="dialogcontent">
      
          <InputTextInDialog
           formik={formik}
            name={"title"}
            required={true}
          />
          <SelectBox
          formik={formik}
            name={"state"}
            label={"state"}
            required={true}
           
            

          >

            {boards.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </SelectBox>
       
        <SelectBox
        formik={formik}
          name={"assigTo"}
          label={"assigTo"}
        >
          {userList.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.username}
            </MenuItem>
          ))}
        </SelectBox>
        <DatePicakerinDialog
          formik={formik}
          required={true}
        />
        <InputTextInDialog
        formik={formik}
          name={"description"}
        />
      </DialogContent>

      <DialogActions className="dialogtitle">
        <Button
          onClick={formik.handleSubmit}
          color="primary"
          className="dialogtitletext"
          variant="outlined"
        >
          {titleName.includes("Create") ? "Create" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskDialog;
