import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { blue } from "@mui/material/colors";
 
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
  handleChange,
  name,
  required,
  value,
  multiple
}) {
  const firstValue = React.Children.toArray(children)[0]?.props?.value ?? "";
  const [selectedValue, setSelectedValue] = React.useState(value || firstValue);

  React.useEffect(() => {
    if (!value && firstValue && handleChange) {
      handleChange({ target: { name, value: firstValue } });
    }
  }, []); 

  React.useEffect(() => {
    if (value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleLocalChange = React.useCallback(
    (e) => {
      const newValue = e.target.value;
      setSelectedValue(newValue);
      handleChange?.(e);
    },
    [handleChange]
    
  );

  return (
    <ThemeProvider theme={theme}>
      <FormControl fullWidth required={required}>
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          key={styleName}
          name={name}
          label={label}
          value={selectedValue || ""}
          onChange={handleLocalChange}
          multiple={multiple}
        >
          {children}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
