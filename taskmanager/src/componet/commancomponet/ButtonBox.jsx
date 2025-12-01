import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteBox from '../dialogbox/DeleteBox'
import SaveIcon from '@mui/icons-material/Save';

export default function ButtonBox({
  onClickFunction,
  value,
  stylename,
  editIcon,
  deleteIcon,
  saveIcon,
  type,
  disabled,
  size,
  variant,
  
}) {

  return (
    <div className={stylename}>
      <Button
        disabled={disabled}
        sx={{ fontSize: "1em" }}
        variant= { "contained"}
        onClick={onClickFunction}
        type={type}
        size={size}
      >
         {
          editIcon ? (
            <EditIcon fontSize="small" />
          ) : deleteIcon ? (
            <DeleteIcon fontSize="small" />
          ) : saveIcon ? (
            <SaveIcon fontSize="small" />
          ) : (
            null
          )
        }
        {value}
      </Button>

    </div>
  );
}
