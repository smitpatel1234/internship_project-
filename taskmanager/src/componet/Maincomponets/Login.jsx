import React from "react";
import Inputbox from "../commancomponet/Inputbox";
import Buttonbox from "../commancomponet/ButtonBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChangeInCurrentUser } from "../../features/currentUser/currentUserSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userSchema } from "../../features/validator/loginSchema";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userlist = useSelector((state) => state.userStore.userList);
  const currentUser = useSelector(
    (state) => state.currentUserStore.currentUser
  );
  const error = useSelector((state) => state.currentUserStore.error);
  

  const onSubmit = (values, { setSubmitting }) => {
      console.log("values", values);
    const { username, email } = values;
    const user = userlist.find((user) => {
      return user.username === username && user.email === email;
    });
    const isvalid = userlist.some(
      (user) => user.username === username && user.email === email
    );
    dispatch(setChangeInCurrentUser(user ?? { username:username, email:email}));
    if (isvalid) {
      navigate("/dashboardlayout/dashboard");
    } else {
       dispatch(setChangeInCurrentUser({ error:{
        message:"Invalid username or email",
        Status:401
        }}));
    }
    setSubmitting(false);
  };
  const initialValues = {
    username: "",
    email: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={userSchema}
    >
      {({ isValid, dirty, isSubmitting }) => (
        <Form>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting || !isValid}>
            Submit
          </button>
          <div>{currentUser.error?.message}</div>
        </Form>
      )}
    </Formik>
  );
}
