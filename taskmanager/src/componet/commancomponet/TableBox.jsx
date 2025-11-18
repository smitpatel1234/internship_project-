import React, { useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonBox from "./ButtonBox";
import { TableVirtuoso } from "react-virtuoso";
import withLoading from '../utills/withLoading'
function TableBox({
  styleName,
  headingdata,
  rowdata,
  editIcon,
  deleteIcon,
  onDelete,
  onEdit,
}) {
  const handleEdit = useCallback(
    (row) => () => {
      onEdit(row);
    },
    [onEdit]
  );
  const handleDelete = useCallback(
    (id) => () => {
      onDelete(id);
    },
    [onDelete]
  );
  
  const VirtuosoComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref}  />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: React.forwardRef((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow: React.forwardRef((props, ref) => (
      <TableRow {...props} ref={ref} />
    )),
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => (
    <TableRow>
      {headingdata.map((column) => (
        <TableCell
          key={column.key}
          variant="head"
          sx={{ backgroundColor: "aliceblue",width: column.width  ,overflow:'hidden'}}
        >
          {column.title}
        </TableCell>
      ))}
    </TableRow>
  );

  const itemContent = (_index, row) => {
    return (
      < >
        {headingdata.map((column) =>
          column.title !== "action" ? (
            <TableCell 
              style={{width: column.width,overflow:'hidden'}}
              align={column.numeric || false ? "right" : "left"}
              key={`${row.id}-${column.key}`}
            >
              {row[column.key] ?? ""}
            </TableCell>
          ) : (
            <TableCell
              style={{width: column.width,overflow:'hidden'}}
              key={`${row.id}-${column.key}`}
              align={column.numeric || false ? "right" : "left"}
            >
              <div className="actionbox">
                {editIcon && (
                  <ButtonBox
                    editIcon
                    onClickFunction={handleEdit(row)}
                    stylename="tablebutton"
                  />
                )}
                {deleteIcon && (
                  <ButtonBox
                    stylename="tablebutton"
                    deleteIcon
                    onClickFunction={handleDelete(row.id)}
                  />
                )}
              </div>
            </TableCell>
          )
        )}
      </>
    );
  };

  return (
    <div className={styleName}>
     
      {rowdata.length === 0 ?  <div className="empty">No Data Found</div> : <Paper style={{ height: 470, width: "100%" }}>
        <TableVirtuoso
          data={rowdata}
          components={VirtuosoComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={itemContent}
        />
      </Paper> }
    </div>
  );
}
export default withLoading(React.memo(TableBox));
