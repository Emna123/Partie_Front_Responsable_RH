import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SimpleForm from "./SimpleForm";
import InformationOptionnel from "./InformationOptionnel"
import EditorForm from "./EditorForm"
import React, { Component, useEffect, useState, updateState } from 'react';
import authAxios from '../../../services/authAxios';
import Diplome from "./Diplome";
import { InfoOutlined } from "@material-ui/icons";
import Questionnaire from "./Questionnaire";
import history from "history.js";
import AlertDelete from "./AlertDelete";
import { makeStyles } from "@material-ui/core/styles";
import {indiceniveaulangue} from "./LangueIndex"
import {indiceniveaucompetance} from "./indiceCompetance"

import { Link, Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  // your other stuff here
  
  // Add this
  step_label_root: {
    fontSize: 13,
  }
}));
function getSteps() {
  return [
    "Informations essentielles",
    "Information optionnel",
    "Description détaillée"
  ];
}


export default function StepperForm() {
  function getStepContent(stepIndex) {

    switch (stepIndex) {
      case 0:
        return <SimpleForm setdisb={setdisb} setOffre={setOffre} offre={offre} ></SimpleForm>
      case 1:
        return <InformationOptionnel  indicel={indicel} setIndicel={setIndicel} datalangue={datalangue} passe4={passe4} setPasse4={setPasse4} setdatalangue={setdatalangue} infoop3={infoop3} setInfoop3={setInfoop3} infoop2={infoop2} setInfoop2={setInfoop2} indicec={indicec} setIndicec={setIndicec} passe3={passe3} setPasse3={setPasse3} datacompetance={datacompetance} setdatacompetance={setdatacompetance} infoop1={infoop1} setInfoop1={setInfoop1} setidq={setidq} dataquestionnaire={dataquestionnaire} setdataquestionnaire={setdataquestionnaire} forceUpdate={forceUpdate} passe={passe} passe2={passe2} setPasse2={setPasse2} setPasse={setPasse} infoop={infoop} setInfoop={setInfoop} setIndice={setIndice} setIndiceq={setIndiceq} indice={indice} indiceq={indiceq} hand={hand} st2={st2} setSt2={setSt2} valDiplome={valDiplome} setValidiplome={setValidiplome} ></InformationOptionnel>;
      case 2:
        return <EditorForm setdisb={setdisb}  description={description} setdescription={setdescription}  ></EditorForm>;

    }
  }

  const [disb, setdisb] = useState(true);
  const [diplome, setdiplome] = useState(true);

  var [offre, setOffre] = useState({
    titre: "",
    type_offre: "",      
    date_expiration: new Date (new Date().setDate(new Date().getDate() + 1)),
    type: "Emploi",
    annee_exp: "",
    lieu_travail: "",
    type_contrat: "",
    date_publication: new Date(),
    nbr_poste: "",
    lie: [],
    ex: "",
    nombrep: "",
  });

  const [valDiplome, setValidiplome] = useState([])
  const [indice, setIndice] = useState(-1);
  const [indiceq, setIndiceq] = useState(-1);
  const [indicec, setIndicec] = useState(-1);
  const [indicel, setIndicel] = useState(-1);


  var [infoop, setInfoop] = React.useState({ diplome: [] })
  const [dataquestionnaire, setdataquestionnaire] = useState([]);
  const [datacompetance, setdatacompetance] = useState([]);
  const [datalangue, setdatalangue] = useState([]);
  var [infoop1, setInfoop1] = React.useState({ questionnaire: [] })
  var [infoop2, setInfoop2] = React.useState({ competance: [] })
  var [infoop3, setInfoop3] = React.useState({ langue: [] })

  const [open1, setOpen1] = React.useState(false);



  const [description, setdescription] = useState("")

  const [st2, setSt2] = useState(false)
  const [passe, setPasse] = useState(true)
  const [passe2, setPasse2] = useState(true)
  const [passe3, setPasse3] = useState(true)
  const [passe4, setPasse4] = useState(true)
  const [idoffre, setidoffre] = useState(true)

  const [decdetdis, setdecdetdis] = useState(true)


  const [idq, setidq] = useState(-1)
  const classes = useStyles();


  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {

    setActiveStep(prevActiveStep => prevActiveStep + 1);

  };
  const hand = (t2) => {

    setInfoop({ diplome: [t2] })
    return infoop.diplome
  }
  const handleBack = () => {
    forceUpdate()
    console.log(description)
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    if (activeStep >= 0) {
    }
  };

  const handleReset = () => {

    history.push('/recrutement/ModifierOffre/'+idoffre);  };
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <div>

      <div>
        <div className="container" style={{ marginTop: '-1%', backgroundColor: '#FBFBFB' }}>
          <div className="card profile-card-2 shadow-sm  bg-white rounded cc box " >
            <center>
              <div >

                <div >


                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                      <Step key={label}>
                        <StepLabel classes={{ label: classes.step_label_root }} className="text-break">{label}</StepLabel>
                      </Step>
                    ))} 
                  </Stepper>
                </div>








              </div>
            </center>
          </div>

          <div className="card profile-card-2 shadow-sm  bg-white rounded cc box " style={{  marginTop:'2%' }}  >
          <br></br>
            <center>
              <div style={{ display: 'inline' }}>

                <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>


                  <div>
                    {activeStep === steps.length ? (
                      <div style={{padding:'5%'}}>
                        <Typography style={{ marginLeft: "-1.5" }}>Toutes les étapes sont terminées</Typography>
                        <div style={{ textAlign: "center" }}>

                          <Button
                            style={{ marginTop: '2%' }}
                            variant="contained"
                            color="default"
                            onClick={e => {
                              setOpen1(true)
                                                   }}


                          >

                            Supprimer
              </Button>
                          <Button
                            style={{  marginLeft: "2.5%",marginTop: '2%'  }}

                            variant="contained"
                            color="secondary"
                            onClick={handleReset}
                          >
                            Éditer
            </Button>
                          <Button
                            style={{ marginTop: '2%',marginLeft: "2.5%" }}
                            variant="contained"
                            color="primary"
                            onClick={e => {  
                              window.location.href='http://localhost:3000/recrutement/offres'                          }}
                          >
                            Consulter
              </Button>
                        </div>
                      </div>
                    ) : (
                      <div>

                        <div>{getStepContent(activeStep, disb, setdisb)}</div>
                        <div style={{ marginTop: '4%' }}>
                          <hr className="hr3" ></hr>

                          <div className="pt-4" style={{ textAlign: "right", marginTop: '-3%', display: 'block', whiteSpace: 'nowrap' }}>

                            <Button
                               className="ml-4"

                              variant="contained"
                              color="secondary"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                            >
                              Retour
              </Button>
                            <Button
                              className="ml-4"
                              variant="contained"
                              color="primary"
                              disabled={disb}

                              onClick={e => {
                                if (activeStep === steps.length - 1) {

                              
                                  offre.description = description;
                                  authAxios.post('Offre/PostOffre', offre).then((res) => {
                                    setidoffre(res.data.offre.id)

                                    for (var i = 0; i < valDiplome.length; i++) {
                                      var req = true
                                      if (valDiplome[i].type === "Optionnel") { req = false }
                                      authAxios.post('Diplome/AddDiplome/' + res.data.offre.id, { titre: valDiplome[i].titre, description: valDiplome[i].description, require: req })

                                    }



                                    for (var i = 0; i < datalangue.length; i++) {
                                      var req = true
                                      if (datalangue[i].type === "Optionnel") { req = false }
                                      var indiceniveau=indiceniveaulangue(datalangue[i].niveau) ;
                                      authAxios.post('LangueOffre/AddLangue/' + res.data.offre.id, { langue: datalangue[i].titre, niveau: datalangue[i].niveau, require: req,value:indiceniveau})

                                    }
                                    for (var i = 0; i < datacompetance.length; i++) {
                                      var req = true
                                      if (datacompetance[i].type === "Optionnel") { req = false }
                                      var indicecompt=indiceniveaucompetance(datacompetance[i].niveau);
                                      authAxios.post('Competence/AddOffreCompetence/' + res.data.offre.id, { titre: datacompetance[i].titre, niveau: datacompetance[i].niveau, require: req,value:indicecompt })

                                    }

                                    for (var i = 0; i < dataquestionnaire.length; i++) {
                                      var req = true
                                      if (dataquestionnaire[i].type === "Optionnel") { req = false }
                                      authAxios.post('Questionnaire/AddQuestionnaire/' + res.data.offre.id, { titre: dataquestionnaire[i].titre, description: dataquestionnaire[i].description, require: req })

                                    }












                                  })
























                                }





                               if(description=="" && activeStep==1) {setActiveStep(prevActiveStep => prevActiveStep + 1)
                                setdisb(true)
                              }
                              else{
                                setActiveStep(prevActiveStep => prevActiveStep + 1);
                                setdisb(false)

                              }
                              }}
                            >
                              {activeStep === steps.length - 1 ? "Fin" : "Suivant"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>


                </div>








              </div>
            </center>
            <br></br>

          </div>


        </div>



      </div>










<AlertDelete idoffre={idoffre} open={open1} setOpen={setOpen1}></AlertDelete>

    </div>
  );
}
