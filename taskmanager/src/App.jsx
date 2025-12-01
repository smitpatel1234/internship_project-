import React from "react";
import { Routes, Route } from "react-router-dom";
import "./mainscss/scss/main.scss";
import Project from "./componet/Maincomponets/Project";
import User from "./componet/Maincomponets/User";
import Dashboard from "./componet/Maincomponets/Dashboard";
import Login from "./componet/Maincomponets/Login";
import DashboardLayout from "./componet/Maincomponets/Dashboardlayout";
import Role from "./componet/Maincomponets/Role";
import PrivateRoutes from "./componet/Middelware/PrivateRoutes";
import { useSelector, useDispatch } from "react-redux";
import AppSnackbar from "./componet/Maincomponets/AppSnackbar";
import NotFoundPage from "./componet/Maincomponets/NotFoundPage";
import {
  hideSnackbar,
  selectSnackbar,
} from "./features/Todolist/snackbarSlice";
import { createTheme, ThemeProvider } from "@mui/material";

export default function App() {
  const dispatch = useDispatch();
  const snackbar = useSelector(selectSnackbar);

  const theme = createTheme({
 palette: {
primary: {
  light:  "#E0F7FA",   
  main:   "#00ACC1",  
  dark:   "#00838F",   
  darker: "#006064",   
},

secondary: {
  light:  "#E3F2FD",  
  main:   "#1976D2",   
  dark:   "#0D47A1",  
  darker: "#0A3D62",   
},

tertiary: {
  light:  "#FFF8E1",   
  main:   "#FFB300",  
  dark:   "#FF8F00",   
  darker: "#BF6000",   
},

background: {
  default: "#FFFFFF",  
  paper:   "#FFFFFF",  
},

text: {
  primary: "#000000", 
  secondary: "#424242", 
  disabled: "#9E9E9E", 
  hint: "#757575",    
},



},

    components: {
      MuiTypography:{
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            
            "&.dialogtitletextinput": {
              width: "30%",
              backgroundColor: "primary.light",
              
              "& .MuiInputLabel-root": {
                color: "secondary.main",
                paddingTop: 10,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "secondary.main",
              },

              "& .MuiOutlinedInput-notchedOutline": {
                border:0,
              },

              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "secondary.light",
                },

              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "secondary.main",
                },
            },

            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              backgroundColor: "primary.light",

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.light",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            },

            "& .MuiInputLabel-root": {
              color: "primary.main",
            },
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            

            "& .MuiOutlinedInput-notchedOutline": {
               borderColor: "#41EAD4",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#41EAD4",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#41EAD4",
            },
          },
        },
      },

      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#00ACC1",
          },
        },
      },

      MuiFormControl: {
        styleOverrides: {
          root: {
            margin: 10,
            color: "#00ACC1",

            "&.dialogtitletextinput": {
              margin: 0,
              color: "#00ACC1",
            },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#00ACC1",
            "&.Mui-focused": {
              color: "#00ACC1",
            },
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          icon: {
            color: "#00ACC1",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="appclass">
        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => dispatch(hideSnackbar())}
        />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route path="role" element={<Role />} />
              <Route path="" element={<Dashboard />} />
              <Route path="user" element={<User />} />
              <Route path="project" element={<Project />} />
               <Route path="*" element={<NotFoundPage />} />
            </Route>
             <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}
