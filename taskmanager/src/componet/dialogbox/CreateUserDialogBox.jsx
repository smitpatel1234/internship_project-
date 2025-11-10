import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setChangeInUser } from "../../features/Todolist/userSlice";
import InputTextInDialog from "./InputTextInDialog";


function CrateUserDialog({ open, onClose, onSave ,title}) {
  const user = useSelector((state) => state.userStore.user);
  const rolelist = useSelector((state) => state.roleStore.roleList);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setChangeInUser({ [name]: value }));
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
              value={user?.username ?? ""}
              name={"username"}
              required={true}
              handleChange={handleChange}
            />

            <InputTextInDialog
              value={user?.email ?? ""}
              name={"email"}
              required={true}
              handleChange={handleChange}
            />
          </div>
          <InputTextInDialog
            value={user?.password ?? ""}
            name={"password"}
            handleChange={handleChange}
          />
          <InputTextInDialog
            value={user?.roleId ?? ""}
            name={"roleId"}
            states={rolelist}
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

export default CrateUserDialog;
