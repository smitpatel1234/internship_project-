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

function CreateTaskDialog({ open, onClose, onSave, title }) {
  const task = useSelector((state) => state.taskStore.task);
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boardStore.boardList);
  const userList = useSelector((state) => state.userStore.userList);

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
          <SelectBox
            value={task?.state ?? ""}
            name={"state"}
            handleChange={handleChange}
            label={"state"}
            required={true}
          >
            {boards.map((user) => (
              <MenuItem value={user.id}>{user.name}</MenuItem>
            ))}
          </SelectBox>
        </div>
        <SelectBox
          value={task?.assigTo ?? ""}
          name={"assigTo"}
          handleChange={handleChange}
          label={"assigTo"}
        >
          {userList.map((user) => (
            <MenuItem value={user.id}>{user.username}</MenuItem>
          ))}
        </SelectBox>

        <DatePicakerinDialog
          value={task?.date ?? todaysdate}
          required={true}
          handleChange={handleChange}
        />

        <InputTextInDialog
          value={task?.description ?? ""}
          name={"description"}
          handleChange={handleChange}
        />
      </DialogContent>

      <DialogActions className="dialogtitle">
        <Button
          onClick={onSave}
          color="primary"
          className="dialogtitletext"
          variant="outlined"
        >
          {title.includes("Create") ? "Create" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskDialog;
