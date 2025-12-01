import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

 
export default function SelectBox({
  label,
  styleName,
  children,
  name,
  formik,
  handleChange,
  value
  , disabled = false
}) {

  return (
     
      <FormControl sx={{
        outlineColor: "black",
        minHeight: "56px",
        marginBottom: "8px",
        width: "35%",
        minWidth: "200px"
      }}>
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          key={styleName}
          name={name}
          label={label}
          value={formik?.values[name] ?? value}
          onChange={formik?.handleChange ?? handleChange}  
          onBlur={formik?.handleBlur}
          disabled={disabled}
          sx={{ minHeight: "56px" }}
        >
          {children}
        </Select>
         {formik?.touched[name] && formik?.errors[name] && (
          <p style={{ color: "red", fontSize: 12, marginLeft: 12 }}>
            {formik?.errors[name]}
          </p>
        )}
      </FormControl>
      
  );
}
