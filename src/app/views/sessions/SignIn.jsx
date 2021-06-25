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
import axios from 'axios';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
import 'bootstrap/dist/css/bootstrap.min.css';

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
class SignIn extends Component {
  constructor(props) {
  super(props);
  this.state = {
    email: "",
    password: "",
    hide:false
    }};
 
  handleChange = event => {
  
    this.setState({
      [event.target.name]: event.target.value
    });
    
  };
  handleFormSubmit = event => {
    fetch ("https://localhost:44392/api/Authentication/LoginRH",{
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'},rejectUnauthorized: false,
        body: JSON.stringify({
          Email:this.state.email,
          mdp:this.state.password
        })
        }).then(data => data.json())
          .then((res)=>{
      
       console.log(res)
        if (res.status==401 ) {
          this.setState(
           { hide:true} 
          )
       }
       else{   
        localStorage.setItem('access_token',"") ;
        localStorage.setItem('access_token',res.token) ;
        localStorage.setItem('UserEmail',"") ;
        localStorage.setItem('UserEmail',res.user.email) ;
        localStorage.setItem('UserPassword',"") ;
        localStorage.setItem('UserPassword',res.user.mdp) ;
        localStorage.setItem('refresh_token',"") ;
        localStorage.setItem('refresh_token',res.refreshtoken) ;

        this.props.loginWithEmailAndPassword({ ...this.state });    

        }
   
      })
    
    
  };
  render() {
    let { email, password } = this.state;
    let { classes } = this.props;
    const hide=this.state.hide;
    return (
      <div className="signup flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center items-center h-full">
                  <img src="/assets/images/illustrations/i1.png" alt="" />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-9 h-full bg-light-gray position-relative"  >
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}
                  >
                    {hide ? (
                    <Alert  severity="error"  >Email ou mot de passe incorrect !  </Alert>
                    ) : (
                      <span></span>

      )}
      <div>
                    
                    <TextValidator
                     style={{marginTop:45}}
                      className="mb-6 w-full"
                      variant="outlined"
                      label="E-mail"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}

                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "Ce champ est requis",
                        "E-mail n'est pas valide"
                      ]}
                    />
                    <TextValidator
                      className="mb-3 w-full"
                      label="Mot de passe"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["Ce champ est requis"]}
                    />
                  </div>
                    <div className="flex flex-wrap items-center mb-4" >
                      <div  style={{marginLeft:50}}>
                        <Button
                          variant="contained"
                          color="primary"
                          
                          disabled={this.props.login.loading}
                          type="submit"
                        >
                          S'identifier
                        </Button>
                        {this.props.login.loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                          <Button
                          style={{marginLeft:10}}
                      className="text-primary"
                      onClick={() =>
                        this.props.history.push("/session/forgot-password")
                      }
                    >
                     Mot de passe oublié?
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

const mapStateToProps = state => ({
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn))
);