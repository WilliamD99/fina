import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Hidden from "@material-ui/core/Hidden";
import Button from "components/CustomButtons/Button.js";
import Poppers from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Divider from "@material-ui/core/Divider";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const classes = useStyles();
  const [openLogout, setLogoutButton] = useState(null);

  const handleClickProfile = (event) => {
    if (openLogout && openLogout.contains(event.target)) {
      setLogoutButton(null);
    } else {
      setLogoutButton(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setLogoutButton(null);
  };
  if (props.floors !== undefined) {
    return (
      <>
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
        <div className={`${classes.manager} logout-container`}>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openLogout ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickProfile}
            className={classes.buttonLink}
          >
            <SettingsIcon className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>Setting</p>
            </Hidden>
          </Button>
          <Poppers
            open={Boolean(openLogout)}
            anchorEl={openLogout}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !openLogout }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseProfile}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={props.handleLogout}
                        className={`${classes.dropdownItem} logout`}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </>
    );
  } else {
    return <h1></h1>;
  }
}
