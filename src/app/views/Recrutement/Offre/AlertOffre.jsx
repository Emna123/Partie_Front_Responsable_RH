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
import { Icon } from "@material-ui/core";
import authAxios from '../../../services/authAxios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertOffre(props) {

  function handleClickOpen() {
    props.setOpen(true);
  }
 
  function handleClose() {
    props.setOpen(false);
  }

  var [oppenn, setopenn] = useState(false)

  function handleClose1() {
    oppenn=true
    setopenn(() => oppenn);

  
         props.offre.splice(props.ind,1)
         props.setOffre(props.offre)
         for(var i=0;i<props.of1.length;i++)
         {
           if(props.of1[i].id==props.val)
           {
            props.of1.splice(i,1)

           }
         }
   
         props.setOf1(props.of1)

    authAxios.delete('/Offre/DeleteOffre/' + props.val).then((res) => {
      console.log("done")
    props.setOpen(false);
    })
    
   
   
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
          {"voulez-vous vraiment supprimer cette offre de façon permanente?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
        <Icon style={{fontSize:'13px',margin:'0%'}}> warning</Icon> Attention,
              Les offres supprimées ne sont pas comptabilisées dans la section statistique.
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
      <CustomizedSnackbars open2={oppenn} setOpen2={setopenn} ></CustomizedSnackbars>



    </div>
  );
}
