import React, { useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonBox from "./ButtonBox";
import { useDispatch } from "react-redux";
import { TableVirtuoso } from "react-virtuoso";
import withLoading from "../utills/withLoading";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import SortIcon from "@mui/icons-material/Sort";

import { Typography, Box } from "@mui/material";

function TableBox({
  styleName,
  headingdata,
  rowdata,
  editIcon,
  deleteIcon,
  onDelete,
  onEdit,
  sortconfchange,
}) {
  const [sortConf, setSortConf] = React.useState(
    headingdata.map((row) => ({ key: row.key, type: "NONE" }))
  );
  
  const dispatch = useDispatch();
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
  const handleSort = useCallback(
    (key, type) => () => {

      sortconfchange(key, type);
      setSortConf((prev) => {
        return prev.map((item) => {
          if (item.key == key) {
            return { ...item, type: type };
          } else {
            return { ...item};
          }
        });
      });
      },
    [sortconfchange,setSortConf]
  );

  const VirtuosoComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer  component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed",
              "& td, & th": {
      borderRight: "1px solid #ddd",
    },
    "& td:last-child, & th:last-child": {
      borderRight: "none",
    },
  }}
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
    EmptyPlaceholder: () => (
      <>
        <TableCell
          colSpan={headingdata.length}
          align="center"
          style={{ height: 309, width: "100%" }}
        >
          <Box>
            <Typography variant="h6" color="text.secondary">
              No Data Found
            </Typography>
          </Box>
        </TableCell>
      </>
    ),
  };

  const fixedHeaderContent = () => (
    <>
      {headingdata.map((column) => (
        <TableCell
          key={column.key}
          variant="head"
          className="tableheader"
          sx={{ width: column.width }}
        >
          <Box
            className={
              column.title !== "action" ? "tableheader" : "tableheader action"
            }
          >
            <Typography> {column.title}</Typography>
            {column.title !== "action" && (
              <>
                {sortConf.map((item) =>
                  item.key == column.key && item.type == "ASC" ? (
                    <NorthIcon
                    key={column.key+"ASC"}
                      fontSize="small"
                      onClick={handleSort(column.key, "DESC")}
                    />
                  ) : item.key == column.key && item.type == "DESC" ? (
                    <SouthIcon
                    key={column.key+"DESC"}
                      fontSize="small"
                      onClick={handleSort(column.key, "NONE")}
                    />
                  ) : item.key == column.key && item.type == "NONE" ? (
                    <SortIcon
                    key={column.key+"NONE"}
                      fontSize="small"
                      onClick={handleSort(column.key, "ASC")}
                    />
                  ) : null
                )}
              </>
            )}
          </Box>
        </TableCell>
      ))}
    </>
  );

  const itemContent = (_index, row) => {
    return (
      <>
        {headingdata.map((column) =>
          column.title !== "action" ? (
            <TableCell
              style={{ width: column.width, overflow: "hidden" }}
              align={column.numeric || false ? "right" : "left"}
              key={`${row.id}-${column.key}`}
            >
              {row[column.key] ?? ""}
            </TableCell>
          ) : (
            <TableCell
              style={{ width: column.width, overflow: "hidden" }}
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
      <Paper style={{ height: "100%", width: "100%" }}>
        <TableVirtuoso
          data={rowdata}
          components={VirtuosoComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={itemContent}
        />
      </Paper>
    </div>
  );
}
export default withLoading(React.memo(TableBox));
