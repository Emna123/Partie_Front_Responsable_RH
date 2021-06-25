
import React, { Component } from "react";
import { InputAdornment, IconButton } from "@material-ui/core";

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

import { green } from "@material-ui/core/colors";

import {
  Button,
  Icon,

  FormControlLabel,
  Checkbox
} from "@material-ui/core";

import "date-fns";
import "moment/locale/fr";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" className="secondary" />;
const checkedIcon = <CheckBoxIcon fontSize="small" className="secondary" />;

const styles = theme => ({
  root: {

    tag: {
      color: "red",      // Hover
      '&[data-focus="false"]': {
        color: 'red',
        borderColor: 'red',
      },
    },
    backgroundColor: "white",
    borderRadius: 30,
    '& options': {
      color: 'red',
    },
    /*'& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },*/


  }

});
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(p => <Checkbox color="default" {...p} />);
class EXReponseEdit extends Component {




  state = {
    chec: false,
    reponse: "",
    id: this.props.id,
    edit: true,
    ind: -1,
    idb: -1,
    idquest: this.props.idquest
  }

  componentWillMount = () => {
    var idquest = -1;
    for (var i = 0; i < this.props.questinfo.length; i++) {
      if (this.props.questinfo[i].idq == this.props.idquest) {
        idquest = i;
      }
    }

    for (var i = 0; i < this.props.questinfo[idquest].repinfo.length; i++) {
      if (this.props.questinfo[idquest].repinfo[i].id == this.props.id) {
        this.setState({
          ind: i, chec: this.props.questinfo[idquest].repinfo[i].chec,
          reponse: this.props.questinfo[idquest].repinfo[i].reponse,
          id: this.props.id,
          idb: this.props.questinfo[idquest].repinfo[i].idb,
          edit: false
        }


        );
      }
    }

  }



  handleSubmit = event => {
    console.log('ind', this.props.questinfo)

    var idquest = -1;
    for (var i = 0; i < this.props.questinfo.length; i++) {
      if (this.props.questinfo[i].idq == this.props.idquest) {
        idquest = i;
      }
    }
    console.log(idquest)
    for (var i = 0; i < this.props.questinfo[idquest].repinfo.length; i++) {
      if (this.props.questinfo[idquest].repinfo[i].id == this.props.id) {
        this.setState({ ind: i });
      }
    }
    if (this.state.ind == -1) { this.props.questinfo[idquest].repinfo.push(this.state) }
    else {
      this.props.questinfo[idquest].repinfo[this.state.ind] = this.state;
    }
    console.log(this.props.questinfo[idquest].repinfo)

    this.props.setquestinfo([])
    this.props.setquestinfo(...[this.props.questinfo])
    this.setState({ edit: false });

  };


  handleEdit = event => {







  };
  handleChange1 = name => event => {

    var idquest = -1;
    for (var i = 0; i < this.props.questinfo.length; i++) {
      if (this.props.questinfo[i].idq == this.props.idquest) {
        idquest = i;
      }
    }


    var x = -1;
    this.setState({ ...this.state, [name]: event.target.checked });

    for (var i = 0; i < this.props.questinfo[idquest].repinfo.length; i++) {
      if (this.props.questinfo[idquest].repinfo[i].id == this.props.id) {
        this.setState({ ind: i }); x = i;
      }
    }
    console.log(this.props.questinfo[idquest].repinfo, x, this.props.id)

    this.props.questinfo[idquest].repinfo[x].chec = this.state.chec;
    this.props.setquestinfo([])
    this.props.setquestinfo(...[this.props.questinfo])
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  };





  render() {
    const { classes } = this.props;

    let {
      duree,
      nombreq,
      reponse,


    } = this.state;

    return (
      <div>
        {this.state.edit == true ? (
          <div id="divv"  >

            <div >
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => null}
              >


                <div className="row" style={{ marginLeft: '2%' }}>
                  <div className="col-md-9" style={{ textAlign: "left" }}>
                    <TextValidator
                      style={{ fontSize: '10px', marginTop: '-2%' }}
                      className="mb-4 w-full"

                      label="&nbsp;Réponse"
                      onChange={this.handleChange}
                      type="text"
                      name="reponse"
                      value={this.state.reponse}
                      validators={["required"]}
                      errorMessages={['veuillez renseigner ce champ']}
                      InputProps={{

                        endAdornment: (
                          <InputAdornment position="end" >
                            <Icon style={{ fontSize: "1rem", marginRight: 6, color: "#909497" }}> call_received </Icon>
                          </InputAdornment>

                        )
                      }}
                    />
                  &ensp;&ensp;

                  </div>
                  <div className="col" style={{ textAlign: "left" }}>

                    <br></br>


                    <Button
                      style={{ margin: '0px', textAlign: "left", marginRight: '0px' }}
                      variant="contained"
                      color="secondary"
                      type="submit"


                    >
                      ENREGISTRER
 </Button>&ensp;&ensp;
&ensp;&ensp;

                    <IconButton style={{
                      border: 'solid 2px  #7467ef', borderRadius: '3px', padding: '6.2px', margin: '1px'
                      , backgroundColor: '#7467ef'
                    }} aria-label="Delete"

                      onClick={e => {
                        this.setState({ reponse: "" });

                      }}>
                      <Icon style={{ fontSize: "1rem", color: '#FFFFFF' }}>clear</Icon>
                    </IconButton>

                  </div>
                </div>





              </ValidatorForm>
            </div>

          </div>
        ) : (
          <div className="row" style={{ textAlign: 'left', marginLeft: '2%' }}>


            <div className="col-8" >

              <FormControlLabel

                style={{ color: "black" }}
                control={
                  <GreenCheckbox
                    value="chec"
                    name="chec"
                    checked={this.state.chec}

                    onChange={e => {
                      console.log(this.state.chec)
                      this.state.chec = !this.state.chec
                      this.setState({ chec: this.state.chec })
                      var idquest = -1;
                      for (var i = 0; i < this.props.questinfo.length; i++) {
                        if (this.props.questinfo[i].idq == this.props.idquest) {
                          idquest = i;
                        }
                      }

                      var x = -1;
                      for (var i = 0; i < this.props.questinfo[idquest].repinfo.length; i++) {
                        if (this.props.questinfo[idquest].repinfo[i].id == this.props.id) {
                          this.setState({ ind: i }); x = i;
                        }
                      }
                      console.log(this.props.questinfo[idquest].repinfo, x, this.props.id, this.state.chec)

                      this.props.questinfo[idquest].repinfo[x].chec = this.state.chec;
                      this.props.setquestinfo([])
                      this.props.setquestinfo(...[this.props.questinfo])
                    }}
                  />
                }
                label={this.state.reponse}
              />  </div>
            <div style={{ textAlign: "right" }} className="col">



              <IconButton style={{
                border: 'solid 2px  #7467ef', borderRadius: '3px', padding: '6px',
                backgroundColor: '#7467ef'
              }} aria-label="Delete"
                onClick={e => {
                  this.setState({ edit: true });

                }}>
                <Icon style={{ fontSize: "1rem", color: '#FFFFFF' }}>create</Icon>
              </IconButton>
              <br></br>


            </div>




          </div>
        )}




      </div>
    )



  }
}
export default withStyles(styles, { withTheme: true })(EXReponseEdit);

