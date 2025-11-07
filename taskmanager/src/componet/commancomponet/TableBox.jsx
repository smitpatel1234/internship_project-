import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonBox from "./ButtonBox";

export default function TableBox({
  styleName,
  headingdata,
  rowdata,
  editIcon,
  deleteIcon,
  onDelete,
  onEdit,
}) {
  return (
    <div className={styleName} >
      <TableContainer component={Paper} sx={{ borderRadius: "20px" }} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: 'aliceblue', color: 'white' }}>
            <TableRow>
              {headingdata.map((data) => (
                <TableCell key={data.key}>{data.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowdata.map((row) => (
              <TableRow key={row.id}>
                {headingdata.map((data) =>
                  data.title != "action" ? (
                    <TableCell key={`${row.id}-${data.key}`}>
                      {row[data.key]}
                    </TableCell>
                  ) : (
                    <TableCell key={`${row.id}-${data.key}`}>
                      <div className="actionbox">
                        {editIcon && (
                          <ButtonBox
                            editIcon
                            onClickFunction={()=>onEdit(row)}
                            stylename="tablebutton"
                          />
                        )}
                        {deleteIcon && (
                          <ButtonBox
                            stylename="tablebutton"
                            deleteIcon
                            onClickFunction={() => {
                              onDelete(row.id);
                            }}
                          />
                        )}
                      </div>
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rowdata.length == 0 && <div className="empty">No Data Found</div>}
     
    </div>
  );
}
