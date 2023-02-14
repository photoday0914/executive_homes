import { withStyles } from "@material-ui/core";
import { brandColors } from "../../lib/globalStyles"
import { TableRow, TableCell } from "@material-ui/core";

const StyledTableCell = withStyles(theme => ({
  head: {
    fontSize: 18,
    fontWeight: 700,
    color: theme.palette.common.white,
    borderRight: `2px solid #F3F3F3`,
    background: brandColors.primary
  },
  body: {
    fontSize: 16,
    fontWeight: 550,
    borderRight: "2px solid #F3F3F3"
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "lightgrey",
      "&:hover": {
        backgroundColor: brandColors.blueGrey
      }
    },
    "&:nth-of-type(even)": {
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: brandColors.blueGrey
      }
    }
  }
}))(TableRow);

export { StyledTableCell, StyledTableRow };
