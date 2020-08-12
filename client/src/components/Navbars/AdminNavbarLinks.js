import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const classes = useStyles();

  if (props.floors !== undefined) {
    return (
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search,
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
            },
          }}
          floors={props.floors}
          symbols={props.symbols}
          handleSymbol={props.handleSymbol}
          handleLoading={props.handleLoading}
        />
      </div>
    );
  } else {
    return <h1></h1>;
  }
}
