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
import MultipleSelectCheckmarks from "../Maincomponets/MultipleSelectCheckmarks";
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
      convertSelectedUsersToMapping();
      await onSaveEnd();
      resetForm();
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

  const [selectedUsernames, setSelectedUsernames] = useState([]);

  const getSelectedUsersForProject = (projectId) => {
    return userAndProjectList
      .filter((relation) => relation.projectId === projectId)
      .map((relation) => relation.userId);
  };

  useEffect(() => {
    if (project?.id) {
      const selected = getSelectedUsersForProject(project.id);
      setSelectedUsernames(selected);
    }
  }, [project?.id]);

  const onHandelChangeOnView = (event) => {
    const {
      target: { value },
    } = event;
    const newSelected = typeof value === "string" ? value.split(",") : value;
    setSelectedUsernames(newSelected);
  };

  const convertSelectedUsersToMapping = () => {
    if (!project?.id) return;

    const currentMapping = userAndProjectList.filter(
      (r) => r.projectId === project.id
    );

    currentMapping.forEach((mapping) => {
      dispatch(removeUserAndProjectList({ 
        userId: mapping.userId, 
        projectId: project.id 
      }));
    });

    selectedUsernames.forEach((userId) => {
      dispatch(addUserAndProjectList({ 
        userId: userId, 
        projectId: project.id 
      }));
    });
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
        formik.resetForm();
        setSelectedUsernames([]);
        onClose();
      }}
      className="dialogbox"
    >
      <div className="dialogtitle">
        <DialogTitle className="dialogtitletext">{titleName}</DialogTitle>
        
      </div>

      <DialogContent className="dialogcontent">
          <InputTextInDialog formik={formik} name="title" required />
         <SelectBox formik={formik} name="manageBy" label="manageBy" handleChange={handleChange} value={formik.values["manageBy"]}>
          
          {userlist?.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.username}
            </MenuItem>
          ))}
        </SelectBox>
       

        

        { project.id &&
          <MultipleSelectCheckmarks
          value={selectedUsernames}
          name="Assign To Users"
          onHandelChangeOnView={onHandelChangeOnView}
          disabled={!project.id}
          userList={luserList}
          projectId={project?.id}
          mappingList={userAndProjectList}
        >
          {luserList?.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              <Checkbox checked={selectedUsernames.includes(s.id)} />
              <ListItemText primary={s.username} />
            </MenuItem>
          ))}
        </MultipleSelectCheckmarks>
        }
         <InputTextInDialog formik={formik} name="description" />
      </DialogContent>

      <DialogActions className="dialogtitle">
        <Button
          onClick={() => {
            formik.resetForm({ values: { ...initialValues } });
            setSelectedUsernames([]);
            onClose();
          }}
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

export default CrateProjectDialog;
