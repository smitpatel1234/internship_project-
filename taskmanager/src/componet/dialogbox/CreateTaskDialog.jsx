import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import DatePicakerinDialog, { todaysdate } from "./DatePicakerinDialog";
import InputTextInDialog from "./InputTextInDialog";
import { setChange } from "../../features/Todolist/taskSlice";

const states = [{id:"BackLog Subtasks" ,name:"BackLog Subtasks"}, {id:"In Process",name:"In Process"},{id:"In Process",name:"Completed"}];

function CreateTaskDialog({ open, onClose, onSave ,title}) {
  const task = useSelector((state) => state.taskStore.task);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setChange({ [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} className="dialogbox">
      <div className="dialogtitle">
        <DialogTitle className="dialogtitletext">{title}</DialogTitle>
        <Button onClick={onClose} color="primary">
          &#10060;
        </Button>
      </div>
      <DialogContent className="dialogcontent">
        <div className="firstDialogcontainer">
          <InputTextInDialog
            value={task?.title ?? ""}
            name={"title"}
            required={true}
            handleChange={handleChange}
          />
          <InputTextInDialog
            value={task?.state ?? ""}
            name={"state"}
            states={states}
            required={true}
            handleChange={handleChange}
          />
        </div>
        <DatePicakerinDialog
          value={task?.date ?? todaysdate}
          required={true}
          handleChange={handleChange}
        ></DatePicakerinDialog>

        <InputTextInDialog
          value={task?.description ?? ""}
          name={"description"}
          handleChange={handleChange}
        />
        
      </DialogContent>
      <DialogActions className="dialogtitle">
        <Button onClick={onSave} color="primary" className="dialogtitletext">
          {title.includes("Create") ? "Create" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskDialog;
