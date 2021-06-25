import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";





const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: theme.palette.primary.main
  },



  icon: {
    fontSize: 20,
    color: 'white'
  },
  iconVariant: {
    opacity: 0.9,
    fontSize: 15,

    marginRight: theme.spacing(1),
    color: 'white'

  },
  message: {
    display: "flex",
    alignItems: "center",
    color: 'white',
    fontSize: 13,
    whiteSpace: 'nowrap'


  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles2();



  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen(false);
  }

  function handleClose1(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen1(false);
  }
  function handleClose7(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen7(false);
  }
  function handleClose5(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    window.location.reload();

    props.setOpen5(false);
  }
  function handleClose2(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    window.location.href = 'http://localhost:3000/recrutement/offres'
    props.setOpen2(false);

  }
  function handleClose3(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen3(false);
  }
  function handleClose10(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    window.location.href = 'http://localhost:3000/recrutement/offres'

    props.setOpen10(false);
  }
  function handleClose4(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen4(false);
  }
  function handleClose8(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    window.location.href = 'http://localhost:3000/recrutement/offres'

    props.setOpen8(false);
  }
  function handleClose9(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    window.location.href = 'http://localhost:3000/recrutement/offres'

    props.setOpen9(false);
  }
  return (
    <div>

      <Snackbar
        color="white"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="success"
          color="white"

          message="Message d'acceptation a été envoyé!"
        />
      </Snackbar>

      <Snackbar
        color="white"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open1}
        autoHideDuration={6000}
        onClose={handleClose1}
      >
        <MySnackbarContentWrapper
          onClose={handleClose1}
          variant="success"
          color="white"

          message="Message de réjection a été envoyé!"
        />
      </Snackbar>
      <Snackbar
        color="white"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open2}
        autoHideDuration={6000}
        onClose={handleClose2}
      >
        <MySnackbarContentWrapper
          onClose={handleClose2}
          variant="success"
          color="white"

          message="Offre supprimée!"
        />
      </Snackbar>

      <Snackbar
        color="white"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open3}
        autoHideDuration={6000}
        onClose={handleClose3}
      >
        <MySnackbarContentWrapper
          onClose={handleClose3}
          variant="success"
          color="white"

          message="Offre relancée !"
        />
      </Snackbar>
      <Snackbar
        color="white"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open4}
        autoHideDuration={6000}
        onClose={handleClose4}
      >
        <MySnackbarContentWrapper
          onClose={handleClose4}
          variant="success"
          color="white"

          message="Offre fermée !"
        />
      </Snackbar>
      <Snackbar
        color="white"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open5}
        autoHideDuration={6000}
        onClose={handleClose5}
      >
        <MySnackbarContentWrapper
          onClose={handleClose5}
          variant="success"
          color="white"

          message="Candidat archivé !"
        />
      </Snackbar>
      <Snackbar
        color="white"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open7}
        autoHideDuration={6000}
        onClose={handleClose7}
      >
        <MySnackbarContentWrapper
          onClose={handleClose7}
          variant="success"
          color="white"

          message="Candidature supprimée !"
        />
      </Snackbar>
      <Snackbar
        color="white"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open8}
        autoHideDuration={6000}
        onClose={handleClose8}
      >
        <MySnackbarContentWrapper
          onClose={handleClose8}
          variant="success"
          color="white"

          message="Examen créé avec succès !"
        />
      </Snackbar>
      <Snackbar
        color="white"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open9}
        autoHideDuration={6000}
        onClose={handleClose9}
      >
        <MySnackbarContentWrapper
          onClose={handleClose9}
          variant="success"
          color="white"

          message="Tous les changements ont été appliqués !"
        />
      </Snackbar>
      <Snackbar
        color="white"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={props.open10}
        autoHideDuration={6000}
        onClose={handleClose10}
      >
        <MySnackbarContentWrapper
          onClose={handleClose10}
          variant="success"
          color="white"

          message="Examen supprimée !"
        />
      </Snackbar>
    </div>

  );
}
