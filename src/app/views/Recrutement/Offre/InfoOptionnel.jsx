import React, { Component, useState } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";


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
import Diplome from "./Diplome"
import Competance from "./Competance";
import Langue from "./Langue";
import Questionnaire from "../Questionnaire";
import { TimerSharp } from "@material-ui/icons";
import { update } from "lodash";

const useStyles = makeStyles((theme) => ({

  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const InfoOptionnel = () => {

  const [tabdiplome, settabDiplome] = useState([]);
  const [infoDiplome, setinfoDiplome] = useState([this.props.infoop.diplome]);
  const adddiplome = () => {

    this.props.setPasse({ passe: true })

    this.state.diplome.concat(<Diplome handledel={this.handledel} iddiv={"ds1" + (this.props.indice + 1)} sst={this.state} iddivh={"d1h" + (this.props.indice + 1)} d1={"d1" + (this.props.indice + 1)} setPasse={this.props.setPasse} id={(this.props.indice + 1)} del={false} st2={this.props.st2}
      setInfoop={this.props.setInfoop} dipl={{
        titre: "",
        description: "",
        type: "Optionnel"

      }} dd={this.state.diplome} setSt={this.setState} info={this.props.infoop} valDiplome={this.props.valDiplome} setValidiplome={this.props.setValidiplome}  ></Diplome>)
    this.props.setIndice(this.props.indice + 1)
    this.setState({ 'diplome': [] })
    this.props.setInfoop({ 'diplome': [] })

    this.setState({ 'diplome': [...this.state.diplome] })

    this.props.setInfoop({ 'diplome': [...this.state.diplome] })




    console.log(this.state.diplome)
  }








  return (

    <div>


      <div className="row mb-12" >




        <div className="col-md-6 mb-3" style={{ backgroundColor: "#F2F3F4", padding: "1.8%" }} >
          <h6 style={{ display: 'inline', marginLeft: '-2%' }}><Icon style={{ fontSize: "1rem", color: "#909497" }}> school </Icon> Diplôme demandé</h6>
          <IconButton style={{ marginLeft: '92%', marginTop: '-10%' }} onClick={adddiplome} disabled={this.props.passe} >
            <Icon style={{ fontSize: "1rem", color: " #7467ef" }}
            > add </Icon>   </IconButton>
          <div style={{ marginTop: '-2%', marginBottom: '-1.8%' }}>

            <div >
              {this.state.diplome.map((v, index) => (
                <div key={v.props.id}>


                  <div className='row-md-6 mb-3 ' id={v.props.iddivh} style={{ display: this.props.valDiplome[index] != null && this.state.diplome[index].title !== "" ? 'none' : 'block' }}>{v}
                    <div >
                      <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '5px', marginTop: '-22%', marginLeft: '33%' }} aria-label="Delete" onClick={e => {


                        this.setState({ diplome: this.props.infoop.diplome }, () => {
                          console.log('state', this.state.diplome);
                        });
                        if (this.props.valDiplome[index] == null) {

                          this.props.infoop.diplome.splice(-1, 1)
                          this.state.diplome.splice(-1, 1)

                          this.props.setInfoop({ 'diplome': [] })
                          this.setState({ 'diplome': [] })
                          this.setState({ 'diplome': [...this.props.state.diplome] })

                          this.props.setInfoop({ 'diplome': [...this.props.infoop.diplome] })
                        }
                        else
                          if (index == this.state.diplome.length - 1) {

                            this.props.valDiplome.splice(-1, 1)

                            this.props.setValidiplome([])
                            this.props.setValidiplome([...this.props.valDiplome])
                            this.props.infoop.diplome.splice(-1, 1)
                            this.props.setInfoop({ 'diplome': [] })
                            this.state.diplome.splice(index, 1)

                            this.setState({ 'diplome': [] })
                            this.setState({ 'diplome': [...this.state.diplome] })

                            this.props.setInfoop({ 'diplome': [...this.props.infoop.diplome] })
                          }


                          else {
                            this.setState({ 'diplome': [...this.state.diplome] })
                            this.props.setInfoop({ 'diplome': [...this.state.diplome] })
                            this.props.setValidiplome([...this.state.diplome[index].props.valDiplome])

                           

                            this.props.valDiplome.splice(index, 1)
                            this.props.infoop.diplome.splice(index, 1)
                            this.state.diplome.splice(index, 1)
                            this.props.setValidiplome([])
                            this.props.setValidiplome([...this.props.valDiplome])
                            this.props.setInfoop({ 'diplome': [] })
                            this.setState({ 'diplome': [] })
                            this.setState({ 'diplome': [...this.state.diplome] })

                            this.props.setInfoop({ 'diplome': [...this.props.infoop.diplome] })



                          }


                        if (this.props.infoop.diplome == null || this.props.valDiplome.length == this.props.infoop.diplome) {
                          this.props.setPasse(false)
                        }


                        ;
                      }}>

                        <Icon style={{ fontSize: "1rem" }}>delete</Icon>
                      </IconButton>

                    </div>
                  </div>

                  <div id={v.props.iddiv} className="row-md-6 mb-3 bgd" style={{ textAlign: "left", paddingBottom: "-50px", display: this.props.valDiplome[index] != null && this.state.diplome[index].title !== "" ? 'block' : 'none' }} >
                    <div >
                        <span style={{ marginLeft: "96%" }}><Icon style={{ fontSize: "17px", padding: "0%", margin: "0%" }} color="secondary"> stars  </Icon> </span>
                   
                      <div  style={{ color: '#7467ef', fontSize: '11px', textAlign: "left", marginTop: "-2%" }}><Icon style={{ fontSize: "15px", padding: "0%", margin: "0%" }}> star_half  </Icon> &nbsp;&nbsp;<span style={{ color: "#000000", fontWeight: "bold", padding: "0%", margin: "0%", fontSize: "15px" }}>{v.props.dipl.titre}</span></div >
                      <div  style={{ color: '#7467ef', fontSize: '11px', textAlign: "left", paddingBottom: "5px", marginTop: "-2%" }}><Icon style={{ fontSize: "15px", padding: "0%", margin: "0%" }}> short_text </Icon> &nbsp;&nbsp;<span style={{ color: "#000000", padding: "0%", margin: "0%" }}>{v.props.dipl.description}</span></div >

                    </div >
                    <div style={{ textAlign: "right" }} >
                      <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '5px', marginLeft: '1%' }} aria-label="Delete"  >
                        <Icon style={{ fontSize: "1rem" }} onClick={e => {
                          document.getElementById(v.props.iddiv).style.display = "none"; document.getElementById(v.props.iddivh).removeAttribute('style')
                        }}
                        >create</Icon>
                      </IconButton>
                      <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '5px', marginLeft: '1%' }} aria-label="Delete" onClick={e => {

                        this.setState({ diplome: this.props.infoop.diplome }, () => {
                          console.log('state', this.state.diplome);
                        });
                        if (this.props.valDiplome[index] == null) {

                          this.props.infoop.diplome.splice(-1, 1)
                          this.props.setInfoop({ 'diplome': [] })
                          this.setState({ 'diplome': [] })
                          this.setState({ 'diplome': [...this.props.infoop.diplome] })

                          this.props.setInfoop({ 'diplome': [...this.props.infoop.diplome] })
                        }
                        else
                          if (index == this.state.diplome.length - 1) {

                            this.props.valDiplome.splice(-1, 1)

                            this.props.setValidiplome([])
                            this.props.setValidiplome([...this.props.valDiplome])
                            this.props.infoop.diplome.splice(-1, 1)
                            this.props.setInfoop({ 'diplome': [] })
                            this.state.diplome.splice(index, 1)

                            this.setState({ 'diplome': [] })
                            this.setState({ 'diplome': [...this.state.diplome] })

                            this.props.setInfoop({ 'diplome': [...this.props.infoop.diplome] })
                          }


                          else {
                            this.setState({ 'diplome': [...this.state.diplome] })
                            this.props.setInfoop({ 'diplome': [...this.state.diplome] })
                            this.props.setValidiplome([...this.state.diplome[index].props.valDiplome])

                            

                            this.props.valDiplome.splice(index, 1)
                            this.props.infoop.diplome.splice(index, 1)
                            this.state.diplome.splice(index, 1)
                            this.props.setValidiplome([])
                            this.props.setValidiplome([...this.props.valDiplome])
                            this.props.setInfoop({ 'diplome': [] })
                            this.setState({ 'diplome': [] })
                            this.setState({ 'diplome': [...this.state.diplome] })

                            this.props.setInfoop({ 'diplome': [...this.props.infoop.diplome] })



                          }
                        if (this.props.infoop.diplome == null || this.props.valDiplome.length == this.props.infoop.diplome) {
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


      </div>


    </div>



  );
}


export default InfoOptionnel;
