import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from 'axios';
import CustomizedSnackbars from "../CustomizedSnackbars";
import React, { useState, updateState } from 'react';
import { Icon } from "@material-ui/core";
import authAxios from '../../../services/authAxios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertCandidature(props) {

  function handleClickOpen() {
    props.setOpen(true);
  }
  function setFunc() {
    setopenn(() => true);
  }

  function handleClose() {
    props.setOpen(false);
  }

  var [oppenn, setopenn] = useState(false)

  function handleClose1() {


    props.reff.splice(props.ind, 1)
    props.setref(...[props.reff])
    props.setOffre([...[props.offre]])
    authAxios.delete('Candidature/DeleteCandidature/' + props.val.idcand)
    console.log("done")

    props.setOpen(false);
    setFunc();
  }

  return (
    <div>

      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"voulez-vous vraiment supprimer cette candidature de façon permanente?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <span style={{ fontSize: '13px' }}><Icon style={{ fontSize: '13px', margin: '0%' }}> warning</Icon> Attention,
              Les candidature supprimées ne sont pas comptabilisées dans la section <br></br><div style={{ marginLeft: '4%' }}>statistique .</div> <div style={{ marginLeft: '4%' }}>La personne concernée peut postuler à nouveau.</div></span>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
         </Button>
          <Button onClick={handleClose1} color="primary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars open7={oppenn} setOpen7={setopenn} ></CustomizedSnackbars>



    </div>
  );
}
