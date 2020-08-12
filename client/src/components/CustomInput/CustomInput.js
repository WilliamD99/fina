import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "components/Snackbar/Snackbar.js";
import ReactSearchBox from "react-search-box";

// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import Search from "@material-ui/icons/Search";
import AddAlert from "@material-ui/icons/AddAlert";

// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";

// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    error,
    success,
    floors,
    symbols,
    handleLoading,
    handleSymbol,
  } = props;

  const [floorSelect, setFloor] = useState("US");
  const [comp, setComp] = useState();
  const [bl, setBL] = useState(false);

  const [open, setOpen] = useState(false);

  const handleChangeFloor = (e) => {
    setFloor(e.target.value);
  };

  // const handleChangeComp = (e) => {
  //   setComp(e.target.value);
  //   props.handleSymbol(e.target.value);
  // };

  const floorItems = floors.map((val, i) => (
    <MenuItem key={i} value={val.code} onClick={() => showNotification("bl")}>
      {val.code}
    </MenuItem>
  ));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    handleLoading();
    handleSymbol(comp);
  };

  // Auto complete
  // const defaultProps = {
  //   options: symbols,
  //   getOptionLabel: (symbol) => symbol.symbol,
  // };

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });
  // const underlineClasses = classNames({
  //   [classes.underlineError]: error,
  //   [classes.underlineSuccess]: success && !error,
  //   [classes.underline]: true,
  // });

  const showNotification = (place) => {
    switch (place) {
      case "bl":
        if (!bl) {
          setBL(true);
          setTimeout(function () {
            setBL(false);
          }, 6000);
        }
        break;
    }
  };

  // Auto Complete
  let data = [];
  for (const i of symbols) {
    let content = {
      key: i["symbol"],
      value: i["displaySymbol"],
    };
    data.push(content);
  }
  return (
    <>
      <Button onClick={handleClickOpen}>
        Search <Search />
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        id="search-setting"
      >
        <DialogTitle>Search company</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={`${classes.formControl} exchange-setting`}>
              <InputLabel id="demo-simple-select-label">Exchanges</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={"US"}
                onChange={handleChangeFloor}
              >
                {floorItems}
              </Select>
            </FormControl>
            <FormControl
              {...formControlProps}
              className={`${
                formControlProps.className + " " + classes.formControl
              }`}
              id="searchbox"
            >
              {labelText !== undefined ? (
                <InputLabel
                  className={classes.labelRoot + labelClasses}
                  htmlFor={id}
                  {...labelProps}
                >
                  {labelText}
                </InputLabel>
              ) : null}
              {/* <Autocomplete
                {...defaultProps}
                id="symbol"
                debug
                renderInput={(params) => (
                  <TextField {...params} label="Symbol" margin="normal" />
                )} */}
              {/* /> */}
              <ReactSearchBox
                placeholder="Symbol"
                value=""
                data={data}
                onSelect={(val) => setComp(val.value)}
              />
              {error ? (
                <Clear
                  className={classes.feedback + " " + classes.labelRootError}
                />
              ) : success ? (
                <Check
                  className={classes.feedback + " " + classes.labelRootSuccess}
                />
              ) : null}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
        <Snackbar
          place="bl"
          color="warning"
          icon={AddAlert}
          message="This app is only support US Exchange at the moment."
          open={bl}
          closeNotification={() => setBL(false)}
          close
          className="cus-warning"
        />
      </Dialog>
    </>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
};
