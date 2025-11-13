import React from "react";
import Inputbox from "../commancomponet/Inputbox";
import Buttonbox from "../commancomponet/ButtonBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChangeInCurrentUser } from "../../features/currentUser/currentUserSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userSchema } from "../../features/validator/loginSchema";
import { setChange } from "../../features/Todolist/taskSlice";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userlist = useSelector((state) => state.userStore.userList);
  const currentUser = useSelector(
    (state) => state.currentUserStore.currentUser
  );
  const error = useSelector((state) => state.currentUserStore.currentUser.error);


  const onSubmit = (values, { setSubmitting }) => {
    const { username, email } = values;
    const user = userlist.find((user) => {
      return user.username === username && user.email === email;
    });
 
    if (user) {
      dispatch(setChangeInCurrentUser(user));
      dispatch(setChangeInCurrentUser({error:{}}))
       dispatch(
         setChange({  assigTo:user.id,
               assignBy:user.id,
          createdBy:user.id})
       )
     
      navigate("/dashboardlayout/dashboard");
    } else {
      dispatch(
        setChangeInCurrentUser({
          error: {
            message: "Invalid username or email",
            Status: 401,
          },
        })
      );
    }
    setSubmitting(false);
  };
  const initialValues = {
    username: "",
    email: "",
  };

  return (
    <div className="login">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={userSchema}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form>
            <div className="loginheading">Login</div>
            <Inputbox
              label="Username"
              type="text"
              id="username"
              name="username"
            />
            <Inputbox label="Email" type="email" id="email" name="email" />
            <Buttonbox
              size="small"
              type="submit"
              disabled={isSubmitting || !isValid}
              value={"Save"}
              stylename={"login-button"}
            />

            <div className="error">{currentUser.error?.message}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
