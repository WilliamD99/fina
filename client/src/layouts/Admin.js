import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import "assets/jss/customize.css";

import bgImage from "assets/img/sidebar-2.jpg";

import DashBoard from "views/Dashboard/Dashboard";
import About from "views/UserProfile/UserProfile";
import Finance from "views/TableList/TableList";
let ps;

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  let getRoutes = () => {
    if (
      rest.candle !== undefined &&
      rest.peerData !== undefined &&
      rest.news !== undefined &&
      rest.basic !== undefined &&
      rest.buy !== undefined &&
      rest.earning !== undefined
    ) {
      return (
        <>
          <Route
            path="/admin/dashboard"
            render={() => {
              return (
                <DashBoard
                  profile={rest.profile}
                  candle={rest.candle}
                  peers={rest.peers}
                  peerData={rest.peerData}
                  earning={rest.earning}
                  buy={rest.buy}
                  handleSearch={rest.handleSymbol}
                  handleLoading={rest.handleLoading}
                  addPeer={rest.addPeer}
                />
              );
            }}
          />
          <Route
            path="/admin/about"
            render={() => {
              return <About news={rest.news} profile={rest.profile} />;
            }}
          />
          <Route
            path="/admin/finance"
            render={() => {
              return <Finance basic={rest.basic} />;
            }}
          />
        </>
      );
    } else {
      return (
        <div className="loading-circle">
          <CircularProgress color="secondary" />
        </div>
      );
    }
  };
  const switchRoutes = <>{getRoutes()}</>;
  // styles
  const classes = useStyles();

  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  // Check if Object is empty
  let isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        compName={rest.profile !== undefined ? rest.profile.name : ""}
        userInfo={rest.user !== undefined ? rest.user : ""}
        link={rest.profile !== undefined ? rest.profile.weburl : ""}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        floors={rest.floors}
        symbols={rest.symbols}
        handleLoading={rest.handleLoading}
        handleSymbol={rest.handleSymbol}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          floors={rest.floors}
          symbols={rest.symbols}
          handleLoading={rest.handleLoading}
          handleSymbol={rest.handleSymbol}
          handleDrawerToggle={handleDrawerToggle}
          handleLogout={rest.handleLogout}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
