import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { setChange } from "../../features/Todolist/taskSlice";

export function todaysdate() {
  const now = new Date();
  return `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;
}

const theme = createTheme({
  palette: { primary: { main: blue[500] } },
});

export default function DatePicakerinDialog({ value, required }) {
  const dispatch = useDispatch();
  const parsedValue = value ? dayjs(value) : dayjs(todaysdate());

  const handleChangeInDate = (newValue) => {
    dispatch(setChange({ date: newValue ? newValue.format("YYYY-MM-DD") : null }));
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          margin='normal'
          label="Select Date"
          value={parsedValue}
          onChange={handleChangeInDate}
          required={!!required}
          format="MM/DD/YYYY"
          slotProps={{
            textField: {
              fullWidth: true,
              helperText: "MM/DD/YYYY",
              InputLabelProps: { shrink: true }, // ✅ force label to float above outline
              sx: {
                "& .MuiOutlinedInput-root, & .MuiPickersOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                  padding: "0px 12px", // proper padding for text inside outline

                  "& .MuiOutlinedInput-notchedOutline, & fieldset": {
                    borderColor: `${blue[400]} !important`,
                  },

                  "&:hover .MuiOutlinedInput-notchedOutline, &:hover fieldset": {
                    borderColor: `${blue[600]} !important`,
                  },

                  "&.Mui-focused .MuiOutlinedInput-notchedOutline, &.Mui-focused fieldset": {
                    borderColor: `${blue[800]} !important`,
                    borderWidth: "1.5px !important",
                  },
                },

                "& .MuiInputLabel-root": {
                  color: blue[700],
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: blue[800],
                },
                "& .MuiFormHelperText-root": {
                  color: blue[600],
                },
                "& .MuiSvgIcon-root": {
                  color: blue[600],
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
