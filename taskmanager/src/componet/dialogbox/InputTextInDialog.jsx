import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useField } from "formik";
import { Box } from "@mui/material";


function toCamelCase(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/[^a-zA-Z0-9]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ""))
    .replace(/^./, (match) => match.toLowerCase());
}


export default function InputTextInDialog({
  formik,
  name,
  required,
  sx,
  stylename,
  placeholder,
  disabled = false,
}) {
  const isDescription = name?.toLowerCase().includes("description");

  return (
   
     
        <TextField
          disabled={disabled}
          className={stylename}
          placeholder={`Add New ${name}`}
          type="text"
          name={name}
          value={formik.values[name]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          multiline={isDescription}
          minRows={isDescription ? 3 : 1}
          maxRows={isDescription ? 6 : 1}
          error={
            (formik.touched[name] || formik.submitCount > 0) &&
            Boolean(formik.errors[name])
          }
          helperText={
            (formik.touched[name] || formik.submitCount > 0) &&
            formik.errors[name]
          }
          
          sx={{
            marginBottom: "12px",
            minHeight: "56px",
            width: isDescription ? "50%" : "35%",
            minWidth: isDescription ? "350px" : "200px",
            "& .MuiInputBase-root": {
              height: "auto",
              minHeight: "56px"
            }
          }}
        ></TextField>
  
   
  );
}
