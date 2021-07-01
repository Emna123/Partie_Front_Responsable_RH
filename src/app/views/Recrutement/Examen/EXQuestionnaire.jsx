
import React, { Component } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppRecrutement.css'

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import ExReponse from "./ExReponse";

import {
  Button,
  Icon,
  Grid,

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

class EXQuestionnaire extends Component {




  state = {

    question: "",
    edit: true,
    note: "",
    id: 0,
    exrep: [<ExReponse questinfo={this.props.questinfo} setquestinfo={this.props.setquestinfo} id={0} repinfo={this.props.repinfo} setrep={this.props.setrep} idquest={this.props.id}></ExReponse>]
  }



    ;

  page2 = event => {
    const p1 = document.getElementById(this.props.idh);
    p1.style.cssText = ' height: .1rem;width: 50%; margin: 0;'
    p1.style.cssText = 'margin-left: -5%;'

    const d2 = document.getElementById(this.props.id2);
    const d4 = document.getElementById(this.props.id1);
    d2.style.display = 'block';

    d4.style.display = 'none';
  };
  page4 = event => {
    const p1 = document.getElementById(this.props.idh);
    p1.style.cssText = 'margin-left: 50%;'
    const d2 = document.getElementById(this.props.id2);
    const d4 = document.getElementById(this.props.id1);
    d4.style.display = 'block'
    d2.style.display = 'none';
  };
  /* apiUrl="https://localhost:44392/api/Offre";
   authAxios=axios.create({
     baseURL:this.apiUrl,
     headers:{
       Authorization:`Bearer ${localStorage.getItem('access_token')}`
     }  })
         this.authAxios.post('/PostOffre',{question:this.state.question,type_offre:this.state.type,type_contrat:this.state.cont,nbr_poste:parseInt(this.state.nombrep),date_publication:new Date(),date_expiration:this.state.date,lieu_travail:liech,annee_exp:exch,niveau_pro:niveauch})
 
     */


  handleSubmit = event => {
    var x = -1;

    for (var i = 0; i < this.props.questinfo.length; i++) {
      if (this.props.questinfo[i].idq == this.props.id) {
        x = i
      }
    }
    console.log('ind', x)

    this.props.questinfo[x].note = this.state.note;
    this.props.questinfo[x].question = this.state.question;

    console.log(this.props.questinfo)
    this.props.setquestinfo([])
    this.props.setquestinfo(...[this.props.questinfo])
    this.setState({ edit: false });




  };


  handleEdit = event => {







  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  };

  addrep = event => {
    this.state.exrep.push(<ExReponse questinfo={this.props.questinfo} setquestinfo={this.props.setquestinfo} id={this.state.id + 1} repinfo={this.props.repinfo} setrep={this.props.setrep} idquest={this.props.id}></ExReponse>)
    this.setState({ exrep: [...this.state.exrep] });
    this.setState({ id: this.state.id + 1 });

  };





  render() {
    const { classes } = this.props;

    let {
      note


    } = this.state;

    const dur = [
      { label: "15 min" },
      { label: "30 min" },
      { label: "45 min" },
      { label: "1h" },
      { label: "1h 15min" },
      { label: "1h 30min" },
      { label: "1h 45min" },
      { label: "2h" },


    ];

    return (
      <div>
        <ul style={{ marginTop: '-9%',textDecoration:"none",listStyle:'none' }}>
          <li  ><a href="#" onClick={this.page2} style={{ color: 'black', marginLeft: '-4%', fontSize: "13px" }}>Question <Icon style={{ fontSize: "1rem", color: " #7467ef", margin: 5, marginBottom: -3 }}> help_outline </Icon>  </a></li>
          <li ><a href="#" onClick={this.page4} style={{ color: 'black', marginLeft: '28%', fontSize: "13px" }}>Réponse <Icon style={{ fontSize: "1rem", color: " #7467ef", margin: 5, marginBottom: -3 }}> offline_pin </Icon> </a></li>
          <hr id={this.props.idh} className='hr22' style={{ color: '#6024CF' }} />
        </ul>

        <div id={this.props.id1} style={{ display: "none" }}>
          <div >
            <br></br>
            <div style={{ textAlign: "left", fontSize: "12px" }}>  <Icon style={{ fontSize: "1rem", margin: '0%' }}>check</Icon> Cocher la/les bonne(s) réponse(s)</div >

            <IconButton style={{ marginLeft: '80%', marginTop: '-1%' }} onClick={this.addrep} disabled={this.props.passe}  >
              <Icon style={{ fontSize: "1rem", color: " #7467ef" }}
              > add </Icon>   </IconButton>
          </div >
          <div  >

            {this.state.exrep.map((v, ind) => (
              <div style={{ marginTop: '0%', marginBottom: '2%' }} key={v.props.id} className="row" >
                <div className="col-10" style={{ marginRight: 0, paddingRight: 0, lineHeight: 0 }}> {v}</div>
                <div className="col" style={{ textAlign: 'left', width: '5%', marginLeft: 0, lineHeight: 0 }}   >
                  <br></br>
                  <IconButton

                    style={{ border: 'solid 2px  #909497', borderRadius: '3px', padding: '6.2px' }} aria-label="Delete" onClick={e => {
                      this.state.exrep.splice(ind, 1);
                      this.setState({ exrep: [...this.state.exrep] });

                      var idquest = -1;
                      for (var i = 0; i < this.props.questinfo.length; i++) {
                        if (this.props.questinfo[i].idq == this.props.id) {
                          idquest = i;
                        }
                      }


                      var x = -1;
                      for (var i = 0; i < this.props.questinfo[idquest].repinfo.length; i++) {
                        if (this.props.questinfo[idquest].repinfo[i].id == v.props.id) {
                          x = i;
                        }
                      }
                      if (x != -1) {
                        this.props.questinfo[idquest].repinfo.splice(x, 1)
                        this.props.setquestinfo([])
                        this.props.setquestinfo(...[this.props.questinfo])
                      }
                    }} >                          <Icon style={{ fontSize: "1rem" }}>delete</Icon>
                  </IconButton>
                </div>
              </div>

            ))}
          </div >

        </div>
        <div id={this.props.id2}>

          {this.state.edit == true ? (
            <div id="divv">
              <br></br>
              <div >


              </div>
              <div >
                <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  onError={errors => null}
                >
                  <Grid >
                    <br></br>

                    <div className="row" style={{ marginTop: "-1%" }}>
                      <div className="col-md-2" style={{ textAlign: "left" }}>
                        <TextValidator
                          className="mb-8 w-full"
                          label="&nbsp;Note"
                          onChange={this.handleChange}
                          type="number"
                          name="note"
                          value={note}
                          validators={[
                            "required",
                            'minNumber:1',
                          ]}
                          errorMessages={['veuillez renseigner ce champ', 'Invalid nombre de postes format']}
                          InputProps={{

                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon style={{ fontSize: "1rem", marginRight: 6, color: "#909497" }}> add </Icon>
                              </InputAdornment>
                            )
                          }}

                        />

                      </div>
                      <div className="col-md-7" style={{ textAlign: "left" }}>
                        <TextValidator
                          style={{ fontSize: '10px' }}
                          className="mb-4 w-full"

                          label="&nbsp;Question"
                          onChange={this.handleChange}
                          type="text"
                          name="question"
                          value={this.state.question}
                          validators={["required"]}
                          errorMessages={['veuillez renseigner ce champ']}
                          InputProps={{

                            endAdornment: (
                              <InputAdornment position="end" >
                                <Icon style={{ fontSize: "1rem", marginRight: 6, color: "#909497" }}> help </Icon>
                              </InputAdornment>
                            )
                          }}
                        />


                      </div>
                      <div className="col-md-4" style={{ textAlign: "left", marginLeft: '-10%' }}>


                        <IconButton style={{
                          border: 'solid 2px  #7467ef', float: 'right', borderRadius: '3px', padding: '6px', margin: '5px'
                          , backgroundColor: '#7467ef'
                        }} aria-label="Delete"
                          className="mt-4"

                          onClick={e => {
                            this.setState({ question: "", note: "" });

                          }}>
                          <Icon style={{ fontSize: "1rem", color: '#FFFFFF' }}>clear</Icon>
                        </IconButton>
                        <Button
                          style={{ float: 'right', margin: '5px' }}
                          className="mt-4"
                          variant="contained"
                          color="secondary"
                          type="submit"


                        >
                          ENREGISTRER
   </Button>
                      </div>
                    </div>



                  </Grid>


                </ValidatorForm>
              </div>


            </div>
          ) : (

            <div id="divh">
              <div style={{ marginTop: '2%' }}>


                <div style={{ textAlign: "left", fontSize: '14px', marginTop: '3%', marginBottom: '3%' }} onClick={e => {
                  this.setState({ edit: true });

                }}>
                  <div  > Question : ({this.state.note} pts)</div >
                  <br></br>
                  <div style={{ color: '#7467ef', fontSize: '15px', width: '95%' }} className="row"><div className="col" style={{ color: "black", marginLeft: '5px', fontWeight: 'bold' }}> {this.state.question} ?</div >

                    <br></br>





                  </div >



                </div >


              </div>

            </div>
          )}


        </div>
      </div>
    )



  }
}

export default withStyles(styles, { withTheme: true })(EXQuestionnaire);

