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
  clearUserAndProjectList
} from "../../features/Todolist/userAndProjectSlice";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";


function CrateProjectDialog({ open, onClose, onSave, titleName }) {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projectStore.project);
  const projectList = useSelector((state) => state.projectStore.projectList)
  const userlist = useSelector(GET_USER_ADMIN_PROJECT_MANAGER);
  const luserList = useSelector(GET_USER_DEVELOPER_QA);
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .min(2, "Title must be at least 2 characters")
      .required("Title is required").test(
             'unique-title',
             'This title is already allocated',
            (value)=>{
                return     !projectList.some((pro)=>pro.title === value && pro.id !== project?.id)
            }
        ),
    description: Yup.string().trim().max(100, "Description too long"),
    manageBy: Yup.string().nullable().required("Project manager is required"),
    id: Yup.string().nullable(),
  });
   const handleChange = (e) => {
     const { name, value } = e.target;
     dispatch(setChangeInProject({ [name]: value }));
     formik.handleChange(e)
   };
  const initialValues = {
    title: project?.title ?? null,
    description: project?.description ?? null,
    manageBy: project?.manageBy ?? null,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(setChangeInProject(values));
      await onSaveEnd();
      resetForm({ values: { ...initialValues } });
    },
  });

  const userAndProjectList = useSelector(
    (state) => state.userAndProjectSliceStore.userAndProjectList
  );
  const savedUserAndProjectList = useSelector(
    (state) => state.userAndProjectSliceStore.savedUserAndProjectList
  );

  useEffect(() => {
     titleName.includes("Create") ? dispatch(clearUserAndProjectList()) : dispatch(restoreSavedUser());
    
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

  const [selectedUsernames, setSelectedUsernames] = useState([]);

  useEffect(() => {
    if (luserList && project?.id) {
      const selected = luserList
        .filter((u) => isChecked(u.id, project.id))
        .map((u) => u.username);
      setSelectedUsernames(selected);
    }
  }, [project?.id, luserList, userAndProjectList]);
  const onHandelChangeOnView = (event) => {
    const {
      target: { value },
    } = event;
    const newSelected = typeof value === "string" ? value.split(",") : value;

    setSelectedUsernames(newSelected);

    if (project?.id) {
      luserList.forEach((user) => {
        const shouldBeChecked = newSelected.includes(user.username);
        const isCurrentlyChecked = isChecked(user.id, project.id);
        if (shouldBeChecked && !isCurrentlyChecked) {
          dispatch(
            addUserAndProjectList({ userId: user.id, projectId: project.id })
          );
        } else if (!shouldBeChecked && isCurrentlyChecked) {
          dispatch(
            removeUserAndProjectList({ userId: user.id, projectId: project.id })
          );
        }
      });
    }
  };

  const onSaveEnd = async () => {
    await dispatch(saveUserAndProjectListChanges());
    await onSave();
    setSelectedUsernames([]);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        formik.resetForm({ values: { ...initialValues } });
        setSelectedUsernames([]);
        onClose();
      }}
      className="dialogbox"
    >
      <div className="dialogtitle">
        <DialogTitle className="dialogtitletext">{titleName}</DialogTitle>
        <Button
          onClick={() => {
            formik.resetForm({ values: { ...initialValues } });
            setSelectedUsernames([]);
            onClose();
          }}
          color="primary"
        >
          &#10060;
        </Button>
      </div>

      <DialogContent className="dialogcontent">
        <div className="firstDialogcontainer">
          <InputTextInDialog formik={formik} name="title" required />
        </div>

        <InputTextInDialog formik={formik} name="description" />

        <SelectBox formik={formik} name="manageBy" label="manageBy" handleChange={handleChange} value={formik.values["manageBy"]}>
          
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

export default CrateProjectDialog;
