import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField, MenuItem } from "@mui/material";
import { blue } from "@mui/material/colors";


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
export default function InputTextInDialog({ value, name, states, required,handleChange , sx}) {


  const isDescription = name?.toLowerCase().includes("description");
 console.log(states);
 
  return (
    <ThemeProvider theme={theme}>
     
        <TextField
          sx={sx}
          autoFocus
          margin="normal"
          label={toCamelCase(name)}
          type="text"
          fullWidth
          variant="outlined"
          name={name}
          value={value}
          onChange={handleChange}
          select={!!states}
          required={required}
          multiline={isDescription}
          minRows={isDescription ? 3 : 1}
          maxRows={isDescription ? 6 : 1}
        >
          {states?.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                     {s.username || s.name}
                 </MenuItem>
))}

            
        </TextField>
      
    </ThemeProvider>
  );
}
