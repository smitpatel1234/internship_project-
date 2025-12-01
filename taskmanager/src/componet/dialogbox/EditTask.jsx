import React from "react";
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
import { changeBoard, editBoard } from "../../features/Todolist/boardSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showSnackbar } from "../../features/Todolist/snackbarSlice";
function EditTask({ open, onClose, title }) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boardStore.board);
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, "Title too short")
      .required("Title is required"),
  });
  const onSave = () => {
    dispatch(editBoard());
    dispatch(
      showSnackbar({
        message: "Board edited successfully!",
        severity: "success",
      })
    );
    onClose();
  };
  const formik = useFormik({
    initialValues: {
      name: board?.name,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      dispatch(changeBoard(values));
      onSave();
      resetForm();
    },
  });
  const onCloseHandel = () => {
    formik.resetForm();
    onClose();

  }
  return (
    <Dialog
      open={open}
      onClose={() => {
        formik.resetForm();
        onClose();
      }}
      className="dialogbox"
    >
      <div className="dialogtitle">
        <DialogTitle className="dialogtitletext">{title}</DialogTitle>
        
      </div>

      <DialogContent className="dialogcontent">
        <InputTextInDialog
          label={"Board name"}
          formik={formik}
          value={formik.values["name"] ?? ""}
          name={"name"}
          handleChange={formik.handleChange}
        />
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
          className="dialogtitletext"
          variant="outlined"
        >
          {title.includes("Create") ? "Create" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTask;
