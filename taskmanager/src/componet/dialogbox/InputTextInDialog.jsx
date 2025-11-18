import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { TextField, MenuItem } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useField } from "formik"
import {Box} from '@mui/material'
// ✅ Custom MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darker: blue[900],
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#f9f9f9",
            "& fieldset": {
              borderColor: blue[300],
            },
            "&:hover fieldset": {
              borderColor: blue[500],
            },
            "&.Mui-focused fieldset": {
              borderColor: blue[700],
            },
          },
          "& .MuiInputLabel-root": {
            color: blue[700],
          },
        },
      },
    },
  },
});

// ✅ Convert name to CamelCase
function toCamelCase(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/[^a-zA-Z0-9]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ""))
    .replace(/^./, (match) => match.toLowerCase());
}

// ✅ Main Component
export default function InputTextInDialog({formik, name, required , sx }) {


  const isDescription = name?.toLowerCase().includes("description");
 
  return (
    <ThemeProvider theme={theme}>
         <Box sx={{margin: "0% 1% 0.5% 1%", width: "98%"}}>
        <TextField
          sx={sx}
          margin="normal"
          label={toCamelCase(name)}
          type="text"
          fullWidth
          variant="outlined"
          name={name}
          value={formik.values[name]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required={required}
          multiline={isDescription}
          minRows={isDescription ? 3 : 1}
          maxRows={isDescription ? 6 : 1}
          error={(formik.touched[name] || formik.submitCount > 0) && Boolean(formik.errors[name])}
          helperText={(formik.touched[name] || formik.submitCount > 0) && formik.errors[name]}
          placeholder={`add ${name}`}
        >   
        </TextField>
        </Box>
      
    </ThemeProvider>
  );
}
