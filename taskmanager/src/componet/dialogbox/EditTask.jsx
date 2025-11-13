import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useRadioGroup,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import InputTextInDialog from "./InputTextInDialog";
import { changeBoard,editBoard } from "../../features/Todolist/boardSlice";

function EditTask({ open, onClose,  title }) {

  const dispatch   = useDispatch();
  const board = useSelector((state=>(state.boardStore.board)));
   
  const onChangeHandel=(e)=>{
     const { name, value } = e.target;
        dispatch(changeBoard({ [name]: value }));
  }
  const onSave = () => {
    dispatch(editBoard());
    onClose()
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
        <InputTextInDialog
          label={"Board name"}

          value={board?.name ?? ""}
          name={"name"}
          handleChange={onChangeHandel}
        />
      </DialogContent>

      <DialogActions className="dialogtitle">
        <Button onClick={onSave} color="primary" className="dialogtitletext" variant="outlined">
          {title.includes("Create") ? "Create" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTask;
