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

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { useGlobalState } from "index.js";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

function createRoutes(user) {
  let newRoutes = [];
  if (!user) {
    newRoutes = routes.filter((r) => {
      return defaultRoutes.includes(r.name)
    }).map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  }
  else {
    newRoutes = routes.filter((r) => {
      return manufacturerRoutes.includes(r.name)
    }).map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  }
}

const useStyles = makeStyles(styles);

const workerRoutes = ["Dashboard", "Job Search"];
const manufacturerRoutes = ["Dashboard", "Job Postings"];
const buyerRoutes = ["Dashboard"];
const defaultRoutes = ["Dashboard", "Register", "Login"];



export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [state, dispatch] = useGlobalState();

  console.log(state.user)
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
        suppressScrollY: false
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
  const zRoutes = routes.filter((r) => {
    if (!state.user)
      return defaultRoutes.includes(r.name);
    else if (state.user.type == "manufacturer")
      return manufacturerRoutes.includes(r.name);
    else if (state.user.type == "worker")
      return workerRoutes.includes(r.name);
    else if (state.user.type == "buyer")
      return buyerRoutes.includes(r.name);
  });
  return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={zRoutes}
          logoText={"ConnectALL"}
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={mainPanel}>
          <Navbar
            routes={zRoutes}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>
  );
}
