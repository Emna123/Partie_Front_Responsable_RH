import React, { Component } from "react";
import { Card, Grid, Button } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { resetPassword } from "../../redux/actions/LoginActions";

class ForgotPassword extends Component {
  


  render() {


    return (
      <div className="signup flex justify-center w-full h-full-screen" >
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center items-center h-full">
                  <img src="/assets/images/illustrations/i1.png" alt="" />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-9 h-full bg-light-gray position-relative">
                  <div>Si vous appuyez sur envoyer ,<br></br> nous enverrons votre code de réutilisation à : <br></br> areaehirer.recrutement@gmail.com  </div><br></br>
                    <div className="flex items-center">
                      <Button variant="contained" color="primary"   onClick={() =>
                        this.props.history.push("/session/resetpass")
                      }>
                        Envoyer
                      </Button>
                      <span className="ml-4 mr-2">or</span>
                      <Button
                       className="text-primary"

                        onClick={() =>
                          this.props.history.push("/session/signin")
                        }
                      >
                        S'identifier?
                      </Button>
                    </div>
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
  resetPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withRouter(
  connect(mapStateToProps, { resetPassword })(ForgotPassword)
);
