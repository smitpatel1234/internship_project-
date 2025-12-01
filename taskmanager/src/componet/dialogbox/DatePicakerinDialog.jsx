import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)




export function parseToDayjs(value) {
  if (value == null) return null;
  if (dayjs.isDayjs(value)) return value;
  if (value instanceof Date) return dayjs(value);
  const dIso = dayjs(value);
  if (dIso.isValid()) return dIso;

 
    const d = dayjs(value,   'DD/MM/YYYY', true);
    if (d.isValid()) return d;
  

  return null;
}

export default function DatePicakerinDialog({ formik, required, disabled = false }) {
  return (
    
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker
          className="dateInput"
          label="Select Date"
          value={parseToDayjs(formik.values.date)}
          required={!!required}
              onChange={(newValue) => {
                formik.setFieldValue('date', newValue ? newValue.toDate() : null);
              }}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              helperText: "DD/MM/YYYY",
              disabled,
              InputLabelProps: { shrink: true },
              sx: {
                "& .MuiOutlinedInput-root, & .MuiPickersOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                  padding: "0px 12px",
                  "& .MuiOutlinedInput-notchedOutline, & fieldset": {
                    borderColor: `primary.main`,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline, &:hover fieldset": {
                    borderColor: `primary.main`,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline, &.Mui-focused fieldset": {
                    borderColor: `primary.main`,
                    borderWidth: "1.5px !important",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: 'primary.main',
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: 'primary.dark',
                },
                "& .MuiFormHelperText-root": {
                  color: 'primary.main',
                },
                "& .MuiSvgIcon-root": {
                  color: 'primary.main',
                },
              },
            },
          }}
        />
      </LocalizationProvider>
   
  );
}
