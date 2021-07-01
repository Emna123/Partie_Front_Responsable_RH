import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import {PostData} from '../../services/PostData';

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {SendCode} from '../../services/SendCode';
import axios from 'axios';

const styles = theme => ({
  wrapper: {
    position: "relative"
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});
class ResetPass extends Component {

  state = {
    email: "",
    password: "",
    passwordc: "",
    hide:false,
    code:"",
    pass:"",
    errors:"",
    result:0
    };
 
 
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleFormSubmit = event => { 
    if (this.state.result != parseInt(this.state.code)) {
      this.setState(
       { hide:true,errors:"code invalide !"} 
      )
     

   }
   else if (this.state.password !== this.state.passwordc) { this.setState({ hide:true,errors:"Mot de passe confirmer est invalide !"})} 
   else  {
     
    fetch ("https://localhost:44392/api/Authentication/UpdateRH",{
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'},
        body: JSON.stringify({
          Email:"areaehirer.recrutement@gmail.com",
          password:this.state.password,
          code:this.state.result
        })
        }).then(data => data.json())
        
    this.props.history.push("/session/signin")

 
  };

  

  
  };
 
  sendemail = event => { 
 
    SendCode('ResetPass',this.state).then ((result)=>{
      this.setState(
        { result:result} 
       )
       localStorage.setItem('Code',"") ;
       localStorage.setItem('Code',result) ;
  })
   
 
        
};
  render() {
    const dataFromParent = this.state.result;
    let {email,password, passwordc,hide,code,errors } = this.state;
    let { classes } = this.props;
    return (
      
     
      <div className="signup flex justify-center w-full h-full-screen" onLoad={this.sendemail} >
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center items-center h-full">
                  <img src="/assets/images/illustrations/i1.png" alt="" />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-9 h-full bg-light-gray position-relative" >
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}
                  >
          {hide ? (
                    <Alert  severity="error"  >{errors}</Alert>
                    ) : (
                      <span></span>

      )}
                  
                   <TextValidator
                     style={{marginTop:60}}
                      className="mb-3 w-full"
                      variant="outlined"
                      label="Code"
                      onChange={this.handleChange}
                      type="text"
                      name="code"
                      value={code}

                      validators={["required", "isNumber"]}
                      errorMessages={[
                        "Ce champ est requis",
                        "code invalide"
                      ]}
                    />
                    
                    <TextValidator
                      className="mb-3 w-full"
                      label="Nouveau mot de passe"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={[  "required",
                      "matchRegexp:^[A-Z]+(?=.*[a-zA-Z])+(?=.*[0-9])+(?=.*[!@#$%^&])","minStringLength: 6"]}
                      errorMessages={["Ce champ est requis","Le mot de passe doit contenir 6 caractères,la première est en majuscule, une minuscule, un chiffre et un caractère de casse spéciale","Le mot de passe doit contenir au moins 6 caractères"]}
                    />
                    <TextValidator
                      className="mb-3 w-full"
                      label="Confirmer mot de passe"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="passwordc"
                      type="password"
                      value={passwordc}
                      validators={['required']}
                      errorMessages={['Ce champ est requis']}
                    />
                  
                    <div className="flex flex-wrap items-center mb-4" >
                      <div  style={{marginLeft:50}}>
                        <Button
                          variant="contained"
                          color="primary"
                          
                          type="submit"
                        >
                          Réinitialiser 
                        </Button>
                      
                          <Button
                          style={{marginLeft:10}}
                      className="text-primary"
                      onClick={() =>
                        this.props.history.push("/session/signin")
                      }
                    >
                      S'identifier?
                    </Button>
                      </div>
                    
                    </div>
                   
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ResetPass);
