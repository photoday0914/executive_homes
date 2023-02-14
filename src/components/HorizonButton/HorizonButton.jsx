import React from "react";
import { brandColors } from "../../lib/globalStyles";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  primaryButton: {
    background: "#1779ba",
    "&:hover": {
      background: "#126195"
    }
  },
  secondaryButton: {
    background: brandColors.secondary,
    "&:hover": {
      background: "#989c54"
    }
  }
}));

export const HorizonButton = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      {...props}
      variant="contained"
      className={
        props.color === "primary"
          ? classes.primaryButton
          : classes.secondaryButton
      }
    >
      {children}
    </Button>
  );
};
