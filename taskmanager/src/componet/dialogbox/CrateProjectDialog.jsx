import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setChangeInProject } from "../../features/Todolist/projectSlice";
import {
  GET_USER_ADMIN_PROJECT_MANAGER,
  GET_USER_DEVELOPER_QA,
} from "../../features/Todolist/userSlice";
import InputTextInDialog from "./InputTextInDialog";
import SelectBox from "../commancomponet/SelectBox";
import MultipleSelectCheckmarks from "../commancomponet/MultipleSelectCheckmarks";
import {
  addUserAndProjectList,
  removeUserAndProjectList,
  restoreSavedUser,
  saveUserAndProjectListChanges,
} from "../../features/Todolist/userAndProjectSlice";
import { useState, useEffect } from "react";

function CrateProjectDialog({ open, onClose, onSave, title }) {
  const dispatch = useDispatch();

  const project = useSelector((state) => state.projectStore.project);
  const userlist = useSelector(GET_USER_ADMIN_PROJECT_MANAGER);
  const luserList = useSelector(GET_USER_DEVELOPER_QA);

  const userAndProjectList = useSelector(
    (state) => state.userAndProjectSliceStore.userAndProjectList
  );
  const savedUserAndProjectList = useSelector(
    (state) => state.userAndProjectSliceStore.savedUserAndProjectList
  );

  useEffect(() => {
    dispatch(restoreSavedUser());
  }, [dispatch, savedUserAndProjectList]);

  const isChecked = (userId, projectId) =>
    userAndProjectList.some(
      (r) => r.userId === userId && r.projectId === projectId
    );

  const handleToggle = (userId, projectId, checked) => {
    if (checked) {
      dispatch(addUserAndProjectList({ userId, projectId }));
    } else {
      dispatch(removeUserAndProjectList({ userId, projectId }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setChangeInProject({ [name]: value }));
  };

  const [selectedUsernames, setSelectedUsernames] = useState([]);

  useEffect(() => {
    if (luserList && project?.id) {
      const selected = luserList
        .filter((u) => isChecked(u.id, project.id))
        .map((u) => u.username);
      setSelectedUsernames(selected);
    }
  }, [project?.id, luserList, userAndProjectList]); // ✅ fixed dependencies

  // ✅ Update Redux when user selects/deselects items in the dropdown
  const onHandelChangeOnView = (event) => {
    const {
      target: { value },
    } = event;
    const newSelected =
      typeof value === "string" ? value.split(",") : value;

    setSelectedUsernames(newSelected);

    // Sync Redux selections with dropdown state
    if (project?.id) {
      luserList.forEach((user) => {
        const shouldBeChecked = newSelected.includes(user.username);
        const isCurrentlyChecked = isChecked(user.id, project.id);
        if (shouldBeChecked && !isCurrentlyChecked) {
          dispatch(addUserAndProjectList({ userId: user.id, projectId: project.id }));
        } else if (!shouldBeChecked && isCurrentlyChecked) {
          dispatch(removeUserAndProjectList({ userId: user.id, projectId: project.id }));
        }
      });
    }
  };

  const onSaveEnd = () => {
    dispatch(saveUserAndProjectListChanges());
    onSave();
    setSelectedUsernames([]);
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
            value={project?.title ?? ""}
            name="title"
            required
            handleChange={handleChange}
          />
        </div>

        <InputTextInDialog
          value={project?.description ?? ""}
          name="description"
          handleChange={handleChange}
        />

        <SelectBox
          value={project?.manageBy ?? ""}
          name="manageBy"
          label="manageBy"
          handleChange={handleChange}
          required
        >
          {userlist?.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.username}
            </MenuItem>
          ))}
        </SelectBox>

        <MultipleSelectCheckmarks
          key={selectedUsernames.join(",")}
          value={selectedUsernames}
          name="Assign To Users"
          onHandelChangeOnView={onHandelChangeOnView}
          disabled={!project.id}
        >
          {luserList?.map((s) => (
            <MenuItem key={s.id} value={s.username}>
              <Checkbox
                checked={isChecked(s.id, project.id)}
                onChange={(e) =>
                  handleToggle(s.id, project.id, e.target.checked)
                }
              />
              <ListItemText primary={s.username} />
            </MenuItem>
          ))}
        </MultipleSelectCheckmarks>
      </DialogContent>

      <DialogActions className="dialogtitle">
        <Button
          onClick={onSaveEnd}
          color="primary"
          className="dialogtitletext"
          variant="outlined"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CrateProjectDialog;
