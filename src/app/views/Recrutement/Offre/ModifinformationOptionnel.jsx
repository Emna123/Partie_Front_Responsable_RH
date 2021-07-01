import React, { Component, useState } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import '../AppOffre.css'

import './AppRecrutement.css'
import 'bootstrap/dist/css/bootstrap.min.css';

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
import authAxios from '../../../services/authAxios';

import "moment/locale/fr";
import ModifDiplome from "./ModifDiplome";
import ModifCompetance from "./ModifCompetance";
import ModifLangue from "./ModifLangue";
import Modifquestionnaire from "./Modifquestionnaire";
import { TimerSharp, ViewArrayOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({

  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

class ModifinformationOptionnel extends Component {

  state = {
    diplome: this.props.infoop.diplome,
    langue: this.props.infoop3.langue,
    questionnaire: this.props.infoop1.questionnaire,
    competance: this.props.infoop2.competance,

  };

  componentWillMount = () => {


    const url = window.location.href;
    console.log("url", url)

    const id = url.substring(url.lastIndexOf('/') + 1, url.length);


    authAxios.get('Offre/getOffre/' + id).then((res) => {
      console.log('offre', res.data.diplome)
      this.props.setValidiplome([])
      this.props.setInfoop({ 'diplome': [] })

      for (var i = 0; i < res.data.diplome.length; i++) {
        var type = ""
        if (res.data.diplome[i].require == true) {
          type = 'Essentiel';
        }
        else { type = 'Optionnel'; }
        this.props.valDiplome.push({ titre: res.data.diplome[i].titre, description: res.data.diplome[i].description, type: type, id: i, iddivh: 'd1h' + i, iddiv: "ds1" + i, d1: "d1" + i, b: true, del: false, idbase: res.data.diplome[i].id })
      }

      this.setState({ 'diplome': [] })

      for (var i = 0; i < res.data.diplome.length; i++) {

        this.state.diplome.push(<ModifDiplome setPasse={this.props.setPasse}
          iddiv={"ds1" + i} iddivh={"d1h" + i} d1={"d1" + i} id={i} st2={this.props.st2} dipl={{
            titre: this.props.valDiplome[i].titre,
            description: this.props.valDiplome[i].description,
            type: this.props.valDiplome[i].type

          }} dd={this.state.diplome} valDiplome={this.props.valDiplome} setInfoop={this.props.setInfoop} info={this.props.infoop} valDiplome={this.props.valDiplome} setValidiplome={this.props.setValidiplome} ></ModifDiplome>)
      }

      this.setState({ 'diplome': [...this.state.diplome] })
      this.props.setIndice(this.props.valDiplome.length - 1)

      this.props.setValidiplome([...this.props.valDiplome])

      this.props.setInfoop({ 'diplome': [] })

      this.props.setInfoop({ 'diplome': [...this.props.infoop.diplome] })

      //Questionnaire
      this.props.setdataquestionnaire([])
      this.setState({ 'questionnaire': [] })
      this.props.setInfoop1({ 'questionnaire': [] })

      for (var i = 0; i < res.data.questionnaire.length; i++) {
        var type = ""
        if (res.data.questionnaire[i].require == true) {
          type = 'Essentiel';
        }
        else { type = 'Optionnel'; }
        this.props.dataquestionnaire.push({ titre: res.data.questionnaire[i].titre, description: res.data.questionnaire[i].description, type: type, id: i, iddivh: 'd2h' + i, iddiv: "ds2" + i, d1: "d2" + i, b: true, del: false, idbase: res.data.questionnaire[i].id })
      }

      for (var i = 0; i < res.data.questionnaire.length; i++) {

        this.state.questionnaire.push(<Modifquestionnaire setPasse2={this.props.setPasse2}
          iddiv={"ds2" + i} iddivh={"d2h" + i} d1={"d2" + i} id={i} st2={this.props.st2} dipl={{
            titre: this.props.dataquestionnaire[i].titre,
            description: this.props.dataquestionnaire[i].description,
            type: this.props.dataquestionnaire[i].type

          }} dd={this.state.questionnaire} dataquestionnaire={this.props.dataquestionnaire} setInfoop1={this.props.setInfoop1} info={this.props.infoop1} setdataquestionnaire={this.props.setdataquestionnaire} ></Modifquestionnaire>)
      }

      this.setState({ 'questionnaire': [...this.state.questionnaire] })
      this.props.setIndiceq(this.props.dataquestionnaire.length - 1)

      this.props.setdataquestionnaire([...this.props.dataquestionnaire])
      this.props.setInfoop1({ 'questionnaire': [] })

      this.props.setInfoop1({ 'questionnaire': [...this.props.infoop1.questionnaire] })

//Competance
this.setState({ 'competance': [] })
this.props.setdatacompetance([])
this.props.setInfoop2({ 'competance': [] })


for (var i = 0; i < res.data.competence.length; i++) {
  var type = ""
  if (res.data.competence[i].require == true) {
    type = 'Essentiel';
  }
  else { type = 'Optionnel'; }
  this.props.datacompetance.push({ titre: res.data.competence[i].titre, niveau: res.data.competence[i].niveau, type: type, id: i, iddivh: 'd3h' + i, iddiv: "ds3" + i, d1: "d3" + i, b: true, del: false, idbase: res.data.competence[i].id })
}

for (var i = 0; i < res.data.competence.length; i++) {

  this.state.competance.push(<ModifCompetance setPasse3={this.props.setPasse3}
    iddiv={"ds3" + i} iddivh={"d3h" + i} d1={"d3" + i} id={i} st2={this.props.st2} dipl={{
      titre: this.props.datacompetance[i].titre,
      niveau: this.props.datacompetance[i].niveau,
      type: this.props.datacompetance[i].type

    }} dd={this.state.competance} datacompetance={this.props.datacompetance} setInfoop2={this.props.setInfoop2} info={this.props.infoop2} setdatacompetance={this.props.setdatacompetance} ></ModifCompetance>)
}
this.setState({ 'competance': [...this.state.competance] })
this.props.setIndicec(this.props.datacompetance.length - 1)
this.props.setdatacompetance([...this.props.datacompetance])
this.props.setInfoop2({ 'competance': [] })
this.props.setInfoop2({ 'competance': [...this.props.infoop2.competance] })
//Langue
this.setState({ 'langue': [] })
this.props.setdatalangue([])
this.props.setInfoop3({ 'langue': [] })

for (var i = 0; i < res.data.langue.length; i++) {
  var type = ""
  if (res.data.langue[i].require == true) {
    type = 'Essentiel';
  }
  else { type = 'Optionnel'; }
  this.props.datalangue.push({ titre: res.data.langue[i].langue, niveau: res.data.langue[i].niveau, type: type, id: i, iddivh: 'd4h' + i, iddiv: "ds4" + i, d1: "d4" + i, b: true, del: false, idbase: res.data.langue[i].id })
}

for (var i = 0; i < res.data.langue.length; i++) {

  this.state.langue.push(<ModifLangue setPasse4={this.props.setPasse4}
    iddiv={"ds4" + i} iddivh={"d4h" + i} d1={"d4" + i} id={i} st2={this.props.st2} dipl={{
      titre: this.props.datalangue[i].titre,
      niveau: this.props.datalangue[i].niveau,
      type: this.props.datalangue[i].type

    }} dd={this.state.langue} datalangue={this.props.datalangue} setInfoop3={this.props.setInfoop3} info={this.props.infoop3} setdatalangue={this.props.setdatalangue} ></ModifLangue>)
}
this.setState({ 'langue': [...this.state.langue] })
this.props.setIndicel(this.props.datalangue.length - 1)
this.props.setdatalangue([...this.props.datalangue])
this.props.setInfoop3({ 'langue': [] })
this.props.setInfoop3({ 'langue': [...this.props.infoop3.langue] })





    })












  }





  componentDidUpdate(prevProps, prevState, snapshot) {
    // Si nous avons une valeur sauvegardée, c’est que nous venons d’ajouter des
    // éléments. Ajustons le défilement pour que ces nouveaux éléments ne
    // décalent pas les anciens hors du champ de vision. (ici `snapshot` est la
    // valeur renvoyée par getSnapshotBeforeUpdate.)
    if (snapshot !== null) {
      const list = this.state.diplome;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }
  adddiplome = event => {
    this.props.setPasse({ passe: true })

    this.state.diplome.push(<ModifDiplome handledel={this.handledel} iddiv={"ds1" + (this.props.indice + 1)} sst={this.state} iddivh={"d1h" + (this.props.indice + 1)} d1={"d1" + (this.props.indice + 1)} setPasse={this.props.setPasse} id={(this.props.indice + 1)} del={false} st2={this.props.st2}
      setInfoop={this.props.setInfoop} dipl={{
        titre: "",
        description: "",
        type: "Optionnel"

      }} dd={this.state.diplome} setSt={this.setState} info={this.props.infoop} valDiplome={this.props.valDiplome} setValidiplome={this.props.setValidiplome}  ></ModifDiplome>)
    this.props.setIndice(this.props.indice + 1)
    this.setState({ 'diplome': [] })
    this.props.setInfoop({ 'diplome': [] })

    this.setState({ 'diplome': [...this.state.diplome] })

    this.props.setInfoop({ 'diplome': [...this.state.diplome] })




    console.log(this.state.diplome)

  };


  addquestionnaire = event => {
    this.props.setPasse2({ passe2: true })

    this.state.questionnaire.push(<Modifquestionnaire handledel={this.handledel} iddiv={"ds2" + (this.props.indiceq + 1)} sst={this.state} iddivh={"d2h" + (this.props.indiceq + 1)} d1={"d2" + (this.props.indiceq + 1)} setPasse2={this.props.setPasse2} id={(this.props.indiceq + 1)} del={false} st2={this.props.st2}
      setInfoop1={this.props.setInfoop1} dipl={{
        titre: "",
        description: "",
        type: "Optionnel"

      }} dd={this.state.questionnaire} setSt={this.setState} info={this.props.infoop1} dataquestionnaire={this.props.dataquestionnaire} setdataquestionnaire={this.props.setdataquestionnaire}  ></Modifquestionnaire>)
    this.props.setIndiceq(this.props.indiceq + 1)
    this.setState({ 'questionnaire': [] })
    this.props.setInfoop1({ 'questionnaire': [] })

    this.setState({ 'questionnaire': [...this.state.questionnaire] })

    this.props.setInfoop1({ 'questionnaire': [...this.state.questionnaire] })
    console.log(this.state.questionnaire)


  };


  addlangue = event => {
    this.props.setPasse4({ passe4: true })


    this.state.langue.push(<ModifLangue setSt={this.setState} setPasse4={this.props.setPasse4} st2={this.props.st2} iddiv={"ds4" + (this.props.indicel + 1)} del={false} iddivh={"d4h" + (this.props.indicel + 1)} d1={"d4" + (this.props.indicel + 1)} id={(this.props.indicel + 1)} setInfoop3={this.props.setInfoop3} dipl={{
      titre: "",
      niveau: "",
      type: "Optionnel"

    }} dd={this.state.langue} info={this.props.infoop3} datalangue={this.props.datalangue} setdatalangue={this.props.setdatalangue} ></ModifLangue>)
    this.props.setIndicel(this.props.indicel + 1)
    this.setState({ 'Langue': [] })
    this.props.setInfoop3({ 'Langue': [] })

    this.setState({ 'langue': [...this.state.langue] })

    this.props.setInfoop3({ 'Langue': [...this.state.langue] })

  }
  addcompetance = event => {
    this.props.setPasse3({ passe3: true })


    this.state.competance.push(<ModifCompetance setSt={this.setState} setPasse3={this.props.setPasse3} st2={this.props.st2} iddiv={"ds3" + (this.props.indicec + 1)} del={false} iddivh={"d3h" + (this.props.indicec + 1)} d1={"d3" + (this.props.indicec + 1)} id={(this.props.indicec + 1)} setInfoop2={this.props.setInfoop2} dipl={{
      titre: "",
      niveau: "",
      type: "Optionnel"

    }} dd={this.state.competance} info={this.props.infoop2} datacompetance={this.props.datacompetance} setdatacompetance={this.props.setdatacompetance} ></ModifCompetance>)
    this.props.setIndicec(this.props.indicec + 1)
    this.setState({ 'competance': [] })
    this.props.setInfoop2({ 'competance': [] })

    this.setState({ 'competance': [...this.state.competance] })

    this.props.setInfoop2({ 'competance': [...this.state.competance] })

  };
  render() {

    let {
      diplome,
      competance,
      langue,
      questionnaire,
      st2 = this.props.st2
    } = this.state;


    return (


      <div style={{ padding: '2%' }}>


        <div className="row" >

          <div className="col " style={{ backgroundColor: "#F2F3F4", padding: "1.8%" }} >
            <h6 style={{ display: 'inline', marginLeft: '-2%' }}><Icon style={{ fontSize: "1rem", color: "#909497" }}> school </Icon> Diplôme demandé</h6>
            <IconButton style={{ marginLeft: '88%', marginTop: '-10%' }} onClick={this.adddiplome} disabled={this.props.passe}  >
              <Icon style={{ fontSize: "1rem", color: " #7467ef" }}
              > add </Icon>   </IconButton>
            <div style={{}}>

              <div >
                {this.state.diplome.map((v, index) => (
                  <div key={v.props.id}>


                    <div className='row-md-6 mb-3 ' id={v.props.iddivh} style={{ display: this.props.valDiplome[index] != null && this.state.diplome[index].title !== "" ? 'none' : 'block' }}>
                      <div >
                        <IconButton style={{ border: 'solid 2px  #A93226', borderRadius: '3px', padding: '5.5px', top: '30', marginLeft: '88%', backgroundColor: '#A93226' }} aria-label="Delete" onClick={e => {
                          this.setState({ diplome: this.props.infoop.diplome }, () => {
                            console.log('state', this.state.diplome);
                          });





                          var l = -1;
                          for (var i = 0; i < this.props.valDiplome.length; i++) {

                            if (this.props.valDiplome[i].id == v.props.id) {
                              l = i
                            }
                          }
                         console.log("llll",l)

                          if (l == -1) {
                            this.props.setPasse(false)
                            this.props.infoop.diplome.splice(-1, 1)
                            this.props.setInfoop({ 'diplome': [] })
                            this.setState({ 'diplome': [] })
                            this.setState({ 'diplome': [...this.props.infoop.diplome] })

                            this.props.setInfoop({ 'diplome': [...this.props.infoop.diplome] })
                            this.props.setPasse(false)
                          }



                          else {




                            authAxios.delete('Diplome/DeleteDiplome/' + this.props.valDiplome[l].idbase)



                            var s = this.state.diplome.length - this.props.valDiplome.length;
                            this.props.valDiplome.splice(l, 1)
                            this.props.setValidiplome([])
                            this.props.setValidiplome([...this.props.valDiplome])

                            this.props.setInfoop({ diplome: [] })




                            var vald = []
                            var k = { diplome: [] }
                            var ind = this.props.indice;
                            for (var i = 0; i < this.props.valDiplome.length; i++) {
                              vald.push({ titre: this.props.valDiplome[i].titre, description: this.props.valDiplome[i].description, type: this.props.valDiplome[i].type, id: ind + 1, iddivh: "d1h" + (ind + 1), iddiv: "ds1" + (ind + 1), d1: "d1" + (ind + 1), b: true, del: false })


                              k.diplome.push(<ModifDiplome handledel={this.handledel} iddiv={"ds1" + (ind + 1)} sst={this.state} iddivh={"d1h" + (ind + 1)} d1={"d1" + (ind + 1)} setPasse={this.props.setPasse} id={ind + 1} del={false} st2={this.props.st2}
                                setInfoop={this.props.setInfoop} dipl={{
                                  titre: this.props.valDiplome[i].titre,
                                  description: this.props.valDiplome[i].description,
                                  type: this.props.valDiplome[i].type

                                }} dd={k.diplome} setSt={this.setState} info={k} valDiplome={vald} setValidiplome={this.props.setValidiplome}  ></ModifDiplome>)
                              ind = ind + 1;

                              ;



                            }
                            for (var q = 0; q < s; q++) {

                              k.diplome.push(<ModifDiplome handledel={this.handledel} iddiv={"ds1" + (ind + 1)} sst={this.state} iddivh={"d1h" + (ind + 1)} d1={"d1" + (ind + 1)} setPasse={this.props.setPasse} id={ind + 1} del={false} st2={this.props.st2}
                                setInfoop={this.props.setInfoop} dipl={{
                                  titre: "",
                                  description: "",
                                  type: ""

                                }} dd={k.diplome} setSt={this.setState} info={k} valDiplome={vald} setValidiplome={this.props.setValidiplome}  ></ModifDiplome>)
                              ind = ind + 1;

                            }

                            this.props.setIndice((ind), () => {
                            });
                            this.setState({ diplome: [...k.diplome] }, () => {
                            });
                            this.props.setInfoop({ diplome: [...k.diplome] }, () => {
                            })


                          } if (this.props.infoop.diplome == null || this.props.valDiplome.length >= this.props.infoop.diplome) {
                            this.props.setPasse(false)
                          }









                          ;
                        }}>
      <Icon style={{ fontSize: "1rem", color: 'white' }}>delete</Icon>
                        </IconButton>
                        <div style={{ marginTop: '-3%' }}> {v}</div>
                      </div>
                    </div>

                    <div id={v.props.iddiv} className="row-md-6 mb-3 bgd" style={{ textAlign: "left", paddingBottom: "-50px", display: this.props.valDiplome[index] != null && this.state.diplome[index].title !== "" ? 'block' : 'none' }} >
                      <div >
                        <span style={{ marginLeft: "96%" }}><Icon style={{ fontSize: "17px", padding: "0%", margin: "0%" }} color="secondary"> stars  </Icon> </span>

                        <div  style={{ color: '#7467ef', fontSize: '11px', textAlign: "left", marginTop: "-2%" }}><Icon style={{ fontSize: "15px", padding: "0%", margin: "0%" }}> star_half  </Icon> &nbsp;&nbsp;<span style={{ color: "#000000", fontWeight: "bold", padding: "0%", margin: "0%", fontSize: "15px" }}>{v.props.dipl.titre}</span></div >
                        <br></br>
                        <div  style={{ color: '#7467ef', fontSize: '11px', textAlign: "left", paddingBottom: "5px", marginTop: "-2%" }}><Icon style={{ fontSize: "15px", padding: "0%", margin: "0%" }}> short_text </Icon> &nbsp;&nbsp;<span style={{ color: "#000000", padding: "0%", margin: "0%" }}>{v.props.dipl.description}</span></div >

                      </div >
                      <div style={{ textAlign: "right",marginRight:'5.5%' }} >


                        <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '5px', marginLeft: '1%' }} aria-label="Delete"  >
                          <Icon style={{ fontSize: "1rem" }} onClick={e => {
                            document.getElementById(v.props.iddiv).style.display = "none"; document.getElementById(v.props.iddivh).style.display = "block"
                          }}
                          >create</Icon>
                        </IconButton>
                        <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '5px', marginLeft: '1%' }} aria-label="Delete" onClick={e => {

                          this.setState({ diplome: this.props.infoop.diplome }, () => {
                            console.log('state', this.state.diplome);
                          });





                          var l = -1;
                          for (var i = 0; i < this.props.valDiplome.length; i++) {

                            if (this.props.valDiplome[i].id == v.props.id) {
                              l = i
                            }
                          }


                          if (l == -1) {

                            this.props.infoop.diplome.splice(-1, 1)
                            this.props.setInfoop({ 'diplome': [] })
                            this.setState({ 'diplome': [] })
                            this.setState({ 'diplome': [...this.props.infoop.diplome] })

                            this.props.setInfoop({ 'diplome': [...this.props.infoop.diplome] })
                          }



                          else {
                            console.log("llll",'Diplome/DeleteDiplome/' + this.props.valDiplome[l].idbase)


                            authAxios.delete('Diplome/DeleteDiplome/' + this.props.valDiplome[l].idbase)





                            var s = this.state.diplome.length - this.props.valDiplome.length;
                            this.props.valDiplome.splice(l, 1)
                            this.props.setValidiplome([])
                            this.props.setValidiplome([...this.props.valDiplome])

                            this.props.setInfoop({ diplome: [] })




                     

                            var vald = []
                            var k = { diplome: [] }
                            var ind = this.props.indice;
                            for (var i = 0; i < this.props.valDiplome.length; i++) {
                              vald.push({ titre: this.props.valDiplome[i].titre, description: this.props.valDiplome[i].description, type: this.props.valDiplome[i].type, id: ind + 1, iddivh: "d1h" + (ind + 1), iddiv: "ds1" + (ind + 1), d1: "d1" + (ind + 1), b: true, del: false })


                              k.diplome.push(<ModifDiplome handledel={this.handledel} iddiv={"ds1" + (ind + 1)} sst={this.state} iddivh={"d1h" + (ind + 1)} d1={"d1" + (ind + 1)} setPasse={this.props.setPasse} id={ind + 1} del={false} st2={this.props.st2}
                                setInfoop={this.props.setInfoop} dipl={{
                                  titre: this.props.valDiplome[i].titre,
                                  description: this.props.valDiplome[i].description,
                                  type: this.props.valDiplome[i].type

                                }} dd={k.diplome} setSt={this.setState} info={k} valDiplome={vald} setValidiplome={this.props.setValidiplome}  ></ModifDiplome>)
                              ind = ind + 1;

                              ;



                            }
                            for (var q = 0; q < s; q++) {

                              k.diplome.push(<ModifDiplome handledel={this.handledel} iddiv={"ds1" + (ind + 1)} sst={this.state} iddivh={"d1h" + (ind + 1)} d1={"d1" + (ind + 1)} setPasse={this.props.setPasse} id={ind + 1} del={false} st2={this.props.st2}
                                setInfoop={this.props.setInfoop} dipl={{
                                  titre: "",
                                  description: "",
                                  type: ""

                                }} dd={k.diplome} setSt={this.setState} info={k} valDiplome={vald} setValidiplome={this.props.setValidiplome}  ></ModifDiplome>)
                              ind = ind + 1;

                            }

                            this.props.setIndice((ind), () => {
                            });
                            this.setState({ diplome: [...k.diplome] }, () => {
                            });
                            this.props.setInfoop({ diplome: [...k.diplome] }, () => {
                            })


                          } if (this.props.infoop.diplome == null || this.props.valDiplome.length >= this.props.infoop.diplome) {
                            this.props.setPasse(false)
                          }









                          ;
                        }}>

                          <Icon style={{ fontSize: "1rem" }}>delete</Icon>
                        </IconButton>


                      </div></div>
                    <span></span>
                  </div>
                )

                )
                }



              </div>

            </div>



          </div>

          <div className='col-md-6  '>

<div className="row-md-6">

  <div style={{ backgroundColor: "#FFFFFF", padding: "1.8%" }}  >

    <div className=" bg2" style={{ backgroundColor: "#F2F3F4", paddingTop: '3%' }} >
      <h6 style={{ display: 'block', marginLeft: '1%' }} ><Icon style={{ fontSize: "1rem", color: "#909497" }}> assignment </Icon> Compétences demandées</h6>
      <IconButton style={{ marginLeft: '88%', marginTop: '-10%' }} onClick={this.addcompetance} disabled={this.props.passe3} >
        <Icon style={{ fontSize: "1rem", color: " #7467ef" }} > add </Icon>   </IconButton>
      <div style={{ marginTop: '1%' }}>
        {this.state.competance.map((v, index) => (

          <div key={v.props.id}>


            <div className='row bg1' id={v.props.iddivh} style={{ marginTop: "3.5%", padding: '1%', width: '100%', display: this.props.datacompetance[index] != null && this.state.competance[index].title !== "" ? 'none' : 'block' }} >

              <IconButton style={{ border: 'solid 2px  #A93226', borderRadius: '3px', padding: '5.5px', textAlign: 'right', marginRight: '-92%', backgroundColor: '#A93226', marginTop: '-5%' }} aria-label="Delete" onClick={e => {


                          this.setState({ competance: this.props.infoop2.competance }, () => {
                            console.log('state', this.state.competance);
                          });





                          var l = -1;
                          for (var i = 0; i < this.props.datacompetance.length; i++) {

                            if (this.props.datacompetance[i].id == v.props.id) {
                              l = i
                            }
                          }


                          if (l == -1) {
             


                            this.props.setPasse3(false)
                            this.props.infoop2.competance.splice(-1, 1)
                            this.props.setInfoop2({ 'competance': [] })
                            this.setState({ 'competance': [] })
                            this.setState({ 'competance': [...this.props.infoop2.competance] })

                            this.props.setInfoop2({ 'competance': [...this.props.infoop2.competance] })
                            this.props.setPasse3(false)
                          }



                          else {

                            console.log('ppppppppp',this.props.datacompetance[l].idbase)

                            authAxios.delete('Competence/DeleteOffreCompetence/' + this.props.datacompetance[l].idbase)





                            var s = this.state.competance.length - this.props.datacompetance.length;
                            this.props.datacompetance.splice(l, 1)
                            this.props.setdatacompetance([])
                            this.props.setdatacompetance([...this.props.datacompetance])

                            this.props.setInfoop2({ competance: [] })





                            var vald = []
                            var k = { competance: [] }
                            var ind = this.props.indicec;
                            for (var i = 0; i < this.props.datacompetance.length; i++) {
                              vald.push({ titre: this.props.datacompetance[i].titre, niveau: this.props.datacompetance[i].niveau, type: this.props.datacompetance[i].type, id: ind + 1, iddivh: "d3h" + (ind + 1), iddiv: "ds3" + (ind + 1), d1: "d3" + (ind + 1), b: true, del: false })


                              k.competance.push(<ModifCompetance handledel={this.handledel} iddiv={"ds3" + (ind + 1)} sst={this.state} iddivh={"d3h" + (ind + 1)} d1={"d3" + (ind + 1)} setPasse3={this.props.setPasse3} id={ind + 1} del={false} st2={this.props.st2}
                                setInfoop2={this.props.setInfoop2} dipl={{
                                  titre: this.props.datacompetance[i].titre,
                                  niveau: this.props.datacompetance[i].niveau,
                                  type: this.props.datacompetance[i].type

                                }} dd={k.competance} setSt={this.setState} info={k} datacompetance={vald} setdatacompetance={this.props.setdatacompetance}  ></ModifCompetance>)
                              ind = ind + 1;

                              ;



                            }
                            for (var q = 0; q < s; q++) {

                              k.competance.push(<ModifCompetance handledel={this.handledel} iddiv={"ds3" + (ind + 1)} sst={this.state} iddivh={"d3h" + (ind + 1)} d1={"d3" + (ind + 1)} setPasse3={this.props.setPasse3} id={ind + 1} del={false} st2={this.props.st2}
                                setInfoop2={this.props.setInfoop2} dipl={{
                                  titre: "",
                                  niveau: "",
                                  type: ""

                                }} dd={k.competance} setSt={this.setState} info={k} datacompetance={vald} setdatacompetance={this.props.setdatacompetance}  ></ModifCompetance>)
                              ind = ind + 1;

                            }

                            this.props.setIndicec((ind), () => {
                            });
                            this.setState({ competance: [...k.competance] }, () => {
                            });
                            this.props.setInfoop2({ competance: [...k.competance] }, () => {
                            })


                          } if (this.props.infoop2.competance == null || this.props.datacompetance.length >= this.props.infoop2.competance) {
                            this.props.setPasse3(false)
                          }









                          ;




                        }}>
                   <Icon style={{ fontSize: "1rem", color: 'white' }}>delete</Icon>
                          </IconButton>
                          {v}


                          <div>
                          </div>

                        </div>
                        <div id={v.props.iddiv} style={{ width: '100%', backgroundColor: '#FFFFFF', display: 'block', padding: '1px', paddingTop: "1px", marginTop: "3%", textAlign: "left", display: this.props.datacompetance[index] != null && this.state.competance[index].title !== "" ? 'block' : 'none' }} >
                        <span style={{ marginLeft: "94%" }} ><Icon style={{ fontSize: "17px", padding: "0%", margin: "0%" }} color="secondary"> stars  </Icon> <br></br></span>

                          <div style={{ marginTop: "1%",marginBottom:'3%' }} className="row">


                            <div  style={{ color: "#000000", fontWeight: "bold", fontSize: "13px", textAlign: 'left',paddingLeft:'6%' }} className="col-3">{v.props.dipl.titre}</div >


                            <div className='col-6'>  <Icon style={{ fontSize: "1rem", color: '#7467ef' }}>star</Icon><span style={{ color: "#000000" }}>{v.props.dipl.niveau}</span></div>
                               <div className="col-3">
                                <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '5.5px' }} aria-label="Delete" onClick={e => { document.getElementById(v.props.iddiv).style.display = "none"; document.getElementById(v.props.iddivh).style.display = "block"}}>
                                <Icon style={{ fontSize: "1rem" }}>create</Icon>
                              </IconButton>
                              &ensp;
                              <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '5.5px' }}  aria-label="Delete" onClick={e => {

                                this.setState({ competance: this.props.infoop2.competance }, () => {
                                  console.log('state', this.state.competance);
                                });





                                var l = -1;
                                for (var i = 0; i < this.props.datacompetance.length; i++) {

                                  if (this.props.datacompetance[i].id == v.props.id) {
                                    l = i
                                  }
                                }


                                if (l == -1) {
                                  this.props.setPasse3(false)
                                  this.props.infoop2.competance.splice(-1, 1)
                                  this.props.setInfoop2({ 'competance': [] })
                                  this.setState({ 'competance': [] })
                                  this.setState({ 'competance': [...this.props.infoop2.competance] })

                                  this.props.setInfoop2({ 'competance': [...this.props.infoop2.competance] })
                                  this.props.setPasse3(false)
                                }



                                else {

                                  console.log('ppppppppp','Competence/DeleteOffreCompetence/' + this.props.datacompetance[l].idbase)

                                  authAxios.delete('Competence/DeleteOffreCompetence/' + this.props.datacompetance[l].idbase)




                                  var s = this.state.competance.length - this.props.datacompetance.length;
                                  this.props.datacompetance.splice(l, 1)
                                  this.props.setdatacompetance([])
                                  this.props.setdatacompetance([...this.props.datacompetance])

                                  this.props.setInfoop2({ competance: [] })





                                  var vald = []
                                  var k = { competance: [] }
                                  var ind = this.props.indicec;
                                  for (var i = 0; i < this.props.datacompetance.length; i++) {
                                    vald.push({ titre: this.props.datacompetance[i].titre, niveau: this.props.datacompetance[i].niveau, type: this.props.datacompetance[i].type, id: ind + 1, iddivh: "d3h" + (ind + 1), iddiv: "ds3" + (ind + 1), d1: "d3" + (ind + 1), b: true, del: false })


                                    k.competance.push(<ModifCompetance handledel={this.handledel} iddiv={"ds3" + (ind + 1)} sst={this.state} iddivh={"d3h" + (ind + 1)} d1={"d3" + (ind + 1)} setPasse3={this.props.setPasse3} id={ind + 1} del={false} st2={this.props.st2}
                                      setInfoop2={this.props.setInfoop2} dipl={{
                                        titre: this.props.datacompetance[i].titre,
                                        niveau: this.props.datacompetance[i].niveau,
                                        type: this.props.datacompetance[i].type

                                      }} dd={k.competance} setSt={this.setState} info={k} datacompetance={vald} setdatacompetance={this.props.setdatacompetance}  ></ModifCompetance>)
                                    ind = ind + 1;

                                    ;



                                  }
                                  for (var q = 0; q < s; q++) {

                                    k.competance.push(<ModifCompetance handledel={this.handledel} iddiv={"ds3" + (ind + 1)} sst={this.state} iddivh={"d3h" + (ind + 1)} d1={"d3" + (ind + 1)} setPasse3={this.props.setPasse3} id={ind + 1} del={false} st2={this.props.st2}
                                      setInfoop2={this.props.setInfoop2} dipl={{
                                        titre: "",
                                        niveau: "",
                                        type: ""

                                      }} dd={k.competance} setSt={this.setState} info={k} datacompetance={vald} setdatacompetance={this.props.setdatacompetance}  ></ModifCompetance>)
                                    ind = ind + 1;

                                  }

                                  this.props.setIndicec((ind), () => {
                                  });
                                  this.setState({ competance: [...k.competance] }, () => {
                                  });
                                  this.props.setInfoop2({ competance: [...k.competance] }, () => {
                                  })


                                } if (this.props.infoop2.competance == null || this.props.datacompetance.length >= this.props.infoop2.competance) {
                                  this.props.setPasse3(false)
                                }









                                ;




                              }}>
                               <Icon style={{ fontSize: "1rem" }}>delete</Icon>
                                </IconButton>

                                </div>
                          </div>

                        </div>


                      </div>

                    ))} </div>



                </div>


              </div>

            


       
              <div className='row-md-6 ' style={{ backgroundColor: "#FFFFFF", padding: "1.8%" }}  >
                <div className=" bg2" style={{ backgroundColor: "#F2F3F4", paddingTop: '3%' }} >

                  <h6 style={{ display: 'block', whiteSpace: 'nowrap', marginLeft: '1%' }}><Icon style={{ fontSize: "1rem", color: "#909497" }}> translate </Icon> Langues demandées</h6>
                  <IconButton style={{ marginLeft: '88%', marginTop: '-10%' }} onClick={this.addlangue} disabled={this.props.passe4} >
                    <Icon style={{ fontSize: "1rem", color: " #7467ef" }} > add </Icon>   </IconButton>




                  <div style={{ marginTop: '1%' }}>
                    {this.state.langue.map((v, index) => (

                      <div key={v.props.id}>
                        <div className='row bg1' id={v.props.iddivh} style={{ marginTop: "3.5%", padding: '1%', width: '100%', display: this.props.datalangue[index] != null && this.state.langue[index].title !== "" ? 'none' : 'block' }} >



                          <IconButton style={{ border: 'solid 2px  #A93226', borderRadius: '3px', padding: '5.5px', textAlign: 'right', marginRight: '-92%', backgroundColor: '#A93226', marginTop: '-5%' }} aria-label="Delete" onClick={e => {

                        this.setState({ "langue": this.props.infoop3.langue }, () => {
                          console.log('state', this.state.langue);
                        });





                        var l = -1;
                        for (var i = 0; i < this.props.datalangue.length; i++) {

                          if (this.props.datalangue[i].id == v.props.id) {
                            l = i
                          }
                        }


                        if (l == -1) {
                          this.props.setPasse4(false)
                          this.props.infoop3.langue.splice(-1, 1)
                          this.props.setInfoop3({ 'langue': [] })
                          this.setState({ 'langue': [] })
                          this.setState({ 'langue': [...this.props.infoop3.langue] })

                          this.props.setInfoop3({ 'langue': [...this.props.infoop3.langue] })
                          this.props.setPasse4(false)
                        }



                        else {


                          authAxios.delete('LangueOffre/DeleteLangue/' + this.props.datalangue[l].idbase)






                          var s = this.state.langue.length - this.props.datalangue.length;
                          this.props.datalangue.splice(l, 1)
                          this.props.setdatalangue([])
                          this.props.setdatalangue([...this.props.datalangue])

                          this.props.setInfoop3({ langue: [] })





                          var vald = []
                          var k = { langue: [] }
                          var ind = this.props.indicel;
                          for (var i = 0; i < this.props.datalangue.length; i++) {
                            vald.push({ titre: this.props.datalangue[i].titre, niveau: this.props.datalangue[i].niveau, type: this.props.datalangue[i].type, id: ind + 1, iddivh: "d4h" + (ind + 1), iddiv: "ds4" + (ind + 1), d1: "d4" + (ind + 1), b: true, del: false })


                            k.langue.push(<ModifLangue handledel={this.handledel} iddiv={"ds4" + (ind + 1)} sst={this.state} iddivh={"d4h" + (ind + 1)} d1={"d4" + (ind + 1)} setPasse3={this.props.setPasse3} id={ind + 1} del={false} st2={this.props.st2}
                              setInfoop3={this.props.setInfoop3} dipl={{
                                titre: this.props.datalangue[i].titre,
                                niveau: this.props.datalangue[i].niveau,
                                type: this.props.datalangue[i].type

                              }} dd={k.langue} setSt={this.setState} info={k} datalangue={vald} setdatalangue={this.props.setdatalangue}  ></ModifLangue>)
                            ind = ind + 1;

                            ;



                          }
                          for (var q = 0; q < s; q++) {

                            k.langue.push(<ModifLangue handledel={this.handledel} iddiv={"ds4" + (ind + 1)} sst={this.state} iddivh={"d4h" + (ind + 1)} d1={"d4" + (ind + 1)} setPasse4={this.props.setPasse4} id={ind + 1} del={false} st2={this.props.st2}
                              setInfoop3={this.props.setInfoop3} dipl={{
                                titre: "",
                                niveau: "",
                                type: ""

                              }} dd={k.langue} setSt={this.setState} info={k} datalangue={vald} setdatalangue={this.props.setdatalangue}  ></ModifLangue>)
                            ind = ind + 1;

                          }

                          this.props.setIndicel((ind), () => {
                          });
                          this.setState({ langue: [...k.langue] }, () => {
                          });
                          this.props.setInfoop3({ langue: [...k.langue] }, () => {
                          })


                        } if (this.props.infoop3.langue == null || this.props.datalangue.length >= this.props.infoop3.langue) {
                          this.props.setPasse4(false)
                        }









                        ;




                      }}>
                        <Icon style={{ fontSize: "1rem", color: 'white' }}>delete</Icon>
                          </IconButton>
                          <div>  {v}</div>
                          <div>
                          </div>

                        </div>
                        <div id={v.props.iddiv} style={{  backgroundColor: '#FFFFFF', display: 'block', padding: '1px', paddingTop: "1px", marginTop: "3%", textAlign: "left", display: this.props.datalangue[index] != null && this.state.langue[index].title !== "" ? 'block' : 'none' }} >
                        <span style={{ marginTop: "-5%", marginLeft: "94%" }} ><Icon style={{ fontSize: "17px", padding: "0%", margin: "0%" }} color="secondary"> stars  </Icon> </span>

                          <div style={{  marginBottom:'3%'}} className="row">

                          <div  style={{ color: "#000000", fontWeight: "bold", fontSize: "13px", textAlign: 'left',paddingLeft:'6%' }} className="col-3">{v.props.dipl.titre}</div >

                            <div className="col-6" >  <Icon style={{ fontSize: "1rem", color: '#7467ef' }}>star</Icon><span style={{ color: "#000000" }}>{v.props.dipl.niveau}</span></div>
                              <div  className="col"   >


                                <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '5.5px'}} aria-label="Delete" onClick={e => { document.getElementById(v.props.iddiv).style.display = "none"; document.getElementById(v.props.iddivh).style.display = "block" }}>
                              <Icon style={{ fontSize: "1rem" }}>create</Icon>
                            </IconButton> &ensp;
                            <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '5.5px'}}  aria-label="Delete" onClick={e => {

                              this.setState({ "langue": this.props.infoop3.langue }, () => {
                                console.log('state', this.state.langue);
                              });





                              var l = -1;
                              for (var i = 0; i < this.props.datalangue.length; i++) {

                                if (this.props.datalangue[i].id == v.props.id) {
                                  l = i
                                }
                              }


                              if (l == -1) {
                                this.props.setPasse4(false)
                                this.props.infoop3.langue.splice(-1, 1)
                                this.props.setInfoop3({ 'langue': [] })
                                this.setState({ 'langue': [] })
                                this.setState({ 'langue': [...this.props.infoop3.langue] })

                                this.props.setInfoop3({ 'langue': [...this.props.infoop3.langue] })
                                this.props.setPasse4(false)
                              }



                              else {


                                authAxios.delete('/LangueOffre/DeleteLangue/' + this.props.datalangue[l].idbase)




                                var s = this.state.langue.length - this.props.datalangue.length;
                                this.props.datalangue.splice(l, 1)
                                this.props.setdatalangue([])
                                this.props.setdatalangue([...this.props.datalangue])

                                this.props.setInfoop3({ langue: [] })





                                var vald = []
                                var k = { langue: [] }
                                var ind = this.props.indicel;
                                for (var i = 0; i < this.props.datalangue.length; i++) {
                                  vald.push({ titre: this.props.datalangue[i].titre, niveau: this.props.datalangue[i].niveau, type: this.props.datalangue[i].type, id: ind + 1, iddivh: "d4h" + (ind + 1), iddiv: "ds4" + (ind + 1), d1: "d4" + (ind + 1), b: true, del: false })


                                  k.langue.push(<ModifLangue handledel={this.handledel} iddiv={"ds4" + (ind + 1)} sst={this.state} iddivh={"d4h" + (ind + 1)} d1={"d4" + (ind + 1)} setPasse3={this.props.setPasse3} id={ind + 1} del={false} st2={this.props.st2}
                                    setInfoop3={this.props.setInfoop3} dipl={{
                                      titre: this.props.datalangue[i].titre,
                                      niveau: this.props.datalangue[i].niveau,
                                      type: this.props.datalangue[i].type

                                    }} dd={k.langue} setSt={this.setState} info={k} datalangue={vald} setdatalangue={this.props.setdatalangue}  ></ModifLangue>)
                                  ind = ind + 1;

                                  ;



                                }
                                for (var q = 0; q < s; q++) {

                                  k.langue.push(<ModifLangue handledel={this.handledel} iddiv={"ds4" + (ind + 1)} sst={this.state} iddivh={"d4h" + (ind + 1)} d1={"d4" + (ind + 1)} setPasse4={this.props.setPasse4} id={ind + 1} del={false} st2={this.props.st2}
                                    setInfoop3={this.props.setInfoop3} dipl={{
                                      titre: "",
                                      niveau: "",
                                      type: ""

                                    }} dd={k.langue} setSt={this.setState} info={k} datalangue={vald} setdatalangue={this.props.setdatalangue}  ></ModifLangue>)
                                  ind = ind + 1;

                                }

                                this.props.setIndicel((ind), () => {
                                });
                                this.setState({ langue: [...k.langue] }, () => {
                                });
                                this.props.setInfoop3({ langue: [...k.langue] }, () => {
                                })


                              } if (this.props.infoop3.langue == null || this.props.datalangue.length >= this.props.infoop3.langue) {
                                this.props.setPasse4(false)
                              }









                              ;




                            }}>
                               <Icon style={{ fontSize: "1rem" }}>delete</Icon>
                                </IconButton>


                                </div>                            
                          </div>

                        </div>


                      </div>

                    ))} </div></div>

              </div>

            </div>
          </div>
        </div>
        <div style={{ color: '#909497' }} id='less' >
          <IconButton onClick={e => { document.getElementById("less").style.display = "none"; document.getElementById("less").style.display = "none"; document.getElementById("more").style.display = "block"; }} >
            <Icon style={{ fontSize: "1rem", color: " #909497" }} > expand_less </Icon>   </IconButton>
          <span style={{ fontSize: '12px', marginLeft: '0%' }}>Créer questionnaire</span></div>
        <div style={{ display: "none" }} id='more' >
          <div style={{ color: '#909497' }} >
            <IconButton onClick={e => { document.getElementById("less").style.display = "none"; document.getElementById("more").style.display = "none"; document.getElementById("less").style.display = "block"; }}>
              <Icon style={{ fontSize: "1rem", color: " #909497" }} > expand_more </Icon>   </IconButton>
            <span style={{ fontSize: '12px', marginLeft: '0%' }}>Créer questionnaire</span></div>

          <div className="col-md-30 mb-3" style={{ backgroundColor: "#F2F3F4", padding: "2%" }} >
            <h6 style={{ display: 'inline', marginLeft: '-2%' }}><Icon style={{ fontSize: "13px", color: "#909497" }}> help </Icon>  Nouveau questionnaire</h6>
            <IconButton style={{ marginLeft: '88%', marginTop: '-4%' }} onClick={this.addquestionnaire} disabled={this.props.passe2} >
              <Icon style={{ fontSize: "1rem", color: " #7467ef" }} > add </Icon>   </IconButton>
            <div style={{ marginTop: '-1%' }}>

              {this.state.questionnaire.map((v, index) => (
                <div key={v.props.id}>


                  <div className='row-md-6 mb-3 ' id={v.props.iddivh} style={{ display: this.props.dataquestionnaire[index] != null && this.state.questionnaire[index].title !== "" ? 'none' : 'block' }}>
                    <div style={{ marginTop: '2%' }}>
                      <IconButton style={{ border: 'solid 2px #A93226', borderRadius: '3px', padding: '6px', textAlign: 'right', marginRight: '-92%', backgroundColor: '#A93226' }} aria-label="Delete" onClick={e => {
                        this.setState({ questionnaire: this.props.infoop1.questionnaire }, () => {
                          console.log('state', this.state.questionnaire);
                        });





                        var l = -1;
                        for (var i = 0; i < this.props.dataquestionnaire.length; i++) {

                          if (this.props.dataquestionnaire[i].id == v.props.id) {
                            l = i
                          }
                        }


                        if (l == -1) {
                          this.props.setPasse2(false)
                          this.props.infoop1.questionnaire.splice(-1, 1)
                          this.props.setInfoop1({ 'questionnaire': [] })
                          this.setState({ 'questionnaire': [] })
                          this.setState({ 'questionnaire': [...this.props.infoop1.questionnaire] })

                          this.props.setInfoop1({ 'questionnaire': [...this.props.infoop1.questionnaire] })
                          this.props.setPasse2(false)
                        }



                        else {



                          authAxios.delete('Questionnaire/DeleteQuestionnaire/' + this.props.dataquestionnaire[l].idbase)


                          console.log('questionnaire1', index)

                          var s = this.state.questionnaire.length - this.props.dataquestionnaire.length;
                          this.props.dataquestionnaire.splice(l, 1)
                          this.props.setdataquestionnaire([])
                          this.props.setdataquestionnaire([...this.props.dataquestionnaire])

                          this.props.setInfoop1({ questionnaire: [] })



                          var vald = []
                          var k = { questionnaire: [] }
                          var ind = this.props.indiceq;
                          for (var i = 0; i < this.props.dataquestionnaire.length; i++) {
                            vald.push({ titre: this.props.dataquestionnaire[i].titre, description: this.props.dataquestionnaire[i].description, type: this.props.dataquestionnaire[i].type, id: ind + 1, iddivh: "d2h" + (ind + 1), iddiv: "ds2" + (ind + 1), d1: "d2" + (ind + 1), b: true, del: false })


                            k.questionnaire.push(<Modifquestionnaire iddiv={"ds2" + (ind + 1)} sst={this.state} iddivh={"d2h" + (ind + 1)} d1={"d2" + (ind + 1)} setPasse2={this.props.setPasse2} id={ind + 1} del={false} st2={this.props.st2}
                              setInfoop1={this.props.setInfoop1} dipl={{
                                titre: this.props.dataquestionnaire[i].titre,
                                description: this.props.dataquestionnaire[i].description,
                                type: this.props.dataquestionnaire[i].type

                              }} dd={k.questionnaire} setSt={this.setState} info={k} dataquestionnaire={vald} setdataquestionnaire={this.props.setdataquestionnaire}  ></Modifquestionnaire>)
                            ind = ind + 1;

                            ;



                          }
                          for (var q = 0; q < s; q++) {

                            k.questionnaire.push(<Modifquestionnaire iddiv={"ds2" + (ind + 1)} sst={this.state} iddivh={"d2h" + (ind + 1)} d1={"d2" + (ind + 1)} setPasse2={this.props.setPasse2} id={ind + 1} del={false} st2={this.props.st2}
                              setInfoop1={this.props.setInfoop1} dipl={{
                                titre: "",
                                description: "",
                                type: ""

                              }} dd={k.questionnaire} setSt={this.setState} info={k} dataquestionnaire={vald} setdataquestionnaire={this.props.setdataquestionnaire}  ></Modifquestionnaire>)
                            ind = ind + 1;

                          }

                          this.props.setIndiceq((ind), () => {
                          });
                          this.setState({ questionnaire: [...k.questionnaire] }, () => {
                          });
                          this.props.setInfoop1({ questionnaire: [...k.questionnaire] }, () => {
                          })


                        } if (this.props.infoop1.questionnaire == null || this.props.dataquestionnaire.length >= this.props.infoop1.questionnaire) {
                          this.props.setPasse2(false)
                        }









                        ;
                      }}>

<Icon style={{ fontSize: "1rem", color: 'white' }}>delete</Icon>
                      </IconButton>

                    </div>
                    <div style={{ marginTop: '-2%' }}> {v}</div>
                  </div>

                  <div id={v.props.iddiv} className="row-md-6 mb-3 bgd" style={{ textAlign: "left", paddingBottom: "-50px", display: this.props.dataquestionnaire[index] != null && this.state.questionnaire[index].title !== "" ? 'block' : 'none' }} >
                    <div >


                      <div  style={{ color: '#7467ef', fontSize: '11px', textAlign: "left"}}><Icon style={{ fontSize: "15px", padding: "0%", margin: "0%" }}> star_half  </Icon> &nbsp;&nbsp;<span style={{ color: "#000000", fontWeight: "bold", padding: "0%", margin: "0%", fontSize: "15px" }}>{v.props.dipl.titre}</span></div >
                      <br></br>
                      <div  style={{ color: '#7467ef', fontSize: '11px', textAlign: "left", paddingBottom: "5px", marginTop: "-2%" }}><Icon style={{ fontSize: "15px", padding: "0%", margin: "0%" }}> short_text </Icon> &nbsp;&nbsp;<span style={{ color: "#000000", padding: "0%", margin: "0%" }}>{v.props.dipl.description}</span></div >

                    </div >
                    <div style={{ textAlign: "right", marginLeft: '5%',marginRight:'1.5%' }} >
                      <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '6px', marginLeft: '1%' }} aria-label="Delete"  >
                        <Icon style={{ fontSize: "1rem" }} onClick={e => {
                          document.getElementById(v.props.iddiv).style.display = "none"; document.getElementById(v.props.iddivh).style.display = "block"
                        }}
                        >create</Icon>
                      </IconButton>
                      <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '6px', marginLeft: '1%' }} aria-label="Delete"  onClick={e => {
                        this.setState({ questionnaire: this.props.infoop1.questionnaire }, () => {
                          console.log('state', this.state.questionnaire);
                        });





                        var l = -1;
                        for (var i = 0; i < this.props.dataquestionnaire.length; i++) {

                          if (this.props.dataquestionnaire[i].id == v.props.id) {
                            l = i
                          }
                        }


                        if (l == -1) {
                          this.props.setPasse2(false)
                          this.props.infoop1.questionnaire.splice(-1, 1)
                          this.props.setInfoop({ 'questionnaire': [] })
                          this.setState({ 'questionnaire': [] })
                          this.setState({ 'questionnaire': [...this.props.infoop1.questionnaire] })

                          this.props.setInfoop1({ 'questionnaire': [...this.props.infoop1.questionnaire] })
                        }



                        else {



                          authAxios.delete('Questionnaire/DeleteQuestionnaire/' + this.props.dataquestionnaire[l].idbase)





                          console.log('questionnaire2', index)

                          var s = this.state.questionnaire.length - this.props.dataquestionnaire.length;
                          this.props.dataquestionnaire.splice(l, 1)
                          this.props.setdataquestionnaire([])
                          this.props.setdataquestionnaire([...this.props.dataquestionnaire])

                          this.props.setInfoop1({ questionnaire: [] })



                          var vald = []
                          var k = { questionnaire: [] }
                          var ind = this.props.indiceq;
                          for (var i = 0; i < this.props.dataquestionnaire.length; i++) {
                            vald.push({ titre: this.props.dataquestionnaire[i].titre, description: this.props.dataquestionnaire[i].description, type: this.props.dataquestionnaire[i].type, id: ind + 1, iddivh: "d2h" + (ind + 1), iddiv: "ds2" + (ind + 1), d1: "d2" + (ind + 1), b: true, del: false })


                            k.questionnaire.push(<Modifquestionnaire iddiv={"ds2" + (ind + 1)} sst={this.state} iddivh={"d2h" + (ind + 1)} d1={"d2" + (ind + 1)} setPasse2={this.props.setPasse2} id={ind + 1} del={false} st2={this.props.st2}
                              setInfoop1={this.props.setInfoop1} dipl={{
                                titre: this.props.dataquestionnaire[i].titre,
                                description: this.props.dataquestionnaire[i].description,
                                type: this.props.dataquestionnaire[i].type

                              }} dd={k.questionnaire} setSt={this.setState} info={k} dataquestionnaire={vald} setdataquestionnaire={this.props.setdataquestionnaire}  ></Modifquestionnaire>)
                            ind = ind + 1;

                            ;



                          }
                          for (var q = 0; q < s; q++) {

                            k.questionnaire.push(<Modifquestionnaire iddiv={"ds2" + (ind + 1)} sst={this.state} iddivh={"d2h" + (ind + 1)} d1={"d2" + (ind + 1)} setPasse2={this.props.setPasse2} id={ind + 1} del={false} st2={this.props.st2}
                              setInfoop1={this.props.setInfoop1} dipl={{
                                titre: "",
                                description: "",
                                type: ""

                              }} dd={k.questionnaire} setSt={this.setState} info={k} dataquestionnaire={vald} setdataquestionnaire={this.props.setdataquestionnaire}  ></Modifquestionnaire>)
                            ind = ind + 1;

                          }

                          this.props.setIndiceq((ind), () => {
                          });
                          this.setState({ questionnaire: [...k.questionnaire] }, () => {
                          });
                          this.props.setInfoop1({ questionnaire: [...k.questionnaire] }, () => {
                          })


                        } if (this.props.infoop1.questionnaire == null || this.props.dataquestionnaire.length >= this.props.infoop1.questionnaire) {
                          this.props.setPasse2(false)
                        }








                      }}>

                        <Icon style={{ fontSize: "1rem" }}>delete</Icon>
                      </IconButton>


                    </div></div>
                  <span></span>
                </div>
              )

              )
              }




            </div></div>



        </div>


      </div>
    );
  }
}

export default ModifinformationOptionnel;
