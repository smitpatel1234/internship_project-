import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setChangeInProject } from "../../features/Todolist/projectSlice";
import InputTextInDialog from "./InputTextInDialog";

const states = ["BackLog Subtasks", "In Process", "Completed"];

function CrateProjectDialog({ open, onClose, onSave ,title}) {
  const project = useSelector((state) => state.projectStore.project);
  const userlist = useSelector((state)=>state.userStore.userList.filter((user)=>( user.roleId===12213 || user.roleId===12212)))
  console.log(userlist);
  
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setChangeInProject({ [name]: value }));
  };
  
  return (
    <div>
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
              value={project?.title ?? ""}
              name={"title"}
              required={true}
              handleChange={handleChange}
            />
          </div>
          <InputTextInDialog
            value={project?.description ?? ""}
            name={"description"}
            handleChange={handleChange}
          />
          <InputTextInDialog
            value={project?.manageBy ?? ""}
            name={"manageBy"}
            states={userlist}
            required={true}
            handleChange={handleChange}
          />
        </DialogContent>
        <DialogActions className="dialogtitle">
          <Button onClick={onSave} color="primary" className="dialogtitletext" variant="outlined">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CrateProjectDialog;
