import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from 'axios';
import history from "history.js";
import CustomizedSnackbars from "../CustomizedSnackbars";
import React, { Component, useEffect, useState, updateState } from 'react';
import authAxios from '../../../services/authAxios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

  function handleClickOpen() {
    props.setOpen(true);
  }
  function setFunc() {
    setopenn(() => true);
  }
  function setFunc5() {
    setopenn5(() => true);
  }
  function handleClose() {
    props.setOpen(false);
  }
  function handleClose5() {
    props.setOpen5(false);
  }
  var [oppenn, setopenn] = useState(false)
  var [oppenn5, setopenn5] = useState(false)

  function handleClose1() {

    console.log(props.val)
 
    props.offre.splice(props.ind, 1)
    props.setOffre(props.offre)

    authAxios.delete('Offre/DeleteOffre/' + props.val)
    console.log("done")
    history.push('/recrutement/offres');

    props.setOpen(false);
    setFunc();
  }
  function handleClose6() {

    console.log(props.val)

    props.settab(...[props.tab])
    props.cand.archiver = true;
   var val=props.cand;
   val.archiver=true;
    authAxios.put('Candidats/ArchiverCandidat/' + props.cand.id, {val}).then((res) => {

      setFunc5();
      props.setOpen5(false);
    })


  }

  return (
    <div>



      <Dialog
        open={props.open5}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose5}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <span style={{ fontSize: '14px', whiteSpace: 'nowrap', marginLeft: '-1%', marginRight: '5%' }}>{"voulez-vous vraiment archiver ce candidat de façon permanente?"}</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>id :</span><span style={{ fontSize: "12px", marginLeft: '50px' }}>{props.cand.id}</span>
            <br></br>
            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}> Nom : </span> <span style={{ fontSize: "12px", marginLeft: '31px' }}>{props.cand.nom}</span>
            <br></br>
            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>  Prenom : </span> <span style={{ fontSize: "12px", marginLeft: '16px' }}>{props.cand.prenom}</span>
            <br></br>
            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>  E-mail : </span><span style={{ fontSize: "12px", marginLeft: '25px' }}> {props.cand.email}</span>
            <br></br>
            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>  Tel : </span><span style={{ fontSize: "12px", marginLeft: '43px' }}> {props.cand.phoneNumber}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose5} color="primary">
            Non
         </Button>
          <Button onClick={handleClose6} color="primary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars open5={oppenn5} setOpen5={setopenn5} ></CustomizedSnackbars>

    </div>
  );
}
