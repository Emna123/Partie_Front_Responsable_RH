
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import authAxios from '../../../services/authAxios';

import {
  setLayoutSettings,
  setDefaultSettings
} from "app/redux/actions/LayoutActions";
import PropTypes from "prop-types";
import {
  Icon,
  IconButton,
  Button,
  FormGroup,
  Tooltip,
  Switch,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper
} from "@material-ui/core";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import Scrollbar from "react-perfect-scrollbar";
import { merge, get, set } from "lodash";
import Layout1Customizer from "./Layout1Customizer";
import Layout2Customizer from "./Layout2Customizer";
import { themeColors } from "../../MatxTheme/themeColors";
import BadgeSelected from "./BadgeSelected";
import EditorForm from "./EditorForm";
import CustomizedSnackbars from "./CustomizedSnackbars";

import { mainThemes, topbarThemes } from "./customizerOptions";
import "./app.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = theme => ({
  root: {}
});

const Mailing = props => {
  const [open, setOpen] = useState(false);
  var [email, setEmail] = useState("")
  var [sujet, setSujet] = useState("")
  var [message, setMessage] = useState("")
  const [oppenn, setopenn] = useState(false)

  let { settings, classes, setLayoutSettings, setDefaultSettings } = props;


  const sendemail = (event) => {
    event.preventDefault();

authAxios.post('/Candidature/SendEmail/'+email,{Subject:sujet,Content:message})
console.log('/Candidature/SendEmail/'+email)
setEmail("");
setSujet("")
setMessage("")
setopenn(true)
  }

  const tooglePanel = () => {
    setOpen(!open);
  };

  let activeTheme = { ...settings.themes[settings.activeTheme] };
  // console.log(activeTheme);

  return (
    <Fragment>
      <Tooltip title="Envoyer E-mail" placement="left">
        <IconButton
          size="small"
          aria-label="delete"
          className="my-3"
          onClick={tooglePanel}
        >

          <Icon >mail</Icon>
        </IconButton>
      </Tooltip>

      {open && (
        <ThemeProvider theme={activeTheme}>
          <div
            className={`matx-customizer pb-8 ${classes.root}`}
            style={{
              backgroundColor: activeTheme.palette.background.default
            }}
          >
            <div className="flex felx-row items-center p-4 mb-4 min-h-64 elevation-z6">
              <Icon color="primary">mail</Icon>
              <h5 className="mb-0 ml-2">Nouveau Message</h5>
              <IconButton onClick={tooglePanel} className="customizer-close">
                <Icon>close</Icon>
              </IconButton>
            </div>
            <Scrollbar >


         
 <section id="contact" style={{marginTop:'-25%',padding:'0%'}}>
 <br></br> <br></br>
<div id="map"></div>

<div className="container text-center">

    <div className="row">
        <div className="col-md-4 col-md-offset-4 col-sm-12 col-xs-12">
            <div className="contact-form-area">
                <form onSubmit={sendemail}>
               

                    <div className="form-group" >
                        <input type="email" className="form-control" placeholder="E-mail" style={{fontSize:'13px'}} onChange={e => setEmail(e.target.value)} value={email}required/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" style={{fontSize:'13px'}}  onChange={e => setSujet(e.target.value)} value={sujet} placeholder="Sujet"/>
                    </div>

                    <div className="form-group">
                        <textarea className="form-control" rows="14" style={{fontSize:'13px'}}  onChange={e => setMessage(e.target.value)} value={message} placeholder="Message ..." required></textarea>
                    </div>
                    <Button
                            style={{ marginLeft: "2.5%" ,width:'150px',fontSize:"13px",height:"35px"}}
                             type="submit"
                            className="mt-4"
                            variant="contained"
                            color="primary"
                          >
                            Envoyer &nbsp;&nbsp; <Icon style={{fontSize:'13px'}}>send</Icon>
            </Button>
                </form>
            </div>	
        </div>
    </div>
</div>   
</section>
<CustomizedSnackbars open={oppenn} setOpen={setopenn}></CustomizedSnackbars>
           </Scrollbar>
          </div>
        </ThemeProvider>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.layout.settings,
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { setLayoutSettings, setDefaultSettings })(
    Mailing
  )
);
