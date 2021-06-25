import React from "react";
import {
  Icon,
  Badge,
  Card,
  Button,
  IconButton,
  Drawer
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import { getTimeDifference } from "utils.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getNotification,
  deleteAllNotification,
  deleteNotification
} from "../../redux/actions/NotificationActions";

const NotificationBar = props => {
  const {
    container,
    theme,
    settings,
    notification: notifcationList = [],
    getNotification,
    deleteAllNotification,
    deleteNotification
  } = props;

  const [panelOpen, setPanelOpen] = React.useState(false);

  function handleDrawerToggle() {
    if (!panelOpen) {
      getNotification();
    }
    setPanelOpen(!panelOpen);
  }
  const parentThemePalette = theme.palette;

  return (
    <ThemeProvider theme={settings.themes[settings.activeTheme]}  width={"50%"} >
      <IconButton
        onClick={handleDrawerToggle}
        style={{
          color:
            parentThemePalette.type === "light"
              ? parentThemePalette.text.secondary
              : parentThemePalette.text.primary
        }}
      >
        <Badge color="secondary" badgeContent={5}>
          <Icon>notifications</Icon>
        </Badge>
      </IconButton>

      <Drawer
        width={"100%"}
        container={container}
        variant="temporary"
        anchor={"right"}
        open={panelOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className="notification" >
          <div className="notification__topbar flex items-center p-4 mb-4">
            <Icon color="primary">notifications</Icon>
            <h5 className="ml-2 my-0 font-medium">Notifications</h5>
          </div>


        </div>
      </Drawer>
    </ThemeProvider>
  );
};

NotificationBar.propTypes = {
  settings: PropTypes.object.isRequired,
  notification: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  getNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  deleteAllNotification: PropTypes.func.isRequired,
  notification: state.notification,
  settings: state.layout.settings
});

export default withStyles(
  {},
  { withTheme: true }
)(
  connect(mapStateToProps, {
    getNotification,
    deleteNotification,
    deleteAllNotification
  })(NotificationBar)
);
