import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from 'axios';
import CustomizedSnackbars from "../CustomizedSnackbars";
import React, { Component, useEffect, useState, updateState } from 'react';
import authAxios from '../../../services/authAxios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDeleteExemain(props) {


  function setFunc() {
    props.setopenalert();
  }
  function handleClose() {
    props.setopenalert();
  }
  var [oppenn, setopenn] = useState(false)

  function handleClose1() {

 


    authAxios.delete('Examen/DeleteExamen/' + props.idExamen)

    props.setopenalert();
    setFunc();
    setopenn(true)
    //window.location.href='http://localhost:3000/recrutement/offres'

  }

  return (
    <div>

      <Dialog
        open={props.openalert}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" >
          <div style={{ fontSize: '15px' }}>  {"voulez-vous vraiment supprimer l'examen de l'offre " + props.nomOffre + " ?"}</div>
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
         </Button>
          <Button onClick={handleClose1} color="primary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars open10={oppenn} setOpen10={setopenn} ></CustomizedSnackbars>

    </div>
  );
}
