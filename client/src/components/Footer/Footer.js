/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link
                to="/admin/dashboard"
                className={`${classes.block} hvr-float`}
              >
                Home
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.linkedin.com/in/williamd99/"
                className={`${classes.block} hvr-float`}
              >
                Linkedin
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://www.iam-will.com"
                className={`${classes.block} hvr-float`}
              >
                Portfolio
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>&copy; {1900 + new Date().getYear()} Will Doan</span>
        </p>
      </div>
    </footer>
  );
}
