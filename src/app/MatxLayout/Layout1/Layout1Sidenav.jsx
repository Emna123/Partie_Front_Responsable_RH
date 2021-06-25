import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Icon, MenuItem, Tooltip, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {
  setLayoutSettings,
  setDefaultSettings
} from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import { withRouter } from "react-router-dom";
import { MatxMenu } from "matx";
import Sidenav from "../SharedCompoents/Sidenav";
import Brand from "../SharedCompoents/Brand";
import SidenavTheme from "../MatxTheme/SidenavTheme/SidenavTheme";
import { isMdScreen } from "utils";
import { merge } from "lodash";
import { Link } from "react-router-dom";

const dat={ currentTime: new Date().toLocaleString() };

const styles = theme => ({});

const IconButtonWhite = withStyles(theme => ({
  root: {
    backgroundColor: "transparent",
    padding: "5px"
  }
}))(IconButton);

const IconSmall = withStyles(() => ({
  root: {
    fontSize: "1rem"
  }
}))(Icon);
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
class Layout1Sidenav extends Component {

  state = {
    hidden: true,
    currentDateTime: date
  };

  componentDidMount() {
    // CLOSE SIDENAV ON ROUTE CHANGE ON MOBILE
    this.unlistenRouteChange = this.props.history.listen((location, action) => {
      if (isMdScreen()) {
        this.updateSidebarMode({ mode: "close" });
      }
    });

    setTimeout(() => {
      this.setState({ hidden: false });
    }, 400);
  }

  componentWillUnmount() {
    this.unlistenRouteChange();
  }

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings, setDefaultSettings } = this.props;
    const updatedSettings = merge({}, settings, {
      layout1Settings: {
        leftSidebar: {
          ...sidebarSettings
        }
      }
    });

    setLayoutSettings(updatedSettings);
    setDefaultSettings(updatedSettings);
  };

  handleSidenavToggle = () => {
    let {
      settings: {
        layout1Settings: {
          leftSidebar: { mode }
        }
      }
    } = this.props;
    console.log(mode);

    this.updateSidebarMode({ mode: mode === "compact" ? "full" : "compact" });
  };

  handleSignOut = () => {
    this.props.logoutUser();
  };

  renderLogoSwitch = () => (
    // Open Brand component file to replace logo and text
    <Brand>
      <Switch
        className="sidenav__toggle show-on-pc"
        onChange={this.handleSidenavToggle}
        checked={
          !(this.props.settings.layout1Settings.leftSidebar.mode === "full")
        }
        color="secondary"
      />
    </Brand>
  );

  renderUser = () => {
    let { user } = this.props;
    return (
      <div className="sidenav__user">
        <div className="username-photo">
          <img src="/assets/images/i1.png" alt="user" />
        </div>
        <div className="ml-4">
          <span className="username">
            {/* <Icon>lock</Icon> */}
            { this.state.currentDateTime }          </span>
          <div className="user__menu">
            <MatxMenu
              menuButton={
                <Tooltip title="Settings">
                  <IconButtonWhite
                    aria-label="Delete"
                    className=""
                    size="small"
                  >
                    <IconSmall> settings </IconSmall>
                  </IconButtonWhite>
                </Tooltip>
              }
            >
              <MenuItem className="flex items-center">
                <Icon> home </Icon>
                <Link to={"/dashboard/analytics" }style={{color:'white'}}>   <span className="pl-4"> Accueil </span></Link>
              </MenuItem>
              <MenuItem className="flex items-center">
                <Icon> settings </Icon>
                <Link to={"/session/forgot-password" }style={{color:'white'}}>  <span className="pl-4">Changer mot de passe  </span></Link>
              </MenuItem>
            </MatxMenu>

            
            <Tooltip title="Sign out" style={{marginLeft:10}}>
              <IconButtonWhite
                aria-label="Delete"
                className=""
                size="small"
                onClick={this.handleSignOut}
              >
                <IconSmall>exit_to_app</IconSmall>
              </IconButtonWhite>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { theme, settings } = this.props;
    const sidenavTheme =
      settings.themes[settings.layout1Settings.leftSidebar.theme] || theme;
    return (
      <SidenavTheme theme={sidenavTheme} settings={settings}>
        <div className="sidenav">
          <div
            className="sidenav__hold"
            style={{
              backgroundImage: `url(${settings.layout1Settings.leftSidebar.bgImgURL})`
            }}
          >
            {!this.state.hidden && (
              <Fragment>
                {this.renderLogoSwitch()}
                <Sidenav>{this.renderUser()}</Sidenav>
              </Fragment>
            )}
          </div>
        </div>
      </SidenavTheme>
    );
  }
}

Layout1Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setDefaultSettings: PropTypes.func.isRequired,
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: state.user,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
      setLayoutSettings,
      setDefaultSettings,
      logoutUser
    })(Layout1Sidenav)
  )
);
