import * as yup from 'yup';
export const userSchema = yup.object({
  username: yup.string()
    .min(3, 'Username must have at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .required('Username is required'),

  email: yup.string()
    .email('Please provide a valid email address')
    .required('Email is required'),

});

export const ProjectSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .required("Title is required"),
  description: Yup.string().trim().max(1000, "Description too long"),
  manageBy: Yup.string().nullable().required("Project manager is required"),
  id: Yup.string().nullable(),
});

export const TaskSchema = Yup.object().shape({
  title: Yup.string().trim().min(2, "Title too short").required("Title is required"),
  description: Yup.string().trim().max(1000, "Description too long"),
  state: Yup.string().required("State/Board is required"),
  assigTo: Yup.string().required("Assignee is required"),
  date: Yup.date().required("Date is required").typeError("Invalid date"),
  id: Yup.string().nullable(),
});

export const UserSchema = Yup.object().shape({
  username: Yup.string().trim().min(2, "Username too short").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password at least 6 chars").required("Password is required"),
  roleId: Yup.string().required("Role is required"),
  id: Yup.string().nullable(),
});
