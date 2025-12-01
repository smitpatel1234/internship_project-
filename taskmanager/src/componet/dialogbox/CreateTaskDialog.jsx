import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import DatePicakerinDialog, { parseToDayjs } from "./DatePicakerinDialog";
import InputTextInDialog from "./InputTextInDialog";
import { setChange } from "../../features/Todolist/taskSlice";
import SelectBox from "../commancomponet/SelectBox";
import { GET_ASSIGNABLE_USERS_FOR_TASK } from "../../features/Todolist/userAndProjectSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import RichTextEditorBox from "../commancomponet/RichTextEditorBox";
import Divider from "@mui/material/Divider";
import InputFileUpload from "./InputFileUpload";
import dayjs from "dayjs";
import {
  GET_DISCUSSION,
  addDiscussion,
  changeDiscussion,
  removeDiscussion,
  editDiscussion,
} from "../../features/Todolist/discussionSlice";

function CreateTaskDialog({
  open,
  onClose,
  onSave,
  titleName,
  canEdit: canEditProp,
}) {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.taskStore.task);
  const currentUser = useSelector(
    (state) => state.currentUserStore.currentUser
  );
  const tasks = useSelector((state) => state.taskStore.tasks);
  const boards = useSelector((state) => state.boardStore.boardList).filter(
    (board) => board.projectId == task.projectId
  );
  const discussionList = useSelector(GET_DISCUSSION);
  const discussion = useSelector((state) => state.discussionStore.discussion);

  const handelSave = (e) => {
    dispatch(
      changeDiscussion({
        taskId: task.id,
        timeStamp: dayjs().format("LLLL"),
        createdBy: currentUser.id,
      })
    );
    dispatch(addDiscussion());
  };
  const handelCancel = (id) => {
    dispatch(removeDiscussion({ id: id }));
  };
  const userList = useSelector(GET_ASSIGNABLE_USERS_FOR_TASK);
  const canEdit = typeof canEditProp === "boolean" ? canEditProp : true;
  const canDiscuss = userList.some((u) => u.id === currentUser?.id);
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .min(2, "Title too short")
      .required("Title is required")
      .test("unique-title", "This title is already allocated", (value) => {
        return !tasks.some((t) => t.title === value && t.id !== task?.id);
      }),
    description: Yup.string().trim().max(1000, "Description too long"),
    state: Yup.string().required("State/Board is required"),
    assigTo: Yup.string().required("Assignee is required"),
    date: Yup.date().required("Date is required").typeError("Invalid date"),
    id: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: task?.title ?? null,
      state: task?.state ?? null,
      assigTo: task?.assigTo ?? null,
      date: task?.date
        ? (parseToDayjs(task.date)?.toDate() ?? null)
        : new Date("2022-04-17"),
      description: task?.description ?? null,
      files: task?.files ?? [],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      values.date = values.date.toString();

      values.files = Array.isArray(values.files) ? values.files : [];

      dispatch(setChange(values));

      onSave();
      resetForm();
    },
  });
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    // hourCycle: 'h23'
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={true}
      className="dialogbox"
    >
      <div className="dialogtitle">
        <InputTextInDialog
          stylename={"dialogtitletextinput"}
          formik={formik}
          name={"title"}
          required={true}
        />
      </div>

      <DialogContent className="dialogcontent">
        <SelectBox
          formik={formik}
          name={"state"}
          label={"state"}
          required={true}
          disabled={!canEdit}
        >
          {boards.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </SelectBox>
        <SelectBox formik={formik} name={"assigTo"} label={"assigTo"}>
          {userList.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.username}
            </MenuItem>
          ))}
        </SelectBox>

        <DatePicakerinDialog
          formik={formik}
          required={true}
          disabled={!canEdit}
        />
        <Divider />
        <InputTextInDialog
          formik={formik}
          name={"description"}
          disabled={!canEdit}
        />
        <InputFileUpload formik={formik} name={"files"} disabled={!canEdit} />
        <Divider />
        {titleName.includes("Create") || (
          <>
            <div className="discussionTitle">
              <Typography
                fontSize={"large"}
                align="left"
                color="black"
                fontWeight={1000}
                padding={1}
              >
                {" "}
                Discussion
              </Typography>
              <Typography>
                Created on ,{formatter.format(dayjs(task.date ?? new Date()))}
              </Typography>
            </div>
            <RichTextEditorBox
              user={currentUser.username}
              handelSave={handelSave}
              editabel={canDiscuss}
              value={discussion.commentText}
            />
            <div className="discussionBox">
              {discussionList.map((discussion) => (
                <RichTextEditorBox
                  align={
                    discussion.createdBy === currentUser.id ? "start" : "end"
                  }
                  key={discussion.id}
                  value={discussion.commentText}
                  user={discussion.user}
                  timeStamp={discussion.timeStamp}
                  id={discussion.id}
                  handelCancel={handelCancel}
                />
              ))}{" "}
            </div>
          </>
        )}
      </DialogContent>

      <DialogActions className="dialogtitle">
        <Button
          onClick={handleClose}
          color="inherit"
          sx={{
            minHeight: "40px",
            minWidth: "80px",
            fontWeight: "600",
            textTransform: "none",
            border: "1px solid #ccc",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            },
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
            borderRadius: "4px",
          }}
        >
          {titleName.includes("Create") ? "Create" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskDialog;
