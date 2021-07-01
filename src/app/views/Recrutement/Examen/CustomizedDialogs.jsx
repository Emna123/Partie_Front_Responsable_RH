import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Icon } from "@material-ui/core";
import history from "history.js";
import AlertDeleteExemain from "./AlertDeleteExemain";
import React, { Component, useEffect, useState, updateState } from 'react';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

class CustomizedDialogs extends React.Component {
  state = {
    openalert: false

  };
  handleClose = () => {
    this.props.setopen(false);
  };
  handleClose1 = () => {
    this.props.setopen1(false);
  };
  handleClose2 = () => {
    this.props.setopen2(false);
  };
  setopenalert = () => {
    this.setState({ openalert: false });
  };

  render() {
    return (
      <div>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose} >
            <div style={{ fontSize: '14px', marginTop: '1%',marginRight:'60px' }}><Icon style={{ fontSize: '13px', margin: '0%' }}> warning</Icon> Un problème est survenu lors de la création de l'examen !</div >
          </DialogTitle>
          <DialogContent dividers>

            <Typography gutterBottom>
              {this.props.mes}
            </Typography>
          </DialogContent>

        </Dialog>
        <Dialog
          onClose={this.handleClose1}
          aria-labelledby="customized-dialog-title"
          open={this.props.open1}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose1} style={{ width: '200%' }}>
            <pre>                                                       </pre>


            <Button
              style={{ marginTop: '2%', width: "40%", paddingTop: '2%', paddingBottom: '2%' }}
              className="ml-4"
              variant="contained"
              width={200}
              color="primary"
              onClick={e => {
                history.push('/recrutement/EditExamen/' + this.props.idoffre);
              }}

            >
              <Icon style={{ fontSize: "12px", padding: 0, marginLeft: '5%', marginRight: '5%' }}>mode_edit</Icon>  <span style={{ paddingRight: '12%' }}> Éditer</span>
            </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
              style={{ marginTop: '2%', width: "40%", paddingTop: '2%', paddingBottom: '2%' }}
              className="ml-4"
              variant="contained"
              color="secondary"

              onClick={e => {
                this.props.setopen1(false);
                this.setState({ openalert: true });

              }}

            >
              <Icon style={{ fontSize: "14px", marginLeft: '5%', marginRight: '5%' }}>delete</Icon>  <span style={{ paddingRight: '8%' }}>  Supprimer</span>
            </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </DialogTitle>
          <DialogContent >

          </DialogContent>

        </Dialog>
        <Dialog
          onClose={this.handleClose2}
          aria-labelledby="customized-dialog-title"
          open={this.props.open2}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose2} >

            <div style={{ fontSize: '13px', marginRight: '5%', marginTop: '2%' }}>  {this.props.msg}</div >
          </DialogTitle>

        </Dialog>
        <AlertDeleteExemain nomOffre={this.props.nomOffre} idoffre={this.props.idoffre} idExamen={this.props.idExamen} openalert={this.state.openalert} setopenalert={this.setopenalert} ></AlertDeleteExemain>
      </div>
    );
  }
}

export default CustomizedDialogs;
