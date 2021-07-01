import React, { Component } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import authAxios from '../../../services/authAxios';
import './AppRecrutement.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

import "date-fns";

import "moment/locale/fr";

const useStyles = makeStyles((theme) => ({

  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));
class ModifDiplome extends Component {

  state = {
    titre: "",
    description: "",
    index: this.props.dd.map((p, index) => { if (p.props.id == this.props.id) { this.ind = index } })

  };





  componentWillMount = () => {
    this.props.setInfoop({ 'diplome': [...this.props.dd] })
    this.props.setValidiplome(this.props.valDiplome)



    if (this.props.valDiplome != null) {
      for (var i = 0; i < this.props.valDiplome.length; i++) {

        if (this.props.valDiplome[i].id == this.props.id) {
          this.setState({
            titre: this.props.valDiplome[i].titre,
            description: this.props.valDiplome[i].description,

          })
        }
      }



    }


  }
  handleSubmit = event => {


    if (this.props.valDiplome[this.ind] == null && this.state.titre !== "") {


      this.props.valDiplome.push({ titre: this.state.titre, description: this.state.description, id: this.props.id, iddivh: this.props.iddivh, iddiv: this.props.iddiv, d1: this.props.d1, b: true, del: false })

      this.props.setValidiplome(this.props.valDiplome, function () {
        console.log('valdip', this.props.valDiplome)
      });
      this.props.dd[this.ind].props.dipl.titre = this.state.titre;
      this.props.dd[this.ind].props.dipl.description = this.state.description;
      this.props.setInfoop({ 'diplome': [] })

      this.props.setInfoop({ 'diplome': [...this.props.dd] })

      this.props.setPasse(false);

      var req = false;
      const url = window.location.href;

      const id = url.substring(url.lastIndexOf('/') + 1, url.length);

      authAxios.post('Diplome/AddDiplome/' + id, { titre: this.state.titre, description: this.state.description }).then((res) => {


        this.props.valDiplome[this.props.valDiplome.length - 1].idbase = res.data.diplome.id
        this.props.setValidiplome(this.props.valDiplome, function () {
          console.log('idbase', this.props.valDiplome)
        });

      })

    }
    else {

      this.props.valDiplome[this.ind].titre = this.state.titre;
      this.props.valDiplome[this.ind].description = this.state.description;

      this.props.dd[this.ind].props.dipl.titre = this.state.titre;
      this.props.dd[this.ind].props.dipl.description = this.state.description;
      this.props.setValidiplome(this.props.valDiplome)
      this.props.setInfoop({ 'diplome': [] })
      this.props.setInfoop({ 'diplome': [...this.props.dd] })

      const apiUrl = 'https://localhost:44392/api';

      var req = false;
      console.log(req)
      authAxios.put('Diplome/PutDiplome/' + this.props.valDiplome[this.ind].idbase, { id: this.props.valDiplome[this.ind].idbase, titre: this.props.valDiplome[this.ind].titre, description: this.props.valDiplome[this.ind].description }).then((res) => {

      })
      document.getElementById(this.props.iddivh).style.display = "none";
      document.getElementById(this.props.iddiv).removeAttribute('style')



    }

    /*this.props.dd.diplome[this.props.id].props.setInfoop([{'diplome':[this.props.dd.diplome]}])*/

  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    // console.log(date);

    this.setState({ date });
  };

  render() {

    let {
      titre,
      description,
    } = this.state;



    return (

      <div id={this.props.d1} >

        <div className='row-md-6 mb-3 bgd' id={this.props.iddivh} >
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => null}
          >
            <TextValidator
              className="mb-4 w-full"
              label="Titre"
              onChange={this.handleChange}
              type="text"
              name="titre"
              value={titre}
              validators={["required"]}
              errorMessages={['veuillez renseigner ce champ']}
              InputProps={{

                endAdornment: (
                  <InputAdornment position="end">
                    <Icon style={{ fontSize: "1rem", marginRight: 6, color: "#909497" }}> star_half  </Icon>
                  </InputAdornment>
                )
              }}
            />


            <TextValidator
              multiLine
              className="mb-4 w-full "
              label="Description"
              rowsMax={5}

              onChange={this.handleChange}
              type="text"
              name="description"
              value={description}
              validators={["required"]}
              errorMessages={['veuillez renseigner ce champ']}
              InputProps={{

                endAdornment: (
                  <InputAdornment position="end">
                    <Icon style={{ fontSize: "1rem", marginRight: 6, color: "#909497" }}> short_text </Icon>
                  </InputAdornment>
                )
              }}

            />


            <div style={{ marginTop: "-3.5%" }}>
              <Button style={{ border: 'solid 2px  #7467ef', borderRadius: '3px', padding: '5px', backgroundColor: '#7467ef', color: '#FFFFFF' }} type="submit">
                ENREGISTRER
              </Button>
              <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '5px', marginLeft: '1%' }} aria-label="Delete" onClick={e => {
                this.setState({
                  titre: "",
                  description: '',
                });

              }}>
                <Icon style={{ fontSize: "1rem" }}>clear</Icon>
              </IconButton>


            </div>
          </ValidatorForm>

        </div>


      </div>
    )


  }

}

export default ModifDiplome;
