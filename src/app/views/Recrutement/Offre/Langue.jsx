import React, { Component } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";
import "moment/locale/fr";
import {langue} from "./langues"
import {suggestions} from "./LangueIndex"


const icon = <CheckBoxOutlineBlankIcon fontSize="small" className="secondary" />;
const checkedIcon = <CheckBoxIcon fontSize="small" className="secondary" />;
const useStyles = makeStyles((theme) => ({

  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));
class Langue extends Component {

  state = {
    titre: "",
    niveau: "",
    type: "Optionnel",
    index: this.props.dd.map((p, index) => { if (p.props.id == this.props.id) { this.ind = index } })

  };





  componentWillMount = () => {
    this.props.setInfoop3({ 'langue': [...this.props.dd] })
    this.props.setdatalangue(this.props.datalangue)



    if (this.props.datalangue != null) {
      for (var i = 0; i < this.props.datalangue.length; i++) {

        if (this.props.datalangue[i].id == this.props.id) {
          this.setState({
            titre: this.props.datalangue[i].titre,
            niveau: this.props.datalangue[i].niveau,
            type: this.props.datalangue[i].type,

          })
        }
      }



    }


  }
  handleSubmit = event => {


    if (this.props.datalangue[this.ind] == null && this.state.titre !== "") {


      this.props.datalangue.push({ titre: this.state.titre, niveau: this.state.niveau, type: this.state.type, id: this.props.id, iddivh: this.props.iddivh, iddiv: this.props.iddiv, d1: this.props.d1, b: true, del: false })

      this.props.setdatalangue([], function () {
        console.log('valdip', this.props.datalangue)
      });
      this.props.setdatalangue(this.props.datalangue, function () {
        console.log('valdip', this.props.datalangue)
      });
      this.props.dd[this.ind].props.dipl.titre = this.state.titre;
      this.props.dd[this.ind].props.dipl.niveau = this.state.niveau;
      this.props.dd[this.ind].props.dipl.type = this.state.type;
      this.props.setInfoop3({ 'langue': [] })

      this.props.setInfoop3({ 'langue': [...this.props.dd] })

      this.props.setPasse4(false);
    }
    else {

      console.log(this.props.datalangue)
      this.props.datalangue[this.ind].titre = this.state.titre;
      this.props.datalangue[this.ind].niveau = this.state.niveau;
      this.props.datalangue[this.ind].type = this.state.type;

      this.props.dd[this.ind].props.dipl.titre = this.state.titre;
      this.props.dd[this.ind].props.dipl.niveau = this.state.niveau;
      this.props.dd[this.ind].props.dipl.type = this.state.type;
      this.props.setdatalangue(this.props.datalangue)
      this.props.setInfoop3({ 'langue': [] })

      this.props.setInfoop3({ 'langue': [...this.props.dd] })

      document.getElementById(this.props.iddivh).style.display = "none";
      document.getElementById(this.props.iddiv).style.display = "block";



    }

    /*this.props.dd.langue[this.props.id].props.setInfoop([{'langue':[this.props.dd.langue]}])*/

  };


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };



  render() {

    let {
      titre,
      niveau,
      type
    } = this.state;

return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => null}
      >
        <div id={this.props.d1} >
          <div id={this.props.iddivh} >
            <div  className="row"  >
              <div className='col-7'>
              <Autocomplete
                value={titre}
                name='titre'
                style={{ width:'100%'}}

                onChange={(event, value) => { this.setState({ titre: value }) }}
                options={langue.map(option => option.label)}

                // style={{ width: 100 }}
                disableClearable={true}
                renderOption={(option, { selected }) => (

                  <span style={{ color: '#000000', fontSize: '10px', marginLeft: "-10px" }}>{option}</span>

                )}
                renderInput={params => (
                  <TextValidator
                    {...params}
                    value={titre}
                    validators={["required"]}
                    errorMessages={['Langue invalide']}
                    label="Langue"
                    variant="standard"
                  />
                )}
              />

</div>
<div className='col-5'>
              <Autocomplete
                value={niveau}
                name='niveau'
                style={{ width: '100%'  }}

                onChange={(event, value) => { this.setState({ niveau: value }) }}
                options={suggestions.map(option => option.label)}

                // style={{ width: 100 }}
                disableClearable={true}
                renderOption={(option, { selected }) => (

                  <span style={{ color: '#000000', fontSize: '10px', marginLeft: "-10px" }}>{option}</span>

                )}
                renderInput={params => (
                  <TextValidator
                    {...params}
                    value={niveau}
                    validators={["required"]}
                    errorMessages={['Niveau invalide']}
                    label="Niveau"
                    variant="standard"
                  />
                )}
              />

</div>
            </div>
            <div style={{ textAlign: 'left', marginTop: "2%" }}>
              <Button style={{ border: 'solid 2px  #7467ef', borderRadius: '3px', backgroundColor: '#7467ef', color: '#FFFFFF' }} type="submit">
                ENREGISTRER
           </Button>
              <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', marginLeft: "1%", padding: '6px' }} aria-label="Delete" onClick={e => {
                this.setState({
                  titre: "", nombrep: "",
                  titre: "",
                  niveau: '',
                  type: "Optionnel"
                });
              }}>
                <Icon style={{ fontSize: "1rem" }}>clear</Icon>
              </IconButton>


            </div>
          </div>


        </div>
      </ValidatorForm>

    );
  }
}

export default Langue;
