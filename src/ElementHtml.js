import React from "react";

const TableHead = ({ children }) => {
  return <td>{children}</td>;
};
const TableRow = ({ children }) => {
  return <tr>{children}</tr>;
};

function ElementHtml(props) {
  const { data } = props.episodes;
  return (
    <React.Fragment>
      {data.map((item, idx) => {
        return (
          <TableRow key={"row_" + Math.random()}>
            {props.dataTableColumn.columns.map((column, index) => (
              <React.Fragment key={Math.random()}>
                <TableHead className="col">{item[column]}</TableHead>
              </React.Fragment>
            ))}
          </TableRow>
        );
      })}
    </React.Fragment>
  );
}

export default ElementHtml;
