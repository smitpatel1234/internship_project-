import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/material";
 
export const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darker: blue[900],
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: 5,
          backgroundColor: "#f9f9f9",
          transition: "border-color 0.25s ease",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: blue[300],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: blue[500],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: blue[700],
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: blue[700],
          "&.Mui-focused": {
            color: blue[900],
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: blue[700],
        },
      },
    },
  },
});

export default function SelectBox({
  label,
  styleName,
  children,
  name,
  required,
  formik,
  handleChange,
  value
}) {
 

  return (
    <ThemeProvider theme={theme} >
      <Box>
      <FormControl fullWidth required={required} sx={{m:"1% 0 0 0 "}}>
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          key={styleName}
          name={name}

          label={label}
          value={formik?.values[name] ?? value}
          onChange={formik?.handleChange ?? handleChange}  
          onBlur={formik?.handleBlur}
        >
          {children}
        </Select>
         {formik?.touched[name] && formik?.errors[name] && (
          <p style={{ color: "red", fontSize: 12, marginLeft: 12 }}>
            {formik?.errors[name]}
          </p>
        )}
      </FormControl>
      </Box>
    </ThemeProvider>
  );
}
