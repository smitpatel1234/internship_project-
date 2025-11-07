import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ButtonBox({
  onClickFunction,
  value,
  stylename,
  editIcon,
  deleteIcon,
}) {
  return (
    <div className={stylename}>
      <Button
        sx={{ fontSize: "1em" }}
        variant="contained"
        onClick={onClickFunction}
      >
         {
          editIcon ? (
            <EditIcon fontSize="small" />
          ) : deleteIcon ? (
            <DeleteIcon fontSize="small" />
          ) : null
        }
        {value}
      </Button>
    </div>
  );
}
