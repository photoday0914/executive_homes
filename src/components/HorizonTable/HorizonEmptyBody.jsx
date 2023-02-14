import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
export const HorizonEmptyBody = ({ cellsEachRow, ...props }) => {
  return (
    <TableBody {...props}>
      {Array.from(Array(10), (e, i) => {
        return (
          <TableRow key={i} style={{ border: "none" }}>
            {Array.from(Array(cellsEachRow), (e, i) => {
              return <TableCell style={{ border: "none" }} key={i}/>;
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
